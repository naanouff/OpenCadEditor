import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'default' | 'ghost' | 'accent' | 'editor' | 'sketch'
}

const variants = {
  default:
    'border-oc-line bg-oc-panel-2 text-oc-text hover:border-oc-accent',
  ghost: 'border-transparent bg-transparent text-oc-muted hover:bg-oc-panel-2 hover:text-oc-text',
  accent: 'border-oc-accent bg-oc-select text-oc-accent',
  editor:
    'border-oc-sketch bg-[var(--oc-proposal-bg)] text-oc-sketch hover:brightness-110',
  sketch:
    'border-oc-sketch bg-[var(--oc-proposal-bg)] text-oc-sketch hover:brightness-110',
} as const

export function Button({ children, variant = 'default', className = '', ...rest }: Props) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-oc border px-2.5 py-1.5 text-[12px] font-medium transition disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
