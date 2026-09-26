import type { Maillage } from './types.ts'

/** Épaisseur du plan : un sommet plus près que cela est considéré dessus. */
const TOLERANCE = 1e-5

type Point = [number, number, number]
type Triangle = [Point, Point, Point]
type Plan = { normale: Point; distance: number }

const DEVANT = 1
const DERRIERE = 2

/** Triangles d'un maillage indexé. */
function triangles(maillage: Maillage): Triangle[] {
  const { positions, indices } = maillage
  const sommet = (i: number): Point => [positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]]
  const liste: Triangle[] = []
  for (let i = 0; i < indices.length; i += 3) {
    liste.push([sommet(indices[i]), sommet(indices[i + 1]), sommet(indices[i + 2])])
  }
  return liste
}

function versMaillage(liste: Triangle[]): Maillage {
  const positions: number[] = []
  const indices: number[] = []
  for (const triangle of liste) {
    const debut = positions.length / 3
    for (const point of triangle) positions.push(point[0], point[1], point[2])
    indices.push(debut, debut + 1, debut + 2)
  }
  return { positions, indices }
}

function planDe(triangle: Triangle): Plan | null {
  const [a, b, c] = triangle
  const u: Point = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
  const v: Point = [c[0] - a[0], c[1] - a[1], c[2] - a[2]]
  const normale: Point = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
  const longueur = Math.hypot(normale[0], normale[1], normale[2])
  if (longueur < TOLERANCE) return null
  const unitaire: Point = [normale[0] / longueur, normale[1] / longueur, normale[2] / longueur]
  return { normale: unitaire, distance: unitaire[0] * a[0] + unitaire[1] * a[1] + unitaire[2] * a[2] }
}

function ecart(plan: Plan, point: Point) {
  return plan.normale[0] * point[0] + plan.normale[1] * point[1] + plan.normale[2] * point[2] - plan.distance
}

