import { domaineEsquisse } from './domaines/esquisse.ts'
import { domaineParametres } from './domaines/parametres.ts'
import { domaineSolide } from './domaines/solide.ts'
import { evaluateurProvisoire } from './evaluateur.ts'
import { noyauProvisoire } from './noyau.ts'
import { solveurProvisoire } from './solveur.ts'
import {
  ErreurApi,
  type Contexte,
  type Domaine,
  type Handler,
  type Operation,
  type Piece,
} from './types.ts'

type Action = {
  faire: () => void
  defaire: () => void
}

function pieceVide(nom: string): Piece {
  return {
    nom,
    historique: [],
    parametres: new Map(),
    noms: new Map(),
    esquisse: null,
    dernierSupport: null,
    solide: null,
    compteur: 0,
  }
}

export class Session {
  private readonly pieces = new Map<string, Piece>()
  private active: string | null = null
  private readonly handlers = new Map<string, Handler>()
  private readonly verbes = new Map<string, (reste: string) => Operation>()
  private readonly passe: Action[] = []
  private readonly futur: Action[] = []

  constructor() {
    this.enregistrer(domainePiece(this))
    this.enregistrer(domaineParametres)
    this.enregistrer(domaineEsquisse)
    this.enregistrer(domaineSolide)
  }

  enregistrer(domaine: Domaine) {
    for (const [verbe, lire] of Object.entries(domaine.verbes)) {
      this.verbes.set(verbe, (reste) => ({ ...lire(reste), domaine: domaine.id }))
    }
    for (const [type, handler] of Object.entries(domaine.operations)) {
      this.handlers.set(`${domaine.id}:${type}`, handler)
    }
  }

  executer(script: string) {
    for (const ligne of script.split('\n')) this.commande(ligne)
  }

  commande(ligne: string) {
    const texte = ligne.trim()
    if (!texte || texte.startsWith('#')) return
    const operation = this.lire(texte)
    const action = this.actionPour(operation)
    try {
      action.faire()
    } finally {
      this.futur.length = 0
      this.passe.push(action)
    }
  }

  annuler() {
    const action = this.passe.pop()
    if (!action) throw new ErreurApi('rien à annuler')
    action.defaire()
    this.futur.push(action)
  }

  refaire() {
    const action = this.futur.pop()
    if (!action) throw new ErreurApi('rien à refaire')
    action.faire()
    this.passe.push(action)
  }

  expression(nom: string) {
    return this.pieceActive().parametres.get(nom)
  }

  get longueurHistorique() {
    return this.pieceActive().historique.length
  }

  get aRefaire() {
    return this.futur.length > 0
  }

  maillage() {
    if (!this.active) return { positions: [], indices: [] }
    const piece = this.pieceActive()
    return noyauProvisoire.mailler(piece.solide, piece.parametres)
  }

  frontiere() {
    if (!this.active) return { faces: [] }
    const piece = this.pieceActive()
    return noyauProvisoire.decrire(piece.solide, piece.parametres)
  }

  esquisseCourante() {
    if (!this.active) return null
    const piece = this.pieceActive()
    if (!piece.esquisse) return null
    return noyauProvisoire.poser(piece.esquisse, piece.solide, piece.parametres)
  }

  definirPiece(nom: string) {
    this.pieces.set(nom, pieceVide(nom))
    this.active = nom
  }

  retirerPiece(nom: string) {
    this.pieces.delete(nom)
    if (this.active === nom) this.active = null
  }

  private lire(ligne: string): Operation {
    const clefs = [...this.verbes.keys()].sort((a, b) => b.length - a.length)
    for (const clef of clefs) {
      if (ligne === clef || ligne.startsWith(`${clef} `)) {
        return this.verbes.get(clef)!(ligne.slice(clef.length).trim())
      }
    }
    throw new ErreurApi(`commande inconnue: ${ligne}`)
  }

  private actionPour(operation: Operation): Action {
    const handler = this.handler(operation)
    if (!handler.dansHistorique) {
      return {
        faire: () => handler.faire(this.contexte(), operation),
        defaire: () => handler.defaire(this.contexte(), operation),
      }
    }
    const existant = operation.cle
      ? this.pieceActive().historique.find(
          (item) =>
            item.domaine === operation.domaine &&
            item.type === operation.type &&
            item.cle === operation.cle,
        )
      : undefined
    if (existant) {
      const avant = { ...existant.arguments }
      return {
        faire: () => {
          Object.assign(existant.arguments, operation.arguments)
          this.reconstruire()
        },
        defaire: () => {
          existant.arguments = avant
          handler.defaire(this.contexte(), existant)
          this.reconstruire()
        },
      }
    }
    return {
      faire: () => {
        this.pieceActive().historique.push(operation)
        this.reconstruire()
      },
      defaire: () => {
        const historique = this.pieceActive().historique
        const index = historique.lastIndexOf(operation)
        if (index >= 0) historique.splice(index, 1)
        handler.defaire(this.contexte(), operation)
        this.reconstruire()
      },
    }
  }

  private reconstruire() {
    const piece = this.pieceActive()
    piece.parametres = new Map()
    piece.noms = new Map()
    piece.esquisse = null
    piece.dernierSupport = null
    piece.solide = null
    piece.compteur = 0
    for (const operation of piece.historique) {
      this.handler(operation).faire(this.contexte(), operation)
    }
  }

  private handler(operation: Operation) {
    const handler = this.handlers.get(`${operation.domaine}:${operation.type}`)
    if (!handler) throw new ErreurApi(`opération inconnue: ${operation.domaine}:${operation.type}`)
    return handler
  }

  private pieceActive() {
    if (!this.active) throw new ErreurApi('aucune pièce')
    const piece = this.pieces.get(this.active)
    if (!piece) throw new ErreurApi('aucune pièce')
    return piece
  }

  private contexte(): Contexte {
    const piece = this.active ? this.pieces.get(this.active) : undefined
    const support = piece ?? pieceVide('')
    return {
      piece: support,
      parametres: support.parametres,
      esquisse: support.esquisse,
      solide: support.solide,
      noms: support.noms,
      evaluateur: evaluateurProvisoire,
      solveur: solveurProvisoire,
      noyau: noyauProvisoire,
    }
  }
}

function domainePiece(session: Session): Domaine {
  return {
    id: 'session',
    verbes: {
      piece: (reste) => ({ type: 'piece', arguments: { nom: reste }, noms: [reste] }),
    },
    operations: {
      piece: {
        dansHistorique: false,
        faire(_contexte, operation) {
          session.definirPiece(operation.arguments.nom)
        },
        defaire(_contexte, operation) {
          session.retirerPiece(operation.arguments.nom)
        },
      },
    },
  }
}
