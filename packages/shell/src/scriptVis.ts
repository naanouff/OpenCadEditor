/**
 * Vis tête fraisée Pozi.
 * Le corps est un profil sans filet : pointe conique puis âme, fermé à l'épaulement.
 * `pas` ajoute l'hélice sur ce corps seul : triangle vif, sommets espacés du pas,
 * crête au diamètre nominal, fond sur l'âme. Sur la pointe, la crête suit le cône : le filet s'amincit
 * et s'éteint là où le cône rejoint l'âme. Le bout reste un cône nu.
 * `pas` referme le corps au rayon de l'âme. La tête 90° est une seconde révolution :
 * son fond, rogné par le fût, est la couronne visible sous la tête. L inclut la tête.
 */
export type CotesVis = {
  longueur: number
  diametre: number
  diametreAme: number
  diametreTete: number
  anglePointe: number
  angleFilet: number
  pas: number
  profondeurPozi: number
  diametrePozi: number
}

/** Vis à bois 6 × 30. */
export const VIS_6X30: CotesVis = {
  longueur: 30,
  diametre: 6,
  diametreAme: 3.5,
  diametreTete: 12,
  anglePointe: 30,
  angleFilet: 40,
  pas: 2.6,
  profondeurPozi: 2.39,
  diametrePozi: 6.6,
}

/**
 * Vis M4 × 20 à tête fraisée, tête noyée dans le lamage de la poignée.
 * Le fût traverse la poignée et s’arrête dans le rebord ; la tête ne dépasse pas.
 */
export const VIS_M4_NOYEE: CotesVis = {
  longueur: 20,
  diametre: 4,
  diametreAme: 3.24,
  diametreTete: 8,
  anglePointe: 90,
  angleFilet: 60,
  pas: 0.7,
  profondeurPozi: 1.8,
  diametrePozi: 4.4,
}

/** Vis métrique M4 × 12, pas 0,7, Pozi 2. */
export const VIS_M4X12: CotesVis = {
  longueur: 12,
  diametre: 4,
  diametreAme: 3.24,
  diametreTete: 8,
  anglePointe: 90,
  angleFilet: 60,
  pas: 0.7,
  profondeurPozi: 1.8,
  diametrePozi: 4.4,
}

/** Hauteur du dessous de tête (tête 90° : (Ø tête − Ø) / 2). */
export function sousTeteVis(cotes: CotesVis) {
  return cotes.longueur - (cotes.diametreTete - cotes.diametre) / 2
}

function n(valeur: number) {
  return String(Math.round(valeur * 1e6) / 1e6)
}

export function scriptVis(cotes: CotesVis) {
  const pente = Math.tan((cotes.anglePointe / 2) * (Math.PI / 180))
  /** Hauteur où le cône de pointe atteint l'âme. */
  const yAme = cotes.diametreAme / 2 / pente
  return `
piece vis
param longueur ${n(cotes.longueur)}
param diametre ${n(cotes.diametre)}
param diametre_ame ${n(cotes.diametreAme)}
param diametre_tete ${n(cotes.diametreTete)}
param angle_tete 90
param angle_pointe ${n(cotes.anglePointe)}
param angle_filet ${n(cotes.angleFilet)}
param pas ${n(cotes.pas)}
param profondeur_pozi ${n(cotes.profondeurPozi)}
param diametre_pozi ${n(cotes.diametrePozi)}

esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon diametre_ame / 2
cote hauteur ${n(yAme)}
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
}

export const SCRIPT_VIS = scriptVis(VIS_6X30)
