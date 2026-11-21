import type { EsquissePosee, Frontiere, MaillageOmbre } from '@opencad/api-parametrique'
import { calqueVide, couleursTopo, epaisseurTopo, type CalqueTopo, type Rgba } from './apparenceCad.ts'
import { contourPlan, DEMI_DATUM_MM, traitAxe, type AxeId } from './selectionDatum.ts'
import { avancer, decaler, metresParPixel, traitsBruts, vueAChange, zoomAChange, type Traits } from './traitsArete.ts'
import { documentCad } from './documentCad.ts'
import { coteSegment, poseGlyphe, repere, repereSurface, vueDuPlan } from './dessin.ts'
import { liaisonsEntree } from './entree.ts'
import { facteurMolette } from './cameraCad.ts'
import { detacherTampons } from './liberationGpu.ts'
import type { MateriauAffichage, MaillageTeinte } from './assemblageMaillage.ts'
import { veilleurRatioPixels } from './ratioPixels.ts'
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
  buildLineRibbonInterleavedVertices,
  createVectorLineOverlaySystem,
} from '@naanouff/w3dts-vector-lines'
import { quat, vec3 } from 'gl-matrix'

const chargeurVide = { load: async () => null }

type Enceinte = { min: [number, number, number]; max: [number, number, number] }

function enceinteDefaut(): Enceinte {
  return { min: [-0.03, -0.005, -0.03], max: [0.03, 0.02, 0.03] }
}

/** Boîte des positions, avec une marge. Vide : le cadre par défaut. */
function enceinteDe(positions: number[], marge: number): Enceinte {
  if (positions.length < 3) return enceinteDefaut()
  const min: [number, number, number] = [Infinity, Infinity, Infinity]
  const max: [number, number, number] = [-Infinity, -Infinity, -Infinity]
  for (let i = 0; i < positions.length; i += 3) {
    for (let axe = 0; axe < 3; axe++) {
      const valeur = positions[i + axe]
      if (valeur < min[axe]) min[axe] = valeur
      if (valeur > max[axe]) max[axe] = valeur
    }
  }
  return {
    min: [min[0] - marge, min[1] - marge, min[2] - marge],
    max: [max[0] + marge, max[1] + marge, max[2] + marge],
  }
}

/**
 * Nouveau cadre si le contenu n’occupe plus qu’une petite part du cadre courant
 * (autre pièce ouverte après une plus grande), sinon `null`.
 */
function retrecie(enceinte: Enceinte, positions: number[]): Enceinte | null {
  if (positions.length < 3) return null
  const contenu = enceinteDe(positions, 0)
  const diagonale = (boite: Enceinte) =>
    Math.hypot(boite.max[0] - boite.min[0], boite.max[1] - boite.min[1], boite.max[2] - boite.min[2])
  if (diagonale(contenu) > 0.25 * diagonale(enceinte)) return null
  const suivante = etendreEnceinte(enceinteDefaut(), positions)
  return diagonale(suivante) < 0.5 * diagonale(enceinte) ? suivante : null
}

/** Élargit le cadre si le maillage en sort. La carrure, déjà dedans, ne le déplace pas. */
function etendreEnceinte(enceinte: Enceinte, positions: number[]): Enceinte {
  if (positions.length < 3) return enceinte
  const min: [number, number, number] = [...enceinte.min]
  const max: [number, number, number] = [...enceinte.max]
  let depasse = false
  for (let i = 0; i < positions.length; i += 3) {
    for (let axe = 0; axe < 3; axe++) {
      const valeur = positions[i + axe]
      if (valeur < min[axe]) {
        min[axe] = valeur
        depasse = true
      }
      if (valeur > max[axe]) {
        max[axe] = valeur
        depasse = true
      }
    }
  }
  if (!depasse) return enceinte
  const marge = 0.002
  return {
    min: [min[0] - marge, min[1] - marge, min[2] - marge],
    max: [max[0] + marge, max[1] + marge, max[2] + marge],
  }
}

