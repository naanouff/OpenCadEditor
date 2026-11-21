import { useState } from 'react'
import type { IDockviewPanelProps } from 'dockview'
import {
  Axis3d,
  Box,
  ChevronDown,
  ChevronRight,
  Circle,
  Eye,
  EyeOff,
  FolderTree,
  Layers,
} from 'lucide-react'
import { Badge, PanelSection } from '../ds'
import { useMock } from '../mockState'

type NodeId =
  | 'piece'
  | 'origine'
  | 'plan-dessus'
  | 'plan-face'
  | 'plan-droite'
  | 'esquisses'
  | 'esquisse-anneau'
  | 'corps'
  | 'corps-1'

type SceneNode = {
  id: NodeId
  label: string
  icon: 'piece' | 'origine' | 'plan' | 'folder' | 'sketch' | 'body'
  children?: SceneNode[]
  selectable?: boolean
  proposal?: string
}

const TREE: SceneNode = {
  id: 'piece',
  label: 'Plateau',
  icon: 'piece',
  children: [
    {
      id: 'origine',
      label: 'Origine',
      icon: 'origine',
      children: [
        { id: 'plan-dessus', label: 'Plan de dessus', icon: 'plan', selectable: true },
        { id: 'plan-face', label: 'Plan de face', icon: 'plan', selectable: true },
        { id: 'plan-droite', label: 'Plan de droite', icon: 'plan', selectable: true },
      ],
    },
    {
      id: 'esquisses',
      label: 'Esquisses',
      icon: 'folder',
      children: [
        {
          id: 'esquisse-anneau',
          label: 'Esquisse plateau',
          icon: 'sketch',
          selectable: true,
        },
      ],
    },
    {
      id: 'corps',
      label: 'Corps',
      icon: 'folder',
      children: [
        {
          id: 'corps-1',
          label: 'Corps 1 — extrusion',
          icon: 'body',
          selectable: true,
          proposal: 'aperçu',
        },
      ],
    },
  ],
}

const ICONS = {
  piece: Layers,
  origine: Axis3d,
  plan: Box,
  folder: FolderTree,
  sketch: Circle,
  body: Box,
} as const

function NodeRow({
  node,
  depth,
  selectedId,
  hidden,
  expanded,
  onSelect,
  onToggleExpand,
  onToggleVisible,
}: {
  node: SceneNode
  depth: number
  selectedId: NodeId | null
  hidden: Set<NodeId>
  expanded: Set<NodeId>
  onSelect: (id: NodeId) => void
  onToggleExpand: (id: NodeId) => void
  onToggleVisible: (id: NodeId) => void
}) {
  const hasChildren = Boolean(node.children?.length)
  const isOpen = expanded.has(node.id)
  const isHidden = hidden.has(node.id)
  const selected = selectedId === node.id
  const Icon = ICONS[node.icon]
  const Chevron = isOpen ? ChevronDown : ChevronRight

  return (
    <>
      <li>
        <div
          className={`flex items-center gap-0.5 rounded-oc pr-1 text-[12.5px] ${
            selected ? 'bg-oc-select text-oc-text' : 'text-oc-text hover:bg-oc-panel-2'
          } ${isHidden ? 'opacity-50' : ''}`}
          style={{ paddingLeft: 4 + depth * 12 }}
        >
          {hasChildren ? (
            <button
              type="button"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-oc-muted"
              aria-label={isOpen ? 'Replier' : 'Déplier'}
              onClick={() => onToggleExpand(node.id)}
            >
              <Chevron className="h-3.5 w-3.5" />
            </button>
          ) : (
            <span className="inline-block w-5 shrink-0" />
          )}
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-1.5 py-1 text-left"
            onClick={() => node.selectable !== false && onSelect(node.id)}
          >
            <Icon className="h-3.5 w-3.5 shrink-0 text-oc-muted" aria-hidden />
            <span className="truncate">{node.label}</span>
            {node.proposal ? <Badge tone="proposal">{node.proposal}</Badge> : null}
          </button>
          <button
            type="button"
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-oc-muted hover:bg-oc-panel hover:text-oc-text"
            title={isHidden ? 'Afficher' : 'Masquer'}
            aria-label={isHidden ? `Afficher ${node.label}` : `Masquer ${node.label}`}
            onClick={() => onToggleVisible(node.id)}
          >
            {isHidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
      </li>
      {hasChildren && isOpen
        ? node.children!.map((child) => (
            <NodeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              hidden={hidden}
              expanded={expanded}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
              onToggleVisible={onToggleVisible}
            />
          ))
        : null}
    </>
  )
}

export function SceneTreePanel(_props: IDockviewPanelProps) {
  const { scene } = useMock()
  const [expanded, setExpanded] = useState<Set<NodeId>>(
    () => new Set(['piece', 'origine', 'esquisses', 'corps']),
  )
  const [hidden, setHidden] = useState<Set<NodeId>>(() => new Set())
  const [selectedId, setSelectedId] = useState<NodeId | null>('esquisse-anneau')

  const effectiveSelected: NodeId | null =
    scene === 'extrude' && selectedId === 'esquisse-anneau' ? 'corps-1' : selectedId

  return (
    <aside className="h-full overflow-auto bg-oc-panel text-oc-text">
      <PanelSection title="Scène">
        <ul className="m-0 list-none p-0">
          <NodeRow
            node={TREE}
            depth={0}
            selectedId={effectiveSelected}
            hidden={hidden}
            expanded={expanded}
            onSelect={setSelectedId}
            onToggleExpand={(id) =>
              setExpanded((prev) => {
                const next = new Set(prev)
                if (next.has(id)) next.delete(id)
                else next.add(id)
                return next
              })
            }
            onToggleVisible={(id) =>
              setHidden((prev) => {
                const next = new Set(prev)
                if (next.has(id)) next.delete(id)
                else next.add(id)
                return next
              })
            }
          />
        </ul>
        <p className="m-0 mt-2 px-2 text-[11px] text-oc-muted">
          Objets de la vue (visibilité). L’ordre de reconstruction reste dans Construction.
        </p>
      </PanelSection>
    </aside>
  )
}
