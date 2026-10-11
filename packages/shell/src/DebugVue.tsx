import { useState, type ReactElement } from 'react'
import { Panel } from '@naanouff/w3dts-editor-ui'
import { SCRIPT_BOITE } from './scriptBoite.ts'
import { SCRIPT_CARRURE } from './scriptCarrure.ts'
import { SCRIPT_FOND } from './scriptFond.ts'
import { SCRIPT_LUNETTE } from './scriptLunette.ts'
import { SCRIPT_VIS } from './scriptVis.ts'
import { storeShell } from './storeShell.ts'

export function DebugVue(): ReactElement {
  const [message, setMessage] = useState<string | null>(null)

  const construire = (script: string, reussi: string) => {
    try {
      storeShell.executer(script)
      setMessage(reussi)
    } catch (erreur) {
      setMessage(erreur instanceof Error ? erreur.message : String(erreur))
    }
  }

  return (
    <aside className="h-full overflow-auto bg-[var(--color-surface-panel)] p-3 font-ui text-[13px] text-foreground">
      <Panel title="Debug" collapsible={false}>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => construire(SCRIPT_CARRURE, 'Carrure construite')}
          >
            Build carrure
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => construire(SCRIPT_VIS, 'Vis construite')}
          >
            Build vis
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => construire(SCRIPT_LUNETTE, 'Lunette construite')}
          >
            Build lunette
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => construire(SCRIPT_FOND, 'Fond construit')}
          >
            Build fond
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => construire(SCRIPT_BOITE, 'Boîte construite')}
          >
            Build boite
          </button>
          {message ? (
            <p className="m-0 font-mono text-[11px] text-[var(--color-text-secondary)]">{message}</p>
          ) : null}
        </div>
      </Panel>
    </aside>
  )
}
