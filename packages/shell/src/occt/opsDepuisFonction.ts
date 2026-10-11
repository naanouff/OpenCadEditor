import type { KernelBatchOp } from './chargerKernel.ts'
import type { Polyline3 } from './esquissePolylines.ts'

export type DirectionExtrusion = readonly [number, number, number]

/** Wire → face → extrude. Retourne les ops et l'alias du solide outil. */
export function opsExtrude(
  polyline: Polyline3,
  direction: DirectionExtrusion,
  uid: string,
): { ops: KernelBatchOp[]; as: string } {
  const w = `w${uid}`
  const f = `f${uid}`
  const s = `s${uid}`
  return {
    ops: [
      { op: 'make_wire_polyline', args: [polyline], as: w },
      { op: 'make_face_from_wire', args: [{ handle: w }], as: f },
      { op: 'extrude', args: [{ handle: f }, direction[0], direction[1], direction[2]], as: s },
    ],
    as: s,
  }
}

/** Profil 2D (XY) → face → révolution autour de Y. */
export function opsRevolution(polyline: Polyline3, uid: string): { ops: KernelBatchOp[]; as: string } {
  const w = `w${uid}`
  const f = `f${uid}`
  const s = `s${uid}`
  return {
    ops: [
      { op: 'make_wire_polyline', args: [polyline], as: w },
      { op: 'make_face_from_wire', args: [{ handle: w }], as: f },
      { op: 'revolve', args: [{ handle: f }, 0, 0, 0, 0, 1, 0, Math.PI * 2], as: s },
    ],
    as: s,
  }
}

/** Première feature → alias courant ; suivantes → fuse. */
export function accrocherSolide(
  solidAs: string | null,
  outilAs: string,
  uid: string,
): { ops: KernelBatchOp[]; solidAs: string } {
  if (!solidAs) return { ops: [], solidAs: outilAs }
  const as = `fuse${uid}`
  return {
    ops: [{ op: 'boolean_fuse', args: [{ handle: solidAs }, { handle: outilAs }], as }],
    solidAs: as,
  }
}

export function opsCouper(solidAs: string, outilAs: string, uid: string): { ops: KernelBatchOp[]; solidAs: string } {
  const as = `cut${uid}`
  return {
    ops: [{ op: 'boolean_cut', args: [{ handle: solidAs }, { handle: outilAs }], as }],
    solidAs: as,
  }
}

/** Congé sur arêtes (indices locaux, ou `null` = toutes). */
export function opsFillet(
  solidAs: string,
  rayon: number,
  indices: number[] | null,
  uid: string,
): { ops: KernelBatchOp[]; solidAs: string } {
  const as = `fillet${uid}`
  return {
    ops: [{ op: 'fillet_edges', args: [{ handle: solidAs }, rayon, indices], as }],
    solidAs: as,
  }
}
