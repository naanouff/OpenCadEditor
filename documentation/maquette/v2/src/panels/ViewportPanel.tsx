import { useEffect } from 'react'
import type { IDockviewPanelProps } from 'dockview'
import {
  Crosshair,
  Eye,
  Grid3x3,
  Magnet,
  Maximize2,
  Pause,
  Play,
  Ruler,
  Scan,
  Shapes,
  Square,
} from 'lucide-react'
import { CTRL_VARS, ctrlHeat, ctrlRatio, findCam, mbdById, useMock, type CtrlVarId, type SelectFilter, type SketchToggle } from '../mockState'

const FILTERS: { id: SelectFilter; label: string }[] = [
  { id: 'any', label: 'Tout' },
  { id: 'body', label: 'Corps' },
  { id: 'face', label: 'Face' },
  { id: 'edge', label: 'Arête' },
]

const PART_VIEWBOX = '-76 -60 312 312'

function pmiInk(active: boolean) {
  return active ? 'var(--oc-accent)' : 'var(--oc-text)'
}

function DatumFlag({ x, y, letter, color }: { x: number; y: number; letter: string; color: string }) {
  const width = letter.length > 1 ? 24 : 14
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon points={`0,0 ${-width / 2 + 2},-6 ${width / 2 - 2},-6`} fill={color} />
      <rect
        x={-width / 2}
        y={-19}
        width={width}
        height={13}
        rx="1"
        fill="var(--oc-panel)"
        stroke={color}
        strokeWidth="1"
      />
      <text x="0" y="-9.5" textAnchor="middle" fill={color} fontSize="8" fontWeight="700">
        {letter}
      </text>
    </g>
  )
}

function SurfaceMark({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 10 L0 2 L18 -8" fill="none" stroke={color} strokeWidth="1.15" />
      <line x1="-4" y1="2" x2="8" y2="2" stroke={color} strokeWidth="1.15" />
      <text x="20" y="-1" fill={color} fontSize="8">
        {label}
      </text>
    </g>
  )
}

function callout(nominal: string, tolerance: string) {
  return `${nominal.replace(' mm', '')} ${tolerance.replace(' mm', '')}`
}

function MatiereMark({
  x,
  y,
  name,
  swatch,
  color,
}: {
  x: number
  y: number
  name: string
  swatch: string
  color: string
}) {
  const width = name.length * 5.6 + 16
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={width} height="13" rx="1.5" fill="var(--oc-panel)" stroke={color} strokeWidth="1" />
      <rect width="7" height="13" rx="1.5" fill={swatch} />
      <text x="10" y="9.5" fill={color} fontSize="8" fontWeight="700">
        {name}
      </text>
    </g>
  )
}

function PlateauBody({
  tray = 'none',
  handle = 'none',
  screw = 'none',
  stroke = 'var(--oc-ok)',
  onPick,
}: {
  tray?: string
  handle?: string
  screw?: string
  stroke?: string
  onPick?: (id: CtrlVarId) => void
}) {
  const screws = [
    [22, 82],
    [22, 108],
    [178, 82],
    [178, 108],
  ]
  return (
    <g>
      <rect
        x="28"
        y="52"
        width="144"
        height="86"
        rx="8"
        fill={tray}
        stroke={stroke}
        strokeWidth="2.2"
        className={onPick ? 'cursor-pointer' : undefined}
        onClick={() => onPick?.('plateau')}
      />
      <rect x="40" y="62" width="120" height="66" rx="3" fill="none" stroke={stroke} strokeWidth="1.2" />
      <path
        d="M28 74 H16 A20 22 0 0 0 16 116 H28"
        fill={handle}
        stroke={stroke}
        strokeWidth="2"
        className={onPick ? 'cursor-pointer' : undefined}
        onClick={() => onPick?.('poignee')}
      />
      <path
        d="M172 74 H184 A20 22 0 0 1 184 116 H172"
        fill={handle}
        stroke={stroke}
        strokeWidth="2"
        className={onPick ? 'cursor-pointer' : undefined}
        onClick={() => onPick?.('poignee')}
      />
      {screws.map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="2.8"
          fill={screw}
          stroke={stroke}
          strokeWidth="1"
          className={onPick ? 'cursor-pointer' : undefined}
          onClick={() => onPick?.('vis')}
        />
      ))}
    </g>
  )
}

