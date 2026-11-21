import { useMemo } from 'react'
import type { DockviewApi } from 'dockview'
import { EditorDock } from '@naanouff/w3dts-editor-ui'
import { StatusBar } from './ds'
import { Chrome } from './Chrome'
import { Ribbon } from './Ribbon'
import { MockProvider, useMock } from './mockState'
import { BrowserPanel } from './panels/BrowserPanel'
import { InspectorPanel } from './panels/InspectorPanel'
import { TimelinePanel } from './panels/TimelinePanel'
import { ViewportPanel } from './panels/ViewportPanel'

const STORAGE_KEY = 'opencad.maquette.v2.dockview.layout.v3'
const REQUIRED = ['viewport', 'browser', 'inspector', 'timeline'] as const

function buildDefaultLayout(api: DockviewApi): void {
  const viewport = api.addPanel({
    id: 'viewport',
    component: 'viewport',
    title: 'Viewport',
    params: { hideClose: true },
    minimumWidth: 240,
    minimumHeight: 200,
    initialWidth: 720,
    initialHeight: 420,
  })
  api.addPanel({
    id: 'browser',
    component: 'browser',
    title: 'Browser',
    position: { referencePanel: 'viewport', direction: 'left' },
    params: { hideClose: true },
  })
  api.addPanel({
    id: 'inspector',
    component: 'inspector',
    title: 'Inspector',
    position: { referencePanel: 'viewport', direction: 'right' },
    params: { hideClose: true },
  })
  api.addPanel({
    id: 'timeline',
    component: 'timeline',
    title: 'Timeline',
    position: { referencePanel: 'viewport', direction: 'below' },
    params: { hideClose: true },
  })
  viewport.api.setActive()
}

function statusLeft(workspace: string, scene: string): string {
  if (workspace === 'cam') return 'Boîte · un setup par machine et posage · mm'
  if (workspace === 'ctrl') return 'Relevé · MBD carrure ±0,05 · 40,08 hors tolérance'
  if (workspace === 'render') return 'Studio · 1920×1080 · pas de raytracing'
  if (scene === 'sketch') return 'Sketch mode · rectangle W 55 × H 38 · mm'
  return 'Aperçu bleu hors journal · mm · Carrure'
}

function Shell() {
  const { theme, scene, workspace } = useMock()

  const components = useMemo(
    () => ({
      viewport: ViewportPanel,
      browser: BrowserPanel,
      inspector: InspectorPanel,
      timeline: TimelinePanel,
    }),
    [],
  )

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-oc-bg text-oc-text">
      <Chrome />
      <Ribbon />
      <div className="shell-dock relative min-h-0 flex-1">
        <EditorDock
          resolvedTheme={theme}
          components={components}
          storageKey={STORAGE_KEY}
          requiredPanelIds={REQUIRED}
          buildDefaultLayout={buildDefaultLayout}
        />
      </div>
      <StatusBar
        left={<span>{statusLeft(workspace, scene)}</span>}
        right={
          <span className="text-oc-muted">
            Maquette v2 · Design CAM CTRL Render · sans Session / OCCT
          </span>
        }
      />
    </div>
  )
}

export function App() {
  return (
    <MockProvider>
      <Shell />
    </MockProvider>
  )
}
