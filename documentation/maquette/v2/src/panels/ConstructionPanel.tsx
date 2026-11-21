import type { IDockviewPanelProps } from 'dockview'
import { Badge, PanelSection, TimelineItem } from '../ds'

const ITEMS = [
  'Origine',
  'Plan de dessus',
  'Plan de face',
  'Plan de droite',
  'Esquisse anneau',
  'Extrusion — carrure',
  'Portée lunette',
  'Portée fond',
  'Cornes',
] as const

export function ConstructionPanel(_props: IDockviewPanelProps) {
  return (
    <aside className="h-full overflow-auto bg-oc-panel text-oc-text">
      <PanelSection title="Construction">
        <ul className="m-0 list-none p-0">
          {ITEMS.map((label) => (
            <TimelineItem
              key={label}
              label={label}
              selected={label === 'Esquisse anneau'}
              trailing={
                label === 'Cornes' ? (
                  <Badge tone="proposal">symétrie 6 h</Badge>
                ) : undefined
              }
            />
          ))}
        </ul>
        <div className="mx-2 mt-2 border-t-2 border-oc-accent pt-1 text-[11px] text-oc-muted">
          Reprise
        </div>
      </PanelSection>
    </aside>
  )
}
