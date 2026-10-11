import { useEffect, useMemo, useRef, useState } from 'react'
import type { DockviewApi, IDockviewPanelProps } from 'dockview'
import {
  EditorDock,
  Panel,
  loadThemeFromStorage,
  subscribeResolvedTheme,
  type ResolvedThemeId,
} from '@naanouff/w3dts-editor-ui'
import { ArbreConstructionVue } from './ArbreConstructionVue.tsx'
import { DebugVue } from './DebugVue.tsx'
import { DocumentVue } from './DocumentVue.tsx'
import { storeShell } from './storeShell.ts'
import { TerminalMonaco } from './TerminalMonaco.tsx'
import { afficher } from './viewportW3dts.ts'

const STORAGE_KEY = 'opencad.shell.dockview.layout.v4'
const REQUIRED = ['viewport', 'terminal', 'parametres', 'historique', 'document', 'debug'] as const

function useStoreShell() {
  const [revision, setRevision] = useState(() => storeShell.revision())
  useEffect(() => storeShell.souscrire(() => setRevision(storeShell.revision())), [])
  return { hote: storeShell.hote(), revision }
}

function buildDefaultLayout(api: DockviewApi): void {
  const viewport = api.addPanel({
    id: 'viewport',
    component: 'viewport',
    title: 'Viewport',
    params: { hideClose: true },
    minimumWidth: 200,
    minimumHeight: 200,
    initialWidth: 640,
    initialHeight: 400,
  })
  api.addPanel({
    id: 'historique',
    component: 'historique',
    title: 'Construction',
    position: { referencePanel: 'viewport', direction: 'left' },
    params: { hideClose: true },
  })
  api.addPanel({
    id: 'parametres',
    component: 'parametres',
    title: 'Paramètres',
    position: { referencePanel: 'historique', direction: 'below' },
    params: { hideClose: true },
  })
  api.addPanel({
    id: 'document',
    component: 'document',
    title: 'Document',
    position: { referencePanel: 'parametres', direction: 'below' },
    params: { hideClose: true },
  })
  api.addPanel({
    id: 'terminal',
    component: 'terminal',
    title: 'Terminal',
    position: { referencePanel: 'viewport', direction: 'below' },
    params: { hideClose: true },
  })
  api.addPanel({
    id: 'debug',
    component: 'debug',
    title: 'Debug',
    position: { referencePanel: 'viewport', direction: 'right' },
    params: { hideClose: true },
  })
  viewport.api.setActive()
}

function ViewportVue(_props: IDockviewPanelProps) {
  const { hote, revision } = useStoreShell()
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canevas = ref.current
    if (!canevas) return
    const vue = storeShell.esquisseVue()
    const posee = vue === null ? hote.session.esquisseCourante() : hote.session.esquisseDepuis(vue)
    const maille = storeShell.utiliseMoteur()
      ? (storeShell.maillageAffiche() ?? { positions: [], normales: [], indices: [] })
      : hote.session.maillage()
    // Volume moteur (OCCT) : fil via aretesBrep — pas besoin du motif decrire.
    const frontiere =
      !posee && maille.indices.length > 0 ? { faces: [] } : hote.session.frontiere()
    void afficher(canevas, frontiere, posee, maille).catch((erreur: unknown) => {
      console.error(erreur instanceof Error ? erreur.message : String(erreur))
    })
  }, [hote, revision])
  return (
    <div className="relative h-full w-full">
      <canvas
        ref={ref}
        className="block h-full w-full"
        style={{ background: 'var(--color-viewport-clear, #a8abad)' }}
      />
      {storeShell.construction() ? (
        <p className="pointer-events-none absolute left-3 top-3 m-0 font-ui text-[13px] text-[var(--color-text-primary)]">
          Construction…
        </p>
      ) : null}
    </div>
  )
}

function TerminalVue(_props: IDockviewPanelProps) {
  return <TerminalMonaco />
}

function HistoriqueVue(_props: IDockviewPanelProps) {
  return <ArbreConstructionVue />
}

function DebugPanel(_props: IDockviewPanelProps) {
  return <DebugVue />
}

function DocumentPanel(_props: IDockviewPanelProps) {
  return <DocumentVue />
}

function ParametresVue(_props: IDockviewPanelProps) {
  const { hote, revision } = useStoreShell()
  const liste = useMemo(() => [...hote.session.parametres()], [hote, revision])
  return (
    <aside className="h-full overflow-auto bg-[var(--color-surface-panel)] p-3 font-ui text-[13px] text-foreground">
      <Panel title="Paramètres" collapsible={false}>
        {liste.length === 0 ? (
          <p className="m-0 text-[var(--color-text-secondary)]">Aucun paramètre</p>
        ) : (
          <ul className="m-0 list-none p-0">
            {liste.map(([nom, expression]) => (
              <li
                key={nom}
                className="mb-1.5 font-mono text-[12px] text-[var(--color-text-secondary)]"
              >
                <span className="text-accent">{nom}</span>
                <span className="text-[var(--color-text-tertiary)]"> = </span>
                {expression}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </aside>
  )
}

export function App() {
  const [theme] = useState(() => loadThemeFromStorage())
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedThemeId>(() =>
    document.documentElement.dataset.theme === 'light'
      ? 'light'
      : document.documentElement.dataset.theme === 'w3dts'
        ? 'w3dts'
        : 'dark',
  )

  useEffect(() => subscribeResolvedTheme(theme, setResolvedTheme), [theme])

  const components = useMemo(
    () => ({
      viewport: ViewportVue,
      terminal: TerminalVue,
      parametres: ParametresVue,
      historique: HistoriqueVue,
      document: DocumentPanel,
      debug: DebugPanel,
    }),
    [],
  )

  return (
    <div className="shell-root">
      <EditorDock
        resolvedTheme={resolvedTheme}
        components={components}
        storageKey={STORAGE_KEY}
        requiredPanelIds={REQUIRED}
        buildDefaultLayout={buildDefaultLayout}
      />
    </div>
  )
}
