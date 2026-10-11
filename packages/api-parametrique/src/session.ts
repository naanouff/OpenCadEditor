import { domaineEsquisse } from './domaines/esquisse.ts'
import { domaineParametres } from './domaines/parametres.ts'
import { domaineSolide } from './domaines/solide.ts'
import { domaineRevolution } from './revolution.ts'
import { evaluateurProvisoire } from './evaluateur.ts'
import {
  CONSOMME_ESQUISSE,
  SOUS_ESQUISSE,
  TYPES_FONCTION,
  indexFonctionParRang,
  rejouables,
} from './historique.ts'
import { noyauProvisoire } from './noyau.ts'
import { solveurGcs, solveurProvisoire } from './solveur.ts'
import { versionSemantique } from './versionSemantique.ts'
import {
  ErreurApi,
  REPERE_REFERENCE,
  type Contexte,
  type Document,
  type Domaine,
  type Handler,
  type Operation,
  type Piece,
  type Vecteur,
} from './types.ts'

export {
  CONSOMME_ESQUISSE,
  SOUS_ESQUISSE,
  TYPES_FONCTION,
  indexFonctionParRang,
  indexesFonctions,
  rejouables,
} from './historique.ts'

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
    volume: null,
    demiProfil: null,
    compteur: 0,
    pointe: null,
  }
}

function copieVecteur(vecteur: Vecteur): Vecteur {
  return [vecteur[0], vecteur[1], vecteur[2]]
}

export class Session {
  private readonly modele: Document = { auteur: '', version: '0.0.0', unite: 'mm', repere: REPERE_REFERENCE }
  private readonly pieces = new Map<string, Piece>()
  private active: string | null = null
  private readonly handlers = new Map<string, Handler>()
  private readonly verbes = new Map<string, (reste: string) => Operation>()
  private readonly passe: Action[] = []
  private readonly futur: Action[] = []
  private enLot = false
  private sale = false
  private readonly geometrie: boolean
  private vueSansGeometrie = false

  constructor(options?: { geometrie?: boolean }) {
    this.geometrie = options?.geometrie !== false
    this.enregistrer(domainePiece(this))
    this.enregistrer(domainePointe(this))
    this.enregistrer(domaineParametres)
    this.enregistrer(domaineEsquisse)
    this.enregistrer(domaineSolide)
    this.enregistrer(domaineRevolution)
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
    this.lot(() => {
      for (const ligne of script.split('\n')) this.commande(ligne)
    })
  }

  /** Les lignes s'empilent, et le solide n'est reconstruit qu'à la sortie. */
  lot(faire: () => void) {
    if (this.enLot) {
      faire()
      return
    }
    this.enLot = true
    this.sale = false
    try {
      faire()
    } finally {
      this.enLot = false
      if (this.sale) this.reconstruire()
      this.sale = false
    }
  }

