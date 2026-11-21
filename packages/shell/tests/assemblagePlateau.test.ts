import { describe, expect, it } from 'vitest'
import { CadomDocument, decode, encode, planLateLoad } from '@opencad/cadom'
import { assemblagePlateau, PLATEAU_ID } from '../src/assemblagePlateau.ts'
import type { MaillageOmbre } from '@opencad/api-parametrique'
import {
  maillageDepuisAssemblage,
  maillageDepuisParties,
  partiesAssemblage,
  SCRIPTS_ASSEMBLAGE,
} from '../src/assemblageMaillage.ts'
import { chargerKernel } from '../src/occt/chargerKernel.ts'
import { COTE_PLATEAU, xTrou, yDessusPoignee, yPointeVis } from '../src/cotesPlateau.ts'
import { VIS_M4_NOYEE } from '../src/scriptVis.ts'

describe('assemblage plateau de service', () => {
  it('partage un asset poignée et un asset vis', () => {
    const logical = assemblagePlateau()
    const back = decode(encode(logical))
    expect(back.assets.map((a) => a.uri).sort()).toEqual(
      [
        './plateau.cadompart',
        './poignee.cadompart',
        './vis.cadompart',
        './aluminium.cadomat',
        './laiton.cadomat',
        './acier.cadomat',
      ].sort(),
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
    expect(plan.assets.filter((a) => a.role === 'parametric')).toHaveLength(3)
    expect(plan.assets.filter((a) => a.role === 'material')).toHaveLength(3)
  })

  it('pose les poignées à plat sur le rebord, en D vers l’extérieur', () => {
    const doc = CadomDocument.fromLogical(assemblagePlateau())
    for (const [id, signe] of [
      [PLATEAU_ID.poigneeG, -1],
      [PLATEAU_ID.poigneeD, 1],
    ] as const) {
      const m = doc.getWorldMatrix(id)
      // Rotation propre : pas de miroir.
      const det =
        m[0]! * (m[5]! * m[10]! - m[6]! * m[9]!) -
        m[4]! * (m[1]! * m[10]! - m[2]! * m[9]!) +
        m[8]! * (m[1]! * m[6]! - m[2]! * m[5]!)
      expect(det).toBeCloseTo(1)
      // +Y local (saillie du D) sort du plateau ; +Z local (épaisseur) descend vers le rebord.
      expect(m[4]! * signe).toBeCloseTo(1)
      expect(m[9]).toBeCloseTo(-1)
      // Le dessous de la poignée (z local = hauteur) repose sur le dessus du rebord.
      expect(m[13]! + m[9]! * COTE_PLATEAU.hauteurPoignee).toBeCloseTo(COTE_PLATEAU.hauteur)
    }
  })

  it('met chaque vis dans l’axe de son trou, tête sous le dessus de la poignée', () => {
    const doc = CadomDocument.fromLogical(assemblagePlateau())
    const trous: [number, number][] = []
    for (const id of [PLATEAU_ID.poigneeG, PLATEAU_ID.poigneeD]) {
      const m = doc.getWorldMatrix(id)
      for (const u of [-1, 1].map((s) => (s * COTE_PLATEAU.entraxeVis) / 2)) {
        // Centre du trou en local : (u, 0, 0).
        trous.push([m[0]! * u + m[12]!, m[2]! * u + m[14]!])
        expect(m[1]! * u + m[13]!).toBeCloseTo(yDessusPoignee())
      }
    }
    const vis = PLATEAU_ID.vis.map((id) => doc.getWorldMatrix(id))
    for (const m of vis) {
      const proche = trous.find(([x, z]) => Math.abs(x - m[12]!) < 1e-9 && Math.abs(z - m[14]!) < 1e-9)
      expect(proche).toBeDefined()
      expect(m[13]! + VIS_M4_NOYEE.longueur).toBeCloseTo(yDessusPoignee() - COTE_PLATEAU.retraitTete)
    }
    expect(new Set(vis.map((m) => `${m[12]},${m[14]}`)).size).toBe(4)
    // Le trou est au milieu du rebord.
    for (const [x] of trous) expect(Math.abs(x)).toBeCloseTo(xTrou())
    expect(xTrou()).toBeCloseTo(COTE_PLATEAU.longueur / 2 - COTE_PLATEAU.rebord / 2)
  })

  it('loge la tête dans le lamage et la pointe dans le rebord', () => {
    const { diametreLamage, profondeurLamage, retraitTete, largeurBras, rebord, saillie, diametrePassage } =
      COTE_PLATEAU
    const hauteurTete = (VIS_M4_NOYEE.diametreTete - VIS_M4_NOYEE.diametre) / 2
    expect(VIS_M4_NOYEE.diametreTete).toBeLessThan(diametreLamage)
    expect(VIS_M4_NOYEE.diametre).toBeLessThan(diametrePassage)
    expect(hauteurTete).toBeLessThanOrEqual(profondeurLamage - retraitTete)
    // Paroi autour du lamage, dans le bout du bras.
    expect(largeurBras / 2 - diametreLamage / 2).toBeGreaterThan(2)
    // Le bras tient sur le rebord ; la main passe entre le bord du plateau et la barre.
    expect(largeurBras).toBeLessThanOrEqual(rebord)
    expect(saillie - largeurBras / 2 - rebord / 2).toBeGreaterThan(20)
    const pointe = yPointeVis()
    expect(pointe).toBeGreaterThan(COTE_PLATEAU.chanfreinDessous + 1)
    expect(pointe).toBeLessThan(COTE_PLATEAU.hauteur)
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
    let zMax = -Infinity
    for (let i = 0; i < maille!.positions.length; i += 3) {
      yMax = Math.max(yMax, maille!.positions[i + 1]!)
      xMax = Math.max(xMax, maille!.positions[i]!)
      zMax = Math.max(zMax, maille!.positions[i + 2]!)
    }
    expect(yMax).toBeCloseTo(yDessusPoignee(), 1)
    expect(xMax).toBeCloseTo(xTrou() + COTE_PLATEAU.saillie + COTE_PLATEAU.largeurBras / 2, 1)
    expect(zMax).toBeCloseTo(COTE_PLATEAU.largeur / 2, 3)
  }, 180_000)

  it('lie chaque définition à son matériau : alu, laiton, acier', () => {
    const doc = CadomDocument.fromLogical(decode(encode(assemblagePlateau())))
    const parScript = new Map(partiesAssemblage(doc).map((p) => [p.script, p.materiau?.name]))
    expect(parScript.get(SCRIPTS_ASSEMBLAGE['./plateau.cadompart']!)).toBe('aluminium')
    expect(parScript.get(SCRIPTS_ASSEMBLAGE['./poignee.cadompart']!)).toBe('laiton')
    expect(parScript.get(SCRIPTS_ASSEMBLAGE['./vis.cadompart']!)).toBe('acier')
    const materiaux = doc.nodes.get(PLATEAU_ID.poigneeG)!.assetBindings.filter((b) => b.role === 'material')
    expect(materiaux).toHaveLength(1)
  })

  it('calcule une seule fois la vis partagée par les quatre nœuds', async () => {
    const doc = CadomDocument.fromLogical(assemblagePlateau())
    const parties = partiesAssemblage(doc).filter((p) => p.script === SCRIPTS_ASSEMBLAGE['./vis.cadompart'])
    expect(parties).toHaveLength(4)
    const occt = await chargerKernel()
    const cache = new Map<string, MaillageOmbre>()
    const maille = maillageDepuisParties(occt, parties, cache)
    expect(cache.size).toBe(1)
    const une = [...cache.values()][0]!
    expect(maille!.indices.length).toBe(4 * une.indices.length)
  }, 180_000)
})
