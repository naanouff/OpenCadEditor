import { geometriePlan } from './corne.ts'
import { evaluateurProvisoire } from './evaluateur.ts'
import type { EntiteEsquisse, Esquisse, SolveurEsquisse, StatutContrainte } from './types.ts'

const SEGMENTS_ARC = 16

export type PointResolu = { id: string; u: number; v: number }

export type Contrainte =
  | { sorte: 'distance'; a: string; b: string; valeur: number }
  | { sorte: 'horizontal'; a: string; b: string }
  | { sorte: 'vertical'; a: string; b: string }
  | { sorte: 'coincidence'; a: string; b: string }
  | { sorte: 'rayon'; centre: string; point: string; valeur: number }
  | { sorte: 'egalite'; a: string; b: string; c: string; d: string }
  | { sorte: 'parallelisme'; a: string; b: string; c: string; d: string }
  | { sorte: 'perpendicularite'; a: string; b: string; c: string; d: string }

export type { StatutContrainte }

export type EsquisseResolue = {
  points: PointResolu[]
  polylines: { points: string[] }[]
  degres: number
  ferme: boolean
  statut: StatutContrainte
  contraintes: Contrainte[]
}

export type OptionsResoudre = {
  contraintesExtra?: Contrainte[]
}

function evaluer(expression: string, parametres: Map<string, string>) {
  return evaluateurProvisoire.evaluer(expression, parametres)
}

function contraintesRectangle(entite: EntiteEsquisse, parametres: Map<string, string>): {
  contraintes: Contrainte[]
  manques: number
  longueur?: number
  largeur?: number
} {
  const a = `${entite.id}.a`
  const b = `${entite.id}.b`
  const c = `${entite.id}.c`
  const d = `${entite.id}.d`
  const contraintes: Contrainte[] = [
    { sorte: 'horizontal', a, b },
    { sorte: 'vertical', a: b, b: c },
    { sorte: 'horizontal', a: c, b: d },
    { sorte: 'vertical', a: d, b: a },
  ]
  let manques = 0
  let longueur: number | undefined
  let largeur: number | undefined
  if (entite.longueur) {
    longueur = evaluer(entite.longueur, parametres)
    contraintes.push({ sorte: 'distance', a, b, valeur: longueur })
  } else manques += 1
  if (entite.largeur) {
    largeur = evaluer(entite.largeur, parametres)
    contraintes.push({ sorte: 'distance', a, b: d, valeur: largeur })
  } else manques += 1
  return { contraintes, manques, longueur, largeur }
}

function resoudreRectangle(
  entite: EntiteEsquisse,
  parametres: Map<string, string>,
  extra: Contrainte[],
): EsquisseResolue {
  const { contraintes, manques, longueur, largeur } = contraintesRectangle(entite, parametres)
  const toutes = [...contraintes, ...extra]
  const a = `${entite.id}.a`
  const b = `${entite.id}.b`
  const c = `${entite.id}.c`
  const d = `${entite.id}.d`

  if (manques > 0 || longueur === undefined || largeur === undefined) {
    return {
      points: [],
      polylines: [],
      degres: manques,
      ferme: true,
      statut: 'sous-contraint',
      contraintes: toutes,
    }
  }

  const lu = longueur / 2
  const lv = largeur / 2
  const points: PointResolu[] = [
    { id: a, u: -lu, v: -lv },
    { id: b, u: lu, v: -lv },
    { id: c, u: lu, v: lv },
    { id: d, u: -lu, v: lv },
  ]

  for (const ctr of extra) {
    if (ctr.sorte !== 'distance') continue
    const pa = points.find((p) => p.id === ctr.a)
    const pb = points.find((p) => p.id === ctr.b)
    if (!pa || !pb) continue
    const dist = Math.hypot(pa.u - pb.u, pa.v - pb.v)
    if (Math.abs(dist - ctr.valeur) > 1e-6) {
      return {
        points,
        polylines: [{ points: [a, b, c, d, a] }],
        degres: 0,
        ferme: true,
        statut: 'surcontraint',
        contraintes: toutes,
      }
    }
  }

  return {
    points,
    polylines: [{ points: [a, b, c, d, a] }],
    degres: 0,
    ferme: true,
    statut: 'contraint',
    contraintes: toutes,
  }
}

