/**
 * Rebuild viewport mesh for a known `.cadom` assembly: run piece scripts via OCCT,
 * apply node world matrices, merge. Unknown asset URIs are skipped.
 */
import { Session, type MaillageOmbre } from '@opencad/api-parametrique'
import type { CadomDocument } from '@opencad/cadom'
import { chargerKernel, type OcctKernelModule } from './occt/chargerKernel.ts'
import { maillagePipelineOcct } from './occt/pipelineOcct.ts'
import { SCRIPT_CARRURE } from './scriptCarrure.ts'
import { SCRIPT_COURONNE } from './scriptCouronne.ts'
import { SCRIPT_FOND } from './scriptFond.ts'
import { SCRIPT_LUNETTE } from './scriptLunette.ts'
import { SCRIPT_VERRE } from './scriptVerre.ts'

/** URI → script known to the Debug / Milgauss boîte graph. */
export const SCRIPTS_ASSEMBLAGE: Record<string, string> = {
  './carrure.cadompart': SCRIPT_CARRURE,
  './lunette.cadompart': SCRIPT_LUNETTE,
  './verre.cadompart': SCRIPT_VERRE,
  './fond.cadompart': SCRIPT_FOND,
  './couronne.cadompart': SCRIPT_COURONNE,
}

/** Apply column-major mat4 to positions ; rotate normals. */
export function transformerMaillage(maille: MaillageOmbre, world: Float32Array): MaillageOmbre {
  const positions = new Array<number>(maille.positions.length)
  const normales = new Array<number>(maille.normales.length)
  for (let i = 0; i < maille.positions.length; i += 3) {
    const x = maille.positions[i]!
    const y = maille.positions[i + 1]!
    const z = maille.positions[i + 2]!
    positions[i] = world[0]! * x + world[4]! * y + world[8]! * z + world[12]!
    positions[i + 1] = world[1]! * x + world[5]! * y + world[9]! * z + world[13]!
    positions[i + 2] = world[2]! * x + world[6]! * y + world[10]! * z + world[14]!
    const nx = maille.normales[i] ?? 0
    const ny = maille.normales[i + 1] ?? 0
    const nz = maille.normales[i + 2] ?? 0
    let rx = world[0]! * nx + world[4]! * ny + world[8]! * nz
    let ry = world[1]! * nx + world[5]! * ny + world[9]! * nz
    let rz = world[2]! * nx + world[6]! * ny + world[10]! * nz
    const len = Math.hypot(rx, ry, rz) || 1
    normales[i] = rx / len
    normales[i + 1] = ry / len
    normales[i + 2] = rz / len
  }
  return {
    positions,
    normales,
    indices: [...maille.indices],
    faces: maille.faces ? [...maille.faces] : undefined,
  }
}

export function fusionnerMaillages(parties: MaillageOmbre[]): MaillageOmbre {
  const positions: number[] = []
  const normales: number[] = []
  const indices: number[] = []
  const faces: number[] = []
  let decalage = 0
  let faceBase = 0
  for (const partie of parties) {
    positions.push(...partie.positions)
    normales.push(...partie.normales)
    for (const i of partie.indices) indices.push(i + decalage)
    if (partie.faces) {
      for (const f of partie.faces) faces.push(f + faceBase)
      faceBase += 1 + Math.max(0, ...partie.faces)
    }
    decalage += partie.positions.length / 3
  }
  return {
    positions,
    normales,
    indices,
    faces: faces.length > 0 ? faces : undefined,
  }
}

export async function maillageDepuisAssemblage(
  doc: CadomDocument,
  occt?: OcctKernelModule,
): Promise<MaillageOmbre | null> {
  const kernel = occt ?? (await chargerKernel())
  const parties: MaillageOmbre[] = []
  for (const node of doc.nodes.values()) {
    const binding =
      node.assetBindings.find((b) => b.role === 'parametric') ?? node.assetBindings[0]
    if (!binding) continue
    const asset = doc.assets.get(binding.assetId)
    if (!asset) continue
    const script = SCRIPTS_ASSEMBLAGE[asset.uri]
    if (!script) continue
    const session = new Session({ geometrie: false })
    session.executer(script)
    const local = maillagePipelineOcct(kernel, session)
    if (local.indices.length === 0) continue
    parties.push(transformerMaillage(local, doc.getWorldMatrix(node.id)))
  }
  if (parties.length === 0) return null
  return fusionnerMaillages(parties)
}
