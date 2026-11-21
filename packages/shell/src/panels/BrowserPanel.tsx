import type { IDockviewPanelProps } from 'dockview'
import { useEffect, useMemo, useState, type ReactElement } from 'react'
import { PanelSection } from '../ds'
import { ArbreConstructionVue } from '../ArbreConstructionVue.tsx'
import { lignesDocument } from '../documentAffichage.ts'
import { storeShell } from '../storeShell.ts'

function useRevision() {
  const [revision, setRevision] = useState(() => storeShell.revision())
  useEffect(() => storeShell.souscrire(() => setRevision(storeShell.revision())), [])
  return revision
}

export function BrowserPanel(_props: IDockviewPanelProps): ReactElement {
  const revision = useRevision()
  const parametres = useMemo(
    () => [...storeShell.hote().session.parametres()],
    [revision],
  )
  const docLignes = useMemo(() => {
    if (storeShell.assemblage()) return []
    return lignesDocument(storeShell.hote().session.document())
  }, [revision])

  return (
    <aside className="flex h-full flex-col overflow-auto bg-oc-panel font-ui text-[13px] text-oc-text">
      <div className="min-h-0 flex-1 overflow-auto border-b border-oc-line">
        <ArbreConstructionVue />
      </div>

      <PanelSection title="Paramètres">
        {parametres.length === 0 ? (
          <p className="m-0 px-1 text-[12px] text-oc-muted">Aucun paramètre</p>
        ) : (
          <ul className="m-0 list-none p-0 px-1">
            {parametres.map(([nom, expression]) => (
              <li key={nom} className="mb-1 font-mono text-[12px] text-oc-muted">
                <span className="text-oc-accent">{nom}</span>
                <span className="text-oc-disabled"> = </span>
                {expression}
              </li>
            ))}
          </ul>
        )}
      </PanelSection>

      {docLignes.length > 0 ? (
        <PanelSection title="Document">
          <ul className="m-0 list-none p-0 px-1">
            {docLignes.slice(0, 3).map((ligne) => (
              <li key={ligne.id} className="mb-1 flex justify-between gap-2 text-[12px]">
                <span className="text-oc-muted">{ligne.libelle}</span>
                <span className="truncate font-mono text-oc-text">{ligne.valeur || '—'}</span>
              </li>
            ))}
          </ul>
        </PanelSection>
      ) : null}
    </aside>
  )
}
