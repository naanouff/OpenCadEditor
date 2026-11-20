/**
 * Cotes figées du plateau de service (mm).
 * Les esquisses sont centrées à l’origine : les perçages sont les poses des vis, pas des enlèvements décalés.
 */
export const COTE_PLATEAU = {
  longueur: 280,
  largeur: 180,
  epaisseur: 8,
  poigneeLongueur: 100,
  poigneeLargeur: 16,
  poigneeHauteur: 18,
  /** Centre de la poignée le long de X, de chaque côté. */
  poseX: 100,
  /** Distance entre les deux vis d’une poignée, le long de X. */
  entraxeVis: 60,
  /**
   * Altitude locale du dessous de tête de SCRIPT_VIS
   * (longueur 30, tête (12−6)/2 = 3).
   */
  sousTeteVis: 27,
} as const

/** Pointe de la vis : le dessous de tête affleure le dessus de la poignée. */
export function yPointeVis() {
  return COTE_PLATEAU.epaisseur + COTE_PLATEAU.poigneeHauteur - COTE_PLATEAU.sousTeteVis
}
