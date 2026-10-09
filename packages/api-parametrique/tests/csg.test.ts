import { describe, expect, it } from 'vitest'
import { difference, union, volume } from '../src/csg.ts'
import { boite, cylindre, tube } from '../src/volumes.ts'

const SEGMENTS = 24

describe('booléen', () => {
  it('unit deux cubes qui se recouvrent : somme moins intersection', () => {
    const a = boite({ xmin: 0, xmax: 2, ymin: 0, ymax: 2, zmin: 0, zmax: 2 })
    const b = boite({ xmin: 1, xmax: 3, ymin: 0, ymax: 2, zmin: 0, zmax: 2 })
    expect(volume(a)).toBeCloseTo(8, 6)
    expect(volume(union(a, b))).toBeCloseTo(8 + 8 - 4, 4)
  })

  it('retire d’un cube le volume du cylindre central', () => {
    const cube = boite({ xmin: -5, xmax: 5, ymin: -5, ymax: 5, zmin: -5, zmax: 5 })
    const percage = cylindre({ axe: 'y', rayon: 2, debut: -6, fin: 6, a: 0, b: 0, segments: SEGMENTS })
    const attendu = 1000 - airePolygone(2, SEGMENTS) * 10
    expect(volume(difference(cube, percage))).toBeCloseTo(attendu, 0)
  })

  it('garde le volume quand les deux cubes ne se touchent que par un coin', () => {
    const a = boite({ xmin: 0, xmax: 2, ymin: 0, ymax: 2, zmin: 0, zmax: 2 })
    const b = boite({ xmin: 1, xmax: 3, ymin: 1, ymax: 3, zmin: 1, zmax: 3 })
    const resultat = union(a, b)
    expect(volume(resultat)).toBeCloseTo(8 + 8 - 1, 4)
    expect(trianglesPlats(resultat)).toBe(0)
  })

  it('ferme chaque primitive : arêtes appariées sur la boîte et le tube', () => {
    expect(aretesImpaires(boite({ xmin: 0, xmax: 1, ymin: 0, ymax: 1, zmin: 0, zmax: 1 }))).toBe(0)
    expect(aretesImpaires(tube({ rayonExt: 20, rayonInt: 17.5, bas: 0, haut: 8, segments: SEGMENTS }))).toBe(0)
  })

  it('unit deux cubes disjoints sans les découper', () => {
    const a = boite({ xmin: 0, xmax: 1, ymin: 0, ymax: 1, zmin: 0, zmax: 1 })
    const b = boite({ xmin: 3, xmax: 4, ymin: 0, ymax: 1, zmin: 0, zmax: 1 })
    const resultat = union(a, b)
    expect(resultat.indices.length / 3).toBe(24)
    expect(volume(resultat)).toBeCloseTo(2, 6)
  })

  it('unit deux cubes qui se touchent par une face', () => {
    const a = boite({ xmin: 0, xmax: 1, ymin: 0, ymax: 1, zmin: 0, zmax: 1 })
    const b = boite({ xmin: 1, xmax: 2, ymin: 0, ymax: 1, zmin: 0, zmax: 1 })
    const resultat = union(a, b)
    expect(volume(resultat)).toBeCloseTo(2, 4)
    expect(aretesImpaires(resultat)).toBe(0)
  })

  it('ferme un cylindre par ses deux couvercles', () => {
    const barreau = cylindre({ axe: 'x', rayon: 2, debut: 0, fin: 5, a: 0, b: 0, segments: SEGMENTS })
    expect(volume(barreau)).toBeCloseTo(airePolygone(2, SEGMENTS) * 5, 6)
    expect(aretesImpaires(barreau)).toBe(0)
  })
})

/** Triangles dégénérés : le BSP ne doit pas en laisser. */
function trianglesPlats({ positions, indices }: { positions: number[]; indices: number[] }) {
  const point = (i: number) => [positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]]
  let plats = 0
  for (let i = 0; i < indices.length; i += 3) {
    const [a, b, c] = [point(indices[i]), point(indices[i + 1]), point(indices[i + 2])]
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
    const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]]
    const normale = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
    if (Math.hypot(normale[0], normale[1], normale[2]) < 1e-9) plats += 1
  }
  return plats
}

/** Aire du polygone inscrit : le cylindre maillé est plus petit que le cercle. */
function airePolygone(rayon: number, segments: number) {
  return (segments * rayon * rayon * Math.sin((2 * Math.PI) / segments)) / 2
}

function aretesImpaires({ positions, indices }: { positions: number[]; indices: number[] }) {
  const cle = (i: number) => {
    const arrondi = (valeur: number) => Math.round(valeur * 1e6) / 1e6
    return `${arrondi(positions[i * 3])},${arrondi(positions[i * 3 + 1])},${arrondi(positions[i * 3 + 2])}`
  }
  const compte = new Map<string, number>()
  for (let i = 0; i < indices.length; i += 3) {
    for (const [a, b] of [
      [0, 1],
      [1, 2],
      [2, 0],
    ]) {
      const premier = cle(indices[i + a])
      const second = cle(indices[i + b])
      const arete = premier < second ? `${premier}|${second}` : `${second}|${premier}`
      compte.set(arete, (compte.get(arete) ?? 0) + 1)
    }
  }
  let impaires = 0
  for (const nombre of compte.values()) if (nombre % 2 !== 0) impaires += 1
  return impaires
}
