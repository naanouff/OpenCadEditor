/**
 * Arêtes BRep : frontière entre deux carreaux, regroupée en arêtes entières
 * (un cercle tessellé reste une seule arête).
 */
import type { Maillage } from '@opencad/api-parametrique'
import type { Rayon3 } from './selectionFace.ts'

type Point = readonly [number, number, number]

export type SegmentBrep = {
  a: Point
  b: Point
  faces: readonly number[]
  /** Bissectrice unitaire des normales voisines : sens de sortie de la matière. */
  normale: Point
}

export type AreteBrep = {
  id: number
  faces: readonly number[]
  segments: readonly SegmentBrep[]
}

/** Distance max (mm) pour survoler ou choisir une arête du fil. */
export const SEUIL_SEGMENT_MM = 1.2

const COPLANAIRE = 0.999

const q = (v: number) => Math.round(v * 1e4) / 1e4
const clePoint = (p: Point) => `${q(p[0])},${q(p[1])},${q(p[2])}`

function normaleTriangle(
  positions: ArrayLike<number>,
  indices: ArrayLike<number>,
  triangle: number,
): [number, number, number] {
  const p = (k: number) => {
    const s = indices[triangle * 3 + k]! * 3
    return [positions[s]!, positions[s + 1]!, positions[s + 2]!] as const
  }
  const a = p(0)
  const b = p(1)
  const c = p(2)
  const abx = b[0] - a[0]
  const aby = b[1] - a[1]
  const abz = b[2] - a[2]
  const acx = c[0] - a[0]
  const acy = c[1] - a[1]
  const acz = c[2] - a[2]
  const nx = aby * acz - abz * acy
  const ny = abz * acx - abx * acz
  const nz = abx * acy - aby * acx
  const len = Math.hypot(nx, ny, nz) || 1
  return [nx / len, ny / len, nz / len]
}

