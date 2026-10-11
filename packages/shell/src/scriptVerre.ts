/**
 * Verre Milgauss — disque dans l’ouverture de la lunette (diametre_ouverture 30).
 * Épaisseur faible ; chant vert = tranche (hors rendu matériau).
 */
export const SCRIPT_VERRE = `
piece verre
param diametre 30
param epaisseur 0.8

esquisse plan.dessus
cercle
cote diametre diametre
extrude epaisseur
`.trim()