function PmiOnPart({ active, onPick }: { active: CtrlVarId; onPick: (id: CtrlVarId) => void }) {
  const tray = mbdById('plateau')
  const handle = mbdById('poignee')
  const screw = mbdById('vis')
  const ink = (id: CtrlVarId) => pmiInk(id === active)
  return (
    <g fontFamily="ui-sans-serif, system-ui, sans-serif">
      <g className="cursor-pointer" onClick={() => onPick('plateau')}>
        <line x1="28" y1="138" x2="28" y2="164" stroke={ink('plateau')} strokeWidth="0.8" />
        <line x1="172" y1="138" x2="172" y2="164" stroke={ink('plateau')} strokeWidth="0.8" />
        <line x1="28" y1="164" x2="172" y2="164" stroke={ink('plateau')} strokeWidth="1.1" />
        <polygon points="28,164 34,161.4 34,166.6" fill={ink('plateau')} />
        <polygon points="172,164 166,161.4 166,166.6" fill={ink('plateau')} />
        <text x="100" y="178" textAnchor="middle" fill={ink('plateau')} fontSize="10" fontWeight="650">
          {callout(tray.nominal, tray.tolerance)}
        </text>
        <DatumFlag x={186} y={170} letter={tray.datum} color={ink('plateau')} />
        <MatiereMark x={36} y={30} name={tray.matiere} swatch={tray.swatch} color={ink('plateau')} />
        <line x1="70" y1="43" x2="84" y2="52" stroke={ink('plateau')} strokeWidth="0.7" />
        <SurfaceMark x={108} y={24} label={tray.surface} color={ink('plateau')} />
      </g>
      <g className="cursor-pointer" onClick={() => onPick('poignee')}>
        <line x1="22" y1="82" x2="4" y2="82" stroke={ink('poignee')} strokeWidth="0.8" />
        <line x1="22" y1="108" x2="4" y2="108" stroke={ink('poignee')} strokeWidth="0.8" />
        <line x1="4" y1="82" x2="4" y2="108" stroke={ink('poignee')} strokeWidth="1.1" />
        <polygon points="4,82 1.4,88 6.6,88" fill={ink('poignee')} />
        <polygon points="4,108 1.4,102 6.6,102" fill={ink('poignee')} />
        <text x="-62" y="98" fill={ink('poignee')} fontSize="10" fontWeight="650">
          {callout(handle.nominal, handle.tolerance)}
        </text>
        <DatumFlag x={-48} y={118} letter={handle.datum} color={ink('poignee')} />
        <MatiereMark x={-68} y={58} name={handle.matiere} swatch={handle.swatch} color={ink('poignee')} />
        <SurfaceMark x={-68} y={128} label={handle.surface} color={ink('poignee')} />
      </g>
      <g className="cursor-pointer" onClick={() => onPick('vis')}>
        <line x1="181" y1="82" x2="206" y2="64" stroke={ink('vis')} strokeWidth="0.8" />
        <text x="198" y="58" fill={ink('vis')} fontSize="10" fontWeight="650">
          M4 × {callout(screw.nominal, screw.tolerance)}
        </text>
        <DatumFlag x={214} y={78} letter={screw.datum} color={ink('vis')} />
        <MatiereMark x={198} y={86} name={screw.matiere} swatch={screw.swatch} color={ink('vis')} />
        <SurfaceMark x={198} y={104} label={screw.surface} color={ink('vis')} />
      </g>
    </g>
  )
}

function PartPmi({ active, onPick }: { active: CtrlVarId; onPick: (id: CtrlVarId) => void }) {
  return (
    <svg
      className="absolute left-1/2 top-[46%] z-[4] h-[min(440px,74%)] w-[min(440px,74%)] -translate-x-1/2 -translate-y-1/2"
      viewBox={PART_VIEWBOX}
      role="img"
      aria-label="PMI de la définition"
    >
      <PmiOnPart active={active} onPick={onPick} />
    </svg>
  )
}

const SKETCH_TOGGLES: {
  key: keyof SketchToggle
  label: string
  icon: typeof Grid3x3
}[] = [
  { key: 'lookAt', label: 'Look at', icon: Eye },
  { key: 'grid', label: 'Grid', icon: Grid3x3 },
  { key: 'snap', label: 'Snap', icon: Magnet },
  { key: 'slice', label: 'Slice', icon: Scan },
  { key: 'points', label: 'Points', icon: Crosshair },
  { key: 'profile', label: 'Profile', icon: Shapes },
  { key: 'dimensions', label: 'Dimensions', icon: Ruler },
  { key: 'constraints', label: 'Constraints', icon: Magnet },
]

