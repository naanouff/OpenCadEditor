import type { ReactElement } from 'react'

export type FiltreSelection = 'any' | 'body' | 'face' | 'edge'

const FILTRES: { id: FiltreSelection; label: string }[] = [
  { id: 'any', label: 'Tout' },
  { id: 'body', label: 'Corps' },
  { id: 'face', label: 'Face' },
  { id: 'edge', label: 'Arête' },
]

type Props = {
  value: FiltreSelection
  onChange: (filtre: FiltreSelection) => void
}

export function ViewportFilterBar({ value, onChange }: Props): ReactElement {
  return (
    <div
      className="pointer-events-auto absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-0.5 rounded-oc border border-oc-line bg-oc-panel/95 p-0.5 shadow-sm backdrop-blur-sm"
      role="group"
      aria-label="Filtre de sélection"
    >
      {FILTRES.map((filtre) => (
        <button
          key={filtre.id}
          type="button"
          onClick={() => onChange(filtre.id)}
          className={`rounded-oc px-2.5 py-1 text-[11px] font-medium transition ${
            value === filtre.id
              ? 'bg-oc-select text-oc-accent'
              : 'text-oc-muted hover:bg-oc-panel-2 hover:text-oc-text'
          }`}
        >
          {filtre.label}
        </button>
      ))}
    </div>
  )
}

export function autoriseArete(filtre: FiltreSelection): boolean {
  return filtre === 'any' || filtre === 'edge'
}

export function autoriseFace(filtre: FiltreSelection): boolean {
  return filtre === 'any' || filtre === 'body' || filtre === 'face'
}

export function autoriseDatum(filtre: FiltreSelection): boolean {
  return filtre === 'any'
}
