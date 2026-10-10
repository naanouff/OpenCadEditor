import { solveurGcs } from './solveurGcs.ts'

/** Solveur d’esquisse : GCS v1 (rectangle, cercle, profil révolution). */
export const solveurProvisoire = solveurGcs
export { solveurGcs } from './solveurGcs.ts'
export type { Contrainte, EsquisseResolue, PointResolu, StatutContrainte } from './solveurGcs.ts'
