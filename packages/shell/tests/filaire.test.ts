import { describe, expect, it } from 'vitest'
import type { Maillage } from '@opencad/api-parametrique'
import { filaire } from '../src/dessin.ts'

function maillageAuRayon(rayon: number): Maillage {
  return {
    positions: [rayon, 0, 0, 0, 0, 0],
    indices: [0, 1, 0],
  }
}

describe('filaire', () => {
  it('écarte le point extérieur quand le rayon grandit', () => {
    const petit = filaire(maillageAuRayon(20), 400, 300)
    const grand = filaire(maillageAuRayon(21), 400, 300)
    const ecart = (segments: number[][]) => Math.abs(segments[0][0] - segments[0][2])
    expect(ecart(grand)).toBeGreaterThan(ecart(petit))
  })
})
