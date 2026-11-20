/**
 * Couleurs du calque topologique (survol / sélection).
 * Le moteur n’expose aujourd’hui que `PBRGraph` : le solide reste mat (roughness 1).
 * Un matcap CAO remplacera ce graphe dès qu’il sera disponible dans w3dts.
 */
import { traitsVides, type Traits } from './traitsArete.ts'

export type Rgba = readonly [number, number, number, number]

export const couleursTopo = {
  solide: [0.78, 0.78, 0.78, 1] as Rgba,
  fil: [0.12, 0.13, 0.14, 1] as Rgba,
  survol: [0.2, 0.55, 0.95, 1] as Rgba,
  selection: [0.93, 0.42, 0.08, 1] as Rgba,
  plan: [0.45, 0.52, 0.58, 1] as Rgba,
  axeX: [0.75, 0.22, 0.18, 1] as Rgba,
  axeY: [0.2, 0.58, 0.28, 1] as Rgba,
  axeZ: [0.22, 0.38, 0.75, 1] as Rgba,
}

/** Largeur des traits en pixels CSS, constante quel que soit le zoom. */
export const epaisseurTopo = {
  fil: 1.5,
  survol: 3,
  selection: 3.5,
  datum: 1.25,
}

/**
 * Faces : index de carreau, teinté dans le solide lui-même.
 * Arêtes : segments en mètres et sens de sortie, dessinés par la passe de lignes.
 */
export type CalqueTopo = {
  survolFace: number | null
  selectionFace: number | null
  /** Fil BRep complet ; vide si le maillage n’a pas de carreaux. */
  fil: Traits
  survolArete: Traits
  selectionArete: Traits
  datumSurvol: string | null
  datumChoisi: string | null
}

export const calqueVide: CalqueTopo = {
  survolFace: null,
  selectionFace: null,
  fil: traitsVides,
  survolArete: traitsVides,
  selectionArete: traitsVides,
  datumSurvol: null,
  datumChoisi: null,
}
