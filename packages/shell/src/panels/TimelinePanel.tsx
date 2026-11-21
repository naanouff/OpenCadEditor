import type { IDockviewPanelProps } from 'dockview'
import { Box, Pencil, Zap } from 'lucide-react'
import { useEffect, useMemo, useState, type ReactElement, type ReactNode } from 'react'
import { libelleOperation } from '../arbreConstruction.ts'
import { storeShell } from '../storeShell.ts'

function useRevision() {
  const [revision, setRevision] = useState(() => storeShell.revision())
  useEffect(() => storeShell.souscrire(() => setRevision(storeShell.revision())), [])
  return revision
}

function icone(type: string): ReactNode {
  if (type === 'ouvrir') return <Pencil className="h-3.5 w-3.5" />
  if (type === 'extrude' || type === 'enleve' || type === 'fillet' || type === 'chanfrein') {
    return <Zap className="h-3.5 w-3.5" />
  }
  return <Box className="h-3.5 w-3.5" />
}

export function TimelinePanel(_props: IDockviewPanelProps): ReactElement {
  const revision = useRevision()
  const historique = useMemo(() => storeShell.hote().session.historique(), [revision])
  const pointe = storeShell.hote().session.pointeCourante()

  if (historique.length === 0) {
    return (
      <div className="flex h-full items-center bg-oc-panel px-3 text-[12px] text-oc-muted">
        Historique vide
      </div>
    )
  }

  return (
    <div className="flex h-full items-center gap-2 overflow-x-auto bg-oc-panel px-3 py-1.5">
      <span className="shrink-0 text-[10px] uppercase tracking-wide text-oc-muted">Timeline</span>
      <div className="flex gap-1">
        {historique.map((op, index) => {
          const active = pointe === index
          const apres = typeof pointe === 'number' && index > pointe
          return (
            <button
              key={`${index}-${op.type}`}
              type="button"
              title={libelleOperation(op)}
              onClick={() => storeShell.pointe(index)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-oc border px-2 py-1 text-[11px] ${
                active
                  ? 'border-oc-accent bg-oc-select text-oc-accent'
                  : apres
                    ? 'border-dashed border-oc-line text-oc-disabled'
                    : 'border-oc-line bg-oc-panel-2 text-oc-text'
              }`}
            >
              {icone(op.type)}
              <span className="max-w-[9rem] truncate">{libelleOperation(op)}</span>
            </button>
          )
        })}
        <button
          type="button"
          title="Fin de l’historique"
          onClick={() => storeShell.pointe('fin')}
          className={`inline-flex shrink-0 items-center rounded-oc border px-2 py-1 text-[11px] ${
            pointe === null
              ? 'border-oc-accent bg-oc-select text-oc-accent'
              : 'border-oc-line bg-oc-panel-2 text-oc-muted'
          }`}
        >
          Fin
        </button>
      </div>
    </div>
  )
}
