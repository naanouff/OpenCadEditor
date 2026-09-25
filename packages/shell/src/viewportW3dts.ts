import type { EsquissePosee, Frontiere } from '@opencad/api-parametrique'
import { documentCad } from './documentCad.ts'
import {
  DirectionalLightComponent,
  EngineBuilder,
  GPUManager,
  LitAbstractProject,
  Material,
  Mesh,
  SceneNode,
  TransformComponent,
  setMsaaSampleCount,
  type Engine,
  type ProjectLoadParams,
  type RasterPassConfig,
  type RenderGraph,
  type ShaderGraph,
} from '@naanouff/w3dts-core'
import { Logger } from '@naanouff/w3dts-logger'
import {
  VectorLineOverlayComponent,
  buildLineListInterleavedVertices,
  createVectorLineOverlaySystem,
} from '@naanouff/w3dts-vector-lines'
import { quat, vec3 } from 'gl-matrix'

const chargeurVide = { load: async () => null }

class ProjetAnneau extends LitAbstractProject {
  private params: ProjectLoadParams | null = null
  private racine: SceneNode | null = null
  private cadre = false

  constructor() {
    super('ProjetAnneau')
  }

  public override async configureRenderGraph(graph: RenderGraph, engine: Engine, vue: 'scene' | 'game'): Promise<void> {
    await super.configureRenderGraph(graph, engine, vue)
    const passes = graph.getPasses()
    for (const passe of passes) {
      const raster = passe as RasterPassConfig
      if (raster?.builtInPipeline !== 'skybox' && !/skybox/i.test(raster?.name ?? '')) continue
      raster.skyboxParams = {
        gradientStops: [
          { offset: 0, color: [0.58, 0.59, 0.6] },
          { offset: 1, color: [0.74, 0.75, 0.76] },
        ],
        sunSize: 0,
        sunBloom: 0,
        starsThreshold: 1,
        clouds: { density: 0, scale: 1, speed: 0, brightness: 0 },
      }
    }
    const opaques = passes.find((passe) => passe.name === '02_Opaques') as RasterPassConfig | undefined
    if (opaques) opaques.clearColor = { r: 0.66, g: 0.67, b: 0.68, a: 1 }
    const fxaa = passes.find((passe) => passe.name === '07_FXAA')
    if (fxaa && 'shaderPath' in fxaa) fxaa.shaderPath = '/shaders/post-processing/blit.frag.wgsl'
    engine.renderer.iblIntensity = 0.45
  }

  protected override async initializeScene(params: ProjectLoadParams): Promise<void> {
    await super.initializeScene(params)
    params.engine.renderer.iblIntensity = 0.45
    this.params = params
    this.poserSoleil()
    this.montrer(documentCad({ faces: [] }))
  }

  private poserSoleil() {
    const params = this.params
    if (!params) return
    const { scene, world } = params
    const lumiere = new SceneNode('soleil', world)
    const rotation = quat.create()
    quat.fromEuler(rotation, -35, 25, 0)
    const transform = world.getComponent(lumiere.entityId, TransformComponent)
    if (transform) {
      quat.copy(transform.rotation, rotation)
      transform.updateLocalTransform()
    }
    world.addComponent(
      lumiere.entityId,
      new DirectionalLightComponent({
        color: vec3.fromValues(1, 1, 1),
        intensity: 1.1,
        shadowsEnabled: false,
      }),
    )
    scene.add(lumiere)
  }

  montrer(document: ReturnType<typeof documentCad>) {
    const params = this.params
    if (!params) return
    const { scene, world, engine, cameraControllerManager, logger } = params
    if (this.racine) scene.remove(this.racine)
    const racine = new SceneNode('anneau', world)
    scene.add(racine)
    this.racine = racine
    poserMaillage(racine, world, engine, document)
    poserFil(racine, world, engine, logger, document.brepWireframe.position.array)
    if (this.cadre) return
    this.cadre = true
    cameraControllerManager.getActiveController()?.frameBoundingBox({
      min: vec3.fromValues(-0.03, -0.005, -0.03),
      max: vec3.fromValues(0.03, 0.02, 0.03),
    })
  }
}

function poserMaillage(
  parent: SceneNode,
  world: ProjectLoadParams['world'],
  engine: Engine,
  document: ReturnType<typeof documentCad>,
) {
  if (document.maillage.indices.length === 0) return
  const sommets: number[] = []
  const { positions } = document.maillage
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]
    const nx = document.maillage.normales[i]
    const nz = document.maillage.normales[i + 2]
    const ny = document.maillage.normales[i + 1]
    const tx = nz
    const tz = -nx
    sommets.push(x, y, z, 0, 0, 0, 0, nx, ny, nz, tx, 0, tz, 0, 1, 0, 0.78, 0.78, 0.78, 1)
  }
  const mesh = new Mesh(new Float32Array(sommets), new Uint16Array(document.maillage.indices), 'anneau')
  engine.resourceManager.uploadMesh(mesh)
  const matiere = new Material({
    name: 'anneau',
    shadingModel: 'pbr',
    shaderGraph: graphe ?? undefined,
    properties: {
      baseColor: [0.78, 0.78, 0.78],
      roughness: 1,
      metallic: 0,
      normalTexture: null,
      metallicRoughnessTexture: null,
    },
  })
  engine.resourceManager.uploadMaterial(matiere)
  parent.add(new SceneNode('solide', world, mesh, matiere))
}

function poserFil(
  parent: SceneNode,
  world: ProjectLoadParams['world'],
  engine: Engine,
  logger: ProjectLoadParams['logger'],
  segments: number[],
) {
  const construit = buildLineListInterleavedVertices(segments, [0.05, 0.05, 0.05, 1], 50_000, logger, 'anneau')
  if (construit.vertexCount === 0) return
  const tampon = engine.resourceManager.createLineOverlayVertexBuffer(construit.vertices, 'fil-de-fer')
  const noeud = new SceneNode('fil-de-fer', world)
  world.addComponent(
    noeud.entityId,
    new VectorLineOverlayComponent(tampon, construit.vertexCount, 0, 'line-list'),
  )
  parent.add(noeud)
}

let projet: ProjetAnneau | null = null
let demarrage: Promise<void> | null = null
let graphe: ShaderGraph | null = null

async function demarrer(canevas: HTMLCanvasElement) {
  const reponse = await fetch('/shader-graphs/PBRGraph.json')
  if (!reponse.ok) throw new Error('PBRGraph introuvable')
  graphe = (await reponse.json()) as ShaderGraph
  setMsaaSampleCount(4)
  const logger = new Logger()
  await GPUManager.initialize(logger)
  const engine = await new EngineBuilder(canevas).setLogger(logger).withModelLoader(chargeurVide).build()
  engine.scheduler.addSystem(createVectorLineOverlaySystem(engine.renderer))
  projet = new ProjetAnneau()
  engine.director.register(projet)
  await engine.start('ProjetAnneau')
}

export function afficher(canevas: HTMLCanvasElement, frontiere: Frontiere, esquisse: EsquissePosee | null = null) {
  const document = documentCad(frontiere, esquisse)
  if (!demarrage) demarrage = demarrer(canevas)
  return demarrage.then(() => projet?.montrer(document))
}
