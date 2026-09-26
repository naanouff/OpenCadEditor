import type { SolveurEsquisse } from './types.ts'

/** Un cercle, un rectangle ou un profil segment/arc est fermé. Les degrés viennent des entités. */
export const solveurProvisoire: SolveurEsquisse = {
  etat(esquisse) {
    const degres = esquisse.entites.reduce((somme, entite) => somme + entite.degres, 0)
    const ferme = esquisse.entites.length > 0
    return { ferme, degres }
  },
}
