import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { applyOcTheme, loadOcTheme, type OcTheme } from './ds'

export type MockScene = 'sketch' | 'extrude'
export type RibbonTab = 'solide' | 'esquisse' | 'outils'
export type SelectFilter = 'any' | 'body' | 'face' | 'edge'
export type Workspace = 'design' | 'cam' | 'ctrl' | 'render'
export type CtrlVarId = 'plateau' | 'poignee' | 'vis'

export type SketchToggle = {
  lookAt: boolean
  grid: boolean
  snap: boolean
  slice: boolean
  points: boolean
  profile: boolean
  dimensions: boolean
  constraints: boolean
}

export type CamOperation = {
  id: string
  label: string
  parcours: string
  tool: string
  feed: string
  pass: string
  /** Cote MBD de la définition qui choisit l’opération et l’outil. */
  mbd?: CtrlVarId
  /** Phrase qui relie cette opération à la cote. */
  mbdUse?: string
}

export type CamSetup = {
  id: string
  label: string
  machine: string
  outils: string[]
  brut: string
  final: string
  posage: string
  operations: CamOperation[]
}

export type CamPart = {
  id: string
  label: string
  definition: string
  setups: CamSetup[]
}

/** Pièces de `assemblagePlateau.ts`. Un setup par couple machine + posage. */
export const CAM_PARTS: CamPart[] = [
  {
    id: 'plateau',
    label: 'Plateau',
    definition: 'plateau.cadompart',
    setups: [
      {
        id: 'plateau-fraise',
        label: 'Setup Fraiseuse',
        machine: 'Fraiseuse 3 axes',
        outils: ['fraise Ø10'],
        brut: 'plaque aluminium',
        final: 'plateau.cadompart',
        posage: 'étau',
        operations: [
          {
            id: 'op10',
            label: 'Op10 poche',
            parcours: 'poche',
            tool: 'fraise Ø10',
            feed: '800 mm/min',
            pass: '1 mm',
            mbd: 'plateau',
            mbdUse: 'Ébauche de la poche · aluminium · la finition tient 500 ±0,5 et la rugosité 0,55.',
          },
          {
            id: 'op20',
            label: 'Op20 finition',
            parcours: 'profil',
            tool: 'fraise Ø10',
            feed: '400 mm/min',
            pass: '0,2 mm',
            mbd: 'plateau',
            mbdUse: 'Finition du fond et du rebord · rugosité 0,55 lue sur aluminium.cadomat.',
          },
        ],
      },
    ],
  },
  {
    id: 'poignee',
    label: 'Poignée',
    definition: 'poignee.cadompart',
    setups: [
      {
        id: 'poignee-fraise',
        label: 'Setup Fraiseuse',
        machine: 'Fraiseuse 3 axes',
        outils: ['fraise Ø6'],
        brut: 'plat laiton',
        final: 'poignee.cadompart',
        posage: 'étau',
        operations: [
          {
            id: 'op30',
            label: 'Op30 contour D',
            parcours: 'contour',
            tool: 'fraise Ø6',
            feed: '500 mm/min',
            pass: '0,5 mm',
            mbd: 'poignee',
            mbdUse: 'Contour du D · laiton · entraxe 180 ±0,2 · rugosité 0,50.',
          },
        ],
      },
    ],
  },
  {
    id: 'vis',
    label: 'Vis',
    definition: 'vis.cadompart',
    setups: [
      {
        id: 'vis-tour',
        label: 'Setup Tour',
        machine: 'Tour',
        outils: ['plaquette'],
        brut: 'barre acier',
        final: 'vis.cadompart',
        posage: 'pince',
        operations: [
          {
            id: 'op40',
            label: 'Op40 M4',
            parcours: 'révolution',
            tool: 'plaquette',
            feed: '0,08 mm/tr',
            pass: '0,2 mm',
            mbd: 'vis',
            mbdUse: 'Tournage M4 × 20 · acier · rugosité 0,55 de acier.cadomat.',
          },
        ],
      },
    ],
  },
]

