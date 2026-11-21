import type { ReactNode } from 'react'

type Props = {
  label: string
  icon: ReactNode
  active?: boolean
  disabled?: boolean
  reason?: string
  onClick?: () => void
}

export function Tool({ label, icon, active, disabled, reason, onClick }: Props) {
  const title = disabled && reason ? `${label} — ${reason}` : label
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-oc border px-2 py-1.5 text-[12px] transition ${
        active
          ? 'border-oc-accent bg-oc-select text-oc-accent'
          : 'border-oc-line bg-oc-panel-2 text-oc-text hover:border-oc-accent'
      } disabled:cursor-not-allowed disabled:border-oc-line disabled:bg-oc-panel disabled:text-oc-disabled`}
    >
      <span className="opacity-90">{icon}</span>
      <span>{label}</span>
      {disabled && reason ? (
        <span className="ml-0.5 max-w-[9rem] truncate text-[10px] text-oc-proposal" title={reason}>
          {reason}
        </span>
      ) : null}
    </button>
  )
}