function resoudreCercle(entite: EntiteEsquisse, parametres: Map<string, string>): EsquisseResolue {
  if (!entite.diametre) {
    return {
      points: [],
      polylines: [],
      degres: 1,
      ferme: true,
      statut: 'sous-contraint',
      contraintes: [],
    }
  }
  const r = evaluer(entite.diametre, parametres) / 2
  const centre = `${entite.id}.o`
  const bord = `${entite.id}.p`
  const contraintes: Contrainte[] = [{ sorte: 'rayon', centre, point: bord, valeur: r }]
  return {
    points: [
      { id: centre, u: 0, v: 0 },
      { id: bord, u: r, v: 0 },
    ],
    polylines: [{ points: [bord] }],
    degres: 0,
    ferme: true,
    statut: 'contraint',
    contraintes,
  }
}

/** Octogone régulier à pans horizontaux/verticaux ; `entreplat` = distance entre pans opposés. */
function resoudreOctogone(entite: EntiteEsquisse, parametres: Map<string, string>): EsquisseResolue {
  if (!entite.entreplat) {
    return {
      points: [],
      polylines: [],
      degres: 1,
      ferme: true,
      statut: 'sous-contraint',
      contraintes: [],
    }
  }
  const entreplat = evaluer(entite.entreplat, parametres)
  const rayon = entreplat / (2 * Math.cos(Math.PI / 8))
  const points: PointResolu[] = []
  const ids: string[] = []
  for (let i = 0; i < 8; i++) {
    const angle = Math.PI / 8 + (i * Math.PI) / 4
    const id = `${entite.id}.${i}`
    points.push({ id, u: rayon * Math.cos(angle), v: rayon * Math.sin(angle) })
    ids.push(id)
  }
  if (ids[0]) ids.push(ids[0])
  return {
    points,
    polylines: [{ points: ids }],
    degres: 0,
    ferme: true,
    statut: 'contraint',
    contraintes: [],
  }
}

/** Arc du plus court chemin de angle0 → angle1 (Δ dans (−π, π]). */
function densifierArcCourt(
  cx: number,
  cy: number,
  rayon: number,
  angle0: number,
  angle1: number,
): { u: number; v: number }[] {
  let delta = angle1 - angle0
  while (delta > Math.PI) delta -= Math.PI * 2
  while (delta < -Math.PI) delta += Math.PI * 2
  const n = Math.max(4, Math.ceil((Math.abs(delta) / (Math.PI * 2)) * SEGMENTS_ARC * 8))
  const pts: { u: number; v: number }[] = []
  for (let i = 0; i <= n; i++) {
    const a = angle0 + (delta * i) / n
    pts.push({ u: cx + Math.cos(a) * rayon, v: cy + Math.sin(a) * rayon })
  }
  return pts
}

/**
 * Contour d’une corne (quadrant +a +u) : la joue courbe coupe le coin du rectangle
 * (peau → congé → flanc → bout → entrecorne), pas le rectangle plein.
 */
function contourCorne(
  ecart: number,
  debord: number,
  largeurBout: number,
  largeurRacine: number,
  rayonRacine: number,
  rayonPeau: number,
): { u: number; v: number }[] {
  const a0 = ecart / 2
  const u1 = rayonPeau + debord
  const geo = geometriePlan({
    a0,
    u1,
    plan: { largeurBout, largeurRacine, rayonRacine },
    rayonPeau,
  })
  const uInterieur = Math.sqrt(Math.max(0, rayonPeau * rayonPeau - a0 * a0))
  const angleA = Math.atan2(uInterieur, a0)
  const anglePeauOrigine = Math.atan2(geo.peau[1], geo.peau[0])
  // Peau → congé (joue) → flanc → bout → entrecorne → arc peau (entrecorne → peau).
  // L’arc peau doit partir de angleA (où l’on est) vers la peau — l’inverse
  // auto-coupeur laissait le coin du rectangle et vidait la joue.
  const fillet = densifierArcCourt(geo.C[0], geo.C[1], geo.Rr, geo.anglePeau, geo.angleQt)
  const skin = densifierArcCourt(0, 0, rayonPeau, angleA, anglePeauOrigine)
  return [
    { u: geo.peau[0], v: geo.peau[1] },
    ...fillet.slice(1),
    { u: geo.Ptip[0], v: geo.Ptip[1] },
    { u: a0, v: u1 },
    { u: a0, v: uInterieur },
    ...skin.slice(1, -1),
  ]
}

