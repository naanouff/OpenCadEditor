import type { Maillage } from './types.ts'

/** Épaisseur du plan : un sommet plus près que cela est considéré dessus. */
const TOLERANCE = 1e-5

type Point = [number, number, number]
type Sommet = { p: Point; n?: Point }
type Triangle = { s: [Sommet, Sommet, Sommet]; face?: number }
type Plan = { normale: Point; distance: number }

const DEVANT = 1
const DERRIERE = 2

function lirePoint(maillage: Maillage, i: number): Point {
  return [maillage.positions[i * 3], maillage.positions[i * 3 + 1], maillage.positions[i * 3 + 2]]
}

function lireSommet(maillage: Maillage, i: number): Sommet {
  const p = lirePoint(maillage, i)
  if (!maillage.normales) return { p }
  return {
    p,
    n: [maillage.normales[i * 3], maillage.normales[i * 3 + 1], maillage.normales[i * 3 + 2]],
  }
}

/** Triangles d'un maillage indexé. La normale du sommet, s'il y en a une, suit la découpe. */
function triangles(maillage: Maillage): Triangle[] {
  const { indices, faces } = maillage
  const liste: Triangle[] = []
  for (let i = 0; i < indices.length; i += 3) {
    liste.push({
      s: [lireSommet(maillage, indices[i]), lireSommet(maillage, indices[i + 1]), lireSommet(maillage, indices[i + 2])],
      face: faces?.[i / 3],
    })
  }
  return liste
}

function normaleDe(triangle: Triangle): Point {
  const [a, b, c] = triangle.s
  const u: Point = [b.p[0] - a.p[0], b.p[1] - a.p[1], b.p[2] - a.p[2]]
  const v: Point = [c.p[0] - a.p[0], c.p[1] - a.p[1], c.p[2] - a.p[2]]
  const normale: Point = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
  const longueur = Math.hypot(normale[0], normale[1], normale[2]) || 1
  return [normale[0] / longueur, normale[1] / longueur, normale[2] / longueur]
}

function versMaillage(liste: Triangle[]): Maillage {
  const positions: number[] = []
  const indices: number[] = []
  const normales: number[] = []
  const faces: number[] = []
  let aNormale = false
  let aFace = false
  for (const triangle of liste) {
    const debut = positions.length / 3
    const repli = normaleDe(triangle)
    for (const sommet of triangle.s) {
      positions.push(sommet.p[0], sommet.p[1], sommet.p[2])
      const n = sommet.n ?? repli
      if (sommet.n) aNormale = true
      normales.push(n[0], n[1], n[2])
    }
    indices.push(debut, debut + 1, debut + 2)
    if (triangle.face !== undefined) aFace = true
    faces.push(triangle.face ?? 0)
  }
  const maille: Maillage = { positions, indices }
  if (aNormale) maille.normales = normales
  if (aFace) maille.faces = faces
  return maille
}

function planDe(triangle: Triangle): Plan | null {
  const [a, b, c] = triangle.s
  const u: Point = [b.p[0] - a.p[0], b.p[1] - a.p[1], b.p[2] - a.p[2]]
  const v: Point = [c.p[0] - a.p[0], c.p[1] - a.p[1], c.p[2] - a.p[2]]
  const normale: Point = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
  const longueur = Math.hypot(normale[0], normale[1], normale[2])
  if (longueur < TOLERANCE) return null
  const unitaire: Point = [normale[0] / longueur, normale[1] / longueur, normale[2] / longueur]
  return { normale: unitaire, distance: unitaire[0] * a.p[0] + unitaire[1] * a.p[1] + unitaire[2] * a.p[2] }
}

function ecart(plan: Plan, point: Point) {
  return plan.normale[0] * point[0] + plan.normale[1] * point[1] + plan.normale[2] * point[2] - plan.distance
}

function entre(a: Sommet, b: Sommet, t: number): Sommet {
  const p: Point = [a.p[0] + (b.p[0] - a.p[0]) * t, a.p[1] + (b.p[1] - a.p[1]) * t, a.p[2] + (b.p[2] - a.p[2]) * t]
  if (!a.n || !b.n) return { p }
  const n: Point = [a.n[0] + (b.n[0] - a.n[0]) * t, a.n[1] + (b.n[1] - a.n[1]) * t, a.n[2] + (b.n[2] - a.n[2]) * t]
  const longueur = Math.hypot(n[0], n[1], n[2]) || 1
  return { p, n: [n[0] / longueur, n[1] / longueur, n[2] / longueur] }
}

