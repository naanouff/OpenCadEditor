import { describe, expect, it } from 'vitest'
import type { Frontiere } from '@opencad/api-parametrique'
import { documentCad } from '../src/documentCad.ts'
import { grille, pasGrille, repere } from '../src/dessin.ts'

const anneau: Frontiere = {
  faces: [
    { sorte: 'cylindre', rayon: 20, bas: 0, haut: 8, dehors: 1 },
    { sorte: 'cylindre', rayon: 17.5, bas: 0, haut: 8, dehors: -1 },
    { sorte: 'couronne', rayonExt: 20, rayonInt: 17.5, y: 8, dehors: 1 },
    { sorte: 'couronne', rayonExt: 20, rayonInt: 17.5, y: 0, dehors: -1 },
  ],
}

describe('vue esquisse', () => {
  it('choisit un pas de 1 mm de près et de 10 mm de loin', () => {
    expect(pasGrille(20)).toBe(1)
    expect(pasGrille(400)).toBe(10)
  })

  it('pose plan.dessus à l’horizontale et plan.3h à la verticale', () => {
    const dessus = repere('plan.dessus')
    const trois = repere('plan.3h')
    expect(dessus.normale[1]).toBe(1)
    expect(trois.normale[1]).toBe(0)
    for (const plan of [dessus, trois]) {
      const scalaire = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
      expect(scalaire(plan.axeU, plan.normale)).toBeCloseTo(0)
      expect(scalaire(plan.axeV, plan.normale)).toBeCloseTo(0)
    }
  })

  it('aligne la grille sur le plan, au pas demandé, sans toucher au solide', () => {
    const traits = grille('plan.dessus', 10, 20, 8)
    const hauteurs = new Set<number>()
    for (let i = 1; i < traits.length; i += 3) hauteurs.add(traits[i])
    expect(hauteurs).toEqual(new Set([8]))
    const voisin = 12
    expect(Math.hypot(traits[voisin] - traits[0], traits[voisin + 2] - traits[2])).toBeCloseTo(10)
    const esquisse = { support: 'plan.dessus', cercles: [{ rayon: 20, y: 0 }] }
    const sans = documentCad(anneau)
    const avec = documentCad(anneau, esquisse)
    expect(avec.grille.segmentCount).toBeGreaterThan(0)
    expect(avec.esquisse.segmentCount).toBeGreaterThan(0)
    expect(avec.brepWireframe.segmentCount).toBe(sans.brepWireframe.segmentCount)
    expect(avec.grille.position.array[1]).toBeCloseTo(-0.00015)
    expect(avec.maillage.indices).toEqual(sans.maillage.indices)
  })
})
