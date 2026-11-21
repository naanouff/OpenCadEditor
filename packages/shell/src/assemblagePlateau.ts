/**
 * Plateau de service — 1 plateau, 2 poignées, 4 vis à tête noyée.
 * Un asset par définition (poignée et vis partagées).
 */
import {
  CADOM_VERSION_MAJOR,
  CADOM_VERSION_MINOR,
  mat4Identity,
  type CadomLogical,
  type CadomNode,
} from '@opencad/cadom'
import { COTE_PLATEAU, xTrou, yDessusPoignee, yPointeVis } from './cotesPlateau.ts'

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
  matAluminium: 'a0000001-0000-4000-8000-000000000210',
  matLaiton: 'a0000001-0000-4000-8000-000000000220',
  matAcier: 'a0000001-0000-4000-8000-000000000230',
} as const

/** Chaque définition porte son matériau : toutes ses instances le partagent. */
const MATERIAU_DE: Record<string, string> = {
  [PLATEAU_ID.assetPlateau]: PLATEAU_ID.matAluminium,
  [PLATEAU_ID.assetPoignee]: PLATEAU_ID.matLaiton,
  [PLATEAU_ID.assetVis]: PLATEAU_ID.matAcier,
}

type V3 = readonly [number, number, number]

/** Matrice colonne : images des axes locaux X, Y, Z, puis l’origine locale. */
function mat4Axes(x: V3, y: V3, z: V3, origine: V3): Float32Array {
  const m = mat4Identity()
  m.set([...x, 0, ...y, 0, ...z, 0, ...origine, 1])
  return m
}

function translation(origine: V3) {
  return mat4Axes([1, 0, 0], [0, 1, 0], [0, 0, 1], origine)
}

/**
 * Poignée du côté `signe` (−1 gauche, +1 droite). Le D est esquissé en XY et extrudé en +Z :
 * +Y local (saillie) sort du plateau, +Z local (épaisseur) descend vers le rebord,
 * et l’origine locale, au milieu des deux trous sur le dessus, se pose au-dessus de leur axe.
 * X local suit le petit côté, dans le sens qui garde un repère direct.
 */
function posePoignee(signe: 1 | -1) {
  return mat4Axes([0, 0, -signe], [signe, 0, 0], [0, -1, 0], [signe * xTrou(), yDessusPoignee(), 0])
}

/** Centre monde du trou `u` (abscisse locale) d’une poignée posée. */
function trou(pose: Float32Array, u: number): V3 {
  return [pose[0]! * u + pose[12]!, pose[1]! * u + pose[13]!, pose[2]! * u + pose[14]!]
}

type Pose = {
  nodeId: string
  name: string
  matrice: Float32Array
  assetId: string
}

const poigneeG = posePoignee(-1)
const poigneeD = posePoignee(1)
const u = COTE_PLATEAU.entraxeVis / 2

/** La vis à tête fraisée prend l’axe de son trou ; sa tête reste dans le lamage. */
function poseVis(poignee: Float32Array, abscisse: number) {
  const [x, , z] = trou(poignee, abscisse)
  return translation([x, yPointeVis(), z])
}

const POSES: Pose[] = [
  { nodeId: PLATEAU_ID.plateau, name: 'Plateau', matrice: translation([0, 0, 0]), assetId: PLATEAU_ID.assetPlateau },
  { nodeId: PLATEAU_ID.poigneeG, name: 'Poignée G', matrice: poigneeG, assetId: PLATEAU_ID.assetPoignee },
  { nodeId: PLATEAU_ID.poigneeD, name: 'Poignée D', matrice: poigneeD, assetId: PLATEAU_ID.assetPoignee },
  { nodeId: PLATEAU_ID.vis[0]!, name: 'Vis 1', matrice: poseVis(poigneeG, -u), assetId: PLATEAU_ID.assetVis },
  { nodeId: PLATEAU_ID.vis[1]!, name: 'Vis 2', matrice: poseVis(poigneeG, u), assetId: PLATEAU_ID.assetVis },
  { nodeId: PLATEAU_ID.vis[2]!, name: 'Vis 3', matrice: poseVis(poigneeD, -u), assetId: PLATEAU_ID.assetVis },
  { nodeId: PLATEAU_ID.vis[3]!, name: 'Vis 4', matrice: poseVis(poigneeD, u), assetId: PLATEAU_ID.assetVis },
]

function noeud(pose: Pose): CadomNode {
  return {
    id: pose.nodeId,
    parentId: PLATEAU_ID.root,
    name: pose.name,
    semanticType: 'part',
    visible: true,
    localTransform: pose.matrice,
    assetBindings: [
      { role: 'parametric', assetId: pose.assetId },
      { role: 'material', assetId: MATERIAU_DE[pose.assetId]! },
    ],
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
      { id: PLATEAU_ID.matAluminium, uri: './aluminium.cadomat', kind: 'cadomat' },
      { id: PLATEAU_ID.matLaiton, uri: './laiton.cadomat', kind: 'cadomat' },
      { id: PLATEAU_ID.matAcier, uri: './acier.cadomat', kind: 'cadomat' },
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
