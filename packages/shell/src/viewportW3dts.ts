import type { EsquissePosee, Frontiere, MaillageOmbre } from '@opencad/api-parametrique'
import { documentCad } from './documentCad.ts'
import { poseGlyphe, repere, repereSurface, vueDuPlan } from './dessin.ts'
import { remplacementEsquisse } from './entree.ts'
import policeUrl from '../../../vendor/w3dts/node_modules/.pnpm/@fontsource+open-sans@5.2.7/node_modules/@fontsource/open-sans/files/open-sans-latin-400-normal.woff?url'
import { createTextMeshFromFont } from '@naanouff/w3dts-text-mesh'
import {
  DirectionalLightComponent,
  EngineBuilder,
  OrbitalCameraController,
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
  private modeVue = ''

  constructor() {
    super('ProjetAnneau')
  }

  public override async configureRenderGraph(graph: RenderGraph, engine: Engine, vue: 'scene' | 'game'): Promise<void> {
    await super.configureRenderGraph(graph, engine, vue)
    const passes = graph.getPasses()
    for (const passe of passes) {
      const raster = passe as RasterPassConfig
      if (raster?.builtInPipeline !== 'skybox' && !/skybox/i.test(raster?.name ?? '')) continue
      delete raster.skyboxParams
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
    this.montrer(documentCad({ faces: [] }), null)
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

  montrer(document: ReturnType<typeof documentCad>, esquisse: EsquissePosee | null) {
    const params = this.params
    if (!params) return
    const { scene, world, engine, cameraControllerManager, logger } = params
    if (this.racine) scene.remove(this.racine)
    const racine = new SceneNode('anneau', world)
    scene.add(racine)
    this.racine = racine
    poserMaillage(racine, world, engine, document)
    poserFil(racine, world, engine, logger, document.brepWireframe.position.array, [0.12, 0.13, 0.14, 1], 'solide')
    poserFil(racine, world, engine, logger, document.grille.position.array, [0.8, 0.81, 0.82, 1], 'grille')
    poserFil(racine, world, engine, logger, document.esquisse.position.array, [0.15, 0.45, 0.92, 1], 'esquisse')
    poserFil(racine, world, engine, logger, document.cotes.position.array, [0.92, 0.55, 0.12, 1], 'cotes')
    poserGlyphes(racine, world, engine, esquisse)
    const mode = esquisse?.support ?? '3d'
    if (mode === this.modeVue) return
    this.modeVue = mode
    const entree = (
      engine as { inputManager?: { applyInputOverridesJson(texte: string): void; resetInputToDefaults(): void } }
    ).inputManager
    if (esquisse) entree?.applyInputOverridesJson(remplacementEsquisse())
    else entree?.resetInputToDefaults()
    const controleur = cameraControllerManager.getActiveController()
    const boite = {
      min: vec3.fromValues(-0.03, -0.005, -0.03),
      max: vec3.fromValues(0.03, 0.02, 0.03),
    }
    if (!(controleur instanceof OrbitalCameraController)) return
    const orbital = controleur as OrbitalCameraController & {
      setViewUp?(up: vec3 | null): void
    }
    const iso = Math.acos(1 / Math.sqrt(3))
    orbital.setProjectionMode('orthographic')
    if (esquisse) {
      const plan = repere(esquisse.support)
      orbital.setViewUp?.(Math.abs(plan.normale[1]) === 1 ? vec3.fromValues(...plan.axeV) : null)
      const vue = vueDuPlan(esquisse.support)
      const polaire = vue === 'negY' ? Math.PI : vue === 'posY' ? 0 : Math.PI / 2
      const azimut = vue === 'posX' ? Math.PI / 2 : 0
      orbital.setOrbitAngles(azimut, polaire, true)
      orbital.frameBoundingBox(boite, { resetViewAngles: false })
    } else {
      orbital.setViewUp?.(null)
      orbital.setOrbitAngles(Math.PI / 4, iso, true)
      orbital.frameBoundingBox(boite, { resetViewAngles: false })
    }
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
    const ny = document.maillage.normales[i + 1]
    const nz = document.maillage.normales[i + 2]
    const { tangente, bitangente } = repereSurface([nx, ny, nz])
    sommets.push(x, y, z, 0, 0, 0, 0, nx, ny, nz, ...tangente, ...bitangente, 0.78, 0.78, 0.78, 1)
  }
  const indices =
    positions.length / 3 > 0xffff
      ? new Uint32Array(document.maillage.indices)
      : new Uint16Array(document.maillage.indices)
  const mesh = new Mesh(new Float32Array(sommets), indices, 'anneau')
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

function poserGlyphes(
  parent: SceneNode,
  world: ProjectLoadParams['world'],
  engine: Engine,
  esquisse: EsquissePosee | null,
) {
  if (!esquisse || !police || !graphe) return
  esquisse.cercles.forEach((cercle, index) => {
    const pose = poseGlyphe(esquisse.support, cercle.rayon, cercle.y, cercle.valeur, index)
    const mesh = createTextMeshFromFont({
      fontArrayBuffer: police as ArrayBuffer,
      text: pose.texte,
      fontSize: 0.003,
      layout: { align: 'left' },
      orientation: {
        mode: 'plane',
        normal: vec3.fromValues(...pose.normale),
        tangent: vec3.fromValues(...pose.tangente),
      },
      origin: vec3.fromValues(...pose.origine),
      name: `cote-${index}`,
    })
    engine.resourceManager.uploadMesh(mesh)
    const matiere = new Material({
      name: `cote-${index}`,
      shadingModel: 'pbr',
      shaderGraph: graphe ?? undefined,
      doubleSided: true,
      properties: {
        baseColor: [0.92, 0.55, 0.12],
        roughness: 1,
        metallic: 0,
        normalTexture: null,
        metallicRoughnessTexture: null,
      },
    })
    engine.resourceManager.uploadMaterial(matiere)
    parent.add(new SceneNode(`cote-${index}`, world, mesh, matiere))
  })
}

function poserFil(
  parent: SceneNode,
  world: ProjectLoadParams['world'],
  engine: Engine,
  logger: ProjectLoadParams['logger'],
  segments: number[],
  rgba: [number, number, number, number],
  nom: string,
) {
  const construit = buildLineListInterleavedVertices(segments, rgba, 50_000, logger, nom)
  if (construit.vertexCount === 0) return
  const tampon = engine.resourceManager.createLineOverlayVertexBuffer(construit.vertices, nom)
  const noeud = new SceneNode(nom, world)
  world.addComponent(
    noeud.entityId,
    new VectorLineOverlayComponent(tampon, construit.vertexCount, 0, 'line-list'),
  )
  parent.add(noeud)
}

let projet: ProjetAnneau | null = null
let demarrage: Promise<void> | null = null
let canevasMoteur: HTMLCanvasElement | null = null
let graphe: ShaderGraph | null = null
let police: ArrayBuffer | null = null

function attendreTaille(canevas: HTMLCanvasElement): Promise<void> {
  if (canevas.clientWidth > 1 && canevas.clientHeight > 1) return Promise.resolve()
  return new Promise((resolve) => {
    const observer = new ResizeObserver(() => {
      if (canevas.clientWidth > 1 && canevas.clientHeight > 1) {
        observer.disconnect()
        resolve()
      }
    })
    observer.observe(canevas)
  })
}

async function demarrer(canevas: HTMLCanvasElement) {
  await attendreTaille(canevas)
  const reponse = await fetch('/shader-graphs/PBRGraph.json')
  if (!reponse.ok) throw new Error('PBRGraph introuvable')
  graphe = (await reponse.json()) as ShaderGraph
  const fonte = await fetch(policeUrl)
  if (!fonte.ok) throw new Error('police introuvable')
  police = await fonte.arrayBuffer()
  setMsaaSampleCount(4)
  const logger = new Logger()
  await GPUManager.initialize(logger)
  const engine = await new EngineBuilder(canevas).setLogger(logger).withModelLoader(chargeurVide).build()
  engine.scheduler.addSystem(createVectorLineOverlaySystem(engine.renderer))
  projet = new ProjetAnneau()
  engine.director.register(projet)
  await engine.start('ProjetAnneau')
}

export function afficher(
  canevas: HTMLCanvasElement,
  frontiere: Frontiere,
  esquisse: EsquissePosee | null = null,
  volume: MaillageOmbre | null = null,
) {
  const document = documentCad(frontiere, esquisse, volume)
  if (canevasMoteur !== canevas || !demarrage) {
    canevasMoteur = canevas
    projet = null
    demarrage = demarrer(canevas)
  }
  return demarrage.then(() => projet?.montrer(document, esquisse))
}
