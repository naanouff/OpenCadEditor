import { describe, expect, it } from 'vitest'
import { CadomDocument, encode, mat4Identity } from '@opencad/cadom'
import { assemblageBoiteMilgauss, BOITE_ID } from '../src/assemblageBoite.ts'
import {
  fusionnerMaillages,
  maillageDepuisAssemblage,
  SCRIPTS_ASSEMBLAGE,
  transformerMaillage,
} from '../src/assemblageMaillage.ts'
import { storeShell } from '../src/storeShell.ts'

describe('assemblage maillage viewport', () => {
  it('mappe les cinq URI boîte vers un script', () => {
    expect(Object.keys(SCRIPTS_ASSEMBLAGE).sort()).toEqual(
      [
        './carrure.cadompart',
        './couronne.cadompart',
        './fond.cadompart',
        './lunette.cadompart',
        './verre.cadompart',
      ].sort(),
    )
  })

  it('transforme et fusionne des maillages', () => {
    const cube: import('@opencad/api-parametrique').MaillageOmbre = {
      positions: [0, 0, 0, 1, 0, 0, 0, 1, 0],
      normales: [0, 1, 0, 0, 1, 0, 0, 1, 0],
      indices: [0, 1, 2],
    }
    const t = mat4Identity()
    t[12] = 10
    const moved = transformerMaillage(cube, t)
    expect(moved.positions[0]).toBeCloseTo(10)
    expect(moved.positions[1]).toBeCloseTo(0)
    const fused = fusionnerMaillages([cube, moved])
    expect(fused.indices).toEqual([0, 1, 2, 3, 4, 5])
    expect(fused.positions).toHaveLength(18)
  })

  it('reconstruit un maillage OCCT pour la boîte (lunette seule si timeout)', async () => {
    const logical = assemblageBoiteMilgauss()
    // Keep test fast: only lunette + fond nodes
    logical.nodes = logical.nodes.filter(
      (n) =>
        n.id === BOITE_ID.root || n.id === BOITE_ID.lunette || n.id === BOITE_ID.fond,
    )
    logical.assets = logical.assets.filter(
      (a) => a.uri === './lunette.cadompart' || a.uri === './fond.cadompart',
    )
    const doc = CadomDocument.fromLogical(logical)
    const maille = await maillageDepuisAssemblage(doc)
    expect(maille).not.toBeNull()
    expect(maille!.indices.length).toBeGreaterThan(0)
    let yMax = -Infinity
    for (let i = 0; i < maille!.positions.length; i += 3) {
      yMax = Math.max(yMax, maille!.positions[i + 1]!)
    }
    // Lunette at y=8, height 1.2 → top ≈ 9.2
    expect(yMax).toBeGreaterThan(8)
  }, 180_000)

  it('storeShell.ouvrir assemblage remplit maillageAffiche', async () => {
    const logical = assemblageBoiteMilgauss()
    logical.nodes = logical.nodes.filter(
      (n) => n.id === BOITE_ID.root || n.id === BOITE_ID.lunette || n.id === BOITE_ID.fond,
    )
    logical.assets = logical.assets.filter(
      (a) => a.uri === './lunette.cadompart' || a.uri === './fond.cadompart',
    )
    storeShell.ouvrir(encode(logical))
    const debut = Date.now()
    while (storeShell.construction() && Date.now() - debut < 120_000) {
      await new Promise((r) => setTimeout(r, 100))
    }
    expect(storeShell.construction()).toBe(false)
    const maille = storeShell.maillageAffiche()
    expect(maille).not.toBeNull()
    expect(maille!.indices.length).toBeGreaterThan(0)
  }, 120_000)
})

