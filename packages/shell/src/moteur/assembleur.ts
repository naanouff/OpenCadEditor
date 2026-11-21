import type { MaillageTeinte, PartieAssemblage } from '../assemblageMaillage.ts'
import type { DemandeAssemblage, ReponseAssemblage } from './protocoleAssemblage.ts'

type Attente = { resoudre: (maille: MaillageTeinte | null) => void; rejeter: (erreur: Error) => void }

let worker: Worker | null = null
let prochainId = 0
const attentes = new Map<number, Attente>()

function demarrer(): Worker {
  const w = new Worker(new URL('./assemblageWorker.ts', import.meta.url), { type: 'module' })
  w.onmessage = (event: MessageEvent<ReponseAssemblage>) => {
    const reponse = event.data
    const attente = attentes.get(reponse.id)
    if (!attente) return
    attentes.delete(reponse.id)
    if ('erreur' in reponse) {
      attente.rejeter(new Error(reponse.erreur))
      return
    }
    const m = reponse.maille
    attente.resoudre(
      m && {
        positions: Array.from(m.positions),
        normales: Array.from(m.normales),
        indices: Array.from(m.indices),
        faces: m.faces ? Array.from(m.faces) : undefined,
        teintes: m.teintes ?? undefined,
      },
    )
  }
  return w
}

/** Assemble hors du fil principal ; le worker garde OCCT et les pièces déjà calculées. */
export function assemblerDansWorker(parties: PartieAssemblage[]): Promise<MaillageTeinte | null> {
  worker ??= demarrer()
  const id = ++prochainId
  return new Promise((resoudre, rejeter) => {
    attentes.set(id, { resoudre, rejeter })
    worker!.postMessage({ id, parties } satisfies DemandeAssemblage)
  })
}
