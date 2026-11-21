import type { IDockviewPanelProps } from 'dockview'
import { PanelSection } from '../ds'

const PARAMS = [
  { nom: 'diametre_boite', valeur: '40 mm' },
  { nom: 'epaisseur_paroi', valeur: '2,5 mm' },
  { nom: 'entrecorne', valeur: '20 mm' },
] as const

export function ParametresPanel(_props: IDockviewPanelProps) {
  return (
    <aside className="h-full overflow-auto bg-oc-panel text-oc-text">
      <PanelSection title="Paramètres">
        <ul className="m-0 list-none space-y-1 p-0 px-1">
          {PARAMS.map((p) => (
            <li key={p.nom} className="font-mono text-[12px] text-oc-muted">
              <span className="text-oc-accent">{p.nom}</span>
              <span className="text-oc-disabled"> = </span>
              {p.valeur}
            </li>
          ))}
        </ul>
      </PanelSection>
    </aside>
  )
}
