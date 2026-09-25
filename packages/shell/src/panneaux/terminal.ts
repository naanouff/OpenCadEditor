import { ErreurApi } from '@opencad/api-parametrique'
import type { EntreeJournal, Panneau } from '../types.ts'

export function panneauTerminal(): Panneau {
  const journal: EntreeJournal[] = []
  return {
    id: 'terminal',
    journal,
    saisir(hote, ligne) {
      try {
        hote.session.commande(ligne)
        journal.push({ ligne, erreur: null })
      } catch (erreur) {
        const message = erreur instanceof ErreurApi ? erreur.message : String(erreur)
        journal.push({ ligne, erreur: message })
      }
    },
    annuler(hote) {
      const derniere = journal.at(-1)
      if (!derniere) return
      journal.pop()
      if (!derniere.erreur) hote.session.annuler()
    },
    afficher() {
      return journal.map((entree) => entree.erreur ?? entree.ligne).join('\n')
    },
  }
}