export type CamKind = 'part' | 'setup' | 'outils' | 'brut' | 'final' | 'posage' | 'operation' | 'parcours' | 'tool'

export type CamHit = {
  part: CamPart
  setup?: CamSetup
  operation?: CamOperation
  kind: CamKind
}

export function findCam(id: string): CamHit {
  for (const part of CAM_PARTS) {
    if (part.id === id) return { part, kind: 'part' }
    for (const setup of part.setups) {
      if (setup.id === id) return { part, setup, kind: 'setup' }
      if (id === `${setup.id}:outils`) return { part, setup, kind: 'outils' }
      if (id === `${setup.id}:brut`) return { part, setup, kind: 'brut' }
      if (id === `${setup.id}:final`) return { part, setup, kind: 'final' }
      if (id === `${setup.id}:posage`) return { part, setup, kind: 'posage' }
      for (const operation of setup.operations) {
        if (operation.id === id) return { part, setup, operation, kind: 'operation' }
        if (id === `${operation.id}:parcours`) return { part, setup, operation, kind: 'parcours' }
        if (id === `${operation.id}:tool`) return { part, setup, operation, kind: 'tool' }
        if (id === `${operation.id}:mbd`) return { part, setup, operation, kind: 'operation' }
      }
    }
  }
  return { part: CAM_PARTS[0], setup: CAM_PARTS[0].setups[0], kind: 'setup' }
}

export type CtrlVar = {
  id: CtrlVarId
  nominal: string
  tolerance: string
  mini: string
  maxi: string
  measured: string
  ecart: string
  inTolerance: boolean
  offset: string
  datum: string
  /** État de surface lu sur le `.cadomat` de la pièce : rugosité PBR. */
  surface: string
  matiere: string
  cadomat: string
  roughness: string
  swatch: string
  /** Opération et outil que la CAM déduit de cette cote. */
  camUse: string
}

/** Assemblage, matières et rugosités du plateau de service. */
export const CTRL_MBD = 'PlateauService.cadom'

export function isCtrlVar(id: string): id is CtrlVarId {
  return id === 'plateau' || id === 'poignee' || id === 'vis'
}

export function mbdById(id: CtrlVarId) {
  return CTRL_VARS.find((item) => item.id === id) ?? CTRL_VARS[0]
}

function readMm(value: string) {
  const match = value.replace('−', '-').match(/-?\d+(?:[.,]\d+)?/)
  return match ? Number(match[0].replace(',', '.')) : 0
}

/** Écart relevé / nominal, en fraction de la demi-bande MBD. 0 = nominal, ±1 = mini ou maxi. */
export function ctrlRatio(variable: CtrlVar) {
  const half = readMm(variable.tolerance)
  if (!half) return 0
  return (readMm(variable.measured) - readMm(variable.nominal)) / half
}

const HEAT_STOPS: { t: number; rgb: [number, number, number] }[] = [
  { t: -1.5, rgb: [37, 99, 235] },
  { t: -1, rgb: [56, 189, 248] },
  { t: 0, rgb: [52, 211, 153] },
  { t: 1, rgb: [245, 158, 11] },
  { t: 1.5, rgb: [239, 68, 68] },
]

export function ctrlHeat(ratio: number) {
  const t = Math.max(-1.5, Math.min(1.5, ratio))
  let index = 0
  while (index < HEAT_STOPS.length - 2 && t > HEAT_STOPS[index + 1].t) index += 1
  const start = HEAT_STOPS[index]
  const end = HEAT_STOPS[index + 1]
  const mix = (t - start.t) / (end.t - start.t)
  const rgb = start.rgb.map((channel, channelIndex) =>
    Math.round(channel + (end.rgb[channelIndex] - channel) * mix),
  )
  return `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`
}

