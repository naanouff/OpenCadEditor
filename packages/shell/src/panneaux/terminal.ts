import { ErreurApi } from '@opencad/api-parametrique'
import type { EntreeJournal, Panneau } from '../types.ts'

export function panneauTerminal(): Panneau {
  const journal: EntreeJournal[] = []
  const annulees: EntreeJournal[] = []
  return {
    id: 'terminal',
    journal,
    saisir(hote, ligne) {
      annulees.length = 0
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
      annulees.push(derniere)
      if (!derniere.erreur) hote.session.annuler()
    },
    refaire(hote) {
      const entree = annulees.pop()
      if (!entree) return
      journal.push(entree)
      if (!entree.erreur) hote.session.refaire()
    },
    vider() {
      journal.length = 0
      annulees.length = 0
    },
    afficher() {
      return journal.map((entree) => entree.erreur ?? entree.ligne).join('\n')
    },
  }
}
