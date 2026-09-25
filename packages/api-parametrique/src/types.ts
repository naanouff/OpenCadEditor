export type Operation = {
  domaine: string
  type: string
  arguments: Record<string, string>
  noms: string[]
  /** Identité stable : une deuxième opération de même clé remplace la première. */
  cle?: string
}

export type EntiteEsquisse = {
  id: string
  sorte: 'cercle' | 'rectangle'
  degres: number
}

export type Esquisse = {
  support: string
  entites: EntiteEsquisse[]
}

export type Solide = {
  faces: Set<string>
  extrusions: number
  enlevementsBorgnes: number
}

export type Piece = {
  nom: string
  historique: Operation[]
  parametres: Map<string, string>
  noms: Map<string, string>
  esquisse: Esquisse | null
  dernierSupport: string | null
  solide: Solide | null
  compteur: number
}

export type Contexte = {
  piece: Piece
  parametres: Map<string, string>
  esquisse: Esquisse | null
  solide: Solide | null
  noms: Map<string, string>
  evaluateur: Evaluateur
  solveur: SolveurEsquisse
  noyau: NoyauGeometrique
}

export type Evaluateur = {
  evaluer(expression: string, parametres: Map<string, string>): number
}

export type SolveurEsquisse = {
  etat(esquisse: Esquisse): { ferme: boolean; degres: number }
}

export type Maillage = {
  positions: number[]
  indices: number[]
}

export type FaceExacte =
  | { sorte: 'cylindre'; rayon: number; bas: number; haut: number }
  | { sorte: 'couronne'; rayonExt: number; rayonInt: number; y: number }

export type Frontiere = {
  faces: FaceExacte[]
}

export type NoyauGeometrique = {
  extruder(solide: Solide | null): Solide
  enlever(solide: Solide, traverse: boolean): Solide
  aFace(solide: Solide | null, face: string): boolean
  mailler(solide: Solide | null, parametres: Map<string, string>): Maillage
  decrire(solide: Solide | null, parametres: Map<string, string>): Frontiere
}

export type Handler = {
  dansHistorique: boolean
  faire(contexte: Contexte, operation: Operation): void
  defaire(contexte: Contexte, operation: Operation): void
}

export type Domaine = {
  id: string
  verbes: Record<string, (reste: string) => Omit<Operation, 'domaine'>>
  operations: Record<string, Handler>
}

export class ErreurApi extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ErreurApi'
  }
}