function appliquerSymetries(
  base: { u: number; v: number }[],
  symetries: Array<'vertical' | 'horizontal'>,
): { u: number; v: number }[][] {
  const vertical = symetries.includes('vertical')
  const horizontal = symetries.includes('horizontal')
  const copies: { u: number; v: number }[][] = [base]
  if (vertical) copies.push(base.map((p) => ({ u: -p.u, v: p.v })))
  if (horizontal) copies.push(base.map((p) => ({ u: p.u, v: -p.v })))
  if (vertical && horizontal) copies.push(base.map((p) => ({ u: -p.u, v: -p.v })))
  return copies
}

function resoudreCorne(esquisse: Esquisse, parametres: Map<string, string>): EsquisseResolue | null {
  const { entites } = esquisse
  const segments = entites.filter((e) => e.sorte === 'segment')
  const arcs = entites.filter((e) => e.sorte === 'arc')
  if (segments.length < 3 || arcs.length < 1) return null
  const ecartExpr = segments.find((e) => e.ecart)?.ecart
  const debordExpr = segments.find((e) => e.debord)?.debord
  const largeurs = segments.filter((e) => e.largeur).map((e) => e.largeur!)
  const rayonExpr = arcs.find((e) => e.rayon)?.rayon
  if (!ecartExpr || !debordExpr || largeurs.length < 2 || !rayonExpr) return null
  if (!parametres.has('diametre_boite')) {
    return {
      points: [],
      polylines: [],
      degres: 1,
      ferme: true,
      statut: 'sous-contraint',
      contraintes: [],
    }
  }
  const ecart = evaluer(ecartExpr, parametres)
  const debord = evaluer(debordExpr, parametres)
  const largeurBout = evaluer(largeurs[0]!, parametres)
  const largeurRacine = evaluer(largeurs[1]!, parametres)
  const rayonRacine = evaluer(rayonExpr, parametres)
  const rayonPeau = evaluer('diametre_boite', parametres) / 2
  const base = contourCorne(ecart, debord, largeurBout, largeurRacine, rayonRacine, rayonPeau)
  const regions = appliquerSymetries(base, esquisse.symetries ?? [])
  const points: PointResolu[] = []
  const polylines: { points: string[] }[] = []
  regions.forEach((region, r) => {
    const ids: string[] = []
    region.forEach((p, i) => {
      const id = `corne.${r}.${i}`
      points.push({ id, u: p.u, v: p.v })
      ids.push(id)
    })
    if (ids[0]) ids.push(ids[0])
    polylines.push({ points: ids })
  })
  return {
    points,
    polylines,
    degres: 0,
    ferme: true,
    statut: 'contraint',
    contraintes: [],
  }
}

function resoudreProfil(entites: EntiteEsquisse[], parametres: Map<string, string>): EsquisseResolue {
  const segments = entites.filter((e) => e.sorte === 'segment')
  const points: PointResolu[] = []
  let manques = 0
  for (const s of segments) {
    if (s.rayon === undefined || s.hauteur === undefined) {
      manques += 1
      continue
    }
    points.push({
      id: s.id,
      u: evaluer(s.rayon, parametres),
      v: evaluer(s.hauteur, parametres),
    })
  }
  if (points.length < 2 || manques > 0) {
    return {
      points,
      polylines: [],
      degres: Math.max(manques, 1),
      ferme: points.length >= 2,
      statut: 'sous-contraint',
      contraintes: [],
    }
  }
  const ids = points.map((p) => p.id)
  if (ids[0] !== ids[ids.length - 1]) ids.push(ids[0]!)
  return {
    points,
    polylines: [{ points: ids }],
    degres: 0,
    ferme: true,
    statut: 'contraint',
    contraintes: [],
  }
}

