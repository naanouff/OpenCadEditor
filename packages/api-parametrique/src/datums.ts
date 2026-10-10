import { REPERE_REFERENCE, type Repere, type Vecteur } from './types.ts'

export type DatumPlan = {
  id: string
  libelle: string
  normale: Vecteur
  axeU: Vecteur
  axeV: Vecteur
}

function vec(a: Vecteur): Vecteur {
  return [a[0], a[1], a[2]]
}

function oppose(a: Vecteur): Vecteur {
  return [-a[0] || 0, -a[1] || 0, -a[2] || 0]
}

/**
 * Datums d’origine dérivés du repère document.
 * Convention d’affichage (dessin) : U × V = normale.
 * - plan.dessus : normale +Y, U +X, V −Z
 * - plan.12h : normale +Z, U +X, V +Y
 * - plan.3h : normale +X, U +Y, V +Z
 */
export function datumsOrigine(repere: Repere = REPERE_REFERENCE): DatumPlan[] {
  const x = vec(repere.x)
  const y = vec(repere.y)
  const z = vec(repere.z)
  return [
    { id: 'plan.dessus', libelle: 'Plan dessus', normale: y, axeU: x, axeV: oppose(z) },
    { id: 'plan.12h', libelle: 'Plan 12h', normale: z, axeU: x, axeV: y },
    { id: 'plan.3h', libelle: 'Plan 3h', normale: x, axeU: y, axeV: z },
  ]
}

export function datumParId(id: string, repere: Repere = REPERE_REFERENCE): DatumPlan | undefined {
  return datumsOrigine(repere).find((d) => d.id === id)
}

export function estDatumOrigine(id: string, repere: Repere = REPERE_REFERENCE): boolean {
  return datumParId(id, repere) !== undefined
}

/** Point monde = origine + normale·altitude + U·u + V·v (repère d’affichage). */
export function uvVersMonde(
  datum: DatumPlan,
  u: number,
  v: number,
  altitude = 0,
  origine: Vecteur = [0, 0, 0],
): Vecteur {
  const { normale, axeU, axeV } = datum
  return [
    origine[0] + normale[0] * altitude + axeU[0] * u + axeV[0] * v,
    origine[1] + normale[1] * altitude + axeU[1] * u + axeV[1] * v,
    origine[2] + normale[2] * altitude + axeU[2] * u + axeV[2] * v,
  ]
}

/**
 * GCS → monde pour wires OCCT.
 * Sur plan.dessus le solveur porte v vers +Z (12 h), alors que le datum d’affichage a V = −Z.
 */
export function gcsVersMonde(
  datum: DatumPlan,
  u: number,
  v: number,
  altitude = 0,
  origine: Vecteur = [0, 0, 0],
): Vecteur {
  const versZPlus = Math.abs(datum.normale[1]) > 0.9
  return uvVersMonde(datum, u, versZPlus ? -v : v, altitude, origine)
}
