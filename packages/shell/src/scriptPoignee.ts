import { COTE_PLATEAU } from './cotesPlateau.ts'

/** Barre laiton, centrée, posée ensuite sur le plateau par le graphe. */
export const SCRIPT_POIGNEE = `
piece poignee
param longueur ${COTE_PLATEAU.poigneeLongueur}
param largeur ${COTE_PLATEAU.poigneeLargeur}
param hauteur ${COTE_PLATEAU.poigneeHauteur}

esquisse plan.dessus
rectangle
cote longueur longueur
cote largeur largeur
extrude hauteur
`.trim()
