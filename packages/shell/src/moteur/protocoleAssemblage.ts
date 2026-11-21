import type { PartieAssemblage, Teintes } from '../assemblageMaillage.ts'

export type DemandeAssemblage = { id: number; parties: PartieAssemblage[] }

export type ReponseAssemblage =
  | {
      id: number
      maille: {
        positions: Float64Array
        normales: Float64Array
        indices: Uint32Array
        faces: Uint32Array | null
        teintes: Teintes | null
      } | null
    }
  | { id: number; erreur: string }
