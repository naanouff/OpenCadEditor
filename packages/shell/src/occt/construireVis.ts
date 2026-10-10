import { Session, union, difference, type Maillage, type MaillageOmbre } from '@opencad/api-parametrique'
import { maillageDepuisTessellate } from './maillageDepuisTessellate.ts'
import { runBatch, type OcctKernelModule, type KernelBatchOp } from './chargerKernel.ts'

const LONGUEUR = 30
const R_EXT = 3
const R_AME = 1.75
const R_TETE = 6
const PENTE_POINTE = Math.tan((30 / 2) * (Math.PI / 180))
const Y_AME = R_AME / PENTE_POINTE
const Y_EPAULE = LONGUEUR - (R_TETE * 2 - R_EXT * 2) / 2
const PROF_POZI = 2.39
const DIAM_POZI = 6.6

function profilVersXyz(stations: { r: number; y: number }[]): number[] {
  const xyz: number[] = []
  for (const s of stations) {
    xyz.push(s.r, s.y, 0)
  }
  const first = stations[0]!
  const last = stations[stations.length - 1]!
  if (Math.hypot(first.r - last.r, first.y - last.y) > 1e-9) {
    xyz.push(first.r, first.y, 0)
  }
  return xyz
}

function tesselle(occt: OcctKernelModule, ops: KernelBatchOp[]): Maillage {
  const out = runBatch(occt, [...ops, { op: 'tessellate', args: [{ handle: 'solid' }, 'normal'], as: 'mesh' }])
  if (!out.ok) throw new Error(out.error ?? 'batch occt failed')
  return maillageDepuisTessellate(out.aliases?.mesh as { ok?: boolean; meshes?: unknown[] })
}

function opsCorpsTete(): KernelBatchOp[] {
  const corps = profilVersXyz([
    { r: 0, y: 0 },
    { r: R_AME, y: Y_AME },
    { r: R_AME, y: Y_EPAULE },
    { r: 0, y: Y_EPAULE },
  ])
  const tete = profilVersXyz([
    { r: 0, y: Y_EPAULE },
    { r: R_EXT, y: Y_EPAULE },
    { r: R_TETE, y: LONGUEUR },
    { r: 0, y: LONGUEUR },
  ])
  return [
    { op: 'make_wire_polyline', args: [corps], as: 'wCorps' },
    { op: 'make_face_from_wire', args: [{ handle: 'wCorps' }], as: 'fCorps' },
    { op: 'revolve', args: [{ handle: 'fCorps' }, 0, 0, 0, 0, 1, 0, Math.PI * 2], as: 'corps' },
    { op: 'make_wire_polyline', args: [tete], as: 'wTete' },
    { op: 'make_face_from_wire', args: [{ handle: 'wTete' }], as: 'fTete' },
    { op: 'revolve', args: [{ handle: 'fTete' }, 0, 0, 0, 0, 1, 0, Math.PI * 2], as: 'tete' },
    { op: 'boolean_fuse', args: [{ handle: 'corps' }, { handle: 'tete' }], as: 'fuse' },
  ]
}

function opsPozi(base: string): KernelBatchOp[] {
  const demiL = DIAM_POZI / 2
  const demiW = DIAM_POZI / 8
  const yCut = LONGUEUR - PROF_POZI
  const yHaut = LONGUEUR + 0.4
  const slot = (lx: number, lz: number) =>
    [-lx, yCut, -lz, lx, yCut, -lz, lx, yCut, lz, -lx, yCut, lz, -lx, yCut, -lz] as number[]
  return [
    { op: 'make_wire_polyline', args: [slot(demiL, demiW)], as: 'w1' },
    { op: 'make_face_from_wire', args: [{ handle: 'w1' }], as: 'f1' },
    { op: 'extrude', args: [{ handle: 'f1' }, 0, yHaut - yCut, 0], as: 'cut1' },
    { op: 'boolean_cut', args: [{ handle: base }, { handle: 'cut1' }], as: 'c1' },
    { op: 'make_wire_polyline', args: [slot(demiW, demiL)], as: 'w2' },
    { op: 'make_face_from_wire', args: [{ handle: 'w2' }], as: 'f2' },
    { op: 'extrude', args: [{ handle: 'f2' }, 0, yHaut - yCut, 0], as: 'cut2' },
    { op: 'boolean_cut', args: [{ handle: 'c1' }, { handle: 'cut2' }], as: 'solid' },
  ]
}

