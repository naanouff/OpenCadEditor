import { useEffect, useMemo, useState, type ReactElement } from 'react'
import { Panel } from '@naanouff/w3dts-editor-ui'
import { lignesDocument } from './documentAffichage.ts'
import { storeShell } from './storeShell.ts'

export function DocumentVue(): ReactElement {
  const [revision, setRevision] = useState(() => storeShell.revision())
  useEffect(() => storeShell.souscrire(() => setRevision(storeShell.revision())), [])

  const lignes = useMemo(() => lignesDocument(storeShell.hote().session.document()), [revision])

  return (
    <aside className="h-full overflow-auto bg-[var(--color-surface-panel)] p-3 font-ui text-[13px] text-foreground">
      <Panel title="Document" collapsible={false}>
        <ul className="m-0 list-none p-0">
          {lignes.map((ligne) => (
            <li key={ligne.id} className="mb-1.5 font-mono text-[12px] text-[var(--color-text-secondary)]">
              <span className="text-accent">{ligne.libelle}</span>
              <span className="text-[var(--color-text-tertiary)]">  </span>
              {ligne.valeur}
            </li>
          ))}
        </ul>
      </Panel>
    </aside>
  )
}
