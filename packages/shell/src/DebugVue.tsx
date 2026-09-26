import { useState, type ReactElement } from 'react'
import { Panel } from '@naanouff/w3dts-editor-ui'
import { SCRIPT_CARRURE } from './scriptCarrure.ts'
import { storeShell } from './storeShell.ts'

export function DebugVue(): ReactElement {
  const [message, setMessage] = useState<string | null>(null)

  const construireCarrure = () => {
    try {
      storeShell.executer(SCRIPT_CARRURE)
      setMessage('Carrure construite')
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
            onClick={construireCarrure}
          >
            Build carrure
          </button>
          {message ? (
            <p className="m-0 font-mono text-[11px] text-[var(--color-text-secondary)]">{message}</p>
          ) : null}
        </div>
      </Panel>
    </aside>
  )
}
