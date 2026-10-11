/**
 * Assemblage `.cadom` boîte Milgauss — graphe multi-pièces (P3b → sprint 52).
 * Placements indicatifs (mm) ; pas de mates. Assets = refs `.cadompart` paramétriques.
 */
import {
  CADOM_VERSION_MAJOR,
  CADOM_VERSION_MINOR,
  mat4Identity,
  type CadomLogical,
} from '@opencad/cadom'

export const BOITE_ID = {
  root: 'b0000001-0000-4000-8000-000000000001',
  carrure: 'b0000001-0000-4000-8000-000000000010',
  lunette: 'b0000001-0000-4000-8000-000000000020',
  verre: 'b0000001-0000-4000-8000-000000000030',
  fond: 'b0000001-0000-4000-8000-000000000040',
  couronne: 'b0000001-0000-4000-8000-000000000050',
  assetCarrure: 'a0000001-0000-4000-8000-000000000010',
  assetLunette: 'a0000001-0000-4000-8000-000000000020',
  assetVerre: 'a0000001-0000-4000-8000-000000000030',
  assetFond: 'a0000001-0000-4000-8000-000000000040',
  assetCouronne: 'a0000001-0000-4000-8000-000000000050',
} as const

/** Column-major translation (mm when document units = mm). */
function mat4Translate(x: number, y: number, z: number): Float32Array {
  const m = mat4Identity()
  m[12] = x
  m[13] = y
  m[14] = z
  return m
}

export function assemblageBoiteMilgauss(): CadomLogical {
  const I = mat4Identity()
  return {
    versionMajor: CADOM_VERSION_MAJOR,
    versionMinor: CADOM_VERSION_MINOR,
    units: 'mm',
    upAxis: 'y',
    rootIds: [BOITE_ID.root],
    assets: [
      { id: BOITE_ID.assetCarrure, uri: './carrure.cadompart', kind: 'cadompart' },
      { id: BOITE_ID.assetLunette, uri: './lunette.cadompart', kind: 'cadompart' },
      { id: BOITE_ID.assetVerre, uri: './verre.cadompart', kind: 'cadompart' },
      { id: BOITE_ID.assetFond, uri: './fond.cadompart', kind: 'cadompart' },
      { id: BOITE_ID.assetCouronne, uri: './couronne.cadompart', kind: 'cadompart' },
    ],
    nodes: [
      {
        id: BOITE_ID.root,
        parentId: '',
        name: 'Boîte Milgauss',
        semanticType: 'assembly',
        visible: true,
        localTransform: I,
        assetBindings: [],
      },
      {
        id: BOITE_ID.carrure,
        parentId: BOITE_ID.root,
        name: 'Carrure',
        semanticType: 'part',
        visible: true,
        localTransform: I,
        assetBindings: [{ role: 'parametric', assetId: BOITE_ID.assetCarrure }],
      },
      {
        id: BOITE_ID.lunette,
        parentId: BOITE_ID.root,
        name: 'Lunette',
        semanticType: 'part',
        visible: true,
        localTransform: mat4Translate(0, 8, 0),
        assetBindings: [{ role: 'parametric', assetId: BOITE_ID.assetLunette }],
      },
      {
        id: BOITE_ID.verre,
        parentId: BOITE_ID.root,
        name: 'Verre',
        semanticType: 'part',
        visible: true,
        localTransform: mat4Translate(0, 8.2, 0),
        assetBindings: [{ role: 'parametric', assetId: BOITE_ID.assetVerre }],
      },
      {
        id: BOITE_ID.fond,
        parentId: BOITE_ID.root,
        name: 'Fond',
        semanticType: 'part',
        visible: true,
        localTransform: mat4Translate(0, -1, 0),
        assetBindings: [{ role: 'parametric', assetId: BOITE_ID.assetFond }],
      },
      {
        id: BOITE_ID.couronne,
        parentId: BOITE_ID.root,
        name: 'Couronne',
        semanticType: 'part',
        visible: true,
        // Peau Ø36 → x≈20 ; milieu hauteur carrure.
        localTransform: mat4Translate(20, 4, 0),
        assetBindings: [{ role: 'parametric', assetId: BOITE_ID.assetCouronne }],
      },
    ],
    overrides: [],
    extensions: [],
    defaultActiveLayers: [],
  }
}
