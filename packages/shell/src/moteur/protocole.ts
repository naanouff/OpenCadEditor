export type Demande =
  | { sorte: 'executer'; script: string; sequence: number }
  | { sorte: 'ligne'; texte: string; sequence: number }
  | { sorte: 'annuler'; sequence: number }
  | { sorte: 'activer'; index: number; actif: boolean; sequence: number }
  | { sorte: 'pointe'; cible: number | 'fin'; sequence: number }
  | { sorte: 'refaire'; sequence: number }
  | { sorte: 'remplacer'; script: string; sequence: number }
  | { sorte: 'ouvrir'; script: string; eteins: number[]; sequence: number }

export type AreteTransfert = {
  id: number
  length: number
  midPoint: [number, number, number]
}

export type Reponse = {
  sequence: number
  positions: Float64Array
  normales: Float64Array
  indices: Uint32Array
  faces: Uint32Array | null
  /** Milieux `list_edges` du solide OCCT. Vide pour le maillage hybride `pas`. */
  aretes: AreteTransfert[]
}
