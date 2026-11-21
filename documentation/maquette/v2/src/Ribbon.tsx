import type { ReactNode } from 'react'
import {
  Aperture,
  Box,
  Camera,
  Circle,
  CircleDot,
  Cog,
  Combine,
  Copy,
  Download,
  Drill,
  Ellipsis,
  Equal,
  Eraser,
  FileOutput,
  FileBox,
  FlipHorizontal2,
  Hexagon,
  Image,
  Link2,
  Lock,
  Magnet,
  Minus,
  Move,
  Move3d,
  MousePointer2,
  PenLine,
  Pentagon,
  Play,
  Ruler,
  Scissors,
  Settings2,
  Slash,
  Sparkles,
  Square,
  Spline,
  SunMedium,
  Wrench,
  Zap,
} from 'lucide-react'
import { Button } from './ds'
import { useMock, type RibbonTab, type Workspace } from './mockState'

type RibbonTool = {
  id: string
  label: string
  icon: ReactNode
  disabled?: boolean
  reason?: string
}

type RibbonGroup = {
  title: string
  tools: RibbonTool[]
}

const TABS: { id: RibbonTab; label: string }[] = [
  { id: 'solide', label: 'SOLIDE' },
  { id: 'esquisse', label: 'ESQUISSE' },
  { id: 'outils', label: 'OUTILS' },
]

function sketchGroups(): RibbonGroup[] {
  return [
    {
      title: 'Select',
      tools: [
        { id: 'select', label: 'Select', icon: <MousePointer2 className="h-4 w-4" /> },
        { id: 'construction', label: 'Construction', icon: <PenLine className="h-4 w-4" /> },
      ],
    },
    {
      title: 'Create',
      tools: [
        { id: 'ligne', label: 'Line', icon: <Minus className="h-4 w-4" /> },
        { id: 'rectangle', label: 'Rectangle', icon: <Square className="h-4 w-4" /> },
        { id: 'cercle', label: 'Circle', icon: <Circle className="h-4 w-4" /> },
        { id: 'arc', label: 'Arc', icon: <CircleDot className="h-4 w-4" /> },
        { id: 'polygon', label: 'Polygon', icon: <Pentagon className="h-4 w-4" /> },
        { id: 'ellipse', label: 'Ellipse', icon: <Ellipsis className="h-4 w-4" /> },
        { id: 'slot', label: 'Slot', icon: <Hexagon className="h-4 w-4" /> },
        { id: 'spline', label: 'Spline', icon: <Spline className="h-4 w-4" /> },
      ],
    },
    {
      title: 'Modify',
      tools: [
        { id: 'fillet2d', label: 'Fillet', icon: <Eraser className="h-4 w-4" /> },
        { id: 'trim', label: 'Trim', icon: <Scissors className="h-4 w-4" /> },
        { id: 'offset', label: 'Offset', icon: <Copy className="h-4 w-4" /> },
        { id: 'mirror', label: 'Mirror', icon: <FlipHorizontal2 className="h-4 w-4" /> },
        { id: 'move2d', label: 'Move', icon: <Move className="h-4 w-4" /> },
      ],
    },
    {
      title: 'Constrain',
      tools: [
        { id: 'cote', label: 'Dimension', icon: <Ruler className="h-4 w-4" /> },
        { id: 'horizontal', label: 'H', icon: <Minus className="h-4 w-4" /> },
        { id: 'vertical', label: 'V', icon: <Slash className="h-4 w-4 rotate-90" /> },
        { id: 'coincidence', label: 'Coincident', icon: <Magnet className="h-4 w-4" /> },
        { id: 'equal', label: 'Equal', icon: <Equal className="h-4 w-4" /> },
        { id: 'parallel', label: 'Parallel', icon: <Link2 className="h-4 w-4" /> },
      ],
    },
  ]
}

function workspaceGroups(workspace: Exclude<Workspace, 'design'>): RibbonGroup[] {
  if (workspace === 'cam') {
    return [
      {
        title: 'Gamme',
        tools: [
          { id: 'setup', label: 'Setup', icon: <Settings2 className="h-4 w-4" /> },
          { id: 'ebauche', label: 'Ébauche', icon: <Wrench className="h-4 w-4" /> },
          { id: 'finition', label: 'Finition', icon: <Sparkles className="h-4 w-4" /> },
          { id: 'percage', label: 'Perçage', icon: <Drill className="h-4 w-4" /> },
          { id: 'simuler', label: 'Simuler', icon: <Play className="h-4 w-4" /> },
          {
            id: 'post',
            label: 'Post',
            icon: <FileOutput className="h-4 w-4" />,
            disabled: true,
            reason: 'pas de machine',
          },
        ],
      },
    ]
  }
  if (workspace === 'ctrl') {
    return [
      {
        title: 'Relevé',
        tools: [
          { id: 'mesurer', label: 'Mesurer', icon: <Ruler className="h-4 w-4" /> },
          { id: 'ecart', label: 'Écart', icon: <Cog className="h-4 w-4" /> },
          { id: 'appliquer', label: 'Appliquer', icon: <Wrench className="h-4 w-4" /> },
          { id: 'verrouiller', label: 'Verrouiller', icon: <Lock className="h-4 w-4" /> },
        ],
      },
    ]
  }
  return [
    {
      title: 'Studio',
      tools: [
        { id: 'camera', label: 'Caméra', icon: <Camera className="h-4 w-4" /> },
        { id: 'lumiere', label: 'Lumière', icon: <SunMedium className="h-4 w-4" /> },
        { id: 'matiere', label: 'Matière', icon: <Sparkles className="h-4 w-4" /> },
        { id: 'environnement', label: 'Environnement', icon: <Image className="h-4 w-4" /> },
        { id: 'generer', label: 'Générer', icon: <Aperture className="h-4 w-4" /> },
      ],
    },
  ]
}

