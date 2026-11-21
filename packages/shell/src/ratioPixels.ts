/** Au-delà, le coût GPU (4K × MSAA) dépasse le gain visible. */
export const RATIO_PIXELS_MAX = 2

export function ratioPixels(): number {
  const brut = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1
  return Math.min(Math.max(brut, 1), RATIO_PIXELS_MAX)
}

/**
 * À appeler à chaque trame : prévient quand le ratio change sans que la taille CSS bouge
 * (fenêtre passée sur un autre écran, zoom du navigateur), ce qu’aucun ResizeObserver ne voit.
 */
export function veilleurRatioPixels(
  rappel: () => void,
  ratio: () => number = () => window.devicePixelRatio || 1,
): () => void {
  let precedent = ratio()
  return () => {
    const courant = ratio()
    if (courant === precedent) return
    precedent = courant
    rappel()
  }
}