/** Corps lisse (sans filet) + tête + empreinte Pozi, via occt-kernel. */
export function solideVisOcct(occt: OcctKernelModule): Maillage {
  runBatch(occt, [{ op: 'arena_clear' }])
  const out = runBatch(occt, [
    ...opsCorpsTete(),
    ...opsPozi('fuse'),
    { op: 'tessellate', args: [{ handle: 'solid' }, 'normal'], as: 'mesh' },
  ])
  if (!out.ok) throw new Error(out.error ?? 'vis occt failed')
  const mesh = out.aliases?.mesh as { ok?: boolean; error?: string; triangleCount?: number; meshes?: unknown[] }
  if (!mesh?.ok) throw new Error(mesh?.error ?? 'tessellate vis failed')
  return maillageDepuisTessellate(mesh)
}

/** Même solide sans empreinte : pour mesurer que la Pozi retire de la matière. */
export function solideVisOcctSansPozi(occt: OcctKernelModule): Maillage {
  runBatch(occt, [{ op: 'arena_clear' }])
  const out = runBatch(occt, [
    ...opsCorpsTete(),
    { op: 'tessellate', args: [{ handle: 'fuse' }, 'normal'], as: 'mesh' },
  ])
  if (!out.ok) throw new Error(out.error ?? 'vis occt sans pozi failed')
  return maillageDepuisTessellate(out.aliases?.mesh as { ok?: boolean; error?: string; meshes?: unknown[] })
}

/** Corps lisse seul (pour retirer le fût avant d’y greffer le filet hôte). */
export function corpsLisseOcct(occt: OcctKernelModule): Maillage {
  runBatch(occt, [{ op: 'arena_clear' }])
  const corps = profilVersXyz([
    { r: 0, y: 0 },
    { r: R_AME, y: Y_AME },
    { r: R_AME, y: Y_EPAULE },
    { r: 0, y: Y_EPAULE },
  ])
  return tesselle(occt, [
    { op: 'make_wire_polyline', args: [corps], as: 'wCorps' },
    { op: 'make_face_from_wire', args: [{ handle: 'wCorps' }], as: 'fCorps' },
    { op: 'revolve', args: [{ handle: 'fCorps' }, 0, 0, 0, 0, 1, 0, Math.PI * 2], as: 'solid' },
  ])
}

/**
 * Vis OCCT (corps + tête + Pozi) + filet `pas` hôte :
 * on retire le fût lisse du solide OCCT, puis on unit le corps fileté Session.
 */
export function maillageVisHybride(occt: OcctKernelModule): MaillageOmbre {
  const occtComplet = solideVisOcct(occt)
  const occtCorps = corpsLisseOcct(occt)
  const tetePozi = difference(occtComplet, occtCorps)

  const session = new Session()
  session.executer(`
piece vis
param longueur ${LONGUEUR}
param diametre ${R_EXT * 2}
param diametre_ame 3.5
param diametre_tete ${R_TETE * 2}
param angle_tete 90
param angle_pointe 30
param angle_filet 40
param pas 2.6
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon diametre_ame / 2
cote hauteur ${Y_AME}
segment
cote rayon diametre_ame / 2
cote hauteur ${Y_EPAULE}
segment
cote rayon 0
cote hauteur ${Y_EPAULE}
revolution
pas
`)
  const filete = session.maillage()
  const maille = union(filete, tetePozi)
  if (!maille.normales) throw new Error('normales absentes')
  return {
    positions: maille.positions,
    normales: maille.normales,
    indices: maille.indices,
    faces: maille.faces,
  }
}
