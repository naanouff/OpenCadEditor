import { Session, type Maillage } from '@opencad/api-parametrique'
import { chargerKernel, runBatch, type OcctKernelModule } from '../occt/chargerKernel.ts'
import type { Demande, Reponse } from './protocole.ts'

const session = new Session()
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

onmessage = (event: MessageEvent<Demande>) => {
  const demande = event.data
  void assurerOcct().catch((erreur: unknown) => {
    console.error(erreur instanceof Error ? erreur.message : String(erreur))
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
  } else session.activer(demande.index, demande.actif)
  // Chemin actuel : Session / noyauProvisoire. OCCT est préchargé pour la suite du sprint.
  repondre(demande.sequence, session.maillage())
}

/** Exposé pour les tests du worker : smoke batch sans Session. */
export async function smokeOcctBox(): Promise<number> {
  const kernel = await assurerOcct()
  const out = runBatch(kernel, [
    { op: 'make_box', args: [10, 10, 10], as: 'body' },
    { op: 'tessellate', args: [{ handle: 'body' }, 'normal'], as: 'mesh' },
  ])
  if (!out.ok) throw new Error(out.error ?? 'batch failed')
  const mesh = out.aliases?.mesh as { triangleCount?: number }
  return mesh?.triangleCount ?? 0
}
