import { evaluateurProvisoire } from './evaluateur.ts'
import type { EntiteEsquisse, Esquisse, SolveurEsquisse, StatutContrainte } from './types.ts'

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

  if (rectangles.length === 1 && cercles.length === 0 && entites.length === 1) {
    const r = rectangles[0]!
    // Carrure : rectangle motif (ecart/debord) — pas encore de géométrie GCS.
    if (r.ecart && r.debord && r.largeur && !r.longueur) {
      const degres = r.degres
      return {
        points: [],
        polylines: [],
        degres,
        ferme: true,
        statut: degres > 0 ? 'sous-contraint' : 'contraint',
        contraintes: [],
      }
    }
    return resoudreRectangle(r, parametres, extra)
  }

  if (cercles.length >= 1 && rectangles.length === 0) {
    const parties = cercles.map((c) => resoudreCercle(c, parametres))
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

  // Repli : compteur de degrés provisoire
  const degres = entites.reduce((s, e) => s + e.degres, 0)
  return {
    points: [],
    polylines: [],
    degres,
    ferme: entites.length > 0,
    statut: degres > 0 ? 'sous-contraint' : 'contraint',
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
