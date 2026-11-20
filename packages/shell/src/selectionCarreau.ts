/**
 * P5 / sprint 62 — pick d’un carreau tessellé (Maillage.faces[]) par rayon.
 */
import type { Maillage } from '@opencad/api-parametrique'
import type { FaceSupport, RegistreFaces } from './occt/registreFaces.ts'
import type { Rayon3 } from './selectionFace.ts'

export type HitCarreau = { faceId: number; t: number }

export type CarreauxNommes = {
  supports: RegistreFaces
  /** Index tessellate → `face.dessus` / `face.dessous` / `face.<n>`. */
  noms: Map<number, string>
}

const EPS = 1e-9
const ALIAS_Y = 0.85

function sommet(
  positions: ArrayLike<number>,
  rang: number,
): [number, number, number] {
  const i = rang * 3
  return [positions[i]!, positions[i + 1]!, positions[i + 2]!]
}

/** Intersection rayon → triangle (Möller–Trumbore). `t` ≥ 0 ou null. */
export function rayonCoupeTriangle(
  rayon: Rayon3,
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  c: readonly [number, number, number],
): number | null {
  const [ox, oy, oz] = rayon.origine
  const [dx, dy, dz] = rayon.direction
  const e1x = b[0] - a[0]
  const e1y = b[1] - a[1]
  const e1z = b[2] - a[2]
  const e2x = c[0] - a[0]
  const e2y = c[1] - a[1]
  const e2z = c[2] - a[2]
  const px = dy * e2z - dz * e2y
  const py = dz * e2x - dx * e2z
  const pz = dx * e2y - dy * e2x
  const det = e1x * px + e1y * py + e1z * pz
  if (Math.abs(det) < EPS) return null
  const inv = 1 / det
  const tx = ox - a[0]
  const ty = oy - a[1]
  const tz = oz - a[2]
  const u = (tx * px + ty * py + tz * pz) * inv
  if (u < 0 || u > 1) return null
  const qx = ty * e1z - tz * e1y
  const qy = tz * e1x - tx * e1z
  const qz = tx * e1y - ty * e1x
  const v = (dx * qx + dy * qy + dz * qz) * inv
  if (v < 0 || u + v > 1) return null
  const t = (e2x * qx + e2y * qy + e2z * qz) * inv
  if (t < 0) return null
  return t
}

/** Premier carreau touché le long du rayon (même unité que le maillage). */
export function carreauSousPointeur(maillage: Maillage, rayon: Rayon3): HitCarreau | null {
  const { positions, indices, faces } = maillage
  if (!faces || faces.length === 0 || indices.length < 3) return null
  let meilleur: HitCarreau | null = null
  const nTri = Math.min(faces.length, Math.floor(indices.length / 3))
  for (let t = 0; t < nTri; t++) {
    const i = t * 3
    const a = sommet(positions, indices[i]!)
    const b = sommet(positions, indices[i + 1]!)
    const c = sommet(positions, indices[i + 2]!)
    const dist = rayonCoupeTriangle(rayon, a, b, c)
    if (dist === null) continue
    if (!meilleur || dist < meilleur.t) meilleur = { faceId: faces[t]!, t: dist }
  }
  return meilleur
}

function normaleTriangle(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  c: readonly [number, number, number],
): [number, number, number] {
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

type AccCarreau = {
  id: number
  sx: number
  sy: number
  sz: number
  nx: number
  ny: number
  nz: number
  n: number
}

/** Registre `face.<n>` + alias Y ; table d’index → nom Session. */
export function supportsCarreaux(maillage: Maillage): CarreauxNommes {
  const { positions, indices, faces } = maillage
  const map = new Map<number, AccCarreau>()
  const vide: CarreauxNommes = { supports: new Map(), noms: new Map() }
  if (!faces || faces.length === 0) return vide
  const nTri = Math.min(faces.length, Math.floor(indices.length / 3))
  for (let t = 0; t < nTri; t++) {
    const i = t * 3
    const a = sommet(positions, indices[i]!)
    const b = sommet(positions, indices[i + 1]!)
    const c = sommet(positions, indices[i + 2]!)
    const n = normaleTriangle(a, b, c)
    const faceId = faces[t]!
    const acc = map.get(faceId)
    const cx = (a[0] + b[0] + c[0]) / 3
    const cy = (a[1] + b[1] + c[1]) / 3
    const cz = (a[2] + b[2] + c[2]) / 3
    if (acc) {
      acc.sx += cx
      acc.sy += cy
      acc.sz += cz
      acc.nx += n[0]
      acc.ny += n[1]
      acc.nz += n[2]
      acc.n += 1
    } else {
      map.set(faceId, {
        id: faceId,
        sx: cx,
        sy: cy,
        sz: cz,
        nx: n[0],
        ny: n[1],
        nz: n[2],
        n: 1,
      })
    }
  }

  const supports: RegistreFaces = new Map()
  const noms = new Map<number, string>()
  type Candidat = { id: number; y: number; support: FaceSupport }
  let dessus: Candidat | null = null
  let dessous: Candidat | null = null

  for (const acc of map.values()) {
    const inv = 1 / acc.n
    const nx = acc.nx * inv
    const ny = acc.ny * inv
    const nz = acc.nz * inv
    const len = Math.hypot(nx, ny, nz) || 1
    const normal: [number, number, number] = [nx / len, ny / len, nz / len]
    const origin: [number, number, number] = [acc.sx * inv, acc.sy * inv, acc.sz * inv]
    const brut = `face.${acc.id}`
    const support: FaceSupport = { id: brut, origin, normal }
    supports.set(brut, support)
    noms.set(acc.id, brut)
    if (normal[1] > ALIAS_Y && (!dessus || origin[1] > dessus.y)) {
      dessus = { id: acc.id, y: origin[1], support }
    }
    if (normal[1] < -ALIAS_Y && (!dessous || origin[1] < dessous.y)) {
      dessous = { id: acc.id, y: origin[1], support }
    }
  }

  if (dessus) {
    supports.set('face.dessus', { ...dessus.support, id: 'face.dessus' })
    noms.set(dessus.id, 'face.dessus')
  }
  if (dessous) {
    supports.set('face.dessous', { ...dessous.support, id: 'face.dessous' })
    noms.set(dessous.id, 'face.dessous')
  }

  return { supports, noms }
}

export function nomCarreau(faceId: number, noms: Map<number, string>): string {
  return noms.get(faceId) ?? `face.${faceId}`
}
