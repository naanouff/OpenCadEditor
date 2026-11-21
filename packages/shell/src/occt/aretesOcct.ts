/** Arête renvoyée par `list_edges` (indices locaux à la shape). */
export type AreteKernel = {
  id: number
  length: number
  midPoint: [number, number, number]
  /** Extrémités (x0, y0, z0, x1, y1, z1). */
  ends?: number[]
  /** Arête droite. */
  line?: boolean
}

const EPS_REL = 1e-3

const SELECTEURS = [
  'arete.haut',
  'arete.bas',
  'arete.vertical',
  'arete.poche',
  'arete.tranche',
  'arete.fond',
] as const

export type AreteNommee = {
  id: (typeof SELECTEURS)[number]
  indices: number[]
  milieux: [number, number, number][]
}

/** Droite verticale qui descend du dessus sans atteindre le dessous : un angle de poche. */
function estAnglePoche(edge: AreteKernel, yMin: number, yMax: number, eps: number) {
  const e = edge.ends
  if (!edge.line || !e || e.length < 6) return false
  if (Math.abs(e[0]! - e[3]!) > eps || Math.abs(e[2]! - e[5]!) > eps) return false
  const haut = Math.max(e[1]!, e[4]!)
  const bas = Math.min(e[1]!, e[4]!)
  return Math.abs(haut - yMax) <= eps && bas > yMin + eps
}

/**
 * Arête d’une face d’extrémité d’une extrusion selon +Z : le pourtour.
 * Le fond d’un lamage est aussi à Z constant, mais entre les deux faces : il n’en est pas.
 */
function estTranche(edge: AreteKernel, eps: number, zMin: number, zMax: number) {
  const e = edge.ends
  if (!e || e.length < 6) return false
  if (Math.abs(e[2]! - e[5]!) > eps || Math.hypot(e[0]! - e[3]!, e[1]! - e[4]!) <= eps) return false
  return Math.abs(e[2]! - zMin) <= eps || Math.abs(e[2]! - zMax) <= eps
}

function bornesZ(edges: AreteKernel[]) {
  let zMin = Infinity
  let zMax = -Infinity
  for (const edge of edges) {
    const e = edge.ends
    if (!e || e.length < 6) continue
    zMin = Math.min(zMin, e[2]!, e[5]!)
    zMax = Math.max(zMax, e[2]!, e[5]!)
  }
  return { zMin, zMax }
}

/** Arête horizontale strictement entre le dessous et le dessus : le fond d’une poche. */
function estFond(edge: AreteKernel, yMin: number, yMax: number, eps: number) {
  const e = edge.ends
  if (!e || e.length < 6) return false
  if (Math.abs(e[1]! - e[4]!) > eps) return false
  const y = (e[1]! + e[4]!) / 2
  return y > yMin + eps && y < yMax - eps
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
  const ordre: AreteNommee['id'][] = [...SELECTEURS]
  const parNom = new Map<AreteNommee['id'], AreteNommee>(
    ordre.map((id) => [id, { id, indices: [], milieux: [] }]),
  )
  const eps = Math.max(Math.abs(yMax - yMin) * EPS_REL, 1e-4)
  const { zMin, zMax } = bornesZ(edges)
  for (const edge of edges) {
    const noms: AreteNommee['id'][] = []
    if (estAnglePoche(edge, yMin, yMax, eps)) noms.push('arete.poche')
    else {
      const parY = classeArete(edge.midPoint[1]!, yMin, yMax)
      if (parY) noms.push(parY)
    }
    if (estTranche(edge, eps, zMin, zMax)) noms.push('arete.tranche')
    if (estFond(edge, yMin, yMax, eps)) noms.push('arete.fond')
    for (const nom of noms) {
      const groupe = parNom.get(nom)!
      groupe.indices.push(edge.id)
      groupe.milieux.push(edge.midPoint)
    }
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
    if (!(SELECTEURS as readonly string[]).includes(p)) {
      throw new Error(`sélecteur d'arête inconnu: ${p}`)
    }
  }
  return parts
}