class ProjetAnneau extends LitAbstractProject {
  private params: ProjectLoadParams | null = null
  private racine: SceneNode | null = null
  private modeVue = ''
  private enceinte = enceinteDefaut()
  private dernier: { document: ReturnType<typeof documentCad>; esquisse: EsquissePosee | null; calque: CalqueTopo } | null = null
  private solide = new Map<number, FaceSolide>()
  /** Maillages GPU de la base (faces, glyphes), rendus à la reconstruction suivante. */
  private maillages: Mesh[] = []
  private traits: SceneNode | null = null
  private tampons: GPUBuffer[] = []
  private eclats: SceneNode | null = null
  private tamponsEclats: GPUBuffer[] = []
  /** Taille monde d’un pixel CSS au dernier calcul des rubans. */
  private pixel = 0
  /** Direction unitaire vers l’œil au dernier calcul des rubans. */
  private versOeil: [number, number, number] | null = null

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
    // LitAbstractProject charge le graphe sans le lot MSAA : sans cet appel, `setMsaaSampleCount` est sans effet.
    graph.applyMsaaBundleFromEngineSettings()
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

  /** Rubans à l’échelle du zoom courant, sous la racine du modèle. */
  private poserTraits() {
    const params = this.params
    const racine = this.racine
    const dernier = this.dernier
    if (!params || !racine || !dernier) return
    if (this.traits) racine.remove(this.traits)
    libererTampons(params.engine, this.tampons)
    const traits = new SceneNode('traits', params.world)
    racine.add(traits)
    this.traits = traits
    this.pixel = this.pixelCourant()
    this.versOeil = this.oeilCourant()
    const { document, calque } = dernier
    const pose = new PoseTraits(traits, params, this.pixel || 0.0002, this.versOeil)
    const fil = calque.fil.segments.length > 0 ? calque.fil : traitsBruts(document.brepWireframe.position.array)
    pose.ruban(fil, couleursTopo.fil, 'solide', epaisseurTopo.fil)
    pose.trait(document.grille.position.array, [0.8, 0.81, 0.82, 1], 'grille')
    pose.trait(document.esquisse.position.array, [0.15, 0.45, 0.92, 1], 'esquisse')
    pose.trait(document.cotes.position.array, [0.92, 0.55, 0.12, 1], 'cotes')
    this.tampons = pose.tampons
    this.poserEclats()
  }

  /** Survol, sélection et datums : la seule couche de traits qu’un survol reconstruit. */
  private poserEclats() {
    const params = this.params
    const racine = this.racine
    const dernier = this.dernier
    if (!params || !racine || !dernier) return
    if (this.eclats) racine.remove(this.eclats)
    libererTampons(params.engine, this.tamponsEclats)
    const eclats = new SceneNode('eclats', params.world)
    racine.add(eclats)
    this.eclats = eclats
    const { esquisse, calque } = dernier
    const pose = new PoseTraits(eclats, params, this.pixel || 0.0002, this.versOeil)
    pose.ruban(calque.survolArete, couleursTopo.survol, 'survol-arete', epaisseurTopo.survol)
    pose.ruban(calque.selectionArete, couleursTopo.selection, 'selection-arete', epaisseurTopo.selection)
    if (!esquisse) poserDatums(pose, calque.datumSurvol, calque.datumChoisi)
    this.tamponsEclats = pose.tampons
  }

  /** Change le matériau des seules faces dont l’état survol/sélection a bougé. */
  private teinter(calque: CalqueTopo) {
    const params = this.params
    const racine = this.racine
    if (!params || !racine) return
    for (const [face, entree] of this.solide) {
      const groupe = groupeDe(face, calque)
      if (groupe === entree.groupe) continue
      racine.remove(entree.noeud)
      const noeud = new SceneNode(`face-${face}`, params.world, entree.mesh, matiere(params.engine, groupe, entree.teinte))
      racine.add(noeud)
      this.solide.set(face, { ...entree, noeud, groupe })
    }
  }

  private orbital() {
    const controleur = this.params?.cameraControllerManager.getActiveController()
    return controleur instanceof OrbitalCameraController ? controleur : null
  }

  zoomer(evenement: WheelEvent) {
    this.orbital()?.zoomer(evenement.clientX, evenement.clientY, facteurMolette(evenement.deltaY, evenement.deltaMode))
  }

