import { VIS_M4_NOYEE } from './scriptVis.ts'

/**
 * Cotes figées du plateau de service (mm), d’après le plan.
 * Rectangle 500 × 300, centré, X le long des 500.
 */
export const COTE_PLATEAU = {
  longueur: 500,
  largeur: 300,
  /** Hauteur hors tout, rebord compris. */
  hauteur: 15,
  fond: 5,
  rebord: 15,
  rayonCoin: 20,
  /** Congé de la lèvre (dessus du rebord) et du fond de poche. */
  congeLevre: 1.5,
  congeFond: 1,
  /** Chanfrein du dessous, le long du bord. */
  chanfreinDessous: 1,
  /**
   * Poignée en D, à plat sur le rebord (vue de dessus du plan) : deux bras partent des trous
   * et une barre court parallèle au petit côté. Barre de 12 mm de haut (vue de côté).
   */
  hauteurPoignee: 12,
  /** Largeur du bras et de la barre, vue de dessus. Tient sur le rebord de 15. */
  largeurBras: 14,
  /** Distance de l’axe des trous à l’axe de la barre. */
  saillie: 40,
  /** Rayon des coudes, sur l’axe du bras. */
  rayonCoude: 20,
  /** Entraxe des deux vis d’une poignée. */
  entraxeVis: 180,
  /** Lamage cylindrique pour la tête Ø 8, centré sur l’axe de vis. */
  diametreLamage: 8.4,
  profondeurLamage: 2.5,
  /** Passage du fût M4. */
  diametrePassage: 4.5,
  /** La tête reste sous le dessus de la poignée. */
  retraitTete: 0.5,
  /** Congé du pourtour de la poignée, dessus et dessous. */
  congePoignee: 1,
} as const

/** Axe des trous : milieu du rebord. */
export function xTrou() {
  return COTE_PLATEAU.longueur / 2 - COTE_PLATEAU.rebord / 2
}

/** Dessus de la poignée posée sur le rebord. */
export function yDessusPoignee() {
  return COTE_PLATEAU.hauteur + COTE_PLATEAU.hauteurPoignee
}

/** Pointe de la vis : la tête est sous le dessus de la poignée, le fût finit dans le rebord. */
export function yPointeVis() {
  return yDessusPoignee() - COTE_PLATEAU.retraitTete - VIS_M4_NOYEE.longueur
}
