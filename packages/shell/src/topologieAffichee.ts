/**
 * Topologie dérivée du maillage affiché, calculée une fois par maillage.
 */
import type { Maillage } from '@opencad/api-parametrique'
import { supportsCarreaux, type CarreauxNommes } from './selectionCarreau.ts'
import { aretesBrepGroupees, type AreteBrep } from './selectionSegment.ts'

export type TopologieAffichee = CarreauxNommes & { aretes: AreteBrep[] }

const cache = new WeakMap<Maillage, TopologieAffichee>()

export function topologieAffichee(maillage: Maillage): TopologieAffichee {
  const connue = cache.get(maillage)
  if (connue) return connue
  const topo = { ...supportsCarreaux(maillage), aretes: aretesBrepGroupees(maillage) }
  cache.set(maillage, topo)
  return topo
}
