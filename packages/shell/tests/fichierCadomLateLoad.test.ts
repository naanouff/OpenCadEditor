import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Session } from '@opencad/api-parametrique'
import { ecrire } from '@opencad/format-opencad'
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

describe('cadom late-load plan', () => {
  it('expose planChargement mesh-first après ouverture', async () => {
    definirSelecteur({
      async ouvrir() {
        return new Uint8Array(fixtureA)
      },
      async enregistrer() {},
    })
    await storeShell.demanderOuverture()
    const plan = storeShell.planChargement()
    expect(plan).not.toBeNull()
    expect(plan!.assets.map((a) => a.uri)).toEqual(['./part-a.glb', './part-b.glb'])
    expect(plan!.assets.every((a) => a.role === 'mesh')).toBe(true)
  })

  it('liste les assets dans Document', async () => {
    definirSelecteur({
      async ouvrir() {
        return new Uint8Array(fixtureA)
      },
      async enregistrer() {},
    })
    await storeShell.demanderOuverture()
    const html = renderToStaticMarkup(createElement(DocumentVue))
    expect(html).toContain('Assets')
    expect(html).toContain('./part-a.glb')
    expect(html).toContain('./part-b.glb')
    expect(html).toContain('mesh')
  })

  it('planChargement null après ouverture d’une pièce', async () => {
    definirSelecteur({
      async ouvrir() {
        return new Uint8Array(fixtureA)
      },
      async enregistrer() {},
    })
    await storeShell.demanderOuverture()
    expect(storeShell.planChargement()).not.toBeNull()

    const piece = new Session({ geometrie: false })
    piece.executer('piece plaque\nparam diametre 40\nesquisse plan.dessus\ncercle\ncote diametre diametre\nextrude 10')
    definirSelecteur({
      async ouvrir() {
        return ecrire(piece)
      },
      async enregistrer() {},
    })
    await storeShell.demanderOuverture()
    expect(storeShell.assemblage()).toBeNull()
    expect(storeShell.planChargement()).toBeNull()
  })
})
