/**
 * Lunette Milgauss — anneau simple (affleure diametre_boite, ouverture pour le verre).
 * Cotes alignées sur SCRIPT_CARRURE (36 / siège 32 / hauteur = profondeur_lunette).
 */
export const SCRIPT_LUNETTE = `
piece lunette
param diametre_exterieur 36
param diametre_ouverture 30
param hauteur 1.2

esquisse plan.dessus
cercle
cote diametre diametre_exterieur
cercle
concentrique cercle.exterieur
cote diametre diametre_ouverture
extrude hauteur
`.trim()
