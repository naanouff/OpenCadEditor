import { useEffect, useMemo, useState, type ReactElement } from 'react'
import { Panel } from '@naanouff/w3dts-editor-ui'
import { lignesDocument } from './documentAffichage.ts'
import { storeShell } from './storeShell.ts'

export function DocumentVue(): ReactElement {
  const [revision, setRevision] = useState(() => storeShell.revision())
  const [message, setMessage] = useState<string | null>(null)
  useEffect(() => storeShell.souscrire(() => setRevision(storeShell.revision())), [])

  const lignes = useMemo(() => lignesDocument(storeShell.hote().session.document()), [revision])

  const ouvrir = () => {
    setMessage(null)
    void storeShell.demanderOuverture().catch((erreur: unknown) => {
      setMessage(erreur instanceof Error ? erreur.message : String(erreur))
    })
  }

  const enregistrer = () => {
    setMessage(null)
    void storeShell.demanderEnregistrement().catch((erreur: unknown) => {
      setMessage(erreur instanceof Error ? erreur.message : String(erreur))
    })
  }

  return (
    <aside className="h-full overflow-auto bg-[var(--color-surface-panel)] p-3 font-ui text-[13px] text-foreground">
      <Panel title="Document" collapsible={false}>
        <div className="mb-3 flex gap-2">
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={ouvrir}
          >
            Ouvrir
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={enregistrer}
          >
            Enregistrer
          </button>
        </div>
        {message ? <p className="mb-3 text-[var(--color-text-secondary)]">{message}</p> : null}
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
