import { describe, expect, it } from 'vitest'
import type { Frontiere } from '@opencad/api-parametrique'
import { documentCad } from '../src/documentCad.ts'
import { coteDiametre, coteSegment, grille, pasGrille, poseGlyphe, repere } from '../src/dessin.ts'
import { jeuEntree } from '../src/entree.ts'

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
    expect(dessus.axeV).toEqual([0, 0, -1])
    expect(trois.axeU).toEqual([0, 1, 0])
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
    expect(avec.brepWireframe.segmentCount).toBe(0)
    expect(avec.grille.position.array[1]).toBeCloseTo(-0.00015)
    expect(avec.maillage.indices).toEqual([])
    expect(sans.maillage.indices.length).toBeGreaterThan(0)
  })

  it('trace le diamètre et place l’ancre hors du cercle, sans toucher au solide', () => {
    const { trait, ancre } = coteDiametre('plan.dessus', 20, 0)
    expect(Math.hypot(trait[0], trait[2])).toBeCloseTo(20)
    expect(Math.hypot(trait[3], trait[5])).toBeCloseTo(20)
    expect(Math.hypot(trait[3] - trait[0], trait[5] - trait[2])).toBeCloseTo(40)
    expect(Math.hypot(ancre[0], ancre[2])).toBeGreaterThan(20)
    const esquisse = { support: 'plan.dessus', cercles: [{ rayon: 20, y: 0, valeur: 40 }] }
    const sans = documentCad(anneau)
    const avec = documentCad(anneau, esquisse)
    expect(avec.cotes.segmentCount).toBe(5)
    expect(avec.maillage.indices).toEqual([])
    expect(sans.brepWireframe.segmentCount).toBeGreaterThan(0)
  })

  it('pose le glyphe hors du cercle, dans le plan, avec le diamètre', () => {
    const pose = poseGlyphe('plan.dessus', 20, 0, 40)
    expect(pose.texte).toBe('Ø 40')
    expect(pose.normale[1]).toBe(1)
    expect(Math.hypot(pose.origine[0], pose.origine[2])).toBeGreaterThan(0.02)
  })

  it('décale le second diamètre de 30° pour qu’il ne se confonde pas avec le premier', () => {
    const premier = coteDiametre('plan.dessus', 20, 0, 0)
    const second = coteDiametre('plan.dessus', 15, 0, 1)
    const direction = (trait: number[]) => [trait[3] - trait[0], trait[5] - trait[2]]
    const a = direction(premier.trait)
    const b = direction(second.trait)
    const cosinus = (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(a[0], a[1]) * Math.hypot(b[0], b[1]))
    expect(cosinus).toBeCloseTo(Math.cos(Math.PI / 6))
    expect(Math.hypot(second.trait[0], second.trait[2])).toBeCloseTo(15)
  })

  it('décale la cote linéaire hors du trait, dans le plan', () => {
    const { trait, ancre } = coteSegment('plan.12h', [0, 0], [0, 5], 4)
    expect(trait[0]).toBeCloseTo(0)
    expect(trait[1]).toBeCloseTo(0)
    expect(trait[3]).toBeCloseTo(-4)
    expect(trait[4]).toBeCloseTo(0)
    expect(ancre[0]).toBeCloseTo(-5.5)
    expect(ancre[1]).toBeCloseTo(2.5)
    expect(ancre[2]).toBeCloseTo(0)
  })

  it('retire la rotation en esquisse et la rend au solide', () => {
    const esquisse = jeuEntree('esquisse')
    const solide = jeuEntree('solide')
    expect(esquisse.rotation).toEqual([])
    expect(esquisse.panoramique).toContain(0)
    expect(solide.rotation).toContain(2)
  })
})
