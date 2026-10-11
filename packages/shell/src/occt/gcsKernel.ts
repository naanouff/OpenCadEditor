/**
 * Pont Session → `@opencad/kernel/sketch` (O2-8).
 * Motifs supportés : rectangle, cercle, polygone/hex/octo (sans corne / segment).
 */
import { resoudreEsquisse, type EsquisseKernel, type EsquisseResolue } from '@opencad/kernel/sketch'
import type { Esquisse } from '@opencad/api-parametrique'

const SORTES_KERNEL = new Set([
  'rectangle',
  'cercle',
  'polygone',
  'hexagone',
  'octogone',
])

/** true si l’esquisse peut être résolue par le GCS OpenCAD (pas de corne / profil). */
export function esquisseCompatibleKernel(esquisse: Esquisse): boolean {
  const { entites } = esquisse
  if (entites.length === 0) return false
  for (const e of entites) {
    if (!SORTES_KERNEL.has(e.sorte)) return false
    if (e.ecart !== undefined || e.debord !== undefined) return false
  }
  return true
}

export function esquisseVersKernel(esquisse: Esquisse): EsquisseKernel {
  const rectangles: NonNullable<EsquisseKernel['rectangles']> = []
  const cercles: NonNullable<EsquisseKernel['cercles']> = []
  const polygones: NonNullable<EsquisseKernel['polygones']> = []
  for (const e of esquisse.entites) {
    if (e.sorte === 'rectangle') {
      rectangles.push({ id: e.id, longueur: e.longueur, largeur: e.largeur })
    } else if (e.sorte === 'cercle') {
      cercles.push({ id: e.id, diametre: e.diametre })
    } else if (e.sorte === 'polygone' || e.sorte === 'hexagone' || e.sorte === 'octogone') {
      const pans =
        e.sorte === 'polygone' ? (e.pans ?? 0) : e.sorte === 'hexagone' ? 6 : 8
      polygones.push({ id: e.id, pans, entreplat: e.entreplat })
    }
  }
  return { rectangles, cercles, polygones }
}

/** Résout via le kernel ; `null` si motif hors scope. */
export function resoudreViaKernel(
  esquisse: Esquisse,
  parametres: Map<string, string>,
): EsquisseResolue | null {
  if (!esquisseCompatibleKernel(esquisse)) return null
  return resoudreEsquisse(esquisseVersKernel(esquisse), parametres)
}

export type { EsquisseResolue }
