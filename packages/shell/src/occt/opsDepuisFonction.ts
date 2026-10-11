/**
 * Ops batch OCCT — réexport `@opencad/kernel/ops` (O2-5).
 * Sous-chemin ops : évite de charger les writers protobuf du paquet.
 */
export {
  opsExtrude,
  opsRevolution,
  opsCouper,
  opsFillet,
  accrocherSolide,
  type Polyline3,
} from '@opencad/kernel/ops'