export const CTRL_VARS: CtrlVar[] = [
  {
    id: 'plateau',
    nominal: '500 mm',
    tolerance: '±0,5 mm',
    mini: '499,5 mm',
    maxi: '500,5 mm',
    measured: '500,8 mm',
    ecart: '+0,8 mm',
    inTolerance: false,
    offset: '−0,8 mm',
    datum: 'A',
    surface: 'rugosité 0,55',
    matiere: 'aluminium',
    cadomat: 'aluminium.cadomat',
    roughness: '0,55',
    swatch: '#c7ccd4',
    camUse: 'Fraisage de la poche · aluminium · rugosité 0,55.',
  },
  {
    id: 'poignee',
    nominal: '180 mm',
    tolerance: '±0,2 mm',
    mini: '179,8 mm',
    maxi: '180,2 mm',
    measured: '180,08 mm',
    ecart: '+0,08 mm',
    inTolerance: true,
    offset: '0 mm',
    datum: 'B',
    surface: 'rugosité 0,50',
    matiere: 'laiton',
    cadomat: 'laiton.cadomat',
    roughness: '0,50',
    swatch: '#d9a84c',
    camUse: 'Contour du D · laiton · entraxe 180 · rugosité 0,50.',
  },
  {
    id: 'vis',
    nominal: '20 mm',
    tolerance: '±0,1 mm',
    mini: '19,9 mm',
    maxi: '20,1 mm',
    measured: '20 mm',
    ecart: '0 mm',
    inTolerance: true,
    offset: '0 mm',
    datum: 'C',
    surface: 'rugosité 0,55',
    matiere: 'acier',
    cadomat: 'acier.cadomat',
    roughness: '0,55',
    swatch: '#8c8e94',
    camUse: 'Tournage M4 × 20 · acier · rugosité 0,55.',
  },
]

type ToolMap = Record<Workspace, string>

type MockState = {
  theme: OcTheme
  setTheme: (theme: OcTheme) => void
  workspace: Workspace
  setWorkspace: (workspace: Workspace) => void
  scene: MockScene
  setScene: (scene: MockScene) => void
  ribbonTab: RibbonTab
  setRibbonTab: (tab: RibbonTab) => void
  activeTool: string
  setActiveTool: (id: string) => void
  selectFilter: SelectFilter
  setSelectFilter: (f: SelectFilter) => void
  sketchToggles: SketchToggle
  toggleSketch: (key: keyof SketchToggle) => void
  finishSketch: () => void
  cancelSketch: () => void
  camNode: string
  setCamNode: (id: string) => void
  simT: number
  setSimT: (t: number | ((current: number) => number)) => void
  simPlaying: boolean
  setSimPlaying: (playing: boolean) => void
  stopSim: () => void
  showMachineFrame: boolean
  setShowMachineFrame: (on: boolean) => void
  showStockFrame: boolean
  setShowStockFrame: (on: boolean) => void
  framesSuperposed: boolean
  setFramesSuperposed: (on: boolean) => void
  ctrlVar: CtrlVarId
  setCtrlVar: (id: CtrlVarId) => void
  rattrapageLabel: string | null
  applyRattrapage: () => void
  locked: boolean
  toggleLock: () => void
  renderReady: boolean
  generateRender: () => void
}

const DEFAULT_TOGGLES: SketchToggle = {
  lookAt: false,
  grid: true,
  snap: true,
  slice: false,
  points: false,
  profile: true,
  dimensions: true,
  constraints: false,
}

const DEFAULT_TOOLS: ToolMap = {
  design: 'rectangle',
  cam: 'ebauche',
  ctrl: 'ecart',
  render: 'camera',
}

const MockContext = createContext<MockState | null>(null)

