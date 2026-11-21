import type { ReactNode } from 'react'

type Props = {
  label: ReactNode
  selected?: boolean
  trailing?: ReactNode
}

export function TimelineItem({ label, selected, trailing }: Props) {
  return (
    <li
      className={`flex items-center justify-between gap-2 rounded-oc px-2 py-1.5 text-[12.5px] ${
        selected ? 'bg-oc-select text-oc-text' : 'text-oc-text hover:bg-oc-panel-2'
      }`}
    >
      <span>{label}</span>
      {trailing}
    </li>
  )
}
