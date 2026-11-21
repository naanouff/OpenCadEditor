import type { ReactNode } from 'react'

type Props = {
  left: ReactNode
  right?: ReactNode
}

export function StatusBar({ left, right }: Props) {
  return (
    <footer className="flex items-center justify-between gap-3 border-t border-oc-line bg-oc-panel px-3 py-1.5 text-[12px] text-oc-muted">
      <div className="min-w-0">{left}</div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </footer>
  )
}
