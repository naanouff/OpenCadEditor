/**
 * Couronne Milgauss — demi-profil tourné (tube + tête).
 * Tube aligné sur SCRIPT_CARRURE (diametre_tube 4, longueur_tube 2) ; tête élargie.
 * Hors sprint : cannelures, alésage tige.
 */
export const SCRIPT_COURONNE = `
piece couronne
param diametre_tube 4
param longueur_tube 2
param diametre_tete 7
param hauteur_tete 2

esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon diametre_tube / 2
cote hauteur 0
segment
cote rayon diametre_tube / 2
cote hauteur longueur_tube
segment
cote rayon diametre_tete / 2
cote hauteur longueur_tube
segment
cote rayon diametre_tete / 2
cote hauteur longueur_tube + hauteur_tete
segment
cote rayon 0
cote hauteur longueur_tube + hauteur_tete
revolution
`.trim()
