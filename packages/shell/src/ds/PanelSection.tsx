import type { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  action?: ReactNode
}

export function PanelSection({ title, children, action }: Props) {
  return (
    <section className="px-2 pb-2">
      <div className="mb-1.5 flex items-center justify-between gap-2 px-1 pt-2">
        <h2 className="m-0 text-[11px] font-semibold uppercase tracking-wider text-oc-muted">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}
