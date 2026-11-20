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

/** Taille monde d’un pixel CSS pour une caméra orthographique. */
export function metresParPixel(demiHauteur: number, hauteurCss: number): number {
  return hauteurCss > 0 ? (2 * demiHauteur) / hauteurCss : 0
}

/** Reconstruire les rubans dès que le zoom s’écarte de plus de 4 %. */
export function zoomAChange(avant: number, apres: number): boolean {
  if (avant <= 0) return apres > 0
  return Math.abs(apres / avant - 1) > 0.04
}
