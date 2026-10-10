import type { Maillage } from '@opencad/api-parametrique'
import type { Moteur } from './moteur.ts'
import type { Demande, Reponse } from './protocole.ts'

/** Session complète dans un worker. Les tableaux partent en transfert, avec le numéro de séquence. */
export function moteurWorker(recevoir: (maillage: Maillage, sequence: number) => void): Moteur {
  const worker = new Worker(new URL('./geometrieWorker.ts', import.meta.url), { type: 'module' })
  worker.onmessage = (event: MessageEvent<Reponse>) => {
    const { sequence, positions, normales, indices, faces } = event.data
    const maille: Maillage = {
      positions: Array.from(positions),
      normales: Array.from(normales),
      indices: Array.from(indices),
    }
    if (faces) maille.faces = Array.from(faces)
    recevoir(maille, sequence)
  }
  const envoyer = (demande: Demande) => worker.postMessage(demande)
  return {
    executer: (script, sequence) => envoyer({ sorte: 'executer', script, sequence }),
    ligne: (texte, sequence) => envoyer({ sorte: 'ligne', texte, sequence }),
    annuler: (sequence) => envoyer({ sorte: 'annuler', sequence }),
    activer: (index, actif, sequence) => envoyer({ sorte: 'activer', index, actif, sequence }),
    pointe: (cible, sequence) => envoyer({ sorte: 'pointe', cible, sequence }),
  }
}
