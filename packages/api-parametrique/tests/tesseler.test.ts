import { describe, expect, it } from 'vitest'
import { pasFleche, tesseler } from '../src/tesseler.ts'
import type { FaceExacte } from '../src/types.ts'

describe('pas de tessellation', () => {
  it('suit la flèche, pas un nombre de segments', () => {
    expect(pasFleche(20, 0.02)).toBeGreaterThan(pasFleche(20, 0.2))
    expect(pasFleche(0.75, 0.02)).toBeLessThan(pasFleche(20, 0.02))
  })

  it('tient la flèche demandée sur le rayon', () => {
    for (const rayon of [0.6, 2, 20]) {
      const pans = pasFleche(rayon, 0.02)
      const creux = rayon * (1 - Math.cos(Math.PI / pans))
      expect(creux).toBeLessThanOrEqual(0.02 + 1e-9)
    }
  })

  it('garde au moins trois pans', () => {
    expect(pasFleche(0.2, 5)).toBeGreaterThanOrEqual(3)
  })
})

describe('tessellation par face', () => {
  const paroi: FaceExacte = { sorte: 'cylindre', rayon: 20, bas: 0, haut: 8, dehors: 1 }
  const dessus: FaceExacte = { sorte: 'couronne', rayonExt: 20, rayonInt: 17.5, y: 8, dehors: 1 }

  it('affine la paroi quand la flèche se resserre', () => {
    const grossier = tesseler([paroi], 0.2)
    const fin = tesseler([paroi], 0.02)
    expect(fin.indices.length).toBeGreaterThan(grossier.indices.length)
  })

  it('pose la normale de la surface : radiale sur un cylindre', () => {
    const { positions, normales } = tesseler([paroi], 0.02)
    for (let i = 0; i < positions.length; i += 3) {
      const rayon = Math.hypot(positions[i], positions[i + 2])
      expect(rayon).toBeCloseTo(20, 1)
      const attendue = [positions[i] / rayon, 0, positions[i + 2] / rayon]
      expect(normales[i]).toBeCloseTo(attendue[0], 6)
      expect(normales[i + 1]).toBeCloseTo(0, 6)
      expect(normales[i + 2]).toBeCloseTo(attendue[2], 6)
    }
  })

  it('pose la normale constante d’un plan', () => {
    const { normales } = tesseler([dessus], 0.02)
    for (let i = 0; i < normales.length; i += 3) {
      expect(normales[i + 1]).toBeCloseTo(1, 6)
    }
  })

  it('reste dans la flèche : le rayon mesuré au milieu d’un pan', () => {
    const { positions, indices } = tesseler([paroi], 0.02)
    let creuxMax = 0
    for (let i = 0; i < indices.length; i += 3) {
      const point = (rang: number) => [positions[rang * 3], positions[rang * 3 + 2]]
      const [a, b] = [point(indices[i]), point(indices[i + 1])]
      const milieu = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
      creuxMax = Math.max(creuxMax, 20 - Math.hypot(milieu[0], milieu[1]))
    }
    expect(creuxMax).toBeLessThanOrEqual(0.02 + 1e-9)
  })
})
