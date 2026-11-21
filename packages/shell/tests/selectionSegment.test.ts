import { describe, expect, it } from 'vitest'
import type { Maillage } from '@opencad/api-parametrique'
import {
  areteBrepSousPointeur,
  aretesBrepGroupees,
  classeKernelDe,
  distanceRayonSegment,
  segmentsBrep,
  SEUIL_SEGMENT_MM,
} from '../src/selectionSegment.ts'

/** Boîte ouverte : dessus (0), dessous (1), +X (2). */
function boite(): Maillage {
  const positions = [
    -5, 8, -5, 5, 8, -5, 5, 8, 5, -5, 8, 5,
    -5, 0, -5, 5, 0, -5, 5, 0, 5, -5, 0, 5,
    5, 0, -5, 5, 8, -5, 5, 8, 5, 5, 0, 5,
  ]
  const indices = [0, 2, 1, 0, 3, 2, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11]
  return { positions, indices, faces: [0, 0, 1, 1, 2, 2] }
}

/** Dessus et flanc +X découpés en deux carreaux chacun, l’arête commune en deux segments. */
function areteEnDeuxSegments(): Maillage {
  const positions = [
    // dessus y=8, x ∈ [-5,5], z ∈ [-5,5], sommet milieu (5,8,0)
    -5, 8, -5, 5, 8, -5, 5, 8, 0, 5, 8, 5, -5, 8, 5,
    // flanc x=5
    5, 0, -5, 5, 8, -5, 5, 8, 0, 5, 8, 5, 5, 0, 5,
  ]
  const indices = [
    0, 2, 1, 0, 4, 2, 4, 3, 2,
    5, 6, 7, 5, 7, 9, 9, 7, 8,
  ]
  return { positions, indices, faces: [0, 0, 0, 1, 1, 1] }
}

/** Deux carreaux pliés de 10° le long de x=0, normales de sommet données par carreau. */
function pli(normaleCommune: boolean): Maillage {
  const s = Math.sin((10 * Math.PI) / 180)
  const c = Math.cos((10 * Math.PI) / 180)
  const positions = [
    -5, 0, 0, 0, 0, 0, 0, 0, 5,
    0, 0, 0, 5 * c, -5 * s, 0, 0, 0, 5,
  ]
  const gauche = [0, 1, 0]
  const droite = normaleCommune ? [0, 1, 0] : [s, c, 0]
  const normales = [...gauche, ...gauche, ...gauche, ...droite, ...droite, ...droite]
  return { positions, indices: [0, 2, 1, 3, 5, 4], faces: [0, 1], normales }
}

describe('arêtes BRep', () => {
  it('trace le bord d’un congé, même d’un seul segment', () => {
    // Les coutures sont fondues dans leur carreau par la tessellation : entre deux carreaux,
    // un raccord tangent est toujours le bord d’un congé.
    const communes = (m: Maillage) => aretesBrepGroupees(m).filter((a) => a.faces.length === 2)
    expect(communes(pli(true))).toHaveLength(1)
    expect(communes(pli(true))[0]!.segments[0]!.tangente).toBe(true)
    expect(communes(pli(false))).toHaveLength(1)
    const base = areteEnDeuxSegments()
    const normales: number[] = []
    for (let i = 0; i < base.positions.length; i += 3) normales.push(0, 1, 0)
    const conge = communes({ ...base, normales })
    expect(conge).toHaveLength(1)
    expect(conge[0]!.segments.length).toBeGreaterThan(1)
  })

  it('ignore la diagonale interne du carreau dessus', () => {
    const diagonale = segmentsBrep(boite()).find(
      (s) => Math.abs(s.a[0] - s.b[0]) > 9 && Math.abs(s.a[2] - s.b[2]) > 9,
    )
    expect(diagonale).toBeUndefined()
  })

  it('regroupe les segments d’une même frontière en une arête', () => {
    const communes = aretesBrepGroupees(areteEnDeuxSegments()).filter((a) => a.faces.length === 2)
    expect(communes).toHaveLength(1)
    expect(communes[0]!.segments).toHaveLength(2)
  })

  it('survole l’arête entière depuis un de ses segments', () => {
    const aretes = aretesBrepGroupees(areteEnDeuxSegments())
    const hit = areteBrepSousPointeur(aretes, { origine: [5, 20, 3], direction: [0, -1, 0] }, SEUIL_SEGMENT_MM)
    expect(hit?.faces).toEqual([0, 1])
    expect(hit?.segments).toHaveLength(2)
  })

  it('laisse passer un rayon au centre de la face', () => {
    const aretes = aretesBrepGroupees(boite())
    expect(areteBrepSousPointeur(aretes, { origine: [0, 20, 0], direction: [0, -1, 0] }, SEUIL_SEGMENT_MM)).toBeNull()
  })

  it('distance nulle sur le segment', () => {
    expect(distanceRayonSegment({ origine: [0, 20, -5], direction: [0, -1, 0] }, [-5, 8, -5], [5, 8, -5])).toBeCloseTo(0)
  })

  it('retrouve la classe kernel par le milieu list_edges', () => {
    const aretes = aretesBrepGroupees(areteEnDeuxSegments())
    const commune = aretes.find((a) => a.faces.length === 2)!
    const classes = [{ id: 'arete.haut', milieux: [[5, 8, 0]] as [number, number, number][] }]
    expect(classeKernelDe(commune, classes)).toBe('arete.haut')
  })
})
