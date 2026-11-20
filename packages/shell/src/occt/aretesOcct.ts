/** Arête renvoyée par `list_edges` (indices locaux à la shape). */
export type AreteKernel = {
  id: number
  length: number
  midPoint: [number, number, number]
}

const EPS_REL = 1e-3

export type AreteNommee = {
  id: 'arete.haut' | 'arete.bas' | 'arete.vertical'
  indices: number[]
  milieux: [number, number, number][]
}

function classeArete(y: number, yMin: number, yMax: number): AreteNommee['id'] | null {
  const span = Math.max(Math.abs(yMax - yMin), 1)
  const eps = Math.max(span * EPS_REL, 1e-4)
  const yMid = (yMin + yMax) / 2
  if (Math.abs(y - yMax) <= eps) return 'arete.haut'
  if (Math.abs(y - yMin) <= eps) return 'arete.bas'
  if (Math.abs(y - yMid) <= eps) return 'arete.vertical'
  return null
}

/**
 * Classes stables d’une extrusion +Y. Les noms suivent les bornes :
 * après un changement de hauteur, `arete.haut` reste les milieux au nouveau yMax.
 */
export function nommerAretes(edges: AreteKernel[], yMin: number, yMax: number): AreteNommee[] {
  const ordre: AreteNommee['id'][] = ['arete.haut', 'arete.bas', 'arete.vertical']
  const parNom = new Map<AreteNommee['id'], AreteNommee>(
    ordre.map((id) => [id, { id, indices: [], milieux: [] }]),
  )
  for (const edge of edges) {
    const nom = classeArete(edge.midPoint[1]!, yMin, yMax)
    if (!nom) continue
    const groupe = parNom.get(nom)!
    groupe.indices.push(edge.id)
    groupe.milieux.push(edge.midPoint)
  }
  return ordre
    .map((id) => parNom.get(id)!)
    .filter((groupe) => groupe.indices.length > 0)
    .map((groupe) => ({
      ...groupe,
      indices: [...groupe.indices].sort((a, b) => a - b),
    }))
}

/** Bornes Y des milieux. Null s’il n’y a pas d’arête. */
export function bornesYMilieux(edges: AreteKernel[]): { yMin: number; yMax: number } | null {
  if (edges.length === 0) return null
  let yMin = Infinity
  let yMax = -Infinity
  for (const edge of edges) {
    const y = edge.midPoint[1]!
    if (y < yMin) yMin = y
    if (y > yMax) yMax = y
  }
  if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) return null
  return { yMin, yMax }
}

/** Résout les sélecteurs `arete.*` en indices 0-based. */
export function indicesDepuisSelecteurs(
  edges: AreteKernel[],
  selecteurs: string[],
  yMin: number,
  yMax: number,
): number[] {
  if (selecteurs.length === 0) return edges.map((e) => e.id)
  const registre = nommerAretes(edges, yMin, yMax)
  const ids = new Set<number>()
  for (const sel of selecteurs) {
    const trouvee = registre.find((a) => a.id === sel)
    if (!trouvee) throw new Error(`aucune arête pour ${sel}`)
    for (const id of trouvee.indices) ids.add(id)
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
