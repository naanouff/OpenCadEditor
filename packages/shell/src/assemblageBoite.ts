/**
 * Assemblage `.cadom` boîte Milgauss — graphe multi-pièces (P3b).
 * Design : refs `.cadompart`. Complete : + refs `.cadomesh` (rôle mesh).
 */
import {
  CADOM_VERSION_MAJOR,
  CADOM_VERSION_MINOR,
  mat4Identity,
  mat4Multiply,
  type CadomLogical,
  type CadomNode,
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
  meshCarrure: 'm0000001-0000-4000-8000-000000000010',
  meshLunette: 'm0000001-0000-4000-8000-000000000020',
  meshVerre: 'm0000001-0000-4000-8000-000000000030',
  meshFond: 'm0000001-0000-4000-8000-000000000040',
  meshCouronne: 'm0000001-0000-4000-8000-000000000050',
} as const

/** Column-major translation (mm when document units = mm). */
function mat4Translate(x: number, y: number, z: number): Float32Array {
  const m = mat4Identity()
  m[12] = x
  m[13] = y
  m[14] = z
  return m
}

/**
 * SCRIPT_COURONNE revolution axis = local +Y.
 * Watch crown at 3 h needs axis along world +X → rotate so +Y maps to +X, then translate.
 * (x,y,z) → (y, -x, z)
 */
function mat4RotYversX(): Float32Array {
  return new Float32Array([0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
}

/** Stem base on case wall (r = 18), mid-height ; head further +X. */
function poseCouronne(): Float32Array {
  return mat4Multiply(mat4Translate(18, 4, 0), mat4RotYversX())
}

type PieceSpec = {
  nodeId: string
  name: string
  transform: Float32Array
  partAssetId: string
  partUri: string
  meshAssetId: string
  meshUri: string
}

const PIECES: PieceSpec[] = [
  {
    nodeId: BOITE_ID.carrure,
    name: 'Carrure',
    transform: mat4Identity(),
    partAssetId: BOITE_ID.assetCarrure,
    partUri: './carrure.cadompart',
    meshAssetId: BOITE_ID.meshCarrure,
    meshUri: './carrure.cadomesh',
  },
  {
    nodeId: BOITE_ID.lunette,
    name: 'Lunette',
    transform: mat4Translate(0, 8, 0),
    partAssetId: BOITE_ID.assetLunette,
    partUri: './lunette.cadompart',
    meshAssetId: BOITE_ID.meshLunette,
    meshUri: './lunette.cadomesh',
  },
  {
    nodeId: BOITE_ID.verre,
    name: 'Verre',
    transform: mat4Translate(0, 8.2, 0),
    partAssetId: BOITE_ID.assetVerre,
    partUri: './verre.cadompart',
    meshAssetId: BOITE_ID.meshVerre,
    meshUri: './verre.cadomesh',
  },
  {
    nodeId: BOITE_ID.fond,
    name: 'Fond',
    transform: mat4Translate(0, -1, 0),
    partAssetId: BOITE_ID.assetFond,
    partUri: './fond.cadompart',
    meshAssetId: BOITE_ID.meshFond,
    meshUri: './fond.cadomesh',
  },
  {
    nodeId: BOITE_ID.couronne,
    name: 'Couronne',
    transform: poseCouronne(),
    partAssetId: BOITE_ID.assetCouronne,
    partUri: './couronne.cadompart',
    meshAssetId: BOITE_ID.meshCouronne,
    meshUri: './couronne.cadomesh',
  },
]

function noeudPiece(spec: PieceSpec, complete: boolean): CadomNode {
  const bindings = [{ role: 'parametric' as const, assetId: spec.partAssetId }]
  if (complete) bindings.unshift({ role: 'mesh', assetId: spec.meshAssetId })
  return {
    id: spec.nodeId,
    parentId: BOITE_ID.root,
    name: spec.name,
    semanticType: 'part',
    visible: true,
    localTransform: spec.transform,
    assetBindings: bindings,
  }
}

/** Design badge : parametric `.cadompart` only. */
export function assemblageBoiteMilgauss(): CadomLogical {
  return construire(false)
}

/** Complete badge : parametric + mesh `.cadomesh` URIs (bytes generated later). */
export function assemblageBoiteComplete(): CadomLogical {
  return construire(true)
}

function construire(complete: boolean): CadomLogical {
  const I = mat4Identity()
  const assets = PIECES.flatMap((p) => {
    const list = [{ id: p.partAssetId, uri: p.partUri, kind: 'cadompart' as const }]
    if (complete) list.push({ id: p.meshAssetId, uri: p.meshUri, kind: 'cadomesh' as const })
    return list
  })
  return {
    versionMajor: CADOM_VERSION_MAJOR,
    versionMinor: CADOM_VERSION_MINOR,
    units: 'mm',
    upAxis: 'y',
    rootIds: [BOITE_ID.root],
    assets,
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
      ...PIECES.map((p) => noeudPiece(p, complete)),
    ],
    overrides: [],
    extensions: [],
    defaultActiveLayers: [],
  }
}