  get constructionDifferee() {
    return this.enLot
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

  /** Vide les pièces, le document et les deux piles. L'objet Session reste le même. */
  reinitialiser() {
    this.pieces.clear()
    this.active = null
    this.passe.length = 0
    this.futur.length = 0
    this.enLot = false
    this.sale = false
    this.modele.auteur = ''
    this.modele.version = '0.0.0'
    this.modele.unite = 'mm'
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
    if (!this.active) return { positions: [], normales: [], indices: [] }
    const piece = this.pieceActive()
    if (piece.volume) return piece.volume
    return noyauProvisoire.mailler(piece.solide, piece.parametres)
  }

  frontiere() {
    if (!this.active) return { faces: [] }
    const piece = this.pieceActive()
    return noyauProvisoire.decrire(piece.solide, piece.parametres)
  }

  /** Copie du document : auteur, version, unité et repère de référence. */
  document(): Document {
    const { repere } = this.modele
    return {
      auteur: this.modele.auteur,
      version: this.modele.version,
      unite: this.modele.unite,
      repere: {
        origine: copieVecteur(repere.origine),
        x: copieVecteur(repere.x),
        y: copieVecteur(repere.y),
        z: copieVecteur(repere.z),
      },
    }
  }

  unite() {
    return this.modele.unite
  }

  definirUnite(nom: string) {
    this.modele.unite = nom || 'mm'
  }

  definirAuteur(nom: string) {
    this.modele.auteur = nom
  }

  definirVersion(nom: string) {
    this.modele.version = versionSemantique(nom)
  }

  parametres() {
    if (!this.active) return [] as [string, string][]
    return [...this.pieceActive().parametres.entries()]
  }

  /** Nom de la pièce active, ou `null`. */
  pieceCourante() {
    return this.active
  }

  /** Copie de l'historique de reconstruction de la pièce active. */
  historique() {
    if (!this.active) return [] as Operation[]
    return this.pieceActive().historique.map((operation) => ({
      ...operation,
      arguments: { ...operation.arguments },
      noms: [...operation.noms],
    }))
  }

  esquisseCourante() {
    if (!this.active) return null
    const piece = this.pieceActive()
    if (!piece.esquisse) return null
    return noyauProvisoire.poser(piece.esquisse, piece.solide, piece.parametres)
  }

  /** Statut GCS de l’esquisse ouverte (sous / contraint / sur). */
  etatEsquisse() {
    if (!this.active) return null
    const piece = this.pieceActive()
    if (!piece.esquisse) return null
    return solveurGcs.etat(piece.esquisse, piece.parametres)
  }

  /** Statut GCS d’une esquisse de l’historique (même déjà consommée). */
  etatEsquisseDepuis(index: number) {
    const source = this.pieceActive()
    const ouvrir = source.historique[index]
    if (!ouvrir || ouvrir.type !== 'ouvrir') return null
    const nom = `__etat_${source.nom}`
    this.pieces.set(nom, pieceVide(source.nom))
    const avant = this.active
    this.active = nom
    this.vueSansGeometrie = true
    try {
      for (const operation of operationsJusquaEsquisse(source.historique, index)) {
        this.handler(operation).faire(this.contexte(), operation)
      }
      const piece = this.pieceActive()
      if (!piece.esquisse) return null
      return solveurGcs.etat(piece.esquisse, piece.parametres)
    } finally {
      this.vueSansGeometrie = false
      this.pieces.delete(nom)
      this.active = avant
    }
  }

  /** Pose une esquisse de l'historique, même déjà consommée, sans modifier la pièce. */
  esquisseDepuis(index: number) {
    const source = this.pieceActive()
    const ouvrir = source.historique[index]
    if (!ouvrir || ouvrir.type !== 'ouvrir') return null
    const nom = `__vue_${source.nom}`
    this.pieces.set(nom, pieceVide(source.nom))
    const avant = this.active
    this.active = nom
    this.vueSansGeometrie = true
    try {
      for (const operation of operationsJusquaEsquisse(source.historique, index)) {
        this.handler(operation).faire(this.contexte(), operation)
      }
      const piece = this.pieceActive()
      if (!piece.esquisse) return null
      return noyauProvisoire.poser(piece.esquisse, piece.solide, piece.parametres)
    } finally {
      this.vueSansGeometrie = false
      this.pieces.delete(nom)
      this.active = avant
    }
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
          this.rejouer()
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
        this.rejouer()
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

  /** Allume ou éteint une opération. L'esquisse consommée par une fonction éteinte est sautée avec elle. */
  activer(index: number, actif: boolean) {
    const operation = this.pieceActive().historique[index]
    if (!operation) throw new ErreurApi('opération inconnue')
    const avant = operation.actif
    operation.actif = actif
    try {
      this.reconstruire()
    } catch (erreur) {
      operation.actif = avant
      this.reconstruire()
      throw erreur
    }
  }

  /** Index historique de la pointe, ou `null` (fin). */
  pointeCourante() {
    if (!this.active) return null
    return this.pieceActive().pointe
  }

  /**
   * Pose la pointe sur un index historique de fonction, ou `fin`.
   * Annulable (restaure la pointe précédente).
   */
  poserPointe(cible: number | 'fin') {
    const piece = this.pieceActive()
    const suivante = this.resoudrePointe(cible)
    const avant = piece.pointe
    if (avant === suivante) return
    const action: Action = {
      faire: () => {
        piece.pointe = suivante
        this.reconstruire()
      },
      defaire: () => {
        piece.pointe = avant
        this.reconstruire()
      },
    }
    action.faire()
    this.futur.length = 0
    this.passe.push(action)
  }

  /** Applique la pointe sans empiler d’annulation (verbe `pointe` via `commande`). */
  appliquerPointe(cible: number | 'fin') {
    this.pieceActive().pointe = this.resoudrePointe(cible)
    this.reconstruire()
  }

  private resoudrePointe(cible: number | 'fin'): number | null {
    if (cible === 'fin') return null
    const piece = this.pieceActive()
    if (!TYPES_FONCTION.has(piece.historique[cible]?.type ?? '')) {
      throw new ErreurApi('pointe hors fonction')
    }
    return cible
  }

  private rejouer() {
    if (this.enLot) this.sale = true
    else this.reconstruire()
  }

  private reconstruire() {
    const piece = this.pieceActive()
    piece.parametres = new Map()
    piece.noms = new Map()
    piece.esquisse = null
    piece.dernierSupport = null
    piece.solide = null
    piece.volume = null
    piece.demiProfil = null
    piece.compteur = 0
    for (const operation of rejouables(piece.historique, piece.pointe)) {
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
      geometrie: this.geometrie && !this.vueSansGeometrie,
    }
  }
}

/** Rejoue jusqu'à l'esquisse demandée, sans la fonction qui la consomme. */
function operationsJusquaEsquisse(historique: Operation[], index: number): Operation[] {
  const sortie: Operation[] = []
  let tampon: Operation[] = []
  let vue = false
  for (let i = 0; i < historique.length; i++) {
    const operation = historique[i]
    if (operation.type === 'ouvrir') {
      tampon = [operation]
      vue = i === index
      continue
    }
    if (SOUS_ESQUISSE.has(operation.type)) {
      tampon.push(operation)
      continue
    }
    if (CONSOMME_ESQUISSE.has(operation.type)) {
      if (vue) break
      if (operation.actif !== false) sortie.push(...tampon, operation)
      tampon = []
      continue
    }
    if (operation.actif !== false) sortie.push(operation)
  }
  if (vue) sortie.push(...tampon)
  return sortie
}

function domainePointe(session: Session): Domaine {
  return {
    id: 'pointe',
    verbes: {
      pointe: (reste) => {
        const texte = reste.trim()
        if (texte === 'fin') return { type: 'pointe', arguments: { cible: 'fin' }, noms: [] }
        return { type: 'pointe', arguments: { cible: texte }, noms: [] }
      },
    },
    operations: {
      pointe: {
        dansHistorique: false,
        faire(_contexte, operation) {
          const avant = session.pointeCourante()
          operation.arguments.avant = avant === null ? 'fin' : String(avant)
          const cible = operation.arguments.cible
          if (cible === 'fin') {
            session.appliquerPointe('fin')
            return
          }
          const rang = Number(cible)
          if (!Number.isInteger(rang)) throw new ErreurApi(`pointe invalide: ${cible}`)
          try {
            session.appliquerPointe(indexFonctionParRang(session.historique(), rang))
          } catch {
            throw new ErreurApi(`rang de fonction invalide: ${cible}`)
          }
        },
        defaire(_contexte, operation) {
          const avant = operation.arguments.avant
          if (avant === 'fin' || avant === undefined) session.appliquerPointe('fin')
          else session.appliquerPointe(Number(avant))
        },
      },
    },
  }
}

function domainePiece(session: Session): Domaine {
  return {
    id: 'session',
    verbes: {
      piece: (reste) => ({ type: 'piece', arguments: { nom: reste }, noms: [reste] }),
      unite: (reste) => ({ type: 'unite', arguments: { nom: reste }, noms: [] }),
      auteur: (reste) => ({ type: 'auteur', arguments: { nom: reste }, noms: [] }),
      version: (reste) => {
        versionSemantique(reste)
        return { type: 'version', arguments: { nom: reste }, noms: [] }
      },
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
      unite: {
        dansHistorique: false,
        faire(_contexte, operation) {
          session.definirUnite(operation.arguments.nom)
        },
        defaire() {
          session.definirUnite('mm')
        },
      },
      auteur: {
        dansHistorique: false,
        faire(_contexte, operation) {
          operation.arguments.avant = session.document().auteur
          session.definirAuteur(operation.arguments.nom)
        },
        defaire(_contexte, operation) {
          session.definirAuteur(operation.arguments.avant ?? '')
        },
      },
      version: {
        dansHistorique: false,
        faire(_contexte, operation) {
          operation.arguments.avant = session.document().version
          session.definirVersion(operation.arguments.nom)
        },
        defaire(_contexte, operation) {
          session.definirVersion(operation.arguments.avant ?? '0.0.0')
        },
      },
    },
  }
}
