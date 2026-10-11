/**
 * Fond Milgauss — disque sur la portée du dessous (diametre_fond / profondeur_fond).
 * Cotes alignées sur SCRIPT_CARRURE (Ø30, épaisseur 1).
 */
export const SCRIPT_FOND = `
piece fond
param diametre 30
param epaisseur 1

esquisse plan.dessus
cercle
cote diametre diametre
extrude epaisseur
`.trim()