/** Segments de frontière entre carreaux non coplanaires, ou de bord libre. */
export function segmentsBrep(maillage: Maillage): SegmentBrep[] {
  const { positions, indices, faces } = maillage
  if (!faces || faces.length === 0) return []
  type Acc = { a: Point; b: Point; faces: number[]; normales: [number, number, number][] }
  const map = new Map<string, Acc>()
  const nTri = Math.min(faces.length, Math.floor(indices.length / 3))
  for (let t = 0; t < nTri; t++) {
    const n = normaleTriangle(positions, indices, t)
    const face = faces[t]!
    for (const [u, v] of [
      [0, 1],
      [1, 2],
      [2, 0],
    ] as const) {
      const ia = indices[t * 3 + u]! * 3
      const ib = indices[t * 3 + v]! * 3
      const a: Point = [positions[ia]!, positions[ia + 1]!, positions[ia + 2]!]
      const b: Point = [positions[ib]!, positions[ib + 1]!, positions[ib + 2]!]
      const ka = clePoint(a)
      const kb = clePoint(b)
      const nom = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`
      const acc = map.get(nom)
      if (acc) {
        acc.faces.push(face)
        acc.normales.push(n)
      } else map.set(nom, { a, b, faces: [face], normales: [n] })
    }
  }
  const segments: SegmentBrep[] = []
  for (const acc of map.values()) {
    const ids = [...new Set(acc.faces)].sort((x, y) => x - y)
    if (ids.length < 2) {
      if (acc.faces.length === 1) segments.push({ a: acc.a, b: acc.b, faces: ids, normale: bissectrice(acc.normales) })
      continue
    }
    const u = acc.normales[0]!
    const coplanaires = acc.normales.every((v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2] > COPLANAIRE)
    if (coplanaires) continue
    segments.push({ a: acc.a, b: acc.b, faces: ids, normale: bissectrice(acc.normales) })
  }
  return segments
}

function bissectrice(normales: readonly (readonly [number, number, number])[]): Point {
  let x = 0
  let y = 0
  let z = 0
  for (const n of normales) {
    x += n[0]
    y += n[1]
    z += n[2]
  }
  const len = Math.hypot(x, y, z)
  // Arête en lame (normales opposées) : pas de sens de sortie.
  return len < 1e-6 ? [0, 0, 0] : [x / len, y / len, z / len]
}

/** Regroupe les segments par paire de carreaux puis par connexité. */
export function aretesBrepGroupees(maillage: Maillage): AreteBrep[] {
  const parPaire = new Map<string, SegmentBrep[]>()
  for (const segment of segmentsBrep(maillage)) {
    const cle = segment.faces.join('|')
    const liste = parPaire.get(cle)
    if (liste) liste.push(segment)
    else parPaire.set(cle, [segment])
  }
  const aretes: AreteBrep[] = []
  for (const segments of parPaire.values()) {
    const parent = segments.map((_, i) => i)
    const racine = (i: number): number => (parent[i] === i ? i : (parent[i] = racine(parent[i]!)))
    const parExtremite = new Map<string, number>()
    segments.forEach((segment, i) => {
      for (const p of [segment.a, segment.b]) {
        const k = clePoint(p)
        const autre = parExtremite.get(k)
        if (autre === undefined) parExtremite.set(k, i)
        else parent[racine(i)] = racine(autre)
      }
    })
    const groupes = new Map<number, SegmentBrep[]>()
    segments.forEach((segment, i) => {
      const r = racine(i)
      const groupe = groupes.get(r)
      if (groupe) groupe.push(segment)
      else groupes.set(r, [segment])
    })
    for (const groupe of groupes.values()) {
      aretes.push({ id: aretes.length, faces: groupe[0]!.faces, segments: groupe })
    }
  }
  return aretes
}

/** Paires xyz de l’arête entière. */
export function polyligneArete(arete: AreteBrep): number[] {
  const traits: number[] = []
  for (const segment of arete.segments) traits.push(...segment.a, ...segment.b)
  return traits
}

/** Distance rayon → segment (unités du maillage). */
export function distanceRayonSegment(rayon: Rayon3, a: Point, b: Point): number {
  const [ox, oy, oz] = rayon.origine
  const [dx, dy, dz] = rayon.direction
  const abx = b[0] - a[0]
  const aby = b[1] - a[1]
  const abz = b[2] - a[2]
  const aox = a[0] - ox
  const aoy = a[1] - oy
  const aoz = a[2] - oz
  const dd = dx * dx + dy * dy + dz * dz || 1
  const bb = abx * abx + aby * aby + abz * abz || 1
  const db = dx * abx + dy * aby + dz * abz
  const da = dx * aox + dy * aoy + dz * aoz
  const ba = abx * aox + aby * aoy + abz * aoz
  const denom = dd * bb - db * db
  let u = Math.abs(denom) < 1e-8 ? 0 : (db * da - dd * ba) / denom
  u = Math.min(1, Math.max(0, u))
  const t = Math.max(0, (da + db * u) / dd)
  return Math.hypot(
    ox + dx * t - (a[0] + abx * u),
    oy + dy * t - (a[1] + aby * u),
    oz + dz * t - (a[2] + abz * u),
  )
}

/** Arête BRep la plus proche du rayon, sous le seuil. */
export function areteBrepSousPointeur(
  aretes: readonly AreteBrep[],
  rayon: Rayon3,
  seuil: number,
): AreteBrep | null {
  let meilleur: { arete: AreteBrep; distance: number } | null = null
  for (const arete of aretes) {
    for (const segment of arete.segments) {
      const distance = distanceRayonSegment(rayon, segment.a, segment.b)
      if (distance > seuil) continue
      if (!meilleur || distance < meilleur.distance) meilleur = { arete, distance }
    }
  }
  return meilleur?.arete ?? null
}

function distancePointSegment(p: Point, a: Point, b: Point): number {
  const abx = b[0] - a[0]
  const aby = b[1] - a[1]
  const abz = b[2] - a[2]
  const bb = abx * abx + aby * aby + abz * abz || 1
  const u = Math.min(1, Math.max(0, ((p[0] - a[0]) * abx + (p[1] - a[1]) * aby + (p[2] - a[2]) * abz) / bb))
  return Math.hypot(p[0] - (a[0] + abx * u), p[1] - (a[1] + aby * u), p[2] - (a[2] + abz * u))
}

/** Classe kernel (`arete.haut`…) dont un milieu `list_edges` repose sur cette arête. */
export function classeKernelDe<T extends { id: string; milieux: readonly Point[] }>(
  arete: AreteBrep,
  classes: readonly T[],
  tolerance = 0.05,
): T['id'] | null {
  for (const classe of classes) {
    for (const milieu of classe.milieux) {
      if (arete.segments.some((s) => distancePointSegment(milieu, s.a, s.b) <= tolerance)) return classe.id
    }
  }
  return null
}
