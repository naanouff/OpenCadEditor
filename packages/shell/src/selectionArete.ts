/**
 * P4 / sprint 59 — une arête nommée sous le rayon, par son milieu.
 * Le kernel v0.2.0 ne donne que le milieu (`list_edges`), pas la courbe.
 */
import type { AreteNommee } from './occt/aretesOcct.ts'
import type { Rayon3 } from './selectionFace.ts'

/** Distance max (mm) entre le rayon et le milieu pour retenir le nom. */
export const SEUIL_ARETE_MM = 3

function distanceRayonPoint(rayon: Rayon3, point: readonly [number, number, number]): number {
  const len = Math.hypot(rayon.direction[0], rayon.direction[1], rayon.direction[2]) || 1
  const ux = rayon.direction[0] / len
  const uy = rayon.direction[1] / len
  const uz = rayon.direction[2] / len
  const vx = point[0] - rayon.origine[0]
  const vy = point[1] - rayon.origine[1]
  const vz = point[2] - rayon.origine[2]
  const t = vx * ux + vy * uy + vz * uz
  if (t < 0) return Infinity
  return Math.hypot(point[0] - (rayon.origine[0] + ux * t), point[1] - (rayon.origine[1] + uy * t), point[2] - (rayon.origine[2] + uz * t))
}

/** Nom de la classe dont un milieu est le plus près du rayon, dans le seuil. */
export function areteSousPointeur(
  aretes: readonly AreteNommee[],
  rayon: Rayon3,
  seuil: number,
): string | null {
  let meilleur: { id: string; distance: number } | null = null
  for (const arete of aretes) {
    for (const milieu of arete.milieux) {
      const distance = distanceRayonPoint(rayon, milieu)
      if (distance > seuil) continue
      if (!meilleur || distance < meilleur.distance) meilleur = { id: arete.id, distance }
    }
  }
  return meilleur?.id ?? null
}
