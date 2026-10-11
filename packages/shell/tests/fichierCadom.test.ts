import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ID } from '@opencad/cadom'
import { DocumentVue } from '../src/DocumentVue.tsx'
import { definirSelecteur, selecteurNavigateur } from '../src/fichierShell.ts'
import { storeShell } from '../src/storeShell.ts'

const fixtureA = readFileSync(
  join(
    dirname(fileURLToPath(import.meta.url)),
    '../../../vendor/opencad/fixtures/cadom/example-a-three-level-assembly.cadom',
  ),
)

afterEach(() => definirSelecteur(selecteurNavigateur))

describe('fichier cadom', () => {
  it('ouvre la fixture A et expose le CadomDocument', async () => {
    storeShell.executer('piece reste\nparam garde 9')
    definirSelecteur({
      async ouvrir() {
        return new Uint8Array(fixtureA)
      },
      async enregistrer() {},
    })
    await storeShell.demanderOuverture()
    const doc = storeShell.assemblage()
    expect(doc).not.toBeNull()
    expect(doc!.rootIds).toEqual([ID.root])
    expect(doc!.nodes.get(ID.partA)?.name).toBe('Part A')
    expect(storeShell.hote().session.expression('garde')).toBe('9')
  })

  it('affiche l’arbre d’assemblage dans Document', async () => {
    definirSelecteur({
      async ouvrir() {
        return new Uint8Array(fixtureA)
      },
      async enregistrer() {},
    })
    await storeShell.demanderOuverture()
    const html = renderToStaticMarkup(createElement(DocumentVue))
    expect(html).toContain('Assemblage')
    expect(html).toContain('Root assembly')
    expect(html).toContain('Part A')
    expect(html).toContain('Part B')
  })

  it('refuse des octets illisibles sans toucher l’assemblage', async () => {
    definirSelecteur({
      async ouvrir() {
        return new Uint8Array(fixtureA)
      },
      async enregistrer() {},
    })
    await storeShell.demanderOuverture()
    expect(storeShell.assemblage()).not.toBeNull()

    storeShell.executer('piece reste\nparam garde 4')
    definirSelecteur({
      async ouvrir() {
        return new Uint8Array([1, 2, 3])
      },
      async enregistrer() {},
    })
    await expect(storeShell.demanderOuverture()).rejects.toThrow()
    expect(storeShell.hote().session.expression('garde')).toBe('4')
    expect(storeShell.assemblage()?.nodes.get(ID.partA)?.name).toBe('Part A')
  })
})
