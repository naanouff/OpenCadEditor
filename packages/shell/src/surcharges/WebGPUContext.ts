/**
 * Canevas de scène à la résolution de l’écran.
 * w3dts dimensionne le tampon en pixels CSS : sur un affichage à 150 %, l’image est agrandie et floue.
 */
import { WebGPUContext as ContexteW3dts } from '@w3dts-core-src/rendering/WebGPUContext.ts'
import { ratioPixels } from '../ratioPixels.ts'

export class WebGPUContext extends ContexteW3dts {
  public override resize(width?: number, height?: number, onResized?: (w: number, h: number) => void): void {
    const k = ratioPixels()
    super.resize((width ?? this.canvas.clientWidth) * k, (height ?? this.canvas.clientHeight) * k, onResized)
  }
}
