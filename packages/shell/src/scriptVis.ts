/**
 * Vis tête fraisée Pozi 6 × 30.
 * Le corps est un profil sans filet : pointe à 30° puis âme Ø 3,5, fermé à l'épaulement.
 * `pas` ajoute l'hélice sur ce corps seul : triangle vif à 40°, sommets espacés du pas,
 * crête au Ø 6, fond sur l'âme. Sur la pointe, la crête suit le cône : le filet s'amincit
 * et s'éteint là où le cône rejoint l'âme. Le bout reste un cône nu.
 * La tête 90°, de Ø 6 à Ø 12, est une seconde révolution. L inclut la tête.
 * Empreinte Ø 6,6, profondeur 2,39.
 */
const LONGUEUR = 30
const R_EXT = 3
const R_AME = 1.75
const R_TETE = 6
const PENTE_POINTE = Math.tan((30 / 2) * (Math.PI / 180))
/** Hauteur où le cône de pointe atteint l'âme. */
const Y_AME = R_AME / PENTE_POINTE

function n(valeur: number) {
  return String(Math.round(valeur * 1e6) / 1e6)
}

export const SCRIPT_VIS = `
piece vis
param longueur ${LONGUEUR}
param diametre ${R_EXT * 2}
param diametre_ame 3.5
param diametre_tete ${R_TETE * 2}
param angle_tete 90
param angle_pointe 30
param angle_filet 40
param pas 2.6
param profondeur_pozi 2.39
param diametre_pozi 6.6

esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon diametre_ame / 2
cote hauteur ${n(Y_AME)}
segment
cote rayon diametre_ame / 2
cote hauteur longueur - (diametre_tete - diametre) / 2
segment
cote rayon 0
cote hauteur longueur - (diametre_tete - diametre) / 2
revolution
pas

esquisse plan.12h
segment
cote rayon 0
cote hauteur longueur - (diametre_tete - diametre) / 2
segment
cote rayon diametre / 2
cote hauteur longueur - (diametre_tete - diametre) / 2
segment
cote rayon diametre_tete / 2
cote hauteur longueur
segment
cote rayon 0
cote hauteur longueur
revolution

esquisse plan.dessus
rectangle
cote largeur diametre_pozi / 4
cote longueur diametre_pozi
rectangle
cote largeur diametre_pozi
cote longueur diametre_pozi / 4
enleve profondeur_pozi
`.trim()
