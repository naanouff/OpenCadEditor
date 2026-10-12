/**
 * P4 — clic en esquisse : cercle (57) ou rectangle (58), centre GCS v1 = origine.
 * face.* → cercle (diamètre = 2·‖UV‖) ; plan.* → rectangle (L×l = 2|u| × 2|v|).
 */
import type { EsquissePosee } from '@opencad/api-parametrique'
import { repere } from './dessin.ts'
import type { FaceSupport } from './occt/registreFaces.ts'
import { rayonCoupePlan, type Rayon3 } from './selectionFace.ts'

/** Viewport / caméra en mètres ; Session et maillage hôte en millimètres. */
export const MM_PAR_METRE = 1000

export function rayonVersMm(rayon: Rayon3): Rayon3 {
  return {
    origine: [
      rayon.origine[0] * MM_PAR_METRE,
      rayon.origine[1] * MM_PAR_METRE,
      rayon.origine[2] * MM_PAR_METRE,
    ],
    direction: rayon.direction,
  }
}

export function facesVersMetres(faces: FaceSupport[]): FaceSupport[] {
  const k = 1 / MM_PAR_METRE
  return faces.map((f) => ({
    ...f,
    origin: [f.origin[0] * k, f.origin[1] * k, f.origin[2] * k] as const,
  }))
}

/** Plan d’esquisse à une altitude (mm) le long de la normale. */
export function planEsquisse(support: string, altitudeMm: number): FaceSupport {
  const { normale } = repere(support)
  return {
    id: support,
    origin: [
      normale[0] * altitudeMm,
      normale[1] * altitudeMm,
      normale[2] * altitudeMm,
    ],
    normal: [normale[0], normale[1], normale[2]],
  }
}

/** Point d’impact rayon (mm) → plan d’esquisse. */
export function pointSurPlan(rayonMm: Rayon3, support: string, altitudeMm: number): [number, number, number] | null {
  const t = rayonCoupePlan(rayonMm, planEsquisse(support, altitudeMm))
  if (t === null) return null
  return [
    rayonMm.origine[0] + rayonMm.direction[0] * t,
    rayonMm.origine[1] + rayonMm.direction[1] * t,
    rayonMm.origine[2] + rayonMm.direction[2] * t,
  ]
}

/** Coordonnées UV (mm) dans le repère d’esquisse. */
export function uvDepuisMonde(
  pointMm: readonly [number, number, number],
  support: string,
  altitudeMm: number,
): { u: number; v: number } {
  const { normale, axeU, axeV } = repere(support)
  const ox = normale[0] * altitudeMm
  const oy = normale[1] * altitudeMm
  const oz = normale[2] * altitudeMm
  const dx = pointMm[0] - ox
  const dy = pointMm[1] - oy
  const dz = pointMm[2] - oz
  return {
    u: dx * axeU[0] + dy * axeU[1] + dz * axeU[2],
    v: dx * axeV[0] + dy * axeV[1] + dz * axeV[2],
  }
}

/** Diamètre (mm) = 2·distance à l’origine UV, accroché au pas. */
export function diametreDepuisUv(u: number, v: number, pasMm = 1): number {
  const brut = 2 * Math.hypot(u, v)
  if (!Number.isFinite(brut) || brut < pasMm) return pasMm
  return Math.max(pasMm, Math.round(brut / pasMm) * pasMm)
}

/** Longueur (U) × largeur (V) en mm — rectangle centré, accroché au pas. */
export function dimensionsRectangleDepuisUv(
  u: number,
  v: number,
  pasMm = 1,
): { longueur: number; largeur: number } {
  const accrocher = (x: number) => Math.max(pasMm, Math.round((2 * Math.abs(x)) / pasMm) * pasMm)
  return { longueur: accrocher(u), largeur: accrocher(v) }
}

/** Outil implicite : face.* → cercle ; sinon rectangle (sauf esquisse déjà typée). */
export function outilEsquissePointeur(posee: EsquissePosee): 'cercle' | 'rectangle' {
  if (posee.cercles.length > 0) return 'cercle'
  if ((posee.traits?.length ?? 0) >= 8) return 'rectangle'
  if (posee.support.startsWith('face.')) return 'cercle'
  return 'rectangle'
}

/** Altitude Y du support face.* / plan.dessus (mm). */
export function altitudeSupport(support: string, yMaxMaillageMm: number): number {
  if (support === 'face.dessous') return 0
  if (support === 'face.dessus') return yMaxMaillageMm
  return 0
}