  pivoter(point: [number, number, number] | null) {
    this.orbital()?.pivoter(point)
  }

  /** Cadre la pièce affichée, sans tourner la vue. */
  cadrer() {
    const orbital = this.orbital()
    if (!orbital || !this.dernier) return
    const { document, esquisse } = this.dernier
    const cadre = esquisse
      ? [...document.esquisse.position.array, ...document.cotes.position.array]
      : document.maillage.positions
    if (cadre.length < 3) return
    this.enceinte = enceinteDe(cadre, 0.002)
    orbital.frameBoundingBox(
      { min: vec3.fromValues(...this.enceinte.min), max: vec3.fromValues(...this.enceinte.max) },
      { resetViewAngles: false },
    )
  }

  private pixelCourant() {
    const cadre = this.cadrePick()
    return cadre && canevasMoteur ? metresParPixel(cadre.demiHauteur, canevasMoteur.clientHeight) : 0
  }

  private oeilCourant(): [number, number, number] | null {
    const cadre = this.cadrePick()
    if (!cadre) return null
    const d: [number, number, number] = [
      cadre.eye[0] - cadre.target[0],
      cadre.eye[1] - cadre.target[1],
      cadre.eye[2] - cadre.target[2],
    ]
    const n = Math.hypot(...d)
    return n > 0 ? [d[0] / n, d[1] / n, d[2] / n] : null
  }

  /** Appelé à chaque trame : les rubans suivent le zoom et la direction de vue. */
  suivreZoom() {
    if (!this.dernier) return
    const pixel = this.pixelCourant()
    const oeil = this.oeilCourant()
    const zoom = pixel > 0 && zoomAChange(this.pixel, pixel)
    if (zoom || (oeil && vueAChange(this.versOeil, oeil))) this.poserTraits()
  }

  cadrePick(): {
    eye: [number, number, number]
    target: [number, number, number]
    up: [number, number, number]
    demiHauteur: number
  } | null {
    const params = this.params
    if (!params) return null
    const controleur = params.cameraControllerManager.getActiveController()
    if (!(controleur instanceof OrbitalCameraController)) return null
    return controleur.getPickFrame()
  }

