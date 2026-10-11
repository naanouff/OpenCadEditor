/**
 * Octets `.cadomesh` pour les pièces de l’assemblage boîte (54)
 * et affichage viewport depuis mesh (55).
 */
import type { MaillageOmbre } from '@opencad/api-parametrique'
import { Session } from '@opencad/api-parametrique'
import type { CadomDocument } from '@opencad/cadom'
import { ecrireCadomesh, lireCadomesh } from '@opencad/kernel/cadomesh'
import {
  fusionnerMaillages,
  SCRIPTS_ASSEMBLAGE,
  transformerMaillage,
} from './assemblageMaillage.ts'
import { chargerKernel, type OcctKernelModule } from './occt/chargerKernel.ts'
import { maillagePipelineOcct } from './occt/pipelineOcct.ts'

/** Map URI `.cadomesh` → URI `.cadompart` connue. */
export const URI_CADOMESH: Record<string, string> = {
  './carrure.cadomesh': './carrure.cadompart',
  './lunette.cadomesh': './lunette.cadompart',
  './verre.cadomesh': './verre.cadompart',
  './fond.cadomesh': './fond.cadompart',
  './couronne.cadomesh': './couronne.cadompart',
}

function nomDepuisUri(uri: string): string {
  const base = uri.replace(/^\.\//, '').replace(/\.cadomesh$/, '')
  return base || 'piece'
}

/** Encode un maillage Session → octets `.cadomesh`. */
export function octetsDepuisMaillage(
  positions: number[],
  normales: number[],
  indices: number[],
  name: string,
): Uint8Array {
  return ecrireCadomesh(
    {
      triangleCount: Math.floor(indices.length / 3),
      positions,
      normales,
      indices,
    },
    { name },
  )
}

/**
 * Rebuild chaque pièce connue et produit les octets `.cadomesh` (URI mesh → bytes).
 */
export async function octetsCadomeshBoite(
  occt?: OcctKernelModule,
): Promise<Map<string, Uint8Array>> {
  const kernel = occt ?? (await chargerKernel())
  const out = new Map<string, Uint8Array>()
  for (const [meshUri, partUri] of Object.entries(URI_CADOMESH)) {
    const script = SCRIPTS_ASSEMBLAGE[partUri]
    if (!script) continue
    const session = new Session({ geometrie: false })
    session.executer(script)
    const maille = maillagePipelineOcct(kernel, session)
    if (maille.indices.length === 0) continue
    out.set(
      meshUri,
      octetsDepuisMaillage(maille.positions, maille.normales, maille.indices, nomDepuisUri(meshUri)),
    )
  }
  return out
}

/** Relit un `.cadomesh` pour tests / chargeur. */
export { lireCadomesh }

/** Decode local mesh bytes → viewport mesh (no OCCT). */
export function maillageDepuisCadomesh(
  doc: CadomDocument,
  octetsParUri: ReadonlyMap<string, Uint8Array>,
): MaillageOmbre | null {
  const parties: MaillageOmbre[] = []
  for (const node of doc.nodes.values()) {
    const binding = node.assetBindings.find((b) => b.role === 'mesh')
    if (!binding) continue
    const asset = doc.assets.get(binding.assetId)
    if (!asset) continue
    const octets = octetsParUri.get(asset.uri)
    if (!octets) continue
    let file
    try {
      file = lireCadomesh(octets)
    } catch {
      continue
    }
    if (file.indices.length === 0) continue
    const normales =
      file.normals.length === file.positions.length
        ? file.normals
        : new Array(file.positions.length).fill(0)
    parties.push(
      transformerMaillage(
        { positions: file.positions, normales, indices: file.indices },
        doc.getWorldMatrix(node.id),
      ),
    )
  }
  if (parties.length === 0) return null
  return fusionnerMaillages(parties)
}

/** Collect mesh-role URI → bytes from a late-load statut map (assetId keyed). */
export function octetsMeshDepuisStatuts(
  doc: CadomDocument,
  statuts: ReadonlyMap<string, { etat: string; octets?: Uint8Array }>,
): Map<string, Uint8Array> {
  const out = new Map<string, Uint8Array>()
  for (const node of doc.nodes.values()) {
    const binding = node.assetBindings.find((b) => b.role === 'mesh')
    if (!binding) continue
    const asset = doc.assets.get(binding.assetId)
    const statut = statuts.get(binding.assetId)
    if (!asset || !statut?.octets || statut.etat !== 'ok') continue
    out.set(asset.uri, statut.octets)
  }
  return out
}
