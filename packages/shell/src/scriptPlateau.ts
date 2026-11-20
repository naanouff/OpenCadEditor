import { COTE_PLATEAU } from './cotesPlateau.ts'

/** Plaque rectangulaire, centrée, extrudée vers +Y. */
export const SCRIPT_PLATEAU = `
piece plateau
param longueur ${COTE_PLATEAU.longueur}
param largeur ${COTE_PLATEAU.largeur}
param epaisseur ${COTE_PLATEAU.epaisseur}

esquisse plan.dessus
rectangle
cote longueur longueur
cote largeur largeur
extrude epaisseur
`.trim()