  montrer(
    document: ReturnType<typeof documentCad>,
    esquisse: EsquissePosee | null,
    calque: CalqueTopo = calqueVide,
  ) {
    const params = this.params
    if (!params) return
    const { scene, world, engine, cameraControllerManager } = params
    const precedent = this.dernier
    if (
      precedent &&
      !esquisse &&
      !precedent.esquisse &&
      document.maillage === precedent.document.maillage &&
      calque.fil === precedent.calque.fil
    ) {
      this.dernier = { document, esquisse, calque }
      this.teinter(calque)
      this.poserEclats()
      return
    }
    if (this.racine) scene.remove(this.racine)
    libererTampons(engine, this.tampons)
    libererTampons(engine, this.tamponsEclats)
    libererTampons(engine, detacherTampons(this.maillages))
    this.tampons = []
    this.tamponsEclats = []
    const racine = new SceneNode('anneau', world)
    scene.add(racine)
    this.racine = racine
    this.solide = poserSolide(racine, world, engine, document, calque)
    this.maillages = [...[...this.solide.values()].map((face) => face.mesh), ...poserGlyphes(racine, world, engine, esquisse)]
    this.dernier = { document, esquisse, calque }
    this.traits = null
    this.eclats = null
    this.poserTraits()
    const mode = esquisse?.support ?? '3d'
    const cadre = esquisse
      ? [...document.esquisse.position.array, ...document.cotes.position.array]
      : document.maillage.positions
    const memeMode = mode === this.modeVue
    const suivante = memeMode
      ? retrecie(this.enceinte, cadre) ?? etendreEnceinte(this.enceinte, cadre)
      : esquisse
        ? enceinteDe(cadre, 0.008)
        : etendreEnceinte(enceinteDefaut(), document.maillage.positions)
    if (memeMode && suivante === this.enceinte) return
    if (!memeMode) {
      const entree = (engine as { inputManager?: { applyInputOverridesJson(texte: string): void } }).inputManager
      entree?.applyInputOverridesJson(liaisonsEntree(esquisse ? 'esquisse' : 'solide'))
    }
    this.modeVue = mode
    this.enceinte = suivante
    const controleur = cameraControllerManager.getActiveController()
    const boite = {
      min: vec3.fromValues(...this.enceinte.min),
      max: vec3.fromValues(...this.enceinte.max),
    }
    if (!(controleur instanceof OrbitalCameraController)) return
    const orbital = controleur as OrbitalCameraController & {
      setViewUp?(up: vec3 | null): void
    }
    // Même mode : la pièce a changé de taille, on recadre sans tourner la vue.
    if (memeMode) {
      orbital.frameBoundingBox(boite, { resetViewAngles: false })
      return
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

type GroupeSolide = 'solide' | 'survol' | 'selection'

type FaceSolide = { mesh: Mesh; noeud: SceneNode; groupe: GroupeSolide; teinte?: MateriauAffichage }

/** Clé des triangles d’un maillage sans étiquettes de face. */
const SANS_FACE = -1

function groupeDe(face: number, calque: CalqueTopo): GroupeSolide {
  if (face === SANS_FACE) return 'solide'
  if (face === calque.selectionFace) return 'selection'
  if (face === calque.survolFace) return 'survol'
  return 'solide'
}

let matieres: { engine: Engine; parNom: Map<string, Material> } | null = null

/** Survol et sélection gardent leur couleur ; au repos, une face prend le matériau de sa pièce. */
function matiere(engine: Engine, groupe: GroupeSolide, teinte?: MateriauAffichage) {
  if (matieres?.engine !== engine) matieres = { engine, parNom: new Map() }
  const nom = groupe === 'solide' && teinte ? `solide-${teinte.name}` : `solide-${groupe}`
  const connue = matieres.parNom.get(nom)
  if (connue) return connue
  const couleur = groupe === 'solide' && teinte ? teinte.baseColorFactor : couleursTopo[groupe]
  const cree = new Material({
    name: nom,
    shadingModel: 'pbr',
    shaderGraph: graphe ?? undefined,
    properties: {
      baseColor: [couleur[0], couleur[1], couleur[2]],
      roughness: groupe === 'solide' && teinte ? teinte.roughnessFactor : 1,
      metallic: groupe === 'solide' && teinte ? teinte.metallicFactor : 0,
      normalTexture: null,
      metallicRoughnessTexture: null,
    },
  })
  engine.resourceManager.uploadMaterial(cree)
  matieres.parNom.set(nom, cree)
  return cree
}

/**
 * Un nœud par face BRep, chaque triangle tracé une fois :
 * survoler ou choisir une face change son matériau sans remonter de maillage.
 */
function poserSolide(
  parent: SceneNode,
  world: ProjectLoadParams['world'],
  engine: Engine,
  document: ReturnType<typeof documentCad>,
  calque: CalqueTopo,
) {
  const solide = new Map<number, FaceSolide>()
  const { positions, normales, indices, faces } = document.maillage
  const teintes = (document.maillage as MaillageTeinte).teintes
  if (indices.length === 0) return solide
  const parFace = new Map<number, number[]>()
  for (let t = 0; t < indices.length / 3; t++) {
    const face = faces?.[t] ?? SANS_FACE
    const liste = parFace.get(face)
    if (liste) liste.push(t)
    else parFace.set(face, [t])
  }
  for (const [face, triangles] of parFace) {
    const remap = new Map<number, number>()
    const sommets: number[] = []
    const locaux: number[] = []
    for (const t of triangles) {
      for (let k = 0; k < 3; k++) {
        const s = indices[t * 3 + k]!
        let local = remap.get(s)
        if (local === undefined) {
          local = remap.size
          remap.set(s, local)
          const i = s * 3
          const n: [number, number, number] = [normales[i]!, normales[i + 1]!, normales[i + 2]!]
          const { tangente, bitangente } = repereSurface(n)
          sommets.push(positions[i]!, positions[i + 1]!, positions[i + 2]!, 0, 0, 0, 0, ...n, ...tangente, ...bitangente, 1, 1, 1, 1)
        }
        locaux.push(local)
      }
    }
    const tampon = remap.size > 0xffff ? new Uint32Array(locaux) : new Uint16Array(locaux)
    const mesh = new Mesh(new Float32Array(sommets), tampon, `face-${face}`)
    engine.resourceManager.uploadMesh(mesh)
    const groupe = groupeDe(face, calque)
    const teinte = teintes?.materiaux[teintes.parFace[face] ?? -1]
    const noeud = new SceneNode(`face-${face}`, world, mesh, matiere(engine, groupe, teinte))
    parent.add(noeud)
    solide.set(face, { mesh, noeud, groupe, teinte })
  }
  return solide
}

const METRE = 0.001

function enMetres(mm: number[]) {
  return mm.map((valeur) => valeur * METRE)
}

function couleurDatum(id: string, survol: string | null, choisi: string | null): Rgba {
  if (id === choisi) return couleursTopo.selection
  if (id === survol) return couleursTopo.survol
  if (id === 'axe.x') return couleursTopo.axeX
  if (id === 'axe.y') return couleursTopo.axeY
  if (id === 'axe.z') return couleursTopo.axeZ
  return couleursTopo.plan
}

function poserDatums(pose: PoseTraits, survol: string | null, choisi: string | null) {
  for (const id of ['plan.dessus', 'plan.12h', 'plan.3h']) {
    const actif = id === survol || id === choisi
    pose.ruban(traitsBruts(enMetres(contourPlan(id, DEMI_DATUM_MM))), couleurDatum(id, survol, choisi), id, actif ? epaisseurTopo.survol : epaisseurTopo.datum)
  }
  for (const id of ['axe.x', 'axe.y', 'axe.z'] as AxeId[]) {
    const actif = id === survol || id === choisi
    pose.ruban(traitsBruts(enMetres(traitAxe(id, DEMI_DATUM_MM))), couleurDatum(id, survol, choisi), id, actif ? epaisseurTopo.selection : epaisseurTopo.fil)
  }
}

/** Pose les traits d’un calque et garde leurs tampons pour les libérer au prochain tour. */
class PoseTraits {
  readonly tampons: GPUBuffer[] = []

  constructor(
    private readonly parent: SceneNode,
    private readonly params: ProjectLoadParams,
    /** Taille monde d’un pixel CSS. */
    private readonly pixel: number,
    /** Direction vers l’œil ; absente avant la première trame. */
    private readonly versOeil: [number, number, number] | null,
  ) {}

  /**
   * Ruban de `px` pixels, posé sur l’arête puis avancé vers l’œil :
   * le prisme passe devant les faces qui se rejoignent sur l’arête, sans glisser de côté.
   */
  ruban(traits: Traits, rgba: Rgba, nom: string, px: number) {
    const demi = (px / 2) * this.pixel
    const segments = this.versOeil
      ? avancer(traits.segments, this.versOeil, 2 * demi + 0.0001)
      : decaler(traits, demi)
    this.poser(segments, rgba, nom, demi)
  }

  /** Trait d’un pixel matériel (grille, esquisse) : ni décalage ni épaisseur. */
  trait(segments: number[], rgba: Rgba, nom: string) {
    this.poser(segments, rgba, nom)
  }

  private poser(segments: number[], rgba: Rgba, nom: string, demiLargeur?: number) {
    const tampon = poserFil(this.parent, this.params.world, this.params.engine, this.params.logger, segments, rgba, nom, demiLargeur)
    if (tampon) this.tampons.push(tampon)
  }
}

/** Libère des tampons retirés de la scène, après la trame en cours. */
function libererTampons(engine: Engine, tampons: GPUBuffer[]) {
  if (tampons.length === 0) return
  const queue = engine.webGPUContext.device.queue
  requestAnimationFrame(() => {
    void queue.onSubmittedWorkDone().then(() => {
      for (const tampon of tampons) tampon.destroy()
    })
  })
}

function poserGlyphes(
  parent: SceneNode,
  world: ProjectLoadParams['world'],
  engine: Engine,
  esquisse: EsquissePosee | null,
): Mesh[] {
  const poses: Mesh[] = []
  if (!esquisse || !police || !graphe) return poses
  const altitude = esquisse.cercles[0]?.y ?? 0
  const poserTexte = (
    nom: string,
    texte: string,
    origine: [number, number, number],
    normale: [number, number, number],
    tangente: [number, number, number],
  ) => {
    const mesh = createTextMeshFromFont({
      fontArrayBuffer: police as ArrayBuffer,
      text: texte,
      fontSize: 0.003,
      layout: { align: 'left' },
      orientation: {
        mode: 'plane',
        normal: vec3.fromValues(...normale),
        tangent: vec3.fromValues(...tangente),
      },
      origin: vec3.fromValues(...origine),
      name: nom,
    })
    engine.resourceManager.uploadMesh(mesh)
    poses.push(mesh)
    const matiere = new Material({
      name: nom,
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
    parent.add(new SceneNode(nom, world, mesh, matiere))
  }
  esquisse.cercles.forEach((cercle, index) => {
    const pose = poseGlyphe(esquisse.support, cercle.rayon, cercle.y, cercle.valeur, index)
    poserTexte(`cote-${index}`, pose.texte, pose.origine, pose.normale, pose.tangente)
  })
  ;(esquisse.cotesLineaires ?? []).forEach((cote, index) => {
    const pose = coteSegment(esquisse.support, cote.a, cote.b, cote.decalage, altitude)
    if (pose.trait.length === 0) return
    poserTexte(
      `cote-ligne-${index}`,
      cote.texte,
      [pose.ancre[0] * 0.001, pose.ancre[1] * 0.001, pose.ancre[2] * 0.001],
      pose.normale,
      pose.direction,
    )
  })
  return poses
}

function poserFil(
  parent: SceneNode,
  world: ProjectLoadParams['world'],
  engine: Engine,
  logger: ProjectLoadParams['logger'],
  segments: number[],
  rgba: Rgba,
  nom: string,
  /** Demi-largeur en mètres. Un ruban passe devant la surface ; un trait matériel s'y noie de profil. */
  demiLargeur?: number,
): GPUBuffer | null {
  const construit = demiLargeur
    ? buildLineRibbonInterleavedVertices(segments, rgba, 50_000, demiLargeur, logger, nom)
    : buildLineListInterleavedVertices(segments, rgba, 50_000, logger, nom)
  if (construit.vertexCount === 0) return null
  const tampon = engine.resourceManager.createLineOverlayVertexBuffer(construit.vertices, nom)
  const noeud = new SceneNode(nom, world)
  world.addComponent(
    noeud.entityId,
    new VectorLineOverlayComponent(tampon, construit.vertexCount, 0, demiLargeur ? 'triangle-list' : 'line-list'),
  )
  parent.add(noeud)
  return tampon
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
  const veillerRatio = veilleurRatioPixels(() =>
    engine.webGPUContext.resize(undefined, undefined, (w, h) => engine.sceneRenderGraph.resize(w, h)),
  )
  engine.scheduler.addSystem(() => {
    veillerRatio()
    projet?.suivreZoom()
  })
  canevas.addEventListener(
    'wheel',
    (evenement) => {
      evenement.preventDefault()
      projet?.zoomer(evenement)
    },
    { passive: false },
  )
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
  calque: CalqueTopo = calqueVide,
) {
  const document = documentCad(frontiere, esquisse, volume)
  if (canevasMoteur !== canevas || !demarrage) {
    canevasMoteur = canevas
    projet = null
    demarrage = demarrer(canevas)
  }
  return demarrage.then(() => projet?.montrer(document, esquisse, calque))
}

/** Point (m) autour duquel tournera la vue ; `null` : le centre de la vue. */
export function pivoterVue(point: [number, number, number] | null) {
  projet?.pivoter(point)
}

export function cadrerVue() {
  projet?.cadrer()
}

/** Caméra active pour un pick NDC (null si moteur pas prêt). */
export function cadreCameraPick() {
  return projet?.cadrePick() ?? null
}
