import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  tone?: 'default' | 'proposal' | 'accent'
}

const tones = {
  default: 'border-oc-line text-oc-muted',
  proposal: 'border-oc-proposal text-oc-proposal',
  accent: 'border-oc-accent text-oc-accent',
} as const

export function Badge({ children, tone = 'default' }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
