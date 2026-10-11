/** Arête renvoyée par `list_edges` (indices locaux à la shape). */
export type AreteKernel = {
  id: number
  length: number
  midPoint: [number, number, number]
}

const EPS_REL = 1e-3

/** Résout les sélecteurs `arete.*` en indices 0-based. */
export function indicesDepuisSelecteurs(
  edges: AreteKernel[],
  selecteurs: string[],
  yMin: number,
  yMax: number,
): number[] {
  if (selecteurs.length === 0) return edges.map((e) => e.id)
  const span = Math.max(Math.abs(yMax - yMin), 1)
  const eps = Math.max(span * EPS_REL, 1e-4)
  const yMid = (yMin + yMax) / 2
  const ids = new Set<number>()
  for (const sel of selecteurs) {
    const matched = edges.filter((e) => {
      const y = e.midPoint[1]!
      if (sel === 'arete.haut') return Math.abs(y - yMax) <= eps
      if (sel === 'arete.bas') return Math.abs(y - yMin) <= eps
      if (sel === 'arete.vertical') return Math.abs(y - yMid) <= eps
      return false
    })
    if (matched.length === 0) throw new Error(`aucune arête pour ${sel}`)
    for (const e of matched) ids.add(e.id)
  }
  return [...ids].sort((a, b) => a - b)
}

export function parseSelecteursAretes(texte: string | undefined): string[] {
  if (!texte?.trim()) return []
  const parts = texte.trim().split(/\s+/).filter(Boolean)
  for (const p of parts) {
    if (p !== 'arete.haut' && p !== 'arete.bas' && p !== 'arete.vertical') {
      throw new Error(`sélecteur d'arête inconnu: ${p}`)
    }
  }
  return parts
}
