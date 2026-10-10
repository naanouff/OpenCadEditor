import { afterEach, describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Session } from '@opencad/api-parametrique'
import { ecrire, ouvrirSession } from '@opencad/format-opencad'
import { DocumentVue } from '../src/DocumentVue.tsx'
import { definirSelecteur, selecteurNavigateur } from '../src/fichierShell.ts'
import { moteurSynchrone } from '../src/moteur/moteur.ts'
import { storeShell } from '../src/storeShell.ts'

const PLAQUE = `
piece plaque
param diametre 40
esquisse plan.dessus
cercle
cote diametre diametre
extrude 10
`

const CONE = `
piece cone
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 3
cote hauteur 10
segment
cote rayon 0
cote hauteur 10
revolution
`

afterEach(() => definirSelecteur(selecteurNavigateur))

describe('fichier cadompart', () => {
  it('remplace la session du moteur à l’ouverture', () => {
    const recus: number[] = []
    const moteur = moteurSynchrone((maillage) => recus.push(maillage.indices.length))
    moteur.executer(CONE, 1)
    moteur.ouvrir('piece vide', [], 2)
    expect(recus[0]).toBeGreaterThan(0)
    expect(recus[1]).toBe(0)
  })

  it('ouvre des octets à la place de la session et enregistre le codec', async () => {
    storeShell.executer('piece reste\nparam garde 1')
    const source = new Session({ geometrie: false })
    source.executer(PLAQUE)
    let recu: Uint8Array | null = null
    definirSelecteur({
      async ouvrir() {
        return ecrire(source)
      },
      async enregistrer(octets) {
        recu = octets
      },
    })
    await storeShell.demanderOuverture()
    expect(storeShell.hote().session.expression('diametre')).toBe('40')
    expect(storeShell.hote().session.expression('garde')).toBeUndefined()
    await storeShell.demanderEnregistrement()
    expect(ouvrirSession(recu!).expression('diametre')).toBe('40')
    expect(Array.from(storeShell.enregistrer())).toEqual(Array.from(recu!))
  })

  it('laisse la session en place si le fichier est refusé', async () => {
    storeShell.executer('piece reste\nparam garde 3')
    definirSelecteur({
      async ouvrir() {
        return new Uint8Array([1, 2, 3])
      },
      async enregistrer() {},
    })
    await expect(storeShell.demanderOuverture()).rejects.toThrow()
    expect(storeShell.hote().session.expression('garde')).toBe('3')
  })

  it('affiche Ouvrir et Enregistrer', () => {
    const html = renderToStaticMarkup(createElement(DocumentVue))
    expect(html).toContain('Ouvrir')
    expect(html).toContain('Enregistrer')
  })
})
