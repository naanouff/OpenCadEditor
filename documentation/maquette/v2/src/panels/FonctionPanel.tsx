import type { IDockviewPanelProps } from 'dockview'
import { Badge, Field, PanelSection } from '../ds'
import { useMock } from '../mockState'

export function FonctionPanel(_props: IDockviewPanelProps) {
  const { scene } = useMock()

  if (scene === 'sketch') {
    return (
      <aside className="h-full overflow-auto bg-oc-panel p-2 text-oc-text">
        <PanelSection title="Esquisse anneau">
          <p className="m-0 px-1 text-[12.5px] leading-snug text-oc-muted">
            Cercle extérieur sélectionné. Le ruban lance ; ce panneau règle une fonction
            quand elle est active.
          </p>
          <div className="mt-3 rounded-oc border border-dashed border-oc-proposal bg-[var(--oc-proposal-bg)] p-2 text-[12px] text-oc-muted">
            Extruder est grisé : <span className="text-oc-proposal">profil ouvert</span>
          </div>
        </PanelSection>
      </aside>
    )
  }

  return (
    <aside className="h-full overflow-auto bg-oc-panel p-2 text-oc-text">
      <PanelSection title="Extrusion — carrure">
        <Field
          label="Distance"
          hint="Entrée écrirait extrude hauteur_carrure dans le journal"
          inputProps={{ defaultValue: 'hauteur_carrure', readOnly: true }}
        />
        <label className="mb-3 grid gap-1 text-[12px]">
          <span className="text-oc-muted">Sens</span>
          <select
            className="rounded-oc border border-oc-line bg-oc-panel-2 px-2 py-1.5 text-[12px] text-oc-text"
            defaultValue="dessus"
          >
            <option value="dessus">Vers le dessus</option>
          </select>
        </label>
        <p className="m-0 mb-3 px-1 text-[12px] text-oc-muted">
          Le ruban lance la fonction. Ce panneau la règle. L’aperçu reste hors journal
          jusqu’à validation.
        </p>
        <div className="rounded-oc border border-dashed border-oc-preview/60 bg-oc-select/40 p-2">
          <div className="mb-1 flex items-center gap-2 text-[12px] text-oc-preview">
            Aperçu avant validation
            <Badge tone="proposal">hors journal</Badge>
          </div>
          <svg viewBox="0 0 160 72" className="h-[72px] w-full" aria-hidden>
            <rect
              x="20"
              y="16"
              width="120"
              height="40"
              fill="none"
              stroke="var(--oc-preview)"
              strokeDasharray="4 3"
            />
            <text x="40" y="40" fill="var(--oc-preview)" fontSize="12">
              hauteur_carrure
            </text>
          </svg>
        </div>
      </PanelSection>
    </aside>
  )
}
