import { Session, type Maillage } from '@opencad/api-parametrique'

export type Moteur = {
  executer(script: string, sequence: number): void
  ligne(texte: string, sequence: number): void
  annuler(sequence: number): void
  activer(index: number, actif: boolean, sequence: number): void
  pointe(cible: number | 'fin', sequence: number): void
}

/** Une réponse n’est appliquée que si son numéro est encore celui de la demande en cours. */
export function reponseUtile(sequence: number, attendue: number) {
  return sequence === attendue
}

/** Session complète sur le fil appelant. Les tests Node passent par là. */
export function moteurSynchrone(recevoir: (maillage: Maillage, sequence: number) => void): Moteur {
  const session = new Session()
  const pousser = (sequence: number) => recevoir(session.maillage(), sequence)
  return {
    executer(script, sequence) {
      session.executer(script)
      pousser(sequence)
    },
    ligne(texte, sequence) {
      try {
        session.commande(texte)
      } catch {
        // Le terminal a déjà le message. Le maillage reste celui d’avant l’erreur.
      }
      pousser(sequence)
    },
    annuler(sequence) {
      try {
        session.annuler()
      } catch {
        // Rien à annuler : même état des deux côtés.
      }
      pousser(sequence)
    },
    activer(index, actif, sequence) {
      session.activer(index, actif)
      pousser(sequence)
    },
    pointe(cible, sequence) {
      session.poserPointe(cible)
      pousser(sequence)
    },
  }
}