export function MockProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<OcTheme>(() => {
    const initial = loadOcTheme()
    applyOcTheme(initial)
    return initial
  })
  const [workspace, setWorkspace] = useState<Workspace>('design')
  const [scene, setSceneState] = useState<MockScene>('sketch')
  const [ribbonTab, setRibbonTab] = useState<RibbonTab>('esquisse')
  const [tools, setTools] = useState<ToolMap>(DEFAULT_TOOLS)
  const [selectFilter, setSelectFilter] = useState<SelectFilter>('any')
  const [sketchToggles, setSketchToggles] = useState<SketchToggle>(DEFAULT_TOGGLES)
  const [camNode, setCamNode] = useState('op10')
  const [simT, setSimT] = useState(0)
  const [simPlaying, setSimPlaying] = useState(false)
  const [showMachineFrame, setShowMachineFrame] = useState(true)
  const [showStockFrame, setShowStockFrame] = useState(true)
  const [framesSuperposed, setFramesSuperposed] = useState(false)
  const [ctrlVar, setCtrlVar] = useState<CtrlVarId>('plateau')
  const [rattrapageLabel, setRattrapageLabel] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)
  const [renderReady, setRenderReady] = useState(false)

  const setDesignTool = useCallback((id: string) => {
    setTools((prev) => ({ ...prev, design: id }))
  }, [])

  const setScene = useCallback(
    (next: MockScene) => {
      setSceneState(next)
      if (next === 'sketch') {
        setRibbonTab('esquisse')
        setDesignTool('rectangle')
      } else {
        setRibbonTab('solide')
        setDesignTool('extrude')
      }
    },
    [setDesignTool],
  )

  const finishSketch = useCallback(() => {
    setScene('extrude')
  }, [setScene])

  const cancelSketch = useCallback(() => {
    setDesignTool('select')
  }, [setDesignTool])

  const applyRattrapage = useCallback(() => {
    if (locked) return
    const variable = CTRL_VARS.find((item) => item.id === ctrlVar) ?? CTRL_VARS[0]
    setRattrapageLabel(
      variable.inTolerance
        ? `${variable.id} dans la tolérance MBD · rattrapage 0`
        : `${variable.id} hors MBD ${variable.tolerance} · rattrapage ${variable.offset}`,
    )
  }, [ctrlVar, locked])

  const value = useMemo<MockState>(
    () => ({
      theme,
      setTheme: (next) => {
        applyOcTheme(next)
        setThemeState(next)
      },
      workspace,
      setWorkspace,
      scene,
      setScene,
      ribbonTab,
      setRibbonTab,
      activeTool: tools[workspace],
      setActiveTool: (id: string) => setTools((prev) => ({ ...prev, [workspace]: id })),
      selectFilter,
      setSelectFilter,
      sketchToggles,
      toggleSketch: (key) =>
        setSketchToggles((prev) => ({ ...prev, [key]: !prev[key] })),
      finishSketch,
      cancelSketch,
      camNode,
      setCamNode: (id: string) => {
        setCamNode(id)
        const feature = findCam(id).operation?.mbd
        if (feature) setCtrlVar(feature)
      },
      simT,
      setSimT,
      simPlaying,
      setSimPlaying,
      stopSim: () => {
        setSimPlaying(false)
        setSimT(0)
      },
      showMachineFrame,
      setShowMachineFrame,
      showStockFrame,
      setShowStockFrame,
      framesSuperposed,
      setFramesSuperposed,
      ctrlVar,
      setCtrlVar,
      rattrapageLabel,
      applyRattrapage,
      locked,
      toggleLock: () => setLocked((prev) => !prev),
      renderReady,
      generateRender: () => setRenderReady(true),
    }),
    [
      theme,
      workspace,
      scene,
      setScene,
      ribbonTab,
      tools,
      selectFilter,
      sketchToggles,
      finishSketch,
      cancelSketch,
      camNode,
      simT,
      simPlaying,
      showMachineFrame,
      showStockFrame,
      framesSuperposed,
      ctrlVar,
      rattrapageLabel,
      applyRattrapage,
      locked,
      renderReady,
    ],
  )

  return <MockContext.Provider value={value}>{children}</MockContext.Provider>
}

export function useMock() {
  const ctx = useContext(MockContext)
  if (!ctx) throw new Error('useMock hors MockProvider')
  return ctx
}
