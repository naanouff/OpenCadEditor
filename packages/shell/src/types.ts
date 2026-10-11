import type { Maillage, Session } from '@opencad/api-parametrique'

export type EntreeJournal = {
  ligne: string
  erreur: string | null
}

export type Panneau = {
  id: string
  journal?: EntreeJournal[]
  maillages?: Maillage[]
  saisir?(hote: { session: Session }, ligne: string): void
  annuler?(hote: { session: Session }): void
  refaire?(hote: { session: Session }): void
  vider?(): void
  recevoir?(maillage: Maillage): void
  afficher(): string
}
