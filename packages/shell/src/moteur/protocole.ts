export type Demande =
  | { sorte: 'executer'; script: string; sequence: number }
  | { sorte: 'ligne'; texte: string; sequence: number }
  | { sorte: 'annuler'; sequence: number }
  | { sorte: 'activer'; index: number; actif: boolean; sequence: number }
  | { sorte: 'pointe'; cible: number | 'fin'; sequence: number }

export type Reponse = {
  sequence: number
  positions: Float64Array
  normales: Float64Array
  indices: Uint32Array
  faces: Uint32Array | null
}
