import {
  evaluateurProvisoire,
  type EntiteEsquisse,
  type Esquisse,
} from '@opencad/api-parametrique'

/** Polyligne XYZ plate pour `make_wire_polyline` (dernier point = premier si fermée). */
export type Polyline3 = number[]

export type OptionsPolylines = {
  /** Hauteur Y du plan pour `plan.dessus` (défaut 0). */
  yPlan?: number
  segmentsCercle?: number
}

function fermer(xyz: number[]): Polyline3 {
  if (xyz.length < 9) return xyz
  const ax = xyz[0]!
  const ay = xyz[1]!
  const az = xyz[2]!
  const bx = xyz[xyz.length - 3]!
  const by = xyz[xyz.length - 2]!
  const bz = xyz[xyz.length - 1]!
  if (Math.hypot(ax - bx, ay - by, az - bz) > 1e-9) xyz.push(ax, ay, az)
  return xyz
}

function rectangleXz(longueur: number, largeur: number, y: number): Polyline3 {
  const lu = longueur / 2
  const lv = largeur / 2
  return fermer([-lu, y, -lv, lu, y, -lv, lu, y, lv, -lu, y, lv])
}

function cercleXz(rayon: number, y: number, segments: number): Polyline3 {
  const xyz: number[] = []
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2
    xyz.push(Math.cos(a) * rayon, y, Math.sin(a) * rayon)
  }
  return fermer(xyz)
}

function profilRevolution(entites: EntiteEsquisse[], evaluer: (e: string) => number): Polyline3 {
  const segments = entites.filter((e) => e.sorte === 'segment')
  if (segments.length < 2) throw new Error('profil révolution trop court')
  const xyz: number[] = []
  for (const s of segments) {
    if (s.rayon === undefined || s.hauteur === undefined) throw new Error('segment sans rayon/hauteur')
    xyz.push(evaluer(s.rayon), evaluer(s.hauteur), 0)
  }
  return fermer(xyz)
}

/**
 * Évalue les entités d'une esquisse en polylignes 3D (paramètres numériques, pas de GCS).
 * - `plan.dessus` : rectangles / cercles dans XZ
 * - `plan.12h` : chaîne de segments rayon/hauteur dans le plan XY (z = 0)
 */
export function polylinesDepuisEsquisse(
  esquisse: Esquisse,
  parametres: Map<string, string>,
  options?: OptionsPolylines,
): Polyline3[] {
  const evaluer = (expression: string) => evaluateurProvisoire.evaluer(expression, parametres)
  const yPlan = options?.yPlan ?? 0
  const segmentsCercle = options?.segmentsCercle ?? 48
  const { support, entites } = esquisse

  if (support === 'plan.12h') {
    const segments = entites.filter((e) => e.sorte === 'segment' && e.rayon !== undefined && e.hauteur !== undefined)
    if (segments.length >= 2) return [profilRevolution(entites, evaluer)]
  }

  if (support === 'plan.dessus' || support === 'plan.3h') {
    const sortie: Polyline3[] = []
    for (const entite of entites) {
      if (entite.sorte === 'rectangle' && entite.longueur && entite.largeur) {
        sortie.push(rectangleXz(evaluer(entite.longueur), evaluer(entite.largeur), yPlan))
      } else if (entite.sorte === 'cercle' && entite.diametre) {
        sortie.push(cercleXz(evaluer(entite.diametre) / 2, yPlan, segmentsCercle))
      }
    }
    if (sortie.length > 0) return sortie
  }

  throw new Error(`esquisse non résolue (${support})`)
}
