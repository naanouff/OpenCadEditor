import { describe, expect, it } from 'vitest'
import { repereSurface } from '../src/dessin.ts'

const produit = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

describe('repère de surface', () => {
  it('donne une tangente et une bitangente unitaires, orthogonales à toute normale', () => {
    const normales = [
      [0, 1, 0],
      [0, -1, 0],
      [1, 0, 0],
      [0, 0, 1],
      [0, Math.cos(0.05), Math.sin(0.05)],
      [Math.SQRT1_2, 0, -Math.SQRT1_2],
      [0.6, 0.64, 0.48],
    ]
    for (const n of normales) {
      const { tangente, bitangente } = repereSurface(n as [number, number, number])
      expect(Math.hypot(...tangente)).toBeCloseTo(1, 9)
      expect(Math.hypot(...bitangente)).toBeCloseTo(1, 9)
      expect(produit(tangente, n)).toBeCloseTo(0, 9)
      expect(produit(bitangente, n)).toBeCloseTo(0, 9)
      expect(produit(tangente, bitangente)).toBeCloseTo(0, 9)
    }
  })
})
