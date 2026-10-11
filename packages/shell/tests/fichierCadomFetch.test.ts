import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { DocumentVue } from '../src/DocumentVue.tsx'
import { chargeurNavigateur, definirChargeur } from '../src/chargeurAsset.ts'
import { definirSelecteur, selecteurNavigateur } from '../src/fichierShell.ts'
import { storeShell } from '../src/storeShell.ts'

const fixtureA = readFileSync(
  join(
    dirname(fileURLToPath(import.meta.url)),
    '../../../vendor/opencad/fixtures/cadom/example-a-three-level-assembly.cadom',
  ),
)

afterEach(() => {
  definirSelecteur(selecteurNavigateur)
  definirChargeur(chargeurNavigateur())
})

async function ouvrirFixture() {
  definirSelecteur({
    async ouvrir() {
      return new Uint8Array(fixtureA)
    },
    async enregistrer() {},
  })
  await storeShell.demanderOuverture()
}

describe('cadom fetch assets', () => {
  it('charge les URI via le chargeur injectable', async () => {
    await ouvrirFixture()
    const plan = storeShell.planChargement()!
    expect(plan.assets).toHaveLength(2)
    for (const a of plan.assets) {
      expect(storeShell.statutAsset(a.assetId)?.etat).toBe('en_attente')
    }

    definirChargeur({
      async charger(uri) {
        return new TextEncoder().encode(`fake:${uri}`)
      },
    })
    await storeShell.chargerAssets()
    for (const a of plan.assets) {
      const s = storeShell.statutAsset(a.assetId)!
      expect(s.etat).toBe('ok')
      expect(new TextDecoder().decode(s.octets!)).toBe(`fake:${a.uri}`)
    }
  })

  it('marque erreur sur un URI sans bloquer les autres', async () => {
    await ouvrirFixture()
    definirChargeur({
      async charger(uri) {
        if (uri.includes('part-b')) throw new Error('introuvable')
        return new Uint8Array([1, 2, 3])
      },
    })
    await storeShell.chargerAssets()
    const plan = storeShell.planChargement()!
    const a = plan.assets.find((x) => x.uri.includes('part-a'))!
    const b = plan.assets.find((x) => x.uri.includes('part-b'))!
    expect(storeShell.statutAsset(a.assetId)?.etat).toBe('ok')
    expect(storeShell.statutAsset(b.assetId)?.etat).toBe('erreur')
    expect(storeShell.statutAsset(b.assetId)?.message).toContain('introuvable')
  })

  it('affiche le statut dans Document', async () => {
    await ouvrirFixture()
    definirChargeur({
      async charger() {
        return new Uint8Array([9, 9])
      },
    })
    await storeShell.chargerAssets()
    const html = renderToStaticMarkup(createElement(DocumentVue))
    expect(html).toContain('Charger assets')
    expect(html).toContain('2/2 chargés')
    expect(html).toContain('ok · 2 o')
  })
})