function SketchCanvas() {
  const { sketchToggles, toggleSketch, activeTool, ctrlVar, setCtrlVar } = useMock()
  const feature = mbdById(ctrlVar)
  const showGrid = sketchToggles.grid
  const showDims = sketchToggles.dimensions

  return (
    <div className="relative h-full min-h-[220px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--oc-viewport-bg)',
          backgroundImage: showGrid
            ? `
            linear-gradient(transparent 31px, color-mix(in srgb, var(--oc-accent) 12%, transparent) 32px),
            linear-gradient(90deg, transparent 31px, color-mix(in srgb, var(--oc-accent) 12%, transparent) 32px)
          `
            : 'none',
          backgroundSize: '32px 32px',
        }}
      />

      {/* View cube TOP */}
      <div className="absolute right-3 top-3 z-10 rounded-oc border border-oc-line bg-oc-panel/95 px-2 py-1.5 text-center shadow-sm">
        <div className="mb-0.5 text-[9px] font-semibold uppercase tracking-wide text-oc-muted">
          Top
        </div>
        <div className="mx-auto h-8 w-8 rounded-sm border border-oc-accent/40 bg-oc-select" />
      </div>

      {/* Axes + rectangle */}
      <svg
        className="absolute left-1/2 top-[44%] z-[1] h-[min(420px,70%)] w-[min(420px,70%)] -translate-x-1/2 -translate-y-1/2"
        viewBox="-20 -48 320 250"
        role="img"
        aria-label="Esquisse rectangle"
      >
        {/* Axes */}
        <line x1="20" y1="100" x2="220" y2="100" stroke="#ef4444" strokeWidth="1.5" />
        <line x1="120" y1="180" x2="120" y2="20" stroke="#22c55e" strokeWidth="1.5" />
        <text x="210" y="94" fill="#ef4444" fontSize="10">
          X
        </text>
        <text x="124" y="28" fill="#22c55e" fontSize="10">
          Y
        </text>

        {/* Rectangle W55 H38 — scaled for view */}
        <rect
          x="65"
          y="62"
          width="110"
          height="76"
          fill="var(--oc-select)"
          stroke="var(--oc-accent)"
          strokeWidth="2"
        />
        {sketchToggles.profile ? (
          <rect
            x="65"
            y="62"
            width="110"
            height="76"
            fill="none"
            stroke="var(--oc-editor)"
            strokeWidth="1"
            opacity="0.5"
          />
        ) : null}
        {sketchToggles.points ? (
          <>
            <circle cx="65" cy="62" r="3" fill="var(--oc-accent)" />
            <circle cx="175" cy="62" r="3" fill="var(--oc-accent)" />
            <circle cx="175" cy="138" r="3" fill="var(--oc-accent)" />
            <circle cx="65" cy="138" r="3" fill="var(--oc-accent)" />
          </>
        ) : null}

        {showDims ? (
          <g fontFamily="ui-sans-serif, system-ui, sans-serif">
            <g className="cursor-pointer" onClick={() => setCtrlVar('plateau')}>
              <line x1="175" y1="100" x2="198" y2="78" stroke={pmiInk(ctrlVar === 'plateau')} strokeWidth="0.8" />
              <text x="200" y="76" fill={pmiInk(ctrlVar === 'plateau')} fontSize="10" fontWeight="650">
                {callout(mbdById('plateau').nominal, mbdById('plateau').tolerance)}
              </text>
              <DatumFlag x={214} y={98} letter="A" color={pmiInk(ctrlVar === 'plateau')} />
              <MatiereMark x={200} y={104} name={mbdById('plateau').matiere} swatch={mbdById('plateau').swatch} color={pmiInk(ctrlVar === 'plateau')} />
              <SurfaceMark x={200} y={122} label={mbdById('plateau').surface} color={pmiInk(ctrlVar === 'plateau')} />
            </g>
            <g className="cursor-pointer" onClick={() => setCtrlVar('vis')}>
              <line x1="65" y1="100" x2="48" y2="100" stroke={pmiInk(ctrlVar === 'vis')} strokeWidth="0.8" />
              <line x1="81" y1="100" x2="48" y2="100" stroke={pmiInk(ctrlVar === 'vis')} strokeWidth="0.8" />
              <text x="-8" y="96" fill={pmiInk(ctrlVar === 'vis')} fontSize="10" fontWeight="650">
                M4 × {callout(mbdById('vis').nominal, mbdById('vis').tolerance)}
              </text>
              <DatumFlag x={8} y={124} letter="C" color={pmiInk(ctrlVar === 'vis')} />
              <MatiereMark x={-12} y={132} name={mbdById('vis').matiere} swatch={mbdById('vis').swatch} color={pmiInk(ctrlVar === 'vis')} />
              <SurfaceMark x={-12} y={150} label={mbdById('vis').surface} color={pmiInk(ctrlVar === 'vis')} />
            </g>
            <g className="cursor-pointer" onClick={() => setCtrlVar('poignee')}>
              <line x1="95" y1="62" x2="95" y2="36" stroke={pmiInk(ctrlVar === 'poignee')} strokeWidth="0.8" />
              <line x1="145" y1="62" x2="145" y2="36" stroke={pmiInk(ctrlVar === 'poignee')} strokeWidth="0.8" />
              <line x1="95" y1="36" x2="145" y2="36" stroke={pmiInk(ctrlVar === 'poignee')} strokeWidth="1.1" />
              <polygon points="95,36 101,33.4 101,38.6" fill={pmiInk(ctrlVar === 'poignee')} />
              <polygon points="145,36 139,33.4 139,38.6" fill={pmiInk(ctrlVar === 'poignee')} />
              <text x="120" y="28" textAnchor="middle" fill={pmiInk(ctrlVar === 'poignee')} fontSize="10" fontWeight="650">
                {callout(mbdById('poignee').nominal, mbdById('poignee').tolerance)}
              </text>
              <DatumFlag x={158} y={30} letter="B" color={pmiInk(ctrlVar === 'poignee')} />
              <MatiereMark x={168} y={8} name={mbdById('poignee').matiere} swatch={mbdById('poignee').swatch} color={pmiInk(ctrlVar === 'poignee')} />
              <SurfaceMark x={168} y={-8} label={mbdById('poignee').surface} color={pmiInk(ctrlVar === 'poignee')} />
            </g>
          </g>
        ) : null}

        {sketchToggles.constraints ? (
          <text x="70" y="56" fill="var(--oc-muted)" fontSize="9">
            H · V · coincident
          </text>
        ) : null}
      </svg>

      <div className="absolute left-3 top-3 z-10 rounded-oc border border-oc-line bg-oc-panel/95 px-2 py-1 text-[11px] text-oc-muted">
        <div>
          Outil · <span className="font-medium text-oc-accent">{activeTool}</span>
        </div>
        <div>
          MBD · {feature.matiere} · {feature.surface} · réf. {feature.datum}
        </div>
      </div>

      {/* Floating sketch toggles — Whittle */}
      <div className="absolute bottom-3 left-1/2 z-10 flex max-w-[95%] -translate-x-1/2 flex-wrap items-center justify-center gap-0.5 rounded-full border border-oc-line bg-oc-panel/95 px-2 py-1 shadow-md backdrop-blur">
        {SKETCH_TOGGLES.map(({ key, label, icon: Icon }) => {
          const on = sketchToggles[key]
          return (
            <button
              key={key}
              type="button"
              title={label}
              onClick={() => toggleSketch(key)}
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] ${
                on
                  ? 'bg-oc-select font-medium text-oc-accent'
                  : 'text-oc-muted hover:text-oc-text'
              }`}
            >
              <Icon className="h-3 w-3" />
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SolidCanvas() {
  const { selectFilter, setSelectFilter, ctrlVar, setCtrlVar } = useMock()
  const feature = mbdById(ctrlVar)

  return (
    <div className="relative h-full min-h-[220px] overflow-hidden bg-oc-bg">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--oc-viewport-bg)',
          backgroundImage: `
            linear-gradient(transparent 31px, var(--oc-viewport-grid) 32px),
            linear-gradient(90deg, transparent 31px, var(--oc-viewport-grid) 32px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute right-3 top-3 z-10 grid h-14 w-14 place-items-center rounded-oc border border-oc-line bg-oc-panel/95 shadow-sm">
        <span className="text-[9px] font-semibold text-oc-muted">ISO</span>
      </div>
      <div className="absolute left-3 top-3 z-10 rounded-oc border border-oc-line bg-oc-panel/95 px-2 py-1 text-[11px] text-oc-muted">
        MBD · {feature.matiere} · {feature.surface} · réf. {feature.datum}
      </div>
      <svg
        className="absolute left-1/2 top-[46%] z-[1] h-[min(440px,74%)] w-[min(440px,74%)] -translate-x-1/2 -translate-y-1/2"
        viewBox={PART_VIEWBOX}
        role="img"
        aria-label="Plateau et PMI"
      >
        <PlateauBody stroke="var(--oc-ok)" onPick={setCtrlVar} />
        <PmiOnPart active={ctrlVar} onPick={setCtrlVar} />
      </svg>
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-oc-line bg-oc-panel/95 px-2 py-1 shadow-md">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setSelectFilter(f.id)}
            className={`rounded-full px-2.5 py-1 text-[11px] ${
              selectFilter === f.id
                ? 'bg-oc-select font-medium text-oc-accent'
                : 'text-oc-muted hover:text-oc-text'
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="mx-1 h-4 w-px bg-oc-line" />
        <Maximize2 className="mx-1 h-3.5 w-3.5 text-oc-muted" />
      </div>
    </div>
  )
}

function Ring({ studio = false }: { studio?: boolean }) {
  return (
    <svg
      className="absolute left-1/2 top-[46%] z-[1] h-[min(440px,74%)] w-[min(440px,74%)] -translate-x-1/2 -translate-y-1/2"
      viewBox={PART_VIEWBOX}
      role="img"
      aria-label={studio ? 'Plateau studio' : 'Plateau'}
    >
      <PlateauBody
        tray={studio ? mbdById('plateau').swatch : 'none'}
        handle={studio ? mbdById('poignee').swatch : 'none'}
        screw={studio ? mbdById('vis').swatch : 'none'}
        stroke={studio ? '#e2e8f0' : 'var(--oc-ok)'}
      />
    </svg>
  )
}

const PATH_COMMANDS = [
  { id: 'plunge', label: 'plunge', color: '#f43f5e' },
  { id: 'goto', label: 'goto', color: '#38bdf8' },
  { id: 'curve', label: 'curve', color: '#34d399' },
  { id: 'retract', label: 'retract', color: '#94a3b8' },
] as const

type PathCommand = (typeof PATH_COMMANDS)[number]['id']

const PATH_COLOR: Record<PathCommand, string> = {
  plunge: '#f43f5e',
  goto: '#38bdf8',
  curve: '#34d399',
  retract: '#94a3b8',
}

function polar(deg: number, r: number) {
  const a = (deg * Math.PI) / 180
  return { x: 100 + r * Math.cos(a), y: 100 + r * Math.sin(a) }
}

function arcPath(from: number, to: number, r: number) {
  const start = polar(from, r)
  const end = polar(to, r)
  const delta = ((to - from) % 360 + 360) % 360
  const large = delta > 180 ? 1 : 0
  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`
}

function PathStroke({
  command,
  d,
  x1,
  y1,
  x2,
  y2,
}: {
  command: PathCommand
  d?: string
  x1?: number
  y1?: number
  x2?: number
  y2?: number
}) {
  const retract = command === 'retract'
  const common = {
    fill: 'none' as const,
    stroke: PATH_COLOR[command],
    strokeWidth: command === 'plunge' ? 2.6 : 2.2,
    strokeLinecap: 'round' as const,
    strokeDasharray: retract ? '3 2.5' : undefined,
  }
  if (d) return <path d={d} {...common} />
  return <line x1={x1} y1={y1} x2={x2} y2={y2} {...common} />
}

function Toolpath({ parcours }: { parcours: string }) {
  const pocket = parcours.includes('poche') || parcours.includes('contour') || parcours.includes('profil')
  const drill = parcours.includes('trou')
  const face = parcours.includes('face')
  const zigzag = parcours.includes('molet')
  const radius = parcours.includes('profil') ? 60 : 70
  const entry = polar(-120, radius)
  const outside = polar(-120, radius + 16)
  const exit = polar(200, radius)
  const clear = polar(200, radius + 16)
  const holes = [
    { x: 34, y: 72 },
    { x: 34, y: 128 },
    { x: 166, y: 128 },
    { x: 166, y: 72 },
  ]

  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-[46%] z-[3] h-[min(440px,74%)] w-[min(440px,74%)] -translate-x-1/2 -translate-y-1/2"
      viewBox={PART_VIEWBOX}
      role="img"
      aria-label={`Parcours ${parcours}`}
    >
      {pocket ? (
        <>
          <PathStroke command="plunge" x1={52} y1={48} x2={52} y2={72} />
          <PathStroke command="goto" x1={52} y1={72} x2={148} y2={72} />
          <PathStroke command="curve" d="M 148 72 A 8 8 0 0 1 148 88" />
          <PathStroke command="goto" x1={148} y1={88} x2={52} y2={88} />
          <PathStroke command="curve" d="M 52 88 A 8 8 0 0 0 52 104" />
          <PathStroke command="goto" x1={52} y1={104} x2={148} y2={104} />
          <PathStroke command="retract" x1={148} y1={104} x2={148} y2={124} />
        </>
      ) : drill ? (
        <>
          <PathStroke command="goto" d={`M 18 72 H 34 V 128 H 166 V 72`} />
          <PathStroke command="retract" x1={166} y1={72} x2={166} y2={48} />
          {holes.map((hole) => (
            <circle key={`${hole.x}-${hole.y}`} cx={hole.x} cy={hole.y} r="3.2" fill={PATH_COLOR.plunge} />
          ))}
        </>
      ) : face ? (
        <>
          <PathStroke command="plunge" x1={46} y1={48} x2={46} y2={72} />
          <PathStroke command="goto" x1={46} y1={72} x2={154} y2={72} />
          <PathStroke command="curve" d="M 154 72 A 10 10 0 0 1 154 92" />
          <PathStroke command="goto" x1={154} y1={92} x2={46} y2={92} />
          <PathStroke command="curve" d="M 46 92 A 10 10 0 0 0 46 112" />
          <PathStroke command="goto" x1={46} y1={112} x2={154} y2={112} />
          <PathStroke command="retract" x1={154} y1={112} x2={154} y2={132} />
        </>
      ) : zigzag ? (
        <>
          <PathStroke command="plunge" x1={70} y1={48} x2={70} y2={78} />
          <PathStroke command="goto" d="M 70 78 L 130 92 L 70 106 L 130 120" />
          <PathStroke command="curve" d="M 130 120 A 16 16 0 0 1 118 140" />
          <PathStroke command="retract" x1={118} y1={140} x2={118} y2={158} />
        </>
      ) : (
        <>
          <PathStroke command="plunge" x1={outside.x} y1={outside.y} x2={entry.x} y2={entry.y} />
          <PathStroke command="curve" d={arcPath(-120, 40, radius)} />
          <PathStroke
            command="goto"
            x1={polar(40, radius).x}
            y1={polar(40, radius).y}
            x2={polar(95, radius).x}
            y2={polar(95, radius).y}
          />
          <PathStroke command="curve" d={arcPath(95, 200, radius)} />
          <PathStroke command="retract" x1={exit.x} y1={exit.y} x2={clear.x} y2={clear.y} />
          <circle cx={outside.x} cy={outside.y} r="2.2" fill={PATH_COLOR.plunge} />
        </>
      )}
    </svg>
  )
}

function PathLegend() {
  return (
    <div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1.5 rounded-oc border border-oc-line bg-oc-panel/95 px-2 py-1.5">
      {PATH_COMMANDS.map((command) => (
        <span key={command.id} className="inline-flex items-center gap-1 text-[10px] text-oc-text">
          <span className="inline-block h-1.5 w-3.5 rounded-full" style={{ background: command.color }} />
          {command.label}
        </span>
      ))}
    </div>
  )
}

function FrameMark({
  x,
  y,
  name,
  xColor,
  yColor,
}: {
  x: number
  y: number
  name: string
  xColor: string
  yColor: string
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1="0" y1="0" x2="16" y2="0" stroke={xColor} strokeWidth="1.4" />
      <line x1="0" y1="0" x2="0" y2="-16" stroke={yColor} strokeWidth="1.4" />
      <circle r="1.6" fill={xColor} />
      <text x="4" y="-18" fill={xColor} fontSize="7">
        {name}
      </text>
    </g>
  )
}

function CamFrames({ className }: { className: string }) {
  const {
    showMachineFrame,
    setShowMachineFrame,
    showStockFrame,
    setShowStockFrame,
    framesSuperposed,
    setFramesSuperposed,
  } = useMock()
  const machine = { x: 46, y: 158 }
  const stock = framesSuperposed ? machine : { x: 100, y: 100 }
  return (
    <>
      <svg className={className} viewBox={PART_VIEWBOX} aria-label="Repères machine et brut">
        {showMachineFrame ? (
          <FrameMark x={machine.x} y={machine.y} name="Machine" xColor="#ef4444" yColor="#22c55e" />
        ) : null}
        {showStockFrame ? (
          <FrameMark x={stock.x} y={stock.y} name="Brut" xColor="var(--oc-proposal)" yColor="var(--oc-accent)" />
        ) : null}
      </svg>
      <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1">
        <button
          type="button"
          onClick={() => setShowMachineFrame(!showMachineFrame)}
          className={`rounded-full border px-2 py-0.5 text-[10px] ${
            showMachineFrame ? 'border-oc-accent bg-oc-select text-oc-accent' : 'border-oc-line text-oc-muted'
          }`}
        >
          Repère machine
        </button>
        <button
          type="button"
          onClick={() => setShowStockFrame(!showStockFrame)}
          className={`rounded-full border px-2 py-0.5 text-[10px] ${
            showStockFrame ? 'border-oc-proposal bg-oc-panel text-oc-proposal' : 'border-oc-line text-oc-muted'
          }`}
        >
          Repère brut
        </button>
        <button
          type="button"
          onClick={() => setFramesSuperposed(!framesSuperposed)}
          className={`rounded-full border px-2 py-0.5 text-[10px] ${
            framesSuperposed ? 'border-oc-accent bg-oc-select text-oc-accent' : 'border-oc-line text-oc-muted'
          }`}
        >
          Superposer
        </button>
      </div>
    </>
  )
}

const CAM_FRAME_CLASS =
  'pointer-events-none absolute left-1/2 top-[46%] z-[2] h-[min(440px,74%)] w-[min(440px,74%)] -translate-x-1/2 -translate-y-1/2'

function CamSimCanvas() {
  const { camNode, simT, setSimT, simPlaying, setSimPlaying, stopSim, ctrlVar, setCtrlVar } = useMock()
  const hit = findCam(camNode)
  const radius = 70
  const length = 2 * Math.PI * radius
  const cut = simT * length
  const angle = -Math.PI / 2 + simT * Math.PI * 2
  const toolX = 100 + radius * Math.cos(angle)
  const toolY = 100 + radius * Math.sin(angle)
  const label = hit.operation?.label ?? hit.setup?.label ?? hit.part.label

  useEffect(() => {
    if (!simPlaying) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const step = (now - last) / 4000
      last = now
      setSimT((current) => {
        const next = Math.min(1, current + step)
        if (next >= 1) setSimPlaying(false)
        return next
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [simPlaying, setSimPlaying, setSimT])

  return (
    <div className="relative h-full min-h-[220px] overflow-hidden bg-oc-bg">
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--oc-viewport-bg)' }} />
      <svg
        className="absolute left-1/2 top-[46%] z-[1] h-[min(440px,74%)] w-[min(440px,74%)] -translate-x-1/2 -translate-y-1/2"
        viewBox={PART_VIEWBOX}
        role="img"
        aria-label="Enlèvement de matière"
      >
        <PlateauBody stroke="var(--oc-ok)" />
        <circle cx="100" cy="100" r={radius} fill="none" stroke="var(--oc-ok)" strokeWidth="16" />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="var(--oc-viewport-bg)"
          strokeWidth="18"
          strokeDasharray={`${cut} ${length}`}
          strokeLinecap="butt"
          transform="rotate(-90 100 100)"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="var(--oc-accent)"
          strokeWidth="3"
          strokeDasharray={`${cut} ${length}`}
          strokeLinecap="butt"
          transform="rotate(-90 100 100)"
        />
        <circle cx={toolX} cy={toolY} r="5" fill="var(--oc-proposal)" />
        <PmiOnPart active={hit.operation?.mbd ?? ctrlVar} onPick={setCtrlVar} />
      </svg>
      <CamFrames className={CAM_FRAME_CLASS} />
      <div className="absolute left-3 top-3 z-10 rounded-oc border border-oc-line bg-oc-panel/95 px-2 py-1 text-[11px] text-oc-muted">
        Stock restant · <span className="font-medium text-oc-accent">{Math.round((1 - simT) * 100)} %</span>
        {' · '}
        {label}
      </div>
      <div className="absolute bottom-3 left-1/2 z-10 flex w-[min(28rem,92%)] -translate-x-1/2 items-center gap-2 rounded-full border border-oc-line bg-oc-panel/95 px-2 py-1 shadow-md">
        <button
          type="button"
          className="rounded p-1 text-oc-text hover:bg-oc-panel-2"
          aria-label={simPlaying ? 'Pause' : 'Lecture'}
          onClick={() => {
            if (simT >= 1) setSimT(0)
            setSimPlaying(!simPlaying)
          }}
        >
          {simPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
        <button
          type="button"
          className="rounded p-1 text-oc-text hover:bg-oc-panel-2"
          aria-label="Stop"
          onClick={stopSim}
        >
          <Square className="h-3.5 w-3.5" />
        </button>
        <input
          className="min-w-0 flex-1 accent-cyan-400"
          type="range"
          min={0}
          max={1000}
          value={Math.round(simT * 1000)}
          aria-label="Instant du parcours"
          onChange={(event) => {
            setSimPlaying(false)
            setSimT(Number(event.target.value) / 1000)
          }}
        />
        <span className="w-10 text-right font-mono text-[10px] text-oc-muted">{Math.round(simT * 100)} %</span>
      </div>
    </div>
  )
}

function CamCanvas() {
  const { camNode, activeTool, ctrlVar, setCtrlVar } = useMock()
  if (activeTool === 'simuler') return <CamSimCanvas />
  const hit = findCam(camNode)
  const source = hit.operation?.mbd ? mbdById(hit.operation.mbd) : undefined
  const label = hit.operation
    ? `${hit.operation.label} · ${hit.operation.parcours}${source ? ` · MBD ${source.id} ${source.tolerance}` : ''}`
    : `${hit.part.label} · ${hit.setup?.machine ?? 'setup'}`
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden bg-oc-bg">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--oc-viewport-bg)',
          backgroundImage: `
            linear-gradient(transparent 31px, var(--oc-viewport-grid) 32px),
            linear-gradient(90deg, transparent 31px, var(--oc-viewport-grid) 32px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      <Ring />
      {hit.operation ? <Toolpath parcours={hit.operation.parcours} /> : null}
      <PartPmi active={hit.operation?.mbd ?? ctrlVar} onPick={setCtrlVar} />
      <CamFrames className={CAM_FRAME_CLASS} />
      <div className="absolute left-3 top-3 z-10 rounded-oc border border-oc-line bg-oc-panel/95 px-2 py-1 text-[11px] text-oc-muted">
        Parcours · <span className="font-medium text-oc-accent">{label}</span>
      </div>
      {hit.operation ? <PathLegend /> : null}
    </div>
  )
}

function CtrlCanvas() {
  const { ctrlVar, setCtrlVar } = useMock()
  const variable = CTRL_VARS.find((item) => item.id === ctrlVar) ?? CTRL_VARS[0]
  const heat = Object.fromEntries(CTRL_VARS.map((item) => [item.id, ctrlHeat(ctrlRatio(item))])) as Record<
    CtrlVarId,
    string
  >
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden bg-oc-bg">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--oc-viewport-bg)',
          backgroundImage: `
            linear-gradient(transparent 31px, var(--oc-viewport-grid) 32px),
            linear-gradient(90deg, transparent 31px, var(--oc-viewport-grid) 32px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      <svg
        className="absolute left-1/2 top-[46%] z-[1] h-[min(460px,78%)] w-[min(520px,86%)] -translate-x-1/2 -translate-y-1/2"
        viewBox={PART_VIEWBOX}
        role="img"
        aria-label="Heatmap écart définition relevé"
      >
        <defs>
          <linearGradient id="oc-ctrl-heat" x1="0" x2="1">
            <stop offset="0" stopColor="#2563eb" />
            <stop offset="0.17" stopColor="#38bdf8" />
            <stop offset="0.5" stopColor="#34d399" />
            <stop offset="0.83" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <PlateauBody
          tray={heat.plateau}
          handle={heat.poignee}
          screw={heat.vis}
          stroke={ctrlVar === 'plateau' ? '#f8fafc' : 'transparent'}
          onPick={setCtrlVar}
        />
        <PmiOnPart active={ctrlVar} onPick={setCtrlVar} />
        <rect x="36" y="210" width="168" height="8" rx="4" fill="url(#oc-ctrl-heat)" />
        <text x="36" y="230" fill="var(--oc-muted)" fontSize="8">
          − tolérance
        </text>
        <text x="120" y="230" textAnchor="middle" fill="var(--oc-text)" fontSize="8">
          nominal
        </text>
        <text x="204" y="230" textAnchor="end" fill="var(--oc-muted)" fontSize="8">
          + tolérance
        </text>
      </svg>
      <div className="absolute left-3 top-3 z-10 rounded-oc border border-oc-line bg-oc-panel/95 px-2 py-1 text-[11px] text-oc-muted">
        Jugé contre la définition ·{' '}
        <span className={variable.inTolerance ? 'font-medium text-oc-add' : 'font-medium text-oc-proposal'}>
          {variable.inTolerance ? 'dans la bande' : 'hors bande'}
        </span>
      </div>
    </div>
  )
}

function RenderCanvas() {
  const { renderReady, ctrlVar, setCtrlVar } = useMock()
  return (
    <div
      className="relative h-full min-h-[220px] overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--oc-accent) 18%, #0e1423), #0e1423 70%)',
      }}
    >
      <Ring studio />
      <PartPmi active={ctrlVar} onPick={setCtrlVar} />
      {renderReady ? (
        <div className="absolute left-3 top-3 z-10 rounded-full border border-oc-accent bg-oc-select px-2.5 py-1 text-[11px] font-medium text-oc-accent">
          Rendu 1 · 2 s
        </div>
      ) : (
        <div className="absolute left-3 top-3 z-10 text-[11px] text-oc-muted">
          PBR · {mbdById(ctrlVar).matiere} · {mbdById(ctrlVar).surface}
        </div>
      )}
    </div>
  )
}

export function ViewportPanel(_props: IDockviewPanelProps) {
  const { scene, workspace } = useMock()
  if (workspace === 'cam') return <CamCanvas />
  if (workspace === 'ctrl') return <CtrlCanvas />
  if (workspace === 'render') return <RenderCanvas />
  return scene === 'sketch' ? <SketchCanvas /> : <SolidCanvas />
}
