/**
 * Canevas de scène à la résolution de l’écran.
 * w3dts dimensionne le tampon en pixels CSS : sur un affichage à 150 %, l’image est agrandie et floue.
 */
import { WebGPUContext as ContexteW3dts } from '@w3dts-core-src/rendering/WebGPUContext.ts'

/** Au-delà, le coût GPU (4K × MSAA) dépasse le gain visible. */
export const RATIO_PIXELS_MAX = 2

export function ratioPixels(): number {
  const brut = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1
  return Math.min(Math.max(brut, 1), RATIO_PIXELS_MAX)
}

export class WebGPUContext extends ContexteW3dts {
  public override resize(width?: number, height?: number, onResized?: (w: number, h: number) => void): void {
    const k = ratioPixels()
    super.resize((width ?? this.canvas.clientWidth) * k, (height ?? this.canvas.clientHeight) * k, onResized)
  }
}
