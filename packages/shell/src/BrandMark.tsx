import type { OcTheme } from './ds'
import iconDark from './brand/icon-editor-std.svg'
import iconLight from './brand/icon-editor-std-light.svg'

/** Icône officielle extraite de la planche (icon-editor-std). */
export function BrandMark({
  theme,
  compact = false,
}: {
  theme: OcTheme
  compact?: boolean
}) {
  // Vite du shell pointe publicDir vers w3dts : un URL /brand/… n’est pas servi.
  const src = theme === 'light' ? iconLight : iconDark
  const size = compact ? 22 : 28

  return (
    <div className="flex items-center gap-2" aria-label="openCAD Editor">
      <img src={src} width={size} height={size} alt="" className="shrink-0" />
      <div className="leading-none">
        <div className="flex items-baseline">
          <span className="text-[13px] font-normal text-oc-muted">open</span>
          <span className="text-[13px] font-bold tracking-tight text-oc-accent">CAD</span>
        </div>
        {!compact ? (
          <div className="mt-0.5 text-[11px] font-semibold text-oc-sketch">Editor</div>
        ) : null}
      </div>
    </div>
  )
}
