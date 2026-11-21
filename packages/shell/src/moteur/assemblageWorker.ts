import type { MaillageOmbre } from '@opencad/api-parametrique'
import { maillageDepuisParties } from '../assemblageMaillage.ts'
import { chargerKernel, type OcctKernelModule } from '../occt/chargerKernel.ts'
import type { DemandeAssemblage, ReponseAssemblage } from './protocoleAssemblage.ts'

let occtPret: Promise<OcctKernelModule> | null = null
const cache = new Map<string, MaillageOmbre>()

onmessage = (event: MessageEvent<DemandeAssemblage>) => {
  const { id, parties } = event.data
  void (async () => {
    try {
      occtPret ??= chargerKernel()
      const maille = maillageDepuisParties(await occtPret, parties, cache)
      if (!maille) {
        postMessage({ id, maille: null } satisfies ReponseAssemblage)
        return
      }
      const positions = new Float64Array(maille.positions)
      const normales = new Float64Array(maille.normales)
      const indices = new Uint32Array(maille.indices)
      const faces = maille.faces ? new Uint32Array(maille.faces) : null
      const transfert: Transferable[] = [positions.buffer, normales.buffer, indices.buffer]
      if (faces) transfert.push(faces.buffer)
      const reponse: ReponseAssemblage = { id, maille: { positions, normales, indices, faces, teintes: maille.teintes ?? null } }
      postMessage(reponse, transfert)
    } catch (erreur) {
      postMessage({ id, erreur: erreur instanceof Error ? erreur.message : String(erreur) } satisfies ReponseAssemblage)
    }
  })()
}
