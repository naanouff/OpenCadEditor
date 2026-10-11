/**
 * Sprint 54 — octets `.cadomesh` pour les pièces de l’assemblage boîte.
 * Rebuild OCCT → `ecrireCadomesh` (writer navigateur `@opencad/kernel/cadomesh`).
 */
import { Session } from '@opencad/api-parametrique'
import { ecrireCadomesh, lireCadomesh } from '@opencad/kernel/cadomesh'
import { SCRIPTS_ASSEMBLAGE } from './assemblageMaillage.ts'
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
