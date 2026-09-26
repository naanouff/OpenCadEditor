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
  sorte: 'cercle' | 'rectangle' | 'segment' | 'arc'
  degres: number
  diametre?: string
  ecart?: string
  debord?: string
  largeur?: string
  rayon?: string
}

export type Esquisse = {
  support: string
  entites: EntiteEsquisse[]
}

export type Enlevement = {
  support: string
  rayon: number
  profondeur: number
  traverse: boolean
}

export type Ajout =
  | { sorte: 'rectangle'; ecart: number; debord: number; largeur: number; hauteur: number }
  | {
      sorte: 'profil'
      ecart: number
      debord: number
      largeurBout: number
      largeurRacine: number
      rayonRacine: number
      rayonBoutHaut: number
      rayonBoutBas: number
      plongeeBout: number
      epaisseurBout: number
      amorceDessus: number
      hauteur: number
    }
  | { sorte: 'cercle'; support: string; rayon: number; longueur: number }

export type Solide = {
  faces: Set<string>
  extrusions: number
  enlevementsBorgnes: number
  enlevements: Enlevement[]
  ajouts: Ajout[]
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
  unite: string
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

/** Maillage d'affichage : chaque sommet porte la normale de sa surface. */
export type MaillageOmbre = Maillage & { normales: number[] }

/**
 * Sens de la normale, hors de la matière.
 * Cylindre : 1 loin de l'axe, -1 vers l'axe. Couronne : 1 vers le haut, -1 vers le bas.
 */
export type Dehors = 1 | -1

export type FaceExacte =
  | {
      sorte: 'cylindre'
      rayon: number
      bas: number
      haut: number
      dehors: Dehors
      /** Tronçon : angles depuis +X, (x,z)=(r cos θ, r sin θ). Absent = tour complet. */
      angleDeb?: number
      angleFin?: number
    }
  | {
      sorte: 'couronne'
      rayonExt: number
      rayonInt: number
      y: number
      dehors: Dehors
      /** Montée du bord intérieur au bord extérieur : biseau conique, absent = plat. */
      pente?: number
    }
  | {
      sorte: 'boite'
      xmin: number
      xmax: number
      ymin: number
      ymax: number
      zmin: number
      zmax: number
      /** Contour en plan Oyster : absent = boîte rectangulaire. */
      plan?: { largeurBout: number; largeurRacine: number; rayonRacine: number }
      /** Profil d’élévation Oyster : bout plongeant, dessus en pente, dessous creusé. */
      elevation?: { plongee: number; epaisseurBout: number; amorce?: number }
    }
  | {
      /** Congé creux à la racine : cylindre d'axe Y, hors de la peau. */
      sorte: 'racine'
      x: number
      z: number
      rayon: number
      bas: number
      haut: number
      angleDeb: number
      angleFin: number
      dehors: Dehors
    }
  | {
      /** Congé de bout : cylindre d’axe X, angles dans le plan YZ. */
      sorte: 'conge'
      debut: number
      fin: number
      y: number
      z: number
      rayon: number
      angleDeb: number
      angleFin: number
      dehors: Dehors
    }
  | { sorte: 'traverse'; rayon: number; debut: number; fin: number; y: number; z: number; dehors: Dehors }

export type Frontiere = {
  faces: FaceExacte[]
}

/** Esquisse posée sur son plan, prête à dessiner. */
export type EsquissePosee = {
  support: string
  cercles: { rayon: number; y: number; valeur: number }[]
}

export type NoyauGeometrique = {
  extruder(solide: Solide | null, ajout?: Ajout): Solide
  enlever(solide: Solide, coupe: Enlevement): Solide
  aFace(solide: Solide | null, face: string): boolean
  mailler(solide: Solide | null, parametres: Map<string, string>): MaillageOmbre
  decrire(solide: Solide | null, parametres: Map<string, string>): Frontiere
  poser(esquisse: Esquisse, solide: Solide | null, parametres: Map<string, string>): EsquissePosee
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