const WORKSPACE_TITLE: Record<Exclude<Workspace, 'design'>, string> = {
  cam: 'CAM',
  ctrl: 'CTRL',
  render: 'Render Studio',
}

function groupsFor(tab: RibbonTab, scene: string): RibbonGroup[] {
  if (scene === 'sketch') return sketchGroups()
  if (tab === 'esquisse') return sketchGroups()
  if (tab === 'solide') {
    return [
      {
        title: 'Créer',
        tools: [
          { id: 'extrude', label: 'Extruder', icon: <Zap className="h-4 w-4" /> },
          { id: 'enleve', label: 'Enlever', icon: <Scissors className="h-4 w-4" /> },
          {
            id: 'fillet',
            label: 'Congé',
            icon: <Eraser className="h-4 w-4" />,
            disabled: true,
            reason: 'Choisissez une arête',
          },
        ],
      },
      {
        title: 'Modifier',
        tools: [
          { id: 'move', label: 'Déplacer', icon: <Move3d className="h-4 w-4" /> },
          { id: 'combine', label: 'Combiner', icon: <Combine className="h-4 w-4" /> },
        ],
      },
      {
        title: 'Inspecter',
        tools: [{ id: 'measure', label: 'Mesurer', icon: <Ruler className="h-4 w-4" /> }],
      },
      {
        title: 'Exporter',
        tools: [{ id: 'export', label: 'STEP', icon: <Download className="h-4 w-4" /> }],
      },
    ]
  }
  return [
    {
      title: 'Pièce',
      tools: [
        { id: 'params', label: 'Paramètres', icon: <FileBox className="h-4 w-4" /> },
        { id: 'bodies', label: 'Corps', icon: <Box className="h-4 w-4" /> },
      ],
    },
  ]
}

export function Ribbon() {
  const {
    ribbonTab,
    setRibbonTab,
    scene,
    workspace,
    activeTool,
    setActiveTool,
    finishSketch,
    applyRattrapage,
    toggleLock,
    locked,
    generateRender,
  } = useMock()
  const inSketch = workspace === 'design' && scene === 'sketch'
  const groups =
    workspace === 'design' ? groupsFor(ribbonTab, scene) : workspaceGroups(workspace)

  const onTool = (id: string, disabled?: boolean) => {
    if (disabled) return
    setActiveTool(id)
    if (id === 'appliquer') applyRattrapage()
    if (id === 'verrouiller') toggleLock()
    if (id === 'generer') generateRender()
  }

  return (
    <div className="border-b border-oc-line bg-[var(--oc-ribbon)]">
      {workspace !== 'design' ? (
        <div className="flex items-center justify-between px-3 pt-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-oc-accent">
            {WORKSPACE_TITLE[workspace]}
          </span>
          <span className="text-[11px] text-oc-muted">
            {workspace === 'cam'
              ? 'Un setup par machine et posage'
              : workspace === 'ctrl'
                ? locked
                  ? 'Relevé verrouillé'
                  : 'MBD carrure.cadompart'
                : 'Studio · 1920×1080'}
          </span>
        </div>
      ) : !inSketch ? (
        <div className="flex items-end gap-1 px-2 pt-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setRibbonTab(tab.id)}
              className={`rounded-t px-3 py-1.5 text-[11px] font-semibold tracking-wide ${
                ribbonTab === tab.id
                  ? 'bg-oc-select text-oc-accent'
                  : 'text-oc-muted hover:bg-oc-panel-2 hover:text-oc-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-between px-3 pt-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-oc-accent">
            Sketch
          </span>
          <span className="text-[11px] text-oc-muted">Plan de dessus · 1 forme</span>
        </div>
      )}

      <div className="flex flex-wrap items-stretch gap-0 px-2 pb-2 pt-1">
        <div className="flex min-w-0 flex-1 flex-wrap items-stretch">
          {groups.map((group, i) => (
            <div key={group.title} className="flex items-stretch">
              {i > 0 ? <div className="mx-1.5 w-px self-stretch bg-oc-line" /> : null}
              <div className="flex flex-col">
                <div className="flex flex-wrap gap-0.5">
                  {group.tools.map((tool) => {
                    const active = tool.id === 'verrouiller' ? locked : activeTool === tool.id
                    const title =
                      tool.disabled && tool.reason
                        ? `${tool.label} — ${tool.reason}`
                        : tool.label
                    return (
                      <button
                        key={tool.id}
                        type="button"
                        title={title}
                        disabled={tool.disabled || (tool.id === 'appliquer' && locked)}
                        onClick={() => onTool(tool.id, tool.disabled || (tool.id === 'appliquer' && locked))}
                        className={`flex min-w-[2.75rem] flex-col items-center gap-0.5 rounded-oc px-1.5 py-1.5 text-[9px] transition ${
                          active
                            ? 'bg-oc-select text-oc-accent ring-1 ring-oc-accent/40'
                            : 'text-oc-text hover:bg-oc-panel-2'
                        } disabled:cursor-not-allowed disabled:text-oc-disabled disabled:hover:bg-transparent`}
                      >
                        {tool.icon}
                        <span className="max-w-[4.5rem] truncate">{tool.label}</span>
                      </button>
                    )
                  })}
                </div>
                <span className="mt-0.5 text-center text-[9px] uppercase tracking-wider text-oc-muted">
                  {group.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {inSketch ? (
          <div className="ml-auto flex items-end pb-0.5 pl-2">
            <Button variant="sketch" className="!px-3 !py-2 text-[12px]" onClick={finishSketch}>
              Finish sketch
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
