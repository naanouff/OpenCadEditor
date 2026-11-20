/**
 * Couleurs du calque topologique (survol / sélection).
 * Le moteur n’expose aujourd’hui que `PBRGraph` : le solide reste mat (roughness 1).
 * Un matcap CAO remplacera ce graphe dès qu’il sera disponible dans w3dts.
 */
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

/** Demi-largeur des rubans (mètres). */
export const epaisseurTopo = {
  fil: 0.00008,
  survol: 0.00016,
  selection: 0.0002,
}

/**
 * Faces : index de carreau, teinté dans le solide lui-même.
 * Arêtes : polylignes en mètres, dessinées par la passe de lignes.
 */
export type CalqueTopo = {
  survolFace: number | null
  selectionFace: number | null
  survolArete: number[]
  selectionArete: number[]
  datumSurvol: string | null
  datumChoisi: string | null
}

export const calqueVide: CalqueTopo = {
  survolFace: null,
  selectionFace: null,
  survolArete: [],
  selectionArete: [],
  datumSurvol: null,
  datumChoisi: null,
}
