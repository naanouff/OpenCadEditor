import { useMemo } from 'react'
import type { DockviewApi } from 'dockview'
import { EditorDock } from '@naanouff/w3dts-editor-ui'
import { StatusBar } from './ds'
import { Chrome } from './Chrome'
import { Ribbon } from './Ribbon'
import { MBD_APPEARANCE, MockProvider, findCam, mbdById, mbdRoughness, useMock, type CtrlVarId } from './mockState'
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

function statusLeft(workspace: string, featureId: CtrlVarId, camNode: string): string {
  const operation = workspace === 'cam' ? findCam(camNode).operation : undefined
  const feature = mbdById(operation?.mbd ?? featureId)
  const definition = `${feature.id} ${feature.nominal} ${feature.tolerance} · réf. ${feature.datum} · ${feature.surface}`
  if (workspace === 'cam') return `CAM · ${operation?.mbdUse ?? feature.camUse}`
  if (workspace === 'ctrl') {
    return `CTRL · ${feature.measured} ${feature.inTolerance ? 'dans' : 'hors'} ${feature.tolerance}`
  }
  if (workspace === 'render') return `Render · ${MBD_APPEARANCE} · rugosité ${mbdRoughness(feature.surface)} depuis ${feature.surface}`
  return `Définition · ${definition}`
}

function Shell() {
  const { theme, workspace, ctrlVar, camNode } = useMock()

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
        left={<span>{statusLeft(workspace, ctrlVar, camNode)}</span>}
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