function resoudre(
  esquisse: Esquisse,
  parametres: Map<string, string>,
  options?: OptionsResoudre,
): EsquisseResolue {
  const extra = options?.contraintesExtra ?? []
  const { entites, support } = esquisse
  if (entites.length === 0) {
    return { points: [], polylines: [], degres: 0, ferme: false, statut: 'sous-contraint', contraintes: [] }
  }

  if (support === 'plan.12h') {
    const segments = entites.filter((e) => e.sorte === 'segment')
    if (segments.length >= 2) return resoudreProfil(entites, parametres)
  }

  const rectangles = entites.filter((e) => e.sorte === 'rectangle')
  const cercles = entites.filter((e) => e.sorte === 'cercle')
  const segments = entites.filter((e) => e.sorte === 'segment')
  const octogones = entites.filter((e) => e.sorte === 'octogone')

  if (octogones.length === 1 && entites.length === 1) {
    return resoudreOctogone(octogones[0]!, parametres)
  }

  if (rectangles.length === 1 && cercles.length === 0 && entites.length === 1) {
    const r = rectangles[0]!
    // Ancien motif rectangle ecart/debord : plus de faux « contraint » sans wire.
    if (r.ecart && r.debord && r.largeur && !r.longueur) {
      return {
        points: [],
        polylines: [],
        degres: Math.max(1, r.degres),
        ferme: true,
        statut: 'sous-contraint',
        contraintes: [],
      }
    }
    return resoudreRectangle(r, parametres, extra)
  }

  if (cercles.length >= 1 && rectangles.length === 0 && segments.length === 0) {
    const parties = cercles.map((c) => resoudreCercle(c, parametres))
    // Concentrique : tous les centres au même point (0,0) — déjà le cas en v1.
    const degres = parties.reduce((s, p) => s + p.degres, 0)
    const sur = parties.some((p) => p.statut === 'surcontraint')
    const sous = degres > 0
    return {
      points: parties.flatMap((p) => p.points),
      polylines: parties.flatMap((p) => p.polylines),
      degres,
      ferme: true,
      statut: sur ? 'surcontraint' : sous ? 'sous-contraint' : 'contraint',
      contraintes: parties.flatMap((p) => p.contraintes),
    }
  }

  const corne = resoudreCorne(esquisse, parametres)
  if (corne) return corne

  // Plusieurs rectangles (Pozi) : résoudre chacun
  if (rectangles.length >= 1) {
    const parties = rectangles.map((r) => resoudreRectangle(r, parametres, []))
    const degres = parties.reduce((s, p) => s + p.degres, 0)
    const sur = parties.some((p) => p.statut === 'surcontraint')
    return {
      points: parties.flatMap((p) => p.points),
      polylines: parties.flatMap((p) => p.polylines),
      degres,
      ferme: true,
      statut: sur ? 'surcontraint' : degres > 0 ? 'sous-contraint' : 'contraint',
      contraintes: parties.flatMap((p) => p.contraintes),
    }
  }

  // Repli : sans géométrie résolue → sous-contraint (plus de faux « contraint » à polylines vides)
  const degres = Math.max(
    1,
    entites.reduce((s, e) => s + e.degres, 0),
  )
  return {
    points: [],
    polylines: [],
    degres,
    ferme: entites.length > 0,
    statut: 'sous-contraint',
    contraintes: [],
  }
}

export const solveurGcs: SolveurEsquisse & {
  resoudre: typeof resoudre
} = {
  etat(esquisse, parametres = new Map()) {
    try {
      const out = resoudre(esquisse, parametres)
      return { ferme: out.ferme, degres: out.degres, statut: out.statut }
    } catch {
      const degres = esquisse.entites.reduce((s, e) => s + e.degres, 0)
      return { ferme: esquisse.entites.length > 0, degres, statut: degres > 0 ? 'sous-contraint' : 'contraint' }
    }
  },
  resoudre,
}
