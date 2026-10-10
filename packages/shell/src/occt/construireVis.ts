/**
 * Façade de test : la vis passe par le pipeline générique.
 * Le worker n'importe plus ce module.
 */
import { Session, type Maillage, type MaillageOmbre } from '@opencad/api-parametrique'
import { SCRIPT_VIS } from '../scriptVis.ts'
import { runBatch, type OcctKernelModule } from './chargerKernel.ts'
import { polylinesDepuisEsquisse } from './esquissePolylines.ts'
import { maillageDepuisTessellate } from './maillageDepuisTessellate.ts'
import { opsRevolution } from './opsDepuisFonction.ts'
import { maillagePipelineOcct } from './pipelineOcct.ts'

const LONGUEUR = 30
const R_EXT = 3
const R_AME = 1.75
const R_TETE = 6
const Y_AME = R_AME / Math.tan((30 / 2) * (Math.PI / 180))
const Y_EPAULE = LONGUEUR - (R_TETE * 2 - R_EXT * 2) / 2

function sessionSansPas() {
  const session = new Session({ geometrie: false })
  session.executer(SCRIPT_VIS.replace(/\npas\n/, '\n'))
  return session
}

function sessionSansPasSansPozi() {
  const session = new Session({ geometrie: false })
  const script = SCRIPT_VIS.replace(/\npas\n/, '\n').replace(/\nesquisse plan\.dessus[\s\S]*$/, '\n')
  session.executer(script.trim())
  return session
}

/** Corps lisse (sans filet) + tête + empreinte Pozi. */
export function solideVisOcct(occt: OcctKernelModule): Maillage {
  return maillagePipelineOcct(occt, sessionSansPas())
}

/** Même solide sans empreinte Pozi. */
export function solideVisOcctSansPozi(occt: OcctKernelModule): Maillage {
  return maillagePipelineOcct(occt, sessionSansPasSansPozi())
}

/** Corps lisse seul. */
export function corpsLisseOcct(occt: OcctKernelModule): Maillage {
  const poly = polylinesDepuisEsquisse(
    {
      support: 'plan.12h',
      entites: [
        { id: 'a', sorte: 'segment', degres: 0, rayon: '0', hauteur: '0' },
        { id: 'b', sorte: 'segment', degres: 0, rayon: String(R_AME), hauteur: String(Y_AME) },
        { id: 'c', sorte: 'segment', degres: 0, rayon: String(R_AME), hauteur: String(Y_EPAULE) },
        { id: 'd', sorte: 'segment', degres: 0, rayon: '0', hauteur: String(Y_EPAULE) },
      ],
    },
    new Map(),
  )[0]!
  const feat = opsRevolution(poly, 'corps')
  const out = runBatch(occt, [
    { op: 'arena_clear' },
    ...feat.ops,
    { op: 'tessellate', args: [{ handle: feat.as }, 'normal'], as: 'mesh' },
  ])
  if (!out.ok) throw new Error(out.error ?? 'corps lisse failed')
  return maillageDepuisTessellate(out.aliases?.mesh as { ok?: boolean; meshes?: unknown[] })
}

/** Vis complète via pipeline (hybride `pas`). */
export function maillageVisHybride(occt: OcctKernelModule): MaillageOmbre {
  const session = new Session({ geometrie: false })
  session.executer(SCRIPT_VIS)
  return maillagePipelineOcct(occt, session)
}
