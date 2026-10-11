export type Operation = {
  domaine: string
  type: string
  arguments: Record<string, string>
  noms: string[]
  /** Identité stable : une deuxième opération de même clé remplace la première. */
  cle?: string
  /** Absent ou vrai : l'opération est rejouée. Faux : elle est sautée, avec l'esquisse qu'elle consomme. */
  actif?: boolean
}

export type EntiteEsquisse = {
  id: string
  sorte: 'cercle' | 'rectangle' | 'segment' | 'arc' | 'octogone'
  degres: number
  diametre?: string
  ecart?: string
  debord?: string
  largeur?: string
  longueur?: string
  rayon?: string
  /** Distance entre deux pans opposés d’un octogone régulier. */
  entreplat?: string
  /** Cote axiale de l'extrémité d'un segment, pour une révolution. */
  hauteur?: string
  /** Cible d’une relation `concentrique` posée sur cette entité. */
  concentrique?: string
}

export type Esquisse = {
  support: string
  entites: EntiteEsquisse[]
  /** Axes de `symetrie` dans l’ordre du script. */
  symetries?: Array<'vertical' | 'horizontal'>
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

export type Vecteur = readonly [number, number, number]

/** Repère orthonormé direct. L'origine est dans l'unité du document. */
export type Repere = {
  origine: Vecteur
  x: Vecteur
  y: Vecteur
  z: Vecteur
}

/** Origine au centre, X vers 3 h, Y vertical, Z vers 12 h. */
export const REPERE_REFERENCE: Repere = {
  origine: [0, 0, 0],
  x: [1, 0, 0],
  y: [0, 1, 0],
  z: [0, 0, 1],
}

export type Document = {
  /** Nom de l’auteur. Vide tant que `auteur` n’a pas été commandé. */
  auteur: string
  /** Semver 2.0.0. `0.0.0` tant que `version` n’a pas été commandé. */
  version: string
  unite: string
  repere: Repere
}

export type Piece = {
  nom: string
  historique: Operation[]
  parametres: Map<string, string>
  noms: Map<string, string>
  esquisse: Esquisse | null
  dernierSupport: string | null
  solide: Solide | null
  /** Maillage porté par une commande, quand le solide de carrure ne s'applique pas. */
  volume: MaillageOmbre | null
  /** Demi-profil de la dernière révolution, rayon et hauteur. Le pas de vis s'y applique. */
  demiProfil: { r: number; y: number }[] | null
  compteur: number
  /** Index historique de la dernière fonction rejouée ; `null` = fin. */
  pointe: number | null
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
  /** Faux : les fonctions maillées posent le profil et sautent le volume. */
  geometrie?: boolean
}

export type Evaluateur = {
  evaluer(expression: string, parametres: Map<string, string>): number
}

export type StatutContrainte = 'sous-contraint' | 'contraint' | 'surcontraint'

export type SolveurEsquisse = {
  etat(
    esquisse: Esquisse,
    parametres?: Map<string, string>,
  ): { ferme: boolean; degres: number; statut?: StatutContrainte }
}

export type Maillage = {
  positions: number[]
  indices: number[]
  /** Une par sommet, hors de la matière. Absente tant que le maillage n'est pas ombré. */
  normales?: number[]
  /** Une étiquette par triangle. Le fil de fer sépare deux étiquettes différentes. */
  faces?: number[]
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

/** Cote linéaire dans le plan de l'esquisse, en millimètres. */
export type CoteLineaire = {
  a: [number, number]
  b: [number, number]
  /** Décalage signé le long de la normale du plan (sens +90° du segment). */
  decalage: number
  texte: string
}

/** Esquisse posée sur son plan, prête à dessiner. */
export type EsquissePosee = {
  support: string
  cercles: { rayon: number; y: number; valeur: number }[]
  /** Segments du plan, en millimètres : u, v, u, v. */
  traits?: number[]
  cotesLineaires?: CoteLineaire[]
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
