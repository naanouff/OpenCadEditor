import type { Operation } from '@opencad/api-parametrique'

export type NoeudArbre = {
  id: string
  libelle: string
  enfants?: NoeudArbre[]
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
      return `Extrude ${args.expression}`
    case 'enlever':
      return args.traverse === 'oui' ? `Enlève travers ${args.expression}` : `Enlève ${args.expression}`
    default:
      return operation.type
  }
}

/** Arbre de construction : pièce → paramètres / esquisses / fonctions. */
export function arbreConstruction(piece: string | null, historique: Operation[]): NoeudArbre[] {
  if (!piece) return []
  const parametres: NoeudArbre[] = []
  const enfants: NoeudArbre[] = []
  let esquisse: NoeudArbre | null = null

  historique.forEach((operation, index) => {
    const noeud: NoeudArbre = {
      id: `${index}-${operation.domaine}-${operation.type}`,
      libelle: libelleOperation(operation),
    }
    if (operation.type === 'param') {
      parametres.push(noeud)
      return
    }
    if (operation.type === 'ouvrir') {
      esquisse = { ...noeud, enfants: [] }
      enfants.push(esquisse)
      return
    }
    if (esquisse && (SOUS_ESQUISSE.has(operation.type) || operation.type === 'extrude' || operation.type === 'enlever')) {
      esquisse.enfants!.push(noeud)
      if (operation.type === 'extrude' || operation.type === 'enlever') esquisse = null
      return
    }
    esquisse = null
    enfants.push(noeud)
  })

  const racine: NoeudArbre = {
    id: `piece-${piece}`,
    libelle: piece,
    enfants: [
      ...(parametres.length > 0
        ? [{ id: 'parametres', libelle: 'Paramètres', enfants: parametres }]
        : []),
      ...enfants,
    ],
  }
  return [racine]
}
