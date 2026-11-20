import { describe, expect, it } from 'vitest'
import type { Maillage } from '@opencad/api-parametrique'
import { aretesBrepGroupees } from '../src/selectionSegment.ts'
import { decaler, metresParPixel, traitsDe, zoomAChange } from '../src/traitsArete.ts'

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
})
