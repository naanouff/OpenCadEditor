import { Session, type Maillage } from '@opencad/api-parametrique'
import type { Demande, Reponse } from './protocole.ts'

const session = new Session()

function repondre(sequence: number) {
  const maille: Maillage = session.maillage()
  const positions = new Float64Array(maille.positions)
  const normales = new Float64Array(maille.normales ?? [])
  const indices = new Uint32Array(maille.indices)
  const faces = maille.faces ? new Uint32Array(maille.faces) : null
  const transfert: Transferable[] = [positions.buffer, normales.buffer, indices.buffer]
  if (faces) transfert.push(faces.buffer)
  const reponse: Reponse = { sequence, positions, normales, indices, faces }
  postMessage(reponse, transfert)
}

onmessage = (event: MessageEvent<Demande>) => {
  const demande = event.data
  if (demande.sorte === 'executer') session.executer(demande.script)
  else if (demande.sorte === 'ligne') {
    try {
      session.commande(demande.texte)
    } catch {
      // L’interface a déjà signalé l’erreur.
    }
  } else if (demande.sorte === 'annuler') {
    try {
      session.annuler()
    } catch {
      // Rien à annuler.
    }
  } else session.activer(demande.index, demande.actif)
  repondre(demande.sequence)
}
