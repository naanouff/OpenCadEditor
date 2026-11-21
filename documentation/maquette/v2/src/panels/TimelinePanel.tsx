import type { ReactNode } from 'react'
import type { IDockviewPanelProps } from 'dockview'
import {
  Aperture,
  Box,
  ChevronLeft,
  ChevronRight,
  Layers,
  Pencil,
  Play,
  Ruler,
  Wrench,
  Zap,
} from 'lucide-react'
import { findCam, useMock } from '../mockState'

function Playback() {
  return (
    <div className="flex shrink-0 items-center gap-0.5 border-r border-oc-line pr-2">
      <button type="button" className="rounded p-1 text-oc-muted hover:bg-oc-panel-2" title="Précédent">
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>
      <button type="button" className="rounded p-1 text-oc-muted hover:bg-oc-panel-2" title="Rejouer">
        <Play className="h-3.5 w-3.5" />
      </button>
      <button type="button" className="rounded p-1 text-oc-muted hover:bg-oc-panel-2" title="Suivant">
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

function Chip({
  title,
  active,
  dashed,
  children,
}: {
  title: string
  active?: boolean
  dashed?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      title={title}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-oc border px-2 py-1 text-[11px] ${
        active
          ? 'border-oc-accent bg-oc-select text-oc-accent'
          : dashed
            ? 'border-dashed border-oc-line text-oc-disabled'
            : 'border-oc-line bg-oc-panel-2 text-oc-text'
      }`}
    >
      {children}
    </button>
  )
}

function CamTimeline() {
  const { camNode, setCamNode, simT, activeTool } = useMock()
  const hit = findCam(camNode)
  const setup = hit.setup ?? hit.part.setups[0]
  const ops = setup.operations
  const index = Math.max(0, ops.findIndex((operation) => operation.id === hit.operation?.id))
  const along = activeTool === 'simuler' ? simT : 0
  const head = ops.length === 0 ? 0 : ((index + along) / ops.length) * 100
  return (
    <div className="flex h-full items-center gap-2 overflow-x-auto bg-oc-panel px-3 py-1.5">
      <Playback />
      <span className="shrink-0 text-[10px] uppercase tracking-wide text-oc-muted">
        {hit.part.label} · {setup.machine}
      </span>
      <div className="flex min-w-[14rem] flex-1 flex-col gap-1">
        <div className="flex gap-1">
          {ops.map((operation) => (
            <button
              key={operation.id}
              type="button"
              title={operation.label}
              onClick={() => setCamNode(operation.id)}
              className={`inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-oc border px-2 py-1 text-[11px] ${
                hit.operation?.id === operation.id
                  ? 'border-oc-accent bg-oc-select text-oc-accent'
                  : 'border-oc-line bg-oc-panel-2 text-oc-text'
              }`}
            >
              <Wrench className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{operation.label}</span>
            </button>
          ))}
        </div>
        <div className="relative h-3">
          <div className="absolute inset-x-0 top-1.5 h-px bg-oc-line" />
          <div
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${head}%` }}
            role="img"
            aria-label="Tête de lecture"
          >
            <span className="block h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-oc-accent" />
            <span className="block h-2 w-px bg-oc-accent" />
          </div>
        </div>
      </div>
    </div>
  )
}

function CtrlTimeline() {
  const { rattrapageLabel } = useMock()
  return (
    <div className="flex h-full items-center gap-2 overflow-x-auto bg-oc-panel px-3 py-1.5">
      <Playback />
      <Chip title="Relevé 1" active>
        <Ruler className="h-3.5 w-3.5" />
        Relevé 1
      </Chip>
      <Chip title="Rattrapage" active={Boolean(rattrapageLabel)} dashed={!rattrapageLabel}>
        <Wrench className="h-3.5 w-3.5" />
        {rattrapageLabel ? `Rattrapage · ${rattrapageLabel}` : 'Rattrapage'}
      </Chip>
    </div>
  )
}

function RenderTimeline() {
  const { renderReady } = useMock()
  return (
    <div className="flex h-full items-center gap-2 overflow-x-auto bg-oc-panel px-3 py-1.5">
      <Playback />
      <Chip title="Caméra 3/4">
        <Aperture className="h-3.5 w-3.5" />
        Caméra 3/4
      </Chip>
      <Chip title="Rendu 1" active={renderReady} dashed={!renderReady}>
        <Aperture className="h-3.5 w-3.5" />
        Rendu 1
      </Chip>
    </div>
  )
}

export function TimelinePanel(_props: IDockviewPanelProps) {
  const { scene, workspace } = useMock()
  if (workspace === 'cam') return <CamTimeline />
  if (workspace === 'ctrl') return <CtrlTimeline />
  if (workspace === 'render') return <RenderTimeline />

  return (
    <div className="flex h-full items-center gap-2 overflow-x-auto bg-oc-panel px-3 py-1.5">
      <div className="flex shrink-0 items-center gap-0.5 border-r border-oc-line pr-2">
        <button type="button" className="rounded p-1 text-oc-muted hover:bg-oc-panel-2" title="Précédent">
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button type="button" className="rounded p-1 text-oc-muted hover:bg-oc-panel-2" title="Rejouer">
          <Play className="h-3.5 w-3.5" />
        </button>
        <button type="button" className="rounded p-1 text-oc-muted hover:bg-oc-panel-2" title="Suivant">
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        type="button"
        title="Origine"
        className="inline-flex shrink-0 items-center gap-1 rounded-oc border border-oc-line bg-oc-panel-2 px-2 py-1 text-[11px] text-oc-text"
      >
        <Layers className="h-3.5 w-3.5" />
        Origine
      </button>

      <button
        type="button"
        title="Sketch 1"
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-oc border px-2 py-1 text-[11px] ${
          scene === 'sketch'
            ? 'border-oc-accent bg-oc-select text-oc-accent'
            : 'border-oc-line bg-oc-panel-2 text-oc-text'
        }`}
      >
        <Pencil className="h-3.5 w-3.5" />
        Sketch 1
      </button>

      <button
        type="button"
        title="Extrusion"
        disabled={scene === 'sketch'}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-oc border px-2 py-1 text-[11px] ${
          scene === 'extrude'
            ? 'border-oc-accent bg-oc-select text-oc-accent'
            : 'border-dashed border-oc-line text-oc-disabled'
        }`}
      >
        <Zap className="h-3.5 w-3.5" />
        Extrusion
      </button>

      <button
        type="button"
        title="Corps"
        disabled={scene === 'sketch'}
        className="inline-flex shrink-0 items-center gap-1 rounded-oc border border-dashed border-oc-line px-2 py-1 text-[11px] text-oc-disabled"
      >
        <Box className="h-3.5 w-3.5" />
        Corps
      </button>

      <div className="ml-2 h-px min-w-[2rem] flex-1 bg-oc-line" />
      <span className="shrink-0 font-mono text-[10px] text-oc-muted">
        {scene === 'sketch' ? 'Built in 1 ms' : 'Built in 12 ms'}
      </span>
    </div>
  )
}
