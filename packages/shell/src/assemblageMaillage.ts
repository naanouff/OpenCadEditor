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
import { SCRIPT_PLATEAU } from './scriptPlateau.ts'
import { SCRIPT_POIGNEE } from './scriptPoignee.ts'
import { SCRIPT_VERRE } from './scriptVerre.ts'
import { scriptVis, VIS_M4_NOYEE } from './scriptVis.ts'

/** URI → script known to the Debug graphs (boîte Milgauss, plateau). */
export const SCRIPTS_ASSEMBLAGE: Record<string, string> = {
  './carrure.cadompart': SCRIPT_CARRURE,
  './lunette.cadompart': SCRIPT_LUNETTE,
  './verre.cadompart': SCRIPT_VERRE,
  './fond.cadompart': SCRIPT_FOND,
  './couronne.cadompart': SCRIPT_COURONNE,
  './plateau.cadompart': SCRIPT_PLATEAU,
  './poignee.cadompart': SCRIPT_POIGNEE,
  './vis.cadompart': scriptVis(VIS_M4_NOYEE),
}

/** Champs d’affichage d’un `CadomatFile` v0 (PBR glTF metallic-roughness). */
export type MateriauAffichage = {
  name: string
  baseColorFactor: readonly [number, number, number, number]
  metallicFactor: number
  roughnessFactor: number
}

/** URI → contenu `.cadomat`, faute de codec : le proto n’a pas encore de paquet d’exécution. */
export const MATERIAUX_ASSEMBLAGE: Record<string, MateriauAffichage> = {
  './aluminium.cadomat': { name: 'aluminium', baseColorFactor: [0.78, 0.8, 0.83, 1], metallicFactor: 0.4, roughnessFactor: 0.55 },
  './laiton.cadomat': { name: 'laiton', baseColorFactor: [0.85, 0.66, 0.3, 1], metallicFactor: 0.4, roughnessFactor: 0.5 },
  './acier.cadomat': { name: 'acier', baseColorFactor: [0.55, 0.56, 0.58, 1], metallicFactor: 0.4, roughnessFactor: 0.55 },
}

/** Matériau de chaque face fusionnée : index dans `materiaux`, −1 sans matériau. */
export type Teintes = { materiaux: MateriauAffichage[]; parFace: number[] }

export type MaillageTeinte = MaillageOmbre & { teintes?: Teintes }

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

type PartieFusionnee = MaillageOmbre & { materiau?: MateriauAffichage }

export function fusionnerMaillages(parties: readonly PartieFusionnee[]): MaillageTeinte {
  const positions: number[] = []
  const normales: number[] = []
  const indices: number[] = []
  const faces: number[] = []
  const materiaux: MateriauAffichage[] = []
  const parFace: number[] = []
  let decalage = 0
  let faceBase = 0
  for (const partie of parties) {
    for (const v of partie.positions) positions.push(v)
    for (const v of partie.normales) normales.push(v)
    for (const i of partie.indices) indices.push(i + decalage)
    if (partie.faces) {
      let maxFace = 0
      for (const f of partie.faces) {
        faces.push(f + faceBase)
        if (f > maxFace) maxFace = f
      }
      let teinte = -1
      if (partie.materiau) {
        teinte = materiaux.findIndex((m) => m.name === partie.materiau!.name)
        if (teinte < 0) teinte = materiaux.push(partie.materiau) - 1
      }
      for (let f = 0; f <= maxFace; f++) parFace.push(teinte)
      faceBase += 1 + maxFace
    }
    decalage += partie.positions.length / 3
  }
  return {
    positions,
    normales,
    indices,
    faces: faces.length > 0 ? faces : undefined,
    teintes: materiaux.length > 0 ? { materiaux, parFace } : undefined,
  }
}

/** Une pièce posée : son script, sa matrice monde (mat4 colonne) et son matériau. Clonable vers un worker. */
export type PartieAssemblage = { script: string; monde: Float32Array; materiau?: MateriauAffichage }

export function partiesAssemblage(doc: CadomDocument): PartieAssemblage[] {
  const parties: PartieAssemblage[] = []
  for (const node of doc.nodes.values()) {
    const binding =
      node.assetBindings.find((b) => b.role === 'parametric') ?? node.assetBindings[0]
    if (!binding) continue
    const asset = doc.assets.get(binding.assetId)
    if (!asset) continue
    const script = SCRIPTS_ASSEMBLAGE[asset.uri]
    if (!script) continue
    const lienMateriau = node.assetBindings.find((b) => b.role === 'material')
    const uriMateriau = lienMateriau ? doc.assets.get(lienMateriau.assetId)?.uri : undefined
    const materiau = uriMateriau ? MATERIAUX_ASSEMBLAGE[uriMateriau] : undefined
    parties.push({ script, monde: Float32Array.from(doc.getWorldMatrix(node.id)), ...(materiau && { materiau }) })
  }
  return parties
}

/** Chaque script distinct passe une fois par OCCT ; le cache garde son maillage local. */
export function maillageDepuisParties(
  kernel: OcctKernelModule,
  parties: readonly PartieAssemblage[],
  cache: Map<string, MaillageOmbre> = new Map(),
): MaillageTeinte | null {
  const posees: PartieFusionnee[] = []
  for (const { script, monde, materiau } of parties) {
    let local = cache.get(script)
    if (!local) {
      const session = new Session({ geometrie: false })
      session.executer(script)
      local = maillagePipelineOcct(kernel, session)
      cache.set(script, local)
    }
    if (local.indices.length === 0) continue
    posees.push({ ...transformerMaillage(local, monde), materiau })
  }
  if (posees.length === 0) return null
  return fusionnerMaillages(posees)
}

export async function maillageDepuisAssemblage(
  doc: CadomDocument,
  occt?: OcctKernelModule,
): Promise<MaillageTeinte | null> {
  const kernel = occt ?? (await chargerKernel())
  return maillageDepuisParties(kernel, partiesAssemblage(doc))
}
