import { Session } from '@opencad/api-parametrique'
import { panneauTerminal } from './panneaux/terminal.ts'
import { panneauViewport } from './panneaux/viewport.ts'
import type { EntreeJournal, Panneau } from './types.ts'

export class Hote {
  readonly session = new Session()
  private readonly panneaux: Panneau[] = []

  constructor() {
    this.enregistrer(panneauTerminal())
    this.enregistrer(panneauViewport())
  }

  executer(script: string) {
    for (const ligne of script.split('\n')) this.ligne(ligne)
  }

  enregistrer(panneau: Panneau) {
    this.panneaux.push(panneau)
  }

  ligne(texte: string) {
    for (const panneau of this.panneaux) panneau.saisir?.(this, texte)
    if (!texte.trim()) return
    const maillage = this.session.maillage()
    for (const panneau of this.panneaux) panneau.recevoir?.(maillage)
  }

  maillagesRecus() {
    return this.panneaux.flatMap((panneau) => [...(panneau.maillages ?? [])])
  }

  annuler() {
    for (const panneau of this.panneaux) panneau.annuler?.(this)
  }

  get journal(): EntreeJournal[] {
    return this.panneaux.flatMap((panneau) => panneau.journal ?? [])
  }

  afficher() {
    return this.panneaux.map((panneau) => panneau.afficher())
  }
}
