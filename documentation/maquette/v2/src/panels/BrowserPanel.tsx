import { useState, type ReactNode } from 'react'
import type { IDockviewPanelProps } from 'dockview'
import {
  Axis3d,
  Box,
  Camera,
  ChevronDown,
  ChevronRight,
  Circle,
  Cylinder,
  Eye,
  EyeOff,
  Layers,
  Lightbulb,
  Route,
  Pencil,
  Ruler,
  SlidersHorizontal,
  SunMedium,
  View,
  Wrench,
} from 'lucide-react'
import { CAM_PARTS, CTRL_VARS, mbdById, useMock, type CamSetup, type CtrlVarId } from '../mockState'

type Row = {
  id: string
  label: string
  icon: ReactNode
  count?: string
  empty?: string
  children?: Row[]
  activeSketch?: boolean
}

function BrowserRow({
  row,
  depth,
  expanded,
  hidden,
  selected,
  onToggle,
  onHide,
  onSelect,
}: {
  row: Row
  depth: number
  expanded: Set<string>
  hidden: Set<string>
  selected: string | null
  onToggle: (id: string) => void
  onHide: (id: string) => void
  onSelect: (id: string) => void
}) {
  const hasKids = Boolean(row.children?.length)
  const open = expanded.has(row.id)
  const isHidden = hidden.has(row.id)
  const isSel = selected === row.id
  const Chevron = open ? ChevronDown : ChevronRight

  return (
    <>
      <div
        className={`flex items-center gap-0.5 rounded-oc py-0.5 pr-1 text-[12px] ${
          isSel ? 'bg-oc-select text-oc-text' : 'text-oc-text hover:bg-oc-panel-2'
        } ${isHidden ? 'opacity-45' : ''}`}
        style={{ paddingLeft: 6 + depth * 12 }}
      >
        {hasKids || row.empty ? (
          <button
            type="button"
            className="inline-flex h-5 w-5 items-center justify-center text-oc-muted"
            onClick={() => onToggle(row.id)}
            aria-label={open ? 'Replier' : 'Déplier'}
          >
            <Chevron className="h-3.5 w-3.5" />
          </button>
        ) : (
          <span className="inline-block w-5" />
        )}
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-1.5 py-1 text-left"
          onClick={() => onSelect(row.id)}
        >
          {row.icon ? <span className="text-oc-muted">{row.icon}</span> : null}
          <span className="truncate">{row.label}</span>
          {row.activeSketch ? (
            <Pencil className="h-3 w-3 shrink-0 text-oc-accent" aria-label="Esquisse active" />
          ) : null}
          {row.count ? (
            <span className="ml-auto text-[10px] text-oc-muted">{row.count}</span>
          ) : null}
        </button>
        <button
          type="button"
          className="inline-flex h-6 w-6 items-center justify-center rounded text-oc-muted hover:bg-oc-panel hover:text-oc-text"
          title={isHidden ? 'Afficher' : 'Masquer'}
          onClick={() => onHide(row.id)}
        >
          {isHidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </button>
      </div>
      {open && row.empty ? (
        <p
          className="m-0 py-1 text-[11px] italic text-oc-muted"
          style={{ paddingLeft: 18 + (depth + 1) * 12 }}
        >
          {row.empty}
        </p>
      ) : null}
      {hasKids && open
        ? row.children!.map((child) => (
            <BrowserRow
              key={child.id}
              row={child}
              depth={depth + 1}
              expanded={expanded}
              hidden={hidden}
              selected={selected}
              onToggle={onToggle}
              onHide={onHide}
              onSelect={onSelect}
            />
          ))
        : null}
    </>
  )
}

function Tree({
  rows,
  expandedIds,
  selected,
  onSelect,
}: {
  rows: Row[]
  expandedIds: string[]
  selected: string | null
  onSelect: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(() => new Set(expandedIds))
  const [hidden, setHidden] = useState(() => new Set<string>())

  return (
    <aside className="flex h-full flex-col bg-oc-panel text-oc-text">
      <div className="flex items-center justify-between border-b border-oc-line px-3 py-2">
        <h2 className="m-0 text-[11px] font-semibold uppercase tracking-wider text-oc-muted">
          Browser
        </h2>
      </div>
      <div className="min-h-0 flex-1 overflow-auto py-1">
        {rows.map((row) => (
          <BrowserRow
            key={row.id}
            row={row}
            depth={0}
            expanded={expanded}
            hidden={hidden}
            selected={selected}
            onToggle={(id) =>
              setExpanded((prev) => {
                const next = new Set(prev)
                if (next.has(id)) next.delete(id)
                else next.add(id)
                return next
              })
            }
            onHide={(id) =>
              setHidden((prev) => {
                const next = new Set(prev)
                if (next.has(id)) next.delete(id)
                else next.add(id)
                return next
              })
            }
            onSelect={onSelect}
          />
        ))}
      </div>
    </aside>
  )
}

function isCtrlVar(id: string): id is CtrlVarId {
  return id === 'plateau' || id === 'poignee' || id === 'vis'
}

function DesignBrowser() {
  const { scene, setCtrlVar } = useMock()
  const inSketch = scene === 'sketch'

  const rows: Row[] = [
    {
      id: 'params',
      label: 'Paramètres',
      icon: <SlidersHorizontal className="h-3.5 w-3.5" />,
      count: '3',
      children: [
        { id: 'p-longueur', label: 'longueur = 500 mm', icon: null },
        { id: 'p-entraxe', label: 'entraxe = 180 mm', icon: null },
        { id: 'p-vis', label: 'longueur_vis = 20 mm', icon: null },
      ],
    },
    {
      id: 'mbd',
      label: 'MBD',
      icon: <Ruler className="h-3.5 w-3.5" />,
      count: '3',
      children: CTRL_VARS.map((variable) => ({
        id: variable.id,
        label: `${variable.matiere} · ${variable.nominal} ${variable.tolerance} · ${variable.surface}`,
        icon: <Ruler className="h-3.5 w-3.5" />,
      })),
    },
    {
      id: 'origin',
      label: 'Origine',
      icon: <Axis3d className="h-3.5 w-3.5" />,
      children: [
        { id: 'xy', label: 'Plan de dessus', icon: <Box className="h-3.5 w-3.5" /> },
        { id: 'xz', label: 'Plan de face', icon: <Box className="h-3.5 w-3.5" /> },
        { id: 'yz', label: 'Plan de droite', icon: <Box className="h-3.5 w-3.5" /> },
      ],
    },
    {
      id: 'views',
      label: 'Vues',
      icon: <View className="h-3.5 w-3.5" />,
      count: '0',
    },
    {
      id: 'bodies',
      label: 'Corps',
      icon: <Layers className="h-3.5 w-3.5" />,
      count: inSketch ? '0' : '1',
      empty: inSketch ? 'No bodies yet' : undefined,
      children: inSketch
        ? undefined
        : [{ id: 'body-1', label: 'Plateau', icon: <Box className="h-3.5 w-3.5" /> }],
    },
    {
      id: 'sketches',
      label: 'Esquisses',
      icon: <Circle className="h-3.5 w-3.5" />,
      count: '1',
      children: [
        {
          id: 'sk-1',
          label: inSketch ? 'Sketch 1' : 'Esquisse plateau',
          icon: <Circle className="h-3.5 w-3.5" />,
          activeSketch: inSketch,
        },
      ],
    },
  ]

  const [selected, setSelected] = useState<string | null>('sk-1')
  return (
    <Tree
      rows={rows}
      expandedIds={['params', 'mbd', 'origin', 'bodies', 'sketches']}
      selected={selected}
      onSelect={(id) => {
        setSelected(id)
        if (isCtrlVar(id)) setCtrlVar(id)
      }}
    />
  )
}

function setupRows(setup: CamSetup): Row {
  return {
    id: setup.id,
    label: `${setup.label} · ${setup.posage}`,
    icon: <Layers className="h-3.5 w-3.5" />,
    count: String(setup.operations.length),
    children: [
      {
        id: `${setup.id}:outils`,
        label: 'Outils',
        icon: <Wrench className="h-3.5 w-3.5" />,
        count: String(setup.outils.length),
        children: setup.outils.map((outil, index) => ({
          id: `${setup.id}:outil-${index}`,
          label: outil,
          icon: <Circle className="h-3.5 w-3.5" />,
        })),
      },
      { id: `${setup.id}:brut`, label: `Brut · ${setup.brut}`, icon: <Cylinder className="h-3.5 w-3.5" /> },
      { id: `${setup.id}:final`, label: `Final · ${setup.final}`, icon: <Box className="h-3.5 w-3.5" /> },
      { id: `${setup.id}:posage`, label: `Posage · ${setup.posage}`, icon: <Layers className="h-3.5 w-3.5" /> },
      ...setup.operations.map((operation) => ({
        id: operation.id,
        label: operation.label,
        icon: <Wrench className="h-3.5 w-3.5" />,
        children: [
          {
            id: `${operation.id}:parcours`,
            label: `Parcours · ${operation.parcours}`,
            icon: <Route className="h-3.5 w-3.5" />,
          },
          {
            id: `${operation.id}:tool`,
            label: `Tool · ${operation.tool}`,
            icon: <Wrench className="h-3.5 w-3.5" />,
          },
          ...(operation.mbd
            ? [
                {
                  id: `${operation.id}:mbd`,
                  label: `MBD · ${mbdById(operation.mbd).id} ${mbdById(operation.mbd).tolerance}`,
                  icon: <Ruler className="h-3.5 w-3.5" />,
                },
              ]
            : []),
        ],
      })),
    ],
  }
}

function CamBrowser() {
  const { camNode, setCamNode } = useMock()
  const rows: Row[] = CAM_PARTS.map((part) => ({
    id: part.id,
    label: part.label,
    icon: <Box className="h-3.5 w-3.5" />,
    count: String(part.setups.length),
    children: part.setups.map(setupRows),
  }))
  return (
    <Tree
      rows={rows}
      expandedIds={['plateau', 'plateau-fraise', 'op10', 'op20', 'poignee', 'vis']}
      selected={camNode}
      onSelect={setCamNode}
    />
  )
}

function CtrlBrowser() {
  const { ctrlVar, setCtrlVar } = useMock()
  const rows: Row[] = [
    {
      id: 'variables',
      label: 'Variables',
      icon: <Ruler className="h-3.5 w-3.5" />,
      count: '3',
      children: CTRL_VARS.map((variable) => ({
        id: variable.id,
        label: `${variable.matiere} · ${variable.nominal} ${variable.tolerance} · ${variable.measured} ${variable.inTolerance ? 'dans' : 'hors'}`,
        icon: <Ruler className="h-3.5 w-3.5" />,
      })),
    },
  ]
  return (
    <Tree
      rows={rows}
      expandedIds={['variables']}
      selected={ctrlVar}
      onSelect={(id) => {
        if (id === 'plateau' || id === 'poignee' || id === 'vis') setCtrlVar(id)
      }}
    />
  )
}

function RenderBrowser() {
  const { ctrlVar, setCtrlVar } = useMock()
  const rows: Row[] = [
    {
      id: 'cameras',
      label: 'Caméras',
      icon: <Camera className="h-3.5 w-3.5" />,
      count: '1',
      children: [{ id: 'cam-34', label: '3/4', icon: <Camera className="h-3.5 w-3.5" /> }],
    },
    {
      id: 'lights',
      label: 'Lumières',
      icon: <Lightbulb className="h-3.5 w-3.5" />,
      count: '2',
      children: [
        { id: 'key', label: 'Clé', icon: <SunMedium className="h-3.5 w-3.5" /> },
        { id: 'fill', label: 'Fill', icon: <Lightbulb className="h-3.5 w-3.5" /> },
      ],
    },
    {
      id: 'materials',
      label: 'Matières',
      icon: <Box className="h-3.5 w-3.5" />,
      count: '3',
      children: CTRL_VARS.map((variable) => ({
        id: variable.id,
        label: `${variable.matiere} · ${variable.surface}`,
        icon: <Box className="h-3.5 w-3.5" />,
      })),
    },
  ]
  return (
    <Tree
      rows={rows}
      expandedIds={['cameras', 'lights', 'materials']}
      selected={ctrlVar}
      onSelect={(id) => {
        if (isCtrlVar(id)) setCtrlVar(id)
      }}
    />
  )
}

export function BrowserPanel(_props: IDockviewPanelProps) {
  const { workspace } = useMock()
  if (workspace === 'cam') return <CamBrowser />
  if (workspace === 'ctrl') return <CtrlBrowser />
  if (workspace === 'render') return <RenderBrowser />
  return <DesignBrowser />
}
