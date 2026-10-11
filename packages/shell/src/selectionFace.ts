/**
 * P4 / sprint 56 — sélection d’une face planaire nommée par rayon (clic viewport).
 */
import type { FaceSupport } from './occt/registreFaces.ts'
import { faceDepuisBornesY } from './occt/registreFaces.ts'

export type Rayon3 = {
  origine: readonly [number, number, number]
  direction: readonly [number, number, number]
}

/** Intersection rayon → plan (origine + normale). `t` le long du rayon ; null si parallèle. */
export function rayonCoupePlan(
  rayon: Rayon3,
  plan: { origin: readonly [number, number, number]; normal: readonly [number, number, number] },
): number | null {
  const dx = rayon.direction[0]
  const dy = rayon.direction[1]
  const dz = rayon.direction[2]
  const nx = plan.normal[0]
  const ny = plan.normal[1]
  const nz = plan.normal[2]
  const denom = nx * dx + ny * dy + nz * dz
  if (Math.abs(denom) < 1e-12) return null
  const t =
    (nx * (plan.origin[0] - rayon.origine[0]) +
      ny * (plan.origin[1] - rayon.origine[1]) +
      nz * (plan.origin[2] - rayon.origine[2])) /
    denom
  if (t < 0) return null
  return t
}

/** Face la plus proche le long du rayon (premier hit). */
export function faceSousPointeur(
  faces: Iterable<FaceSupport>,
  rayon: Rayon3,
): string | null {
  let meilleur: { id: string; t: number } | null = null
  for (const face of faces) {
    const t = rayonCoupePlan(rayon, face)
    if (t === null) continue
    if (!meilleur || t < meilleur.t) meilleur = { id: face.id, t }
  }
  return meilleur?.id ?? null
}

/** `face.dessus` / `face.dessous` depuis les bornes Y d’un maillage. */
export function facesDepuisMaillage(positions: ArrayLike<number>): FaceSupport[] {
  if (positions.length < 3) return []
  let yMin = Infinity
  let yMax = -Infinity
  for (let i = 1; i < positions.length; i += 3) {
    const y = positions[i]!
    if (y < yMin) yMin = y
    if (y > yMax) yMax = y
  }
  if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) return []
  return [...faceDepuisBornesY(yMin, yMax).values()]
}

/**
 * Rayon orthographique depuis NDC (x,y ∈ [-1,1]), caméra eye → target, up monde.
 * `demiHauteur` = half-extent vertical (mètres, comme OrbitalCameraController).
 */
export function rayonOrthoDepuisNdc(
  ndcX: number,
  ndcY: number,
  eye: readonly [number, number, number],
  target: readonly [number, number, number],
  up: readonly [number, number, number],
  demiHauteur: number,
  aspect: number,
): Rayon3 {
  const fx = target[0] - eye[0]
  const fy = target[1] - eye[1]
  const fz = target[2] - eye[2]
  const flen = Math.hypot(fx, fy, fz) || 1
  const forward: [number, number, number] = [fx / flen, fy / flen, fz / flen]
  const rx = forward[1] * up[2] - forward[2] * up[1]
  const ry = forward[2] * up[0] - forward[0] * up[2]
  const rz = forward[0] * up[1] - forward[1] * up[0]
  const rlen = Math.hypot(rx, ry, rz) || 1
  const right: [number, number, number] = [rx / rlen, ry / rlen, rz / rlen]
  const ux = right[1] * forward[2] - right[2] * forward[1]
  const uy = right[2] * forward[0] - right[0] * forward[2]
  const uz = right[0] * forward[1] - right[1] * forward[0]
  const demiLargeur = demiHauteur * aspect
  return {
    origine: [
      eye[0] + right[0] * ndcX * demiLargeur + ux * ndcY * demiHauteur,
      eye[1] + right[1] * ndcX * demiLargeur + uy * ndcY * demiHauteur,
      eye[2] + right[2] * ndcX * demiLargeur + uz * ndcY * demiHauteur,
    ],
    direction: forward,
  }
}
