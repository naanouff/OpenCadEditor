/**
 * Plateau de service — 1 plateau, 2 instances de poignée, 4 instances de vis.
 * Un asset par définition (poignée et vis partagés).
 */
import {
  CADOM_VERSION_MAJOR,
  CADOM_VERSION_MINOR,
  mat4Identity,
  type CadomLogical,
  type CadomNode,
} from '@opencad/cadom'
import { COTE_PLATEAU, yPointeVis } from './cotesPlateau.ts'

export const PLATEAU_ID = {
  root: 'p0000001-0000-4000-8000-000000000001',
  plateau: 'p0000001-0000-4000-8000-000000000010',
  poigneeG: 'p0000001-0000-4000-8000-000000000020',
  poigneeD: 'p0000001-0000-4000-8000-000000000021',
  vis: [
    'p0000001-0000-4000-8000-000000000030',
    'p0000001-0000-4000-8000-000000000031',
    'p0000001-0000-4000-8000-000000000032',
    'p0000001-0000-4000-8000-000000000033',
  ],
  assetPlateau: 'a0000001-0000-4000-8000-000000000110',
  assetPoignee: 'a0000001-0000-4000-8000-000000000120',
  assetVis: 'a0000001-0000-4000-8000-000000000130',
} as const

function mat4Translate(x: number, y: number, z: number): Float32Array {
  const m = mat4Identity()
  m[12] = x
  m[13] = y
  m[14] = z
  return m
}

type Pose = { nodeId: string; name: string; x: number; y: number; z: number; assetId: string }

const demi = COTE_PLATEAU.entraxeVis / 2
const yVis = yPointeVis()

const POSES: Pose[] = [
  { nodeId: PLATEAU_ID.plateau, name: 'Plateau', x: 0, y: 0, z: 0, assetId: PLATEAU_ID.assetPlateau },
  {
    nodeId: PLATEAU_ID.poigneeG,
    name: 'Poignée G',
    x: -COTE_PLATEAU.poseX,
    y: COTE_PLATEAU.epaisseur,
    z: 0,
    assetId: PLATEAU_ID.assetPoignee,
  },
  {
    nodeId: PLATEAU_ID.poigneeD,
    name: 'Poignée D',
    x: COTE_PLATEAU.poseX,
    y: COTE_PLATEAU.epaisseur,
    z: 0,
    assetId: PLATEAU_ID.assetPoignee,
  },
  { nodeId: PLATEAU_ID.vis[0]!, name: 'Vis 1', x: -COTE_PLATEAU.poseX - demi, y: yVis, z: 0, assetId: PLATEAU_ID.assetVis },
  { nodeId: PLATEAU_ID.vis[1]!, name: 'Vis 2', x: -COTE_PLATEAU.poseX + demi, y: yVis, z: 0, assetId: PLATEAU_ID.assetVis },
  { nodeId: PLATEAU_ID.vis[2]!, name: 'Vis 3', x: COTE_PLATEAU.poseX - demi, y: yVis, z: 0, assetId: PLATEAU_ID.assetVis },
  { nodeId: PLATEAU_ID.vis[3]!, name: 'Vis 4', x: COTE_PLATEAU.poseX + demi, y: yVis, z: 0, assetId: PLATEAU_ID.assetVis },
]

function noeud(pose: Pose): CadomNode {
  return {
    id: pose.nodeId,
    parentId: PLATEAU_ID.root,
    name: pose.name,
    semanticType: 'part',
    visible: true,
    localTransform: mat4Translate(pose.x, pose.y, pose.z),
    assetBindings: [{ role: 'parametric', assetId: pose.assetId }],
  }
}

/** Design : trois définitions, sept instances. */
export function assemblagePlateau(): CadomLogical {
  const I = mat4Identity()
  return {
    versionMajor: CADOM_VERSION_MAJOR,
    versionMinor: CADOM_VERSION_MINOR,
    units: 'mm',
    upAxis: 'y',
    rootIds: [PLATEAU_ID.root],
    assets: [
      { id: PLATEAU_ID.assetPlateau, uri: './plateau.cadompart', kind: 'cadompart' },
      { id: PLATEAU_ID.assetPoignee, uri: './poignee.cadompart', kind: 'cadompart' },
      { id: PLATEAU_ID.assetVis, uri: './vis.cadompart', kind: 'cadompart' },
    ],
    nodes: [
      {
        id: PLATEAU_ID.root,
        parentId: '',
        name: 'Plateau de service',
        semanticType: 'assembly',
        visible: true,
        localTransform: I,
        assetBindings: [],
      },
      ...POSES.map(noeud),
    ],
    overrides: [],
    extensions: [],
    defaultActiveLayers: [],
  }
}
