import { describe, expect, it } from 'vitest'
import type { EntiteEsquisse } from '@opencad/api-parametrique'
import { polylinesDepuisEsquisse } from '../src/occt/esquissePolylines.ts'

describe('esquisse → polylines', () => {
  it('ferme un rectangle plan.dessus en XZ', () => {
    const entites: EntiteEsquisse[] = [
      { id: 'r1', sorte: 'rectangle', degres: 0, largeur: '10', longueur: '20' },
    ]
    const polys = polylinesDepuisEsquisse({ support: 'plan.dessus', entites }, new Map())
    expect(polys).toHaveLength(1)
    const p = polys[0]!
    expect(p.length).toBe(15)
    expect(p[0]).toBeCloseTo(-10)
    expect(p[1]).toBeCloseTo(0)
    expect(p[2]).toBeCloseTo(-5)
    expect(p[p.length - 3]).toBeCloseTo(p[0]!)
    expect(p[p.length - 2]).toBeCloseTo(p[1]!)
    expect(p[p.length - 1]).toBeCloseTo(p[2]!)
  })

  it('échantillonne un cercle plan.dessus', () => {
    const entites: EntiteEsquisse[] = [
      { id: 'c1', sorte: 'cercle', degres: 0, diametre: '8' },
    ]
    const polys = polylinesDepuisEsquisse({ support: 'plan.dessus', entites }, new Map(), {
      segmentsCercle: 8,
    })
    expect(polys).toHaveLength(1)
    const p = polys[0]!
    expect(p.length).toBe(9 * 3)
    const r = Math.hypot(p[0]!, p[2]!)
    expect(r).toBeCloseTo(4, 5)
  })

  it('enchaîne les segments rayon/hauteur en plan.12h', () => {
    const entites: EntiteEsquisse[] = [
      { id: 's0', sorte: 'segment', degres: 0, rayon: '0', hauteur: '0' },
      { id: 's1', sorte: 'segment', degres: 0, rayon: '2', hauteur: '5' },
      { id: 's2', sorte: 'segment', degres: 0, rayon: '0', hauteur: '5' },
    ]
    const polys = polylinesDepuisEsquisse({ support: 'plan.12h', entites }, new Map())
    expect(polys).toHaveLength(1)
    const p = polys[0]!
    expect(p.slice(0, 9)).toEqual([0, 0, 0, 2, 5, 0, 0, 5, 0])
    expect(p.slice(-3)).toEqual([0, 0, 0])
  })
})
