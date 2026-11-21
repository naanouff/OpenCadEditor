import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  label: string
}

export function IconButton({ children, label, className = '', ...rest }: Props) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-oc border border-transparent text-oc-muted transition hover:border-oc-line hover:bg-oc-panel-2 hover:text-oc-text disabled:opacity-45 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
