import { describe, expect, it } from 'vitest'
import type { Maillage } from '@opencad/api-parametrique'
import { aretesBrepGroupees } from '../src/selectionSegment.ts'
import { avancer, decaler, metresParPixel, traitsDe, vueAChange, zoomAChange } from '../src/traitsArete.ts'

/** Dièdre : dessus +Y (face 0) et flanc +X (face 1), arête commune x = 1, y = 1. */
const diedre: Maillage = {
  positions: [0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
  normales: [],
  indices: [0, 2, 1, 0, 3, 2, 1, 2, 5, 1, 5, 4],
  faces: [0, 0, 1, 1],
}

describe('traits d’arête', () => {
  it('sort l’arête vive selon la bissectrice des deux faces', () => {
    const aretes = aretesBrepGroupees(diedre).filter((a) => a.faces.length === 2)
    expect(aretes).toHaveLength(1)
    const traits = traitsDe(aretes)
    const decale = decaler(traits, Math.SQRT2)
    for (let i = 0; i < decale.length; i += 3) {
      expect(decale[i]).toBeCloseTo(2)
      expect(decale[i + 1]).toBeCloseTo(2)
    }
  })

  it('convertit le zoom en taille de pixel et ignore les petites variations', () => {
    expect(metresParPixel(0.2, 400)).toBeCloseTo(0.001)
    expect(zoomAChange(0.001, 0.00102)).toBe(false)
    expect(zoomAChange(0.001, 0.0011)).toBe(true)
  })

  it('avance le trait vers l’œil : sa projection à l’écran ne bouge pas', () => {
    const vue: [number, number, number] = [0, 0.6, 0.8]
    const avance = avancer([1, 2, 3, 4, 5, 6], vue, 0.5)
    expect(avance).toEqual([1, 2.3, 3.4, 4, 5.3, 6.4])
    // Projection orthographique : la composante le long de la vue est la seule qui change.
    const ecran = (p: number[]) => [p[0]!, p[1]! * 0.8 - p[2]! * 0.6]
    expect(ecran(avance.slice(0, 3))[1]).toBeCloseTo(ecran([1, 2, 3])[1]!)
  })

  it('reconstruit les rubans quand la vue tourne de plus de quelques degrés', () => {
    expect(vueAChange(null, [0, 0, 1])).toBe(true)
    expect(vueAChange([0, 0, 1], [0, Math.sin(0.02), Math.cos(0.02)])).toBe(false)
    expect(vueAChange([0, 0, 1], [0, Math.sin(0.2), Math.cos(0.2)])).toBe(true)
  })
})