function entre(a: Point, b: Point, t: number): Point {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

function retourner(triangle: Triangle): Triangle {
  return [triangle[2], triangle[1], triangle[0]]
}

/** Découpe un triangle par le plan, et range les morceaux par côté. */
function decouper(plan: Plan, triangle: Triangle, sortie: {
  coplanairesDevant: Triangle[]
  coplanairesDerriere: Triangle[]
  devant: Triangle[]
  derriere: Triangle[]
}) {
  let cote = 0
  const ecarts = triangle.map((point) => ecart(plan, point))
  for (const valeur of ecarts) {
    if (valeur > TOLERANCE) cote |= DEVANT
    else if (valeur < -TOLERANCE) cote |= DERRIERE
  }
  if (cote === 0) {
    const propre = planDe(triangle)
    const meme = propre
      ? propre.normale[0] * plan.normale[0] + propre.normale[1] * plan.normale[1] + propre.normale[2] * plan.normale[2] > 0
      : true
    if (meme) sortie.coplanairesDevant.push(triangle)
    else sortie.coplanairesDerriere.push(triangle)
    return
  }
  if (cote === DEVANT) {
    sortie.devant.push(triangle)
    return
  }
  if (cote === DERRIERE) {
    sortie.derriere.push(triangle)
    return
  }
  const devant: Point[] = []
  const derriere: Point[] = []
  for (let i = 0; i < 3; i++) {
    const j = (i + 1) % 3
    const ei = ecarts[i]
    const ej = ecarts[j]
    if (ei >= -TOLERANCE) devant.push(triangle[i])
    if (ei <= TOLERANCE) derriere.push(triangle[i])
    if ((ei > TOLERANCE && ej < -TOLERANCE) || (ei < -TOLERANCE && ej > TOLERANCE)) {
      const point = entre(triangle[i], triangle[j], ei / (ei - ej))
      devant.push(point)
      derriere.push(point)
    }
  }
  for (const [morceau, tas] of [
    [devant, sortie.devant],
    [derriere, sortie.derriere],
  ] as const) {
    for (let i = 2; i < morceau.length; i++) {
      const part: Triangle = [morceau[0], morceau[i - 1], morceau[i]]
      if (planDe(part)) tas.push(part)
    }
  }
}

class Noeud {
  plan: Plan | null = null
  propres: Triangle[] = []
  devant: Noeud | null = null
  derriere: Noeud | null = null

  constructor(liste: Triangle[] = []) {
    if (liste.length > 0) this.batir(liste)
  }

  batir(liste: Triangle[]) {
    if (liste.length === 0) return
    if (!this.plan) this.plan = planDe(liste[0])
    if (!this.plan) return
    const sortie = { coplanairesDevant: this.propres, coplanairesDerriere: this.propres, devant: [] as Triangle[], derriere: [] as Triangle[] }
    for (const triangle of liste) decouper(this.plan, triangle, sortie)
    if (sortie.devant.length > 0) {
      this.devant = this.devant ?? new Noeud()
      this.devant.batir(sortie.devant)
    }
    if (sortie.derriere.length > 0) {
      this.derriere = this.derriere ?? new Noeud()
      this.derriere.batir(sortie.derriere)
    }
  }

  /** Retire de cet arbre ce qui est dans le volume de l'autre. */
  rognerSur(autre: Noeud) {
    this.propres = autre.retirerDedans(this.propres)
    this.devant?.rognerSur(autre)
    this.derriere?.rognerSur(autre)
  }

  /** Retire de la liste ce qui est dans le volume de cet arbre. */
  retirerDedans(liste: Triangle[]): Triangle[] {
    if (!this.plan) return [...liste]
    const sortie = { coplanairesDevant: [] as Triangle[], coplanairesDerriere: [] as Triangle[], devant: [] as Triangle[], derriere: [] as Triangle[] }
    for (const triangle of liste) decouper(this.plan, triangle, sortie)
    const devant = [...sortie.devant, ...sortie.coplanairesDevant]
    const derriere = [...sortie.derriere, ...sortie.coplanairesDerriere]
    const gardes = this.devant ? this.devant.retirerDedans(devant) : devant
    const dessous = this.derriere ? this.derriere.retirerDedans(derriere) : []
    return [...gardes, ...dessous]
  }

  inverser() {
    if (this.plan) {
      this.plan = { normale: [-this.plan.normale[0], -this.plan.normale[1], -this.plan.normale[2]], distance: -this.plan.distance }
    }
    this.propres = this.propres.map(retourner)
    this.devant?.inverser()
    this.derriere?.inverser()
    const echange = this.devant
    this.devant = this.derriere
    this.derriere = echange
  }

  tous(): Triangle[] {
    return [...this.propres, ...(this.devant?.tous() ?? []), ...(this.derriere?.tous() ?? [])]
  }
}

/** Arbre d'un volume, bâti une fois, qui classe autant de maillages qu'on veut. */
export function classifieur(volume: Maillage) {
  const liste = triangles(volume)
  const arbre = new Noeud(liste)
  let retourne: Noeud | null = null
  return {
    dehors(maillage: Maillage) {
      return versMaillage(arbre.retirerDedans(triangles(maillage)))
    },
    dedans(maillage: Maillage) {
      if (!retourne) {
        retourne = new Noeud(liste)
        retourne.inverser()
      }
      return versMaillage(retourne.retirerDedans(triangles(maillage)))
    },
  }
}

/** Garde d'un maillage la part qui est hors du volume, ou dedans. */
export function rogner(maillage: Maillage, volume: Maillage, garder: 'dehors' | 'dedans'): Maillage {
  const arbre = classifieur(volume)
  return garder === 'dedans' ? arbre.dedans(maillage) : arbre.dehors(maillage)
}

/** Retire les faces coplanaires en double entre les deux arbres. */
function ajuster(garde: Noeud, autre: Noeud) {
  garde.rognerSur(autre)
  autre.rognerSur(garde)
  autre.inverser()
  autre.rognerSur(garde)
  autre.inverser()
}

/** Réunit deux volumes fermés. */
export function union(a: Maillage, b: Maillage): Maillage {
  const arbreA = new Noeud(triangles(a))
  const arbreB = new Noeud(triangles(b))
  ajuster(arbreA, arbreB)
  arbreA.batir(arbreB.tous())
  return versMaillage(arbreA.tous())
}

/** Retire de a le volume de b. */
export function difference(a: Maillage, b: Maillage): Maillage {
  const arbreA = new Noeud(triangles(a))
  const arbreB = new Noeud(triangles(b))
  arbreA.inverser()
  ajuster(arbreA, arbreB)
  arbreA.batir(arbreB.tous())
  arbreA.inverser()
  return versMaillage(arbreA.tous())
}

/** Volume signé, par la somme des tétraèdres sur l'origine. */
export function volume(maillage: Maillage) {
  let total = 0
  for (const [a, b, c] of triangles(maillage)) {
    total +=
      (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6
  }
  return Math.abs(total)
}
