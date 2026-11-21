import type { InputHTMLAttributes, ReactNode } from 'react'

type Props = {
  label: string
  hint?: ReactNode
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export function Field({ label, hint, inputProps }: Props) {
  return (
    <label className="mb-3 grid gap-1 text-[12px]">
      <span className="text-oc-muted">{label}</span>
      <input
        className="rounded-oc border border-oc-line bg-oc-panel-2 px-2 py-1.5 font-mono text-[12px] text-oc-text outline-none focus:border-oc-accent"
        {...inputProps}
      />
      {hint ? <span className="text-[11px] text-oc-muted">{hint}</span> : null}
    </label>
  )
}
