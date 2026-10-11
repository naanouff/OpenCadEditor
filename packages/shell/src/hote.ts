import { Session } from '@opencad/api-parametrique'
import { panneauTerminal } from './panneaux/terminal.ts'
import { panneauViewport } from './panneaux/viewport.ts'
import type { EntreeJournal, Panneau } from './types.ts'

export class Hote {
  readonly session: Session
  private readonly panneaux: Panneau[] = []

  constructor(options?: { geometrie?: boolean }) {
    this.session = new Session({ geometrie: options?.geometrie })
    this.enregistrer(panneauTerminal())
    this.enregistrer(panneauViewport())
  }

  executer(script: string) {
    this.session.lot(() => {
      for (const ligne of script.split('\n')) this.ligne(ligne)
    })
    this.pousserMaillage()
  }

  enregistrer(panneau: Panneau) {
    this.panneaux.push(panneau)
  }

  ligne(texte: string) {
    for (const panneau of this.panneaux) panneau.saisir?.(this, texte)
    if (!texte.trim() || this.session.constructionDifferee) return
    this.pousserMaillage()
  }

  private pousserMaillage() {
    const maillage = this.session.maillage()
    for (const panneau of this.panneaux) panneau.recevoir?.(maillage)
  }

  maillagesRecus() {
    return this.panneaux.flatMap((panneau) => [...(panneau.maillages ?? [])])
  }

  annuler() {
    for (const panneau of this.panneaux) panneau.annuler?.(this)
  }

  refaire() {
    for (const panneau of this.panneaux) panneau.refaire?.(this)
  }

  viderJournal() {
    for (const panneau of this.panneaux) panneau.vider?.()
  }

  get journal(): EntreeJournal[] {
    return this.panneaux.flatMap((panneau) => panneau.journal ?? [])
  }

  afficher() {
    return this.panneaux.map((panneau) => panneau.afficher())
  }
}