function retourner(triangle: Triangle): Triangle {
  const inverse = (n?: Point): Point | undefined => (n ? [-n[0], -n[1], -n[2]] : undefined)
  const [a, b, c] = triangle.s
  return {
    s: [
      { p: c.p, n: inverse(c.n) },
      { p: b.p, n: inverse(b.n) },
      { p: a.p, n: inverse(a.n) },
    ],
    face: triangle.face,
  }
}

/** Découpe un triangle par le plan, et range les morceaux par côté. */
function decouper(
  plan: Plan,
  triangle: Triangle,
  sortie: {
    coplanairesDevant: Triangle[]
    coplanairesDerriere: Triangle[]
    devant: Triangle[]
    derriere: Triangle[]
  },
) {
  let cote = 0
  const ecarts = triangle.s.map((sommet) => ecart(plan, sommet.p))
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
  const devant: Sommet[] = []
  const derriere: Sommet[] = []
  for (let i = 0; i < 3; i++) {
    const j = (i + 1) % 3
    const ei = ecarts[i]
    const ej = ecarts[j]
    if (ei >= -TOLERANCE) devant.push(triangle.s[i])
    if (ei <= TOLERANCE) derriere.push(triangle.s[i])
    if ((ei > TOLERANCE && ej < -TOLERANCE) || (ei < -TOLERANCE && ej > TOLERANCE)) {
      const point = entre(triangle.s[i], triangle.s[j], ei / (ei - ej))
      devant.push(point)
      derriere.push(point)
    }
  }
  for (const [morceau, tas] of [
    [devant, sortie.devant],
    [derriere, sortie.derriere],
  ] as const) {
    for (let i = 2; i < morceau.length; i++) {
      const part: Triangle = { s: [morceau[0], morceau[i - 1], morceau[i]], face: triangle.face }
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
    if (!this.plan) {
      const depart = Math.floor(liste.length / 2)
      for (let k = 0; k < liste.length && !this.plan; k++) this.plan = planDe(liste[(depart + k) % liste.length])
    }
    if (!this.plan) return
    const sortie = {
      coplanairesDevant: this.propres,
      coplanairesDerriere: this.propres,
      devant: [] as Triangle[],
      derriere: [] as Triangle[],
    }
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

  /** Retire de la liste ce qui est dans le volume de cet arbre. */
  retirerDedans(liste: Triangle[]): Triangle[] {
    if (!this.plan) return [...liste]
    const sortie = {
      coplanairesDevant: [] as Triangle[],
      coplanairesDerriere: [] as Triangle[],
      devant: [] as Triangle[],
      derriere: [] as Triangle[],
    }
    for (const triangle of liste) decouper(this.plan, triangle, sortie)
    const devant = [...sortie.devant, ...sortie.coplanairesDevant]
    const derriere = [...sortie.derriere, ...sortie.coplanairesDerriere]
    const gardes = this.devant ? this.devant.retirerDedans(devant) : devant
    const dessous = this.derriere ? this.derriere.retirerDedans(derriere) : []
    return [...gardes, ...dessous]
  }

  inverser() {
    if (this.plan) {
      this.plan = {
        normale: [-this.plan.normale[0], -this.plan.normale[1], -this.plan.normale[2]],
        distance: -this.plan.distance,
      }
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

type Boite = { min: Point; max: Point }

function englobante(liste: Triangle[]): Boite | null {
  if (liste.length === 0) return null
  const min: Point = [Infinity, Infinity, Infinity]
  const max: Point = [-Infinity, -Infinity, -Infinity]
  for (const triangle of liste) {
    for (const sommet of triangle.s) {
      for (let axe = 0; axe < 3; axe++) {
        min[axe] = Math.min(min[axe], sommet.p[axe])
        max[axe] = Math.max(max[axe], sommet.p[axe])
      }
    }
  }
  return { min, max }
}

/** Vrai quand le triangle est strictement hors de la boîte : il ne peut pas rencontrer le solide. */
function horsBoite(triangle: Triangle, boite: Boite | null) {
  if (!boite) return true
  const min: Point = [Infinity, Infinity, Infinity]
  const max: Point = [-Infinity, -Infinity, -Infinity]
  for (const sommet of triangle.s) {
    for (let axe = 0; axe < 3; axe++) {
      min[axe] = Math.min(min[axe], sommet.p[axe])
      max[axe] = Math.max(max[axe], sommet.p[axe])
    }
  }
  for (let axe = 0; axe < 3; axe++) {
    if (max[axe] < boite.min[axe] - TOLERANCE || min[axe] > boite.max[axe] + TOLERANCE) return true
  }
  return false
}

function separer(liste: Triangle[], boite: Boite | null) {
  const loin: Triangle[] = []
  const pres: Triangle[] = []
  for (const triangle of liste) (horsBoite(triangle, boite) ? loin : pres).push(triangle)
  return { loin, pres }
}

function aire(triangle: Triangle) {
  const [a, b, c] = triangle.s
  const u: Point = [b.p[0] - a.p[0], b.p[1] - a.p[1], b.p[2] - a.p[2]]
  const v: Point = [c.p[0] - a.p[0], c.p[1] - a.p[1], c.p[2] - a.p[2]]
  const n: Point = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
  return Math.hypot(n[0], n[1], n[2]) / 2
}

/** Découpe, mais rend le triangle d’origine si le volume adverse n’en retire rien. */
function garderEntier(arbre: Noeud, liste: Triangle[]) {
  const sortie: Triangle[] = []
  for (const triangle of liste) {
    const fragments = arbre.retirerDedans([triangle])
    const reste = fragments.reduce((somme, fragment) => somme + aire(fragment), 0)
    if (reste >= aire(triangle) * (1 - 1e-4)) sortie.push(triangle)
    else sortie.push(...fragments)
  }
  return sortie
}

/**
 * Union de deux listes déjà restreintes au voisinage.
 * Le second passage, après retournement, retire les faces coplanaires en double.
 */
function unirPres(a: Triangle[], b: Triangle[], arbreA: Noeud, arbreB: Noeud) {
  const gardeA = garderEntier(arbreB, a)
  let gardeB = garderEntier(arbreA, b)
  gardeB = gardeB.map(retourner)
  gardeB = garderEntier(arbreA, gardeB)
  gardeB = gardeB.map(retourner)
  return [...gardeA, ...gardeB]
}

/** Réunit deux volumes fermés. Les triangles hors de la boîte de l’autre restent entiers. */
export function union(a: Maillage, b: Maillage): Maillage {
  const trisA = triangles(a)
  const trisB = triangles(b)
  const { loin: loinA, pres: presA } = separer(trisA, englobante(trisB))
  const { loin: loinB, pres: presB } = separer(trisB, englobante(trisA))
  if (presA.length === 0 && presB.length === 0) return versMaillage([...loinA, ...loinB])
  return versMaillage([...loinA, ...loinB, ...unirPres(presA, presB, new Noeud(trisA), new Noeud(trisB))])
}

/** Retire de a le volume de b. Les triangles de a hors de b restent entiers. */
export function difference(a: Maillage, b: Maillage): Maillage {
  const trisA = triangles(a)
  const trisB = triangles(b)
  const { loin: loinA, pres: presA } = separer(trisA, englobante(trisB))
  const { pres: presB } = separer(trisB, englobante(trisA))
  if (presA.length === 0 && presB.length === 0) return versMaillage(trisA)
  const arbreA = new Noeud(trisA)
  arbreA.inverser()
  const garde = unirPres(presA.map(retourner), presB, arbreA, new Noeud(trisB))
  return versMaillage([...loinA, ...garde.map(retourner)])
}

/** Volume signé, par la somme des tétraèdres sur l'origine. */
export function volume(maillage: Maillage) {
  let total = 0
  for (const triangle of triangles(maillage)) {
    const [a, b, c] = triangle.s.map((sommet) => sommet.p)
    total +=
      (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6
  }
  return Math.abs(total)
}
