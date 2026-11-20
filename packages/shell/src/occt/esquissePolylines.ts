import {
  datumParId,
  evaluateurProvisoire,
  gcsVersMonde,
  solveurGcs,
  type EntiteEsquisse,
  type Esquisse,
} from '@opencad/api-parametrique'
import { resoudreViaKernel } from './gcsKernel.ts'
import { marquerCercle, type Polyline3 } from './opsDepuisFonction.ts'

export type { Polyline3 }

export type OptionsPolylines = {
  /** Altitude le long de la normale du datum (défaut 0). */
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

type Point3 = [number, number, number]

function cercleSurDatum(
  rayon: number,
  altitude: number,
  segments: number,
  support: string,
): Polyline3 {
  const datum = datumParId(support)
  // face.* : plan XZ à altitude Y (même convention que l’ancien cercleXz)
  const versMonde = (u: number, v: number): Point3 =>
    datum ? (gcsVersMonde(datum, u, v, altitude) as Point3) : [u, altitude, v]
  const xyz: number[] = []
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2
    xyz.push(...versMonde(Math.cos(a) * rayon, Math.sin(a) * rayon))
  }
  const centre = versMonde(0, 0)
  const bord = versMonde(rayon, 0)
  return marquerCercle(fermer(xyz), {
    centre,
    radial: [bord[0] - centre[0], bord[1] - centre[1], bord[2] - centre[2]],
  })
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
 * Résout l'esquisse (GCS) puis émet des polylignes 3D via les datums d’origine.
 * - `plan.12h` : profil révolution (rayon, hauteur) → XY
 * - datums / `face.*` : points GCS → monde
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

  const datum = datumParId(support)
  const faceTopo = support === 'face.dessus' || support === 'face.dessous'
  if (datum || faceTopo) {
    // O2-8 : rectangle / cercle / polygone → GCS `@opencad/kernel` ; sinon solveur local.
    const resolue = resoudreViaKernel(esquisse, parametres) ?? solveurGcs.resoudre(esquisse, parametres)
    if (resolue.statut === 'surcontraint') throw new Error('esquisse surcontrainte')
    if (resolue.statut === 'sous-contraint' || resolue.degres > 0) {
      throw new Error('esquisse sous-contrainte')
    }

    const pts = new Map(resolue.points.map((p) => [p.id, p]))
    const sortie: Polyline3[] = []

    for (const poly of resolue.polylines) {
      if (poly.points.length === 1) {
        const bord = pts.get(poly.points[0]!)
        const centreId = poly.points[0]!.replace(/\.p$/, '.o')
        const centre = pts.get(centreId)
        if (bord && centre) {
          const r = Math.hypot(bord.u - centre.u, bord.v - centre.v)
          sortie.push(cercleSurDatum(r, yPlan, segmentsCercle, support))
        }
        continue
      }
      const xyz: number[] = []
      for (const id of poly.points) {
        const p = pts.get(id)
        if (!p) throw new Error(`point inconnu ${id}`)
        if (datum) xyz.push(...gcsVersMonde(datum, p.u, p.v, yPlan))
        else xyz.push(p.u, yPlan, p.v)
      }
      sortie.push(fermer(xyz))
    }

    if (sortie.length > 0) return sortie
  }

  throw new Error(`esquisse non résolue (${support})`)
}
