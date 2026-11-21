import { COTE_PLATEAU } from './cotesPlateau.ts'

/** Plateau à rebord : plaque centrée, poche creusée jusqu’au fond, coins arrondis. */
export const SCRIPT_PLATEAU = `
piece plateau
param longueur ${COTE_PLATEAU.longueur}
param largeur ${COTE_PLATEAU.largeur}
param hauteur ${COTE_PLATEAU.hauteur}
param fond ${COTE_PLATEAU.fond}
param rebord ${COTE_PLATEAU.rebord}
param rayon_coin ${COTE_PLATEAU.rayonCoin}
param rayon_poche ${COTE_PLATEAU.rayonCoin - COTE_PLATEAU.rebord}
param conge_levre ${COTE_PLATEAU.congeLevre}
param conge_fond ${COTE_PLATEAU.congeFond}
param chanfrein_dessous ${COTE_PLATEAU.chanfreinDessous}

esquisse plan.dessus
rectangle
cote longueur longueur
cote largeur largeur
extrude hauteur

esquisse face.dessus
rectangle
cote longueur longueur - 2 * rebord
cote largeur largeur - 2 * rebord
enleve hauteur - fond

fillet rayon_coin arete.vertical
fillet rayon_poche arete.poche
fillet conge_levre arete.haut
fillet conge_fond arete.fond
chanfrein chanfrein_dessous arete.bas
`.trim()
