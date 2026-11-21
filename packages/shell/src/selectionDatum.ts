/**
 * Plans et axes d’origine : carrés et triad dessinés, pickables.
 */
import { datumParId, datumsOrigine, uvVersMonde } from '@opencad/api-parametrique'
import { rayonCoupePlan, type Rayon3 } from './selectionFace.ts'
import { distanceRayonSegment } from './selectionSegment.ts'

export const DEMI_DATUM_MM = 40

export type AxeId = 'axe.x' | 'axe.y' | 'axe.z'

const AXES: { id: AxeId; bout: readonly [number, number, number] }[] = [
  { id: 'axe.x', bout: [1, 0, 0] },
  { id: 'axe.y', bout: [0, 1, 0] },
  { id: 'axe.z', bout: [0, 0, 1] },
]

function vers(bout: readonly [number, number, number], demi: number): [number, number, number] {
  return [bout[0] * demi, bout[1] * demi, bout[2] * demi]
}

/** Contour du carré de datum, en millimètres. */
export function contourPlan(id: string, demi = DEMI_DATUM_MM): number[] {
  const datum = datumParId(id)
  if (!datum) return []
  const coins = [
    [-demi, -demi],
    [demi, -demi],
    [demi, demi],
    [-demi, demi],
  ].map(([u, v]) => uvVersMonde(datum, u, v))
  const traits: number[] = []
  for (let i = 0; i < coins.length; i++) {
    const a = coins[i]!
    const b = coins[(i + 1) % coins.length]!
    traits.push(a[0], a[1], a[2], b[0], b[1], b[2])
  }
  return traits
}

export function traitAxe(id: AxeId, demi = DEMI_DATUM_MM): number[] {
  const axe = AXES.find((a) => a.id === id)!
  const bout = vers(axe.bout, demi)
  return [0, 0, 0, bout[0], bout[1], bout[2]]
}

/** Plan d’origine sous le rayon, limité au carré. Le plus proche gagne. */
export function planSousPointeur(rayon: Rayon3, demi = DEMI_DATUM_MM): string | null {
  let meilleur: { id: string; t: number } | null = null
  for (const datum of datumsOrigine()) {
    const t = rayonCoupePlan(rayon, { origin: [0, 0, 0], normal: datum.normale })
    if (t === null) continue
    const p = [
      rayon.origine[0] + rayon.direction[0] * t,
      rayon.origine[1] + rayon.direction[1] * t,
      rayon.origine[2] + rayon.direction[2] * t,
    ]
    const u = p[0] * datum.axeU[0] + p[1] * datum.axeU[1] + p[2] * datum.axeU[2]
    const v = p[0] * datum.axeV[0] + p[1] * datum.axeV[1] + p[2] * datum.axeV[2]
    if (Math.abs(u) > demi || Math.abs(v) > demi) continue
    if (!meilleur || t < meilleur.t) meilleur = { id: datum.id, t }
  }
  return meilleur?.id ?? null
}

/** Axe d’origine sous le rayon. */
export function axeSousPointeur(rayon: Rayon3, seuil: number, demi = DEMI_DATUM_MM): AxeId | null {
  let meilleur: { id: AxeId; distance: number } | null = null
  for (const axe of AXES) {
    const bout = vers(axe.bout, demi)
    const distance = distanceRayonSegment(rayon, [0, 0, 0], bout)
    if (distance > seuil) continue
    if (!meilleur || distance < meilleur.distance) meilleur = { id: axe.id, distance }
  }
  return meilleur?.id ?? null
}
