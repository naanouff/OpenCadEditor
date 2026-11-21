/**
 * Traits d’arête à épaisseur constante à l’écran, sortis de la matière.
 * Les rubans w3dts ont une largeur en mètres : elle est recalculée quand le zoom change.
 */
import type { AreteBrep } from './selectionSegment.ts'

/** Segments xyz par paires et sens de sortie (3 valeurs par segment). */
export type Traits = { segments: number[]; normales: number[] }

export const traitsVides: Traits = { segments: [], normales: [] }

export function traitsDe(aretes: readonly AreteBrep[], echelle = 1): Traits {
  const segments: number[] = []
  const normales: number[] = []
  for (const arete of aretes) {
    for (const s of arete.segments) {
      segments.push(s.a[0] * echelle, s.a[1] * echelle, s.a[2] * echelle, s.b[0] * echelle, s.b[1] * echelle, s.b[2] * echelle)
      normales.push(s.normale[0], s.normale[1], s.normale[2])
    }
  }
  return { segments, normales }
}

/** Traits sans normale (grille, fil sans topologie) : posés tels quels. */
export function traitsBruts(segments: number[]): Traits {
  return { segments, normales: [] }
}

export function decaler(traits: Traits, distance: number): number[] {
  if (distance === 0 || traits.normales.length === 0) return traits.segments
  const sortie = traits.segments.slice()
  for (let s = 0; s * 6 < sortie.length; s++) {
    const nx = traits.normales[s * 3] ?? 0
    const ny = traits.normales[s * 3 + 1] ?? 0
    const nz = traits.normales[s * 3 + 2] ?? 0
    for (const o of [0, 3]) {
      sortie[s * 6 + o] += nx * distance
      sortie[s * 6 + o + 1] += ny * distance
      sortie[s * 6 + o + 2] += nz * distance
    }
  }
  return sortie
}

type Vec3 = readonly [number, number, number]

/**
 * Translation de tous les points vers l’œil. En projection orthographique le trait reste
 * exactement sur son arête à l’écran ; seule sa profondeur passe devant les faces voisines.
 */
export function avancer(segments: readonly number[], versOeil: Vec3, distance: number): number[] {
  const sortie = segments.slice()
  for (let i = 0; i + 2 < sortie.length; i += 3) {
    sortie[i] += versOeil[0] * distance
    sortie[i + 1] += versOeil[1] * distance
    sortie[i + 2] += versOeil[2] * distance
  }
  return sortie
}

/** Au-delà de ~5°, le décalage vers l’ancien œil se verrait de côté : les rubans sont refaits. */
const COS_VUE = Math.cos((5 * Math.PI) / 180)

export function vueAChange(avant: Vec3 | null, apres: Vec3): boolean {
  if (!avant) return true
  return avant[0] * apres[0] + avant[1] * apres[1] + avant[2] * apres[2] < COS_VUE
}

/** Taille monde d’un pixel CSS pour une caméra orthographique. */
export function metresParPixel(demiHauteur: number, hauteurCss: number): number {
  return hauteurCss > 0 ? (2 * demiHauteur) / hauteurCss : 0
}

/** Reconstruire les rubans dès que le zoom s’écarte de plus de 4 %. */
export function zoomAChange(avant: number, apres: number): boolean {
  if (avant <= 0) return apres > 0
  return Math.abs(apres / avant - 1) > 0.04
}
