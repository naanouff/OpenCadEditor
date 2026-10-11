/**
 * Pont Session → `@opencad/kernel/sketch` (O2-8+).
 * Motifs supportés : rectangle, cercle (+ concentrique), polygone/hex/octo, corne + symétrie.
 * Hors scope : profil révolution (segment rayon/hauteur).
 */
import { resoudreEsquisse, type EsquisseKernel, type EsquisseResolue } from '@opencad/kernel/sketch'
import type { Esquisse } from '@opencad/api-parametrique'

const SORTES_KERNEL = new Set([
  'rectangle',
  'cercle',
  'polygone',
  'hexagone',
  'octogone',
  'segment',
  'arc',
])

function estProfilRevolution(esquisse: Esquisse): boolean {
  return esquisse.entites.some(
    (e) => e.sorte === 'segment' && e.rayon !== undefined && e.hauteur !== undefined,
  )
}

function estMotifCorne(esquisse: Esquisse): boolean {
  const segments = esquisse.entites.filter((e) => e.sorte === 'segment')
  const arcs = esquisse.entites.filter((e) => e.sorte === 'arc')
  if (segments.length < 3 || arcs.length < 1) return false
  return (
    segments.some((e) => e.ecart !== undefined) &&
    segments.some((e) => e.debord !== undefined) &&
    segments.filter((e) => e.largeur !== undefined).length >= 2 &&
    arcs.some((e) => e.rayon !== undefined)
  )
}

/** true si l’esquisse peut être résolue par le GCS OpenCAD. */
export function esquisseCompatibleKernel(esquisse: Esquisse): boolean {
  const { entites } = esquisse
  if (entites.length === 0) return false
  if (estProfilRevolution(esquisse)) return false
  const hasSegmentOrArc = entites.some((e) => e.sorte === 'segment' || e.sorte === 'arc')
  if (hasSegmentOrArc && !estMotifCorne(esquisse)) return false
  for (const e of entites) {
    if (!SORTES_KERNEL.has(e.sorte)) return false
  }
  return true
}

export function esquisseVersKernel(esquisse: Esquisse): EsquisseKernel {
  const rectangles: NonNullable<EsquisseKernel['rectangles']> = []
  const cercles: NonNullable<EsquisseKernel['cercles']> = []
  const polygones: NonNullable<EsquisseKernel['polygones']> = []
  const segments: NonNullable<EsquisseKernel['segments']> = []
  const arcs: NonNullable<EsquisseKernel['arcs']> = []
  for (const e of esquisse.entites) {
    if (e.sorte === 'rectangle') {
      rectangles.push({ id: e.id, longueur: e.longueur, largeur: e.largeur })
    } else if (e.sorte === 'cercle') {
      cercles.push({ id: e.id, diametre: e.diametre, concentrique: e.concentrique })
    } else if (e.sorte === 'segment') {
      segments.push({
        id: e.id,
        rayon: e.rayon,
        hauteur: e.hauteur,
        ecart: e.ecart,
        debord: e.debord,
        largeur: e.largeur,
      })
    } else if (e.sorte === 'arc') {
      arcs.push({ id: e.id, rayon: e.rayon, concentrique: e.concentrique })
    } else if (e.sorte === 'polygone' || e.sorte === 'hexagone' || e.sorte === 'octogone') {
      const pans =
        e.sorte === 'polygone' ? (e.pans ?? 0) : e.sorte === 'hexagone' ? 6 : 8
      polygones.push({ id: e.id, pans, entreplat: e.entreplat })
    }
  }
  return {
    rectangles,
    cercles,
    polygones,
    segments,
    arcs,
    symetries: esquisse.symetries ? [...esquisse.symetries] : undefined,
  }
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
