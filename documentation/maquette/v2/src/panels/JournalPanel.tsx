import type { IDockviewPanelProps } from 'dockview'
import { Badge, PanelSection } from '../ds'
import { useMock } from '../mockState'

export function JournalPanel(_props: IDockviewPanelProps) {
  const { scene } = useMock()
  const lignes =
    scene === 'extrude'
      ? ['piece Plateau', 'esquisse plan.dessus', 'rectangle longueur', '# extrude hauteur  (candidat)']
      : ['piece Plateau', 'esquisse plan.dessus', 'rectangle longueur']

  return (
    <aside className="h-full overflow-auto bg-oc-panel text-oc-text">
      <PanelSection
        title="Journal"
        action={<Badge tone="proposal">transcript</Badge>}
      >
        <pre className="m-0 overflow-auto rounded-oc border border-oc-line bg-oc-panel-2 p-2 font-mono text-[11.5px] leading-relaxed text-oc-muted">
          {lignes.join('\n')}
        </pre>
        <p className="m-0 mt-2 px-1 text-[11px] text-oc-muted">
          L’UI est cliente des lignes. Rien n’est écrit tant que l’aperçu n’est pas validé.
        </p>
      </PanelSection>
    </aside>
  )
}
