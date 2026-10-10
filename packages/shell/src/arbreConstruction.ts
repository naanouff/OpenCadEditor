import { datumsOrigine, type Operation } from '@opencad/api-parametrique'

export type NoeudArbre = {
  id: string
  libelle: string
  enfants?: NoeudArbre[]
  /** Rang dans l'historique, pour l'interrupteur d'un opérateur. */
  index?: number
  /** L'opérateur se coupe sans quitter l'arbre. */
  interrupteur?: boolean
  actif?: boolean
  /** Ouvre la vue de cette esquisse. */
  esquisse?: boolean
  support?: string
  /** Fonction qui porte la pointe de reconstruction. */
  estPointe?: boolean
  /** Après la pointe : visible mais hors reconstruction. */
  apresPointe?: boolean
}

const SOUS_ESQUISSE = new Set(['cercle', 'rectangle', 'segment', 'arc', 'concentrique', 'cote', 'symetrie'])

export function libelleOperation(operation: Operation): string {
  const args = operation.arguments
  switch (operation.type) {
    case 'param':
      return `${args.nom} = ${args.expression}`
    case 'ouvrir':
      return `Esquisse ${args.support}`
    case 'cercle':
      return 'Cercle'
    case 'rectangle':
      return 'Rectangle'
    case 'segment':
      return 'Segment'
    case 'arc':
      return 'Arc'
    case 'concentrique':
      return `Concentrique ${args.cible}`
    case 'cote':
      return `Cote ${args.cible} ${args.expression}`
    case 'symetrie':
      return `Symétrie ${args.axe}`
    case 'extrude':
      return `Extrusion ${args.expression}`
    case 'enlever':
      return args.traverse === 'oui'
        ? `Enlèvement travers ${args.expression}`
        : `Enlèvement ${args.expression}`
    case 'revolution':
      return 'Révolution'
    case 'pas':
      return 'Pas de vis'
    default:
      return operation.type
  }
}

function marquerApres(noeud: NoeudArbre) {
  noeud.apresPointe = true
  for (const enfant of noeud.enfants ?? []) marquerApres(enfant)
}

function noeud(index: number, operation: Operation, enfants?: NoeudArbre[], interrupteur = false): NoeudArbre {
  return {
    id: `${index}-${operation.domaine}-${operation.type}`,
    libelle: libelleOperation(operation),
    ...(operation.type === 'ouvrir' ? { index, esquisse: true, support: operation.arguments.support } : {}),
    ...(interrupteur ? { index, interrupteur: true, actif: operation.actif !== false } : {}),
    ...(enfants ? { enfants } : {}),
  }
}

/** Origine, puis une fonction par extrusion ou enlèvement. L'esquisse est l'enfant de la fonction. */
export function fonctions(historique: Operation[], pointe: number | null = null): NoeudArbre[] {
  const liste: NoeudArbre[] = [
    {
      id: 'origine',
      libelle: 'Origine',
      enfants: datumsOrigine().map((plan) => ({ id: plan.id, libelle: plan.libelle })),
    },
  ]
  let esquisse: { index: number; operation: Operation }[] = []

  const esquisseNoeud = () => {
    const [ouverture, ...reste] = esquisse
    if (!ouverture) return undefined
    return noeud(
      ouverture.index,
      ouverture.operation,
      reste.map((entree) => noeud(entree.index, entree.operation)),
    )
  }

  historique.forEach((operation, index) => {
    if (operation.type === 'param') return
    if (operation.type === 'ouvrir') {
      esquisse = [{ index, operation }]
      return
    }
    if (SOUS_ESQUISSE.has(operation.type)) {
      esquisse.push({ index, operation })
      return
    }
    if (operation.type === 'pas') {
      const n = noeud(index, operation, undefined, true)
      if (pointe !== null && index === pointe) n.estPointe = true
      if (pointe !== null && index > pointe) marquerApres(n)
      liste.push(n)
      return
    }
    if (operation.type !== 'extrude' && operation.type !== 'enlever' && operation.type !== 'revolution') return
    const enfant = esquisseNoeud()
    const n = noeud(index, operation, enfant ? [enfant] : undefined, true)
    if (pointe !== null && index === pointe) n.estPointe = true
    if (pointe !== null && index > pointe) marquerApres(n)
    liste.push(n)
    esquisse = []
  })

  const ouverte = esquisseNoeud()
  if (ouverte) {
    if (pointe !== null) {
      const dernierFonction = [...liste].reverse().find((n) => n.interrupteur)
      if (dernierFonction && dernierFonction.index !== undefined && dernierFonction.index >= pointe) {
        marquerApres(ouverte)
      }
    }
    liste.push(ouverte)
  }
  return liste
}

/** Arbre de construction : pièce, origine, fonctions. Les paramètres restent hors de l'arbre. */
export function arbreConstruction(
  piece: string | null,
  historique: Operation[],
  pointe: number | null = null,
): NoeudArbre[] {
  if (!piece) return []
  return [{ id: `piece-${piece}`, libelle: piece, enfants: fonctions(historique, pointe) }]
}
