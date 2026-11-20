import { describe, expect, it } from 'vitest'
import { CadomDocument, decode, encode, planLateLoad } from '@opencad/cadom'
import { assemblagePlateau, PLATEAU_ID } from '../src/assemblagePlateau.ts'
import { maillageDepuisAssemblage } from '../src/assemblageMaillage.ts'
import { COTE_PLATEAU, yPointeVis } from '../src/cotesPlateau.ts'

describe('assemblage plateau de service', () => {
  it('partage un asset poignée et un asset vis', () => {
    const logical = assemblagePlateau()
    const back = decode(encode(logical))
    expect(back.assets.map((a) => a.uri).sort()).toEqual(
      ['./plateau.cadompart', './poignee.cadompart', './vis.cadompart'].sort(),
    )
    const doc = CadomDocument.fromLogical(back)
    expect(doc.getChildren(PLATEAU_ID.root)).toHaveLength(7)
    const poignees = [PLATEAU_ID.poigneeG, PLATEAU_ID.poigneeD].map(
      (id) => doc.nodes.get(id)!.assetBindings[0]!.assetId,
    )
    expect(poignees[0]).toBe(PLATEAU_ID.assetPoignee)
    expect(new Set(poignees).size).toBe(1)
    const vis = PLATEAU_ID.vis.map((id) => doc.nodes.get(id)!.assetBindings[0]!.assetId)
    expect(new Set(vis)).toEqual(new Set([PLATEAU_ID.assetVis]))
    const plan = planLateLoad(doc)
    expect(plan.assets).toHaveLength(3)
    expect(plan.assets.every((a) => a.role === 'parametric')).toBe(true)
  })

  it('pose les poignées sur le plateau et les vis sous la tête', () => {
    const doc = CadomDocument.fromLogical(assemblagePlateau())
    const gauche = doc.getWorldMatrix(PLATEAU_ID.poigneeG)
    expect(gauche[12]).toBeCloseTo(-COTE_PLATEAU.poseX)
    expect(gauche[13]).toBeCloseTo(COTE_PLATEAU.epaisseur)
    const vis = doc.getWorldMatrix(PLATEAU_ID.vis[0]!)
    expect(vis[12]).toBeCloseTo(-COTE_PLATEAU.poseX - COTE_PLATEAU.entraxeVis / 2)
    expect(vis[13]).toBeCloseTo(yPointeVis())
    expect(yPointeVis() + COTE_PLATEAU.sousTeteVis).toBeCloseTo(
      COTE_PLATEAU.epaisseur + COTE_PLATEAU.poigneeHauteur,
    )
  })

  it('maille le plateau et une poignée', async () => {
    const logical = assemblagePlateau()
    logical.nodes = logical.nodes.filter(
      (n) => n.id === PLATEAU_ID.root || n.id === PLATEAU_ID.plateau || n.id === PLATEAU_ID.poigneeD,
    )
    logical.assets = logical.assets.filter((a) => a.uri !== './vis.cadompart')
    const maille = await maillageDepuisAssemblage(CadomDocument.fromLogical(logical))
    expect(maille).not.toBeNull()
    let yMax = -Infinity
    let xMax = -Infinity
    for (let i = 0; i < maille!.positions.length; i += 3) {
      yMax = Math.max(yMax, maille!.positions[i + 1]!)
      xMax = Math.max(xMax, maille!.positions[i]!)
    }
    expect(yMax).toBeGreaterThan(COTE_PLATEAU.epaisseur)
    expect(xMax).toBeGreaterThan(COTE_PLATEAU.poseX)
  }, 180_000)
})
