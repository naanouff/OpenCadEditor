import { ErreurApi, Session } from '@opencad/api-parametrique'

export type ViewportMcp = { triangles: number; erreur: string | null } | null

export type EtatMcp = {
  piece: string | null
  unite: string
  parametres: { nom: string; expression: string }[]
  historique: {
    index: number
    domaine: string
    type: string
    arguments: Record<string, string>
    actif: boolean
  }[]
  pointe: number | null
  esquisse: { statut: string; degres: number; ferme: boolean } | null
  script: string
  viewport: ViewportMcp
  conflit: boolean
}

type Jeton = { sorte: 'ligne'; texte: string } | { sorte: 'pointe' }

export function lignesUtiles(script: string) {
  return script
    .split('\n')
    .map((ligne) => ligne.trim())
    .filter((ligne) => ligne.length > 0 && !ligne.startsWith('#'))
}

function empreinte(session: Session) {
  const piece = session.pieceCourante()
  return JSON.stringify({
    piece,
    unite: session.unite(),
    auteur: session.document().auteur,
    version: session.document().version,
    historique: piece ? session.historique() : [],
    parametres: piece ? session.parametres() : [],
    pointe: piece ? session.pointeCourante() : null,
  })
}

export class Controle {
  readonly session: Session
  conflit = false
  private jetons: Jeton[] = []
  private annules: Jeton[] = []
  private scriptEditeur = ''
  private viewport: ViewportMcp = null

  constructor(session = new Session()) {
    this.session = session
  }

  script() {
    return this.jetons
      .filter((jeton): jeton is { sorte: 'ligne'; texte: string } => jeton.sorte === 'ligne')
      .map((jeton) => jeton.texte)
      .join('\n')
  }

  definirViewport(viewport: ViewportMcp) {
    this.viewport = viewport
  }

  etat(): EtatMcp {
    const esquisse = this.session.etatEsquisse()
    return {
      piece: this.session.pieceCourante(),
      unite: this.session.unite(),
      parametres: this.session.parametres().map(([nom, expression]) => ({ nom, expression })),
      historique: this.session.historique().map((operation, index) => ({
        index,
        domaine: operation.domaine,
        type: operation.type,
        arguments: operation.arguments,
        actif: operation.actif !== false,
      })),
      pointe: this.session.pointeCourante(),
      esquisse: esquisse
        ? { statut: esquisse.statut ?? 'sous-contraint', degres: esquisse.degres, ferme: esquisse.ferme }
        : null,
      script: this.script(),
      viewport: this.viewport,
      conflit: this.conflit,
    }
  }

  commande(ligne: string) {
    this.exigerLibre()
    const texte = ligne.trim()
    if (!texte || texte.startsWith('#')) return
    const avant = empreinte(this.session)
    try {
      this.session.commande(texte)
    } catch (erreur) {
      this.restaurer(avant)
      throw erreur
    }
    this.jetons.push({ sorte: 'ligne', texte })
    this.annules = []
  }

  executer(script: string) {
    this.exigerLibre()
    const utiles = lignesUtiles(script)
    const avant = empreinte(this.session)
    try {
      this.session.executer(utiles.join('\n'))
    } catch (erreur) {
      this.restaurer(avant)
      throw erreur
    }
    for (const texte of utiles) this.jetons.push({ sorte: 'ligne', texte })
    this.annules = []
  }

  annuler() {
    this.exigerLibre()
    this.session.annuler()
    const jeton = this.jetons.pop()
    if (jeton) this.annules.push(jeton)
    return { journal: jeton?.sorte === 'ligne' }
  }

  refaire() {
    this.exigerLibre()
    this.session.refaire()
    const jeton = this.annules.pop()
    if (jeton) this.jetons.push(jeton)
    return { journal: jeton?.sorte === 'ligne' }
  }

  pointe(cible: number | 'fin') {
    this.commande(cible === 'fin' ? 'pointe fin' : `pointe ${cible}`)
  }

  poserPointe(cible: number | 'fin') {
    this.exigerLibre()
    const avant = this.session.pointeCourante()
    this.session.poserPointe(cible)
    if (this.session.pointeCourante() === avant) return
    this.jetons.push({ sorte: 'pointe' })
    this.annules = []
  }

  activer(index: number, actif: boolean) {
    this.exigerLibre()
    this.session.activer(index, actif)
  }

  bonjour(script: string) {
    this.scriptEditeur = script
    const local = this.script()
    const distant = lignesUtiles(script).join('\n')
    if (local === distant) {
      this.conflit = false
      return { pareil: true as const }
    }
    if (!local && distant) {
      this.adopter(script)
      return { adopter: true as const }
    }
    if (local && !distant) {
      this.conflit = false
      return { remplacer: local }
    }
    this.conflit = true
    return { conflit: true as const }
  }

  aligner(source: 'mcp' | 'editeur') {
    if (source === 'editeur') {
      this.adopter(this.scriptEditeur)
      return { adopter: true as const }
    }
    this.conflit = false
    return { remplacer: this.script() }
  }

  adopter(script: string) {
    const utiles = lignesUtiles(script)
    this.session.reinitialiser()
    this.jetons = utiles.map((texte) => ({ sorte: 'ligne' as const, texte }))
    this.annules = []
    this.conflit = false
    if (utiles.length > 0) this.session.executer(utiles.join('\n'))
  }

  private exigerLibre() {
    if (this.conflit) throw new ErreurApi('conflit de script')
  }

  private restaurer(avant: string) {
    for (let i = 0; i < 1000 && empreinte(this.session) !== avant; i++) {
      try {
        this.session.annuler()
      } catch {
        break
      }
    }
  }
}
