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
export type CtrlVarId = 'diametre_boite' | 'epaisseur_paroi' | 'entrecorne'

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

/** Pièces de `assemblageBoite.ts`. Un setup par couple machine + posage. */
export const CAM_PARTS: CamPart[] = [
  {
    id: 'carrure',
    label: 'Carrure',
    definition: 'carrure.cadompart',
    setups: [
      {
        id: 'carrure-tour',
        label: 'Setup Tour',
        machine: 'Tour',
        outils: ['plaquette CNMG'],
        brut: 'tube',
        final: 'carrure.cadompart',
        posage: 'mandrin',
        operations: [
          {
            id: 'op10',
            label: 'Op10 ébauche',
            parcours: 'contour extérieur',
            tool: 'plaquette CNMG',
            feed: '0,2 mm/tr',
            pass: '0,4 mm',
          },
          {
            id: 'op20',
            label: 'Op20 finition',
            parcours: 'profil',
            tool: 'plaquette CNMG',
            feed: '0,08 mm/tr',
            pass: '0,1 mm',
          },
        ],
      },
      {
        id: 'carrure-fraise',
        label: 'Setup Fraiseuse',
        machine: 'Fraiseuse 3 axes',
        outils: ['fraise Ø6', 'foret Ø1,2'],
        brut: 'ébauche tour',
        final: 'carrure.cadompart',
        posage: 'montage cornes',
        operations: [
          {
            id: 'op30',
            label: 'Op30 perçages barrette',
            parcours: '4 trous',
            tool: 'foret Ø1,2',
            feed: '120 mm/min',
            pass: 'traversant',
          },
        ],
      },
    ],
  },
  {
    id: 'lunette',
    label: 'Lunette',
    definition: 'lunette.cadompart',
    setups: [
      {
        id: 'lunette-tour',
        label: 'Setup Tour',
        machine: 'Tour',
        outils: ['plaquette CNMG'],
        brut: 'barre',
        final: 'lunette.cadompart',
        posage: 'mandrin',
        operations: [
          {
            id: 'lunette-op10',
            label: 'Op10 dressage',
            parcours: 'face',
            tool: 'plaquette CNMG',
            feed: '0,15 mm/tr',
            pass: '0,2 mm',
          },
        ],
      },
    ],
  },
  {
    id: 'verre',
    label: 'Verre',
    definition: 'verre.cadompart',
    setups: [
      {
        id: 'verre-fraise',
        label: 'Setup Fraiseuse',
        machine: 'Fraiseuse 3 axes',
        outils: ['fraise Ø6'],
        brut: 'disque',
        final: 'verre.cadompart',
        posage: 'ventouse',
        operations: [
          {
            id: 'verre-op10',
            label: 'Op10 détourage',
            parcours: 'contour',
            tool: 'fraise Ø6',
            feed: '600 mm/min',
            pass: '0,3 mm',
          },
        ],
      },
    ],
  },
  {
    id: 'fond',
    label: 'Fond',
    definition: 'fond.cadompart',
    setups: [
      {
        id: 'fond-tour',
        label: 'Setup Tour',
        machine: 'Tour',
        outils: ['plaquette CNMG'],
        brut: 'rondelle',
        final: 'fond.cadompart',
        posage: 'mandrin',
        operations: [
          {
            id: 'fond-op10',
            label: 'Op10 tournage',
            parcours: 'profil',
            tool: 'plaquette CNMG',
            feed: '0,12 mm/tr',
            pass: '0,2 mm',
          },
        ],
      },
    ],
  },
  {
    id: 'couronne',
    label: 'Couronne',
    definition: 'couronne.cadompart',
    setups: [
      {
        id: 'couronne-tour',
        label: 'Setup Tour',
        machine: 'Tour',
        outils: ['plaquette CNMG'],
        brut: 'barre Ø6',
        final: 'couronne.cadompart',
        posage: 'pince',
        operations: [
          {
            id: 'couronne-op10',
            label: 'Op10 tournage',
            parcours: 'révolution',
            tool: 'plaquette CNMG',
            feed: '0,08 mm/tr',
            pass: '0,15 mm',
          },
        ],
      },
      {
        id: 'couronne-fraise',
        label: 'Setup Fraiseuse',
        machine: 'Fraiseuse 3 axes',
        outils: ['fraise Ø2'],
        brut: 'ébauche tour',
        final: 'couronne.cadompart',
        posage: 'pince diviseur',
        operations: [
          {
            id: 'couronne-op20',
            label: 'Op20 cannelure',
            parcours: 'moletage',
            tool: 'fraise Ø2',
            feed: '200 mm/min',
            pass: '0,1 mm',
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
}

/** Tolérances MBD portées par `carrure.cadompart`. Le rattrapage est nul tant que le relevé reste dans la bande. */
export const CTRL_MBD = 'carrure.cadompart'

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
    id: 'diametre_boite',
    nominal: '40 mm',
    tolerance: '±0,05 mm',
    mini: '39,95 mm',
    maxi: '40,05 mm',
    measured: '40,08 mm',
    ecart: '+0,08 mm',
    inTolerance: false,
    offset: '−0,08 mm',
  },
  {
    id: 'epaisseur_paroi',
    nominal: '2,5 mm',
    tolerance: '±0,05 mm',
    mini: '2,45 mm',
    maxi: '2,55 mm',
    measured: '2,52 mm',
    ecart: '+0,02 mm',
    inTolerance: true,
    offset: '0 mm',
  },
  {
    id: 'entrecorne',
    nominal: '20 mm',
    tolerance: '±0,10 mm',
    mini: '19,90 mm',
    maxi: '20,10 mm',
    measured: '20 mm',
    ecart: '0 mm',
    inTolerance: true,
    offset: '0 mm',
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
  const [ctrlVar, setCtrlVar] = useState<CtrlVarId>('diametre_boite')
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
      setCamNode,
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
