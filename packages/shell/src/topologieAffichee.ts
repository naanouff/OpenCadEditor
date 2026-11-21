/**
 * Topologie dérivée du maillage affiché, calculée une fois par maillage.
 */
import type { Maillage } from '@opencad/api-parametrique'
import { supportsCarreaux, type CarreauxNommes } from './selectionCarreau.ts'
import { aretesBrepGroupees, type AreteBrep } from './selectionSegment.ts'
import { traitsDe, type Traits } from './traitsArete.ts'

/** `fil` : toutes les arêtes, en mètres — ce qu’on voit est ce qu’on peut choisir. */
export type TopologieAffichee = CarreauxNommes & { aretes: AreteBrep[]; fil: Traits }

const cache = new WeakMap<Maillage, TopologieAffichee>()

export function topologieAffichee(maillage: Maillage): TopologieAffichee {
  const connue = cache.get(maillage)
  if (connue) return connue
  const aretes = aretesBrepGroupees(maillage)
  const topo = { ...supportsCarreaux(maillage), aretes, fil: traitsDe(aretes, 0.001) }
  cache.set(maillage, topo)
  return topo
}
