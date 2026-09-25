import type { Maillage } from '@opencad/api-parametrique'
import type { Panneau } from '../types.ts'

export function panneauViewport(): Panneau {
  const maillages: Maillage[] = []
  return {
    id: 'viewport',
    maillages,
    recevoir(maillage) {
      maillages.push(maillage)
    },
    afficher() {
      const dernier = maillages.at(-1)
      return dernier ? String(dernier.positions.length) : ''
    },
  }
}
