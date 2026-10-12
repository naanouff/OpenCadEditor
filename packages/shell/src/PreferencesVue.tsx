import { useEffect, useState, type ReactElement } from 'react'
import { Panel } from '@naanouff/w3dts-editor-ui'
import { etatPontMcp, souscrireEtatPontMcp } from './pontMcp.ts'
import { preferences, poserPreferences, souscrirePreferences } from './preferences.ts'

export function PreferencesVue(): ReactElement {
  const [mcpSockets, setMcpSockets] = useState(() => preferences().mcpSockets)
  const [connecte, setConnecte] = useState(() => etatPontMcp().connecte)

  useEffect(() => souscrirePreferences((prefs) => setMcpSockets(prefs.mcpSockets)), [])
  useEffect(() => souscrireEtatPontMcp((etat) => setConnecte(etat.connecte)), [])

  return (
    <aside className="h-full overflow-auto bg-[var(--color-surface-panel)] p-3 font-ui text-[13px] text-foreground">
      <Panel title="Préférences" collapsible={false}>
        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={mcpSockets}
            onChange={(e) => poserPreferences({ mcpSockets: e.target.checked })}
          />
          <span>
            <span className="block text-[var(--color-text-primary)]">Sockets MCP</span>
            <span className="block text-[11px] text-[var(--color-text-secondary)]">
              Connexion WebSocket locale (dev) vers le serveur MCP. Décochez pour couper et
              empêcher la reconnexion.
            </span>
            <span className="mt-1 block font-mono text-[11px] text-[var(--color-text-tertiary)]">
              {mcpSockets ? (connecte ? 'connecté' : 'déconnecté — reconnexion…') : 'coupé'}
            </span>
          </span>
        </label>
      </Panel>
    </aside>
  )
}
