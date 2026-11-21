import { Lightbulb } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function Hint({ children }: Props) {
  return (
    <div
      className="flex items-start gap-2 border-b border-oc-line bg-oc-panel px-3 py-2 text-[12.5px] text-oc-text"
      role="status"
    >
      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-oc-accent" aria-hidden />
      <p className="m-0 leading-snug">{children}</p>
    </div>
  )
}
