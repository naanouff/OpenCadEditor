import { Session, type Maillage } from '@opencad/api-parametrique'
import { chargerKernel, type OcctKernelModule } from '../occt/chargerKernel.ts'
import { historiqueCompatibleOcct, maillagePipelineOcct } from '../occt/pipelineOcct.ts'
import type { Demande, Reponse } from './protocole.ts'

let session = new Session()
let occt: OcctKernelModule | null = null
let occtPret: Promise<OcctKernelModule> | null = null

function assurerOcct() {
  if (occt) return Promise.resolve(occt)
  if (!occtPret) {
    occtPret = chargerKernel().then((module) => {
      occt = module
      return module
    })
  }
  return occtPret
}

function repondre(sequence: number, maille: Maillage) {
  const positions = new Float64Array(maille.positions)
  const normales = new Float64Array(maille.normales ?? [])
  const indices = new Uint32Array(maille.indices)
  const faces = maille.faces ? new Uint32Array(maille.faces) : null
  const transfert: Transferable[] = [positions.buffer, normales.buffer, indices.buffer]
  if (faces) transfert.push(faces.buffer)
  const reponse: Reponse = { sequence, positions, normales, indices, faces }
  postMessage(reponse, transfert)
}

function maillageCourant(kernel: OcctKernelModule | null): Maillage {
  const historique = session.historique()
  const pointe = session.pointeCourante()
  if (kernel && historiqueCompatibleOcct(historique, pointe)) {
    try {
      return maillagePipelineOcct(kernel, session)
    } catch (erreur) {
      console.error(erreur instanceof Error ? erreur.message : String(erreur))
    }
  }
  return session.maillage()
}

onmessage = (event: MessageEvent<Demande>) => {
  const demande = event.data
  void (async () => {
    const kernel = await assurerOcct().catch((erreur: unknown) => {
      console.error(erreur instanceof Error ? erreur.message : String(erreur))
      return null
    })
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
    } else if (demande.sorte === 'activer') session.activer(demande.index, demande.actif)
    else if (demande.sorte === 'pointe') {
      try {
        session.poserPointe(demande.cible)
      } catch {
        // L’interface a déjà signalé l’erreur.
      }
    } else if (demande.sorte === 'refaire') {
      try {
        session.refaire()
      } catch {
        // Rien à refaire.
      }
    } else if (demande.sorte === 'remplacer') {
      session.reinitialiser()
      if (demande.script.trim()) session.executer(demande.script)
    } else if (demande.sorte === 'ouvrir') {
      session = new Session()
      session.executer(demande.script)
      for (const index of demande.eteins) session.activer(index, false)
    }
    repondre(demande.sequence, maillageCourant(kernel))
  })()
}
