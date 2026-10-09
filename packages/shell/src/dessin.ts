import { congesDe, contourPan, geometriePlan, pansDeCorne } from '@opencad/api-parametrique'
import type { Frontiere, Maillage } from '@opencad/api-parametrique'

const PAS = 48

/** Pas de grille en millimètres : 1 de près, 5 au milieu, 10 de loin. */
export function pasGrille(etendueMm: number) {
  if (etendueMm <= 50) return 1
  if (etendueMm <= 150) return 5
  return 10
}

/** Repère du plan d'esquisse. Y est la verticale. */
export function repere(support: string) {
  if (support === 'plan.3h') return { normale: [1, 0, 0], axeU: [0, 1, 0], axeV: [0, 0, 1] }
  if (support === 'plan.12h') return { normale: [0, 0, 1], axeU: [1, 0, 0], axeV: [0, 1, 0] }
  if (support === 'face.dessous') return { normale: [0, -1, 0], axeU: [1, 0, 0], axeV: [0, 0, -1] }
  return { normale: [0, 1, 0], axeU: [1, 0, 0], axeV: [0, 0, -1] }
}

/**
 * Tangente et bitangente d'un sommet, orthonormées avec sa normale.
 * L'axe d'appui passe de X à Z quand la normale s'approche de X.
 */
export function repereSurface(normale: [number, number, number]) {
  const [nx, ny, nz] = normale
  const appui = Math.abs(nx) < 0.9 ? [1, 0, 0] : [0, 0, 1]
  const scalaire = nx * appui[0] + ny * appui[1] + nz * appui[2]
  const brute = [appui[0] - nx * scalaire, appui[1] - ny * scalaire, appui[2] - nz * scalaire]
  const longueur = Math.hypot(brute[0], brute[1], brute[2])
  const tangente: [number, number, number] = [brute[0] / longueur, brute[1] / longueur, brute[2] / longueur]
  const bitangente: [number, number, number] = [
    ny * tangente[2] - nz * tangente[1],
    nz * tangente[0] - nx * tangente[2],
    nx * tangente[1] - ny * tangente[0],
  ]
  return { tangente, bitangente }
}

/** Vue caméra qui regarde ce plan. */
export function vueDuPlan(support: string): 'posX' | 'negY' | 'posY' | 'posZ' {
  if (support === 'plan.3h') return 'posX'
  if (support === 'plan.12h') return 'posZ'
  if (support === 'face.dessous') return 'negY'
  return 'posY'
}

const DECALAGE_COTE = Math.PI / 6
const FLECHE = 2

/** Ligne de cote d'un diamètre, dans le plan. Millimètres. L'index décale l'angle de 30°. */
export function coteDiametre(support: string, rayon: number, y: number, index = 0) {
  const { normale, axeU, axeV } = repere(support)
  const angle = index * DECALAGE_COTE
  const direction = [
    axeU[0] * Math.cos(angle) + axeV[0] * Math.sin(angle),
    axeU[1] * Math.cos(angle) + axeV[1] * Math.sin(angle),
    axeU[2] * Math.cos(angle) + axeV[2] * Math.sin(angle),
  ]
  const lateral = [
    normale[1] * direction[2] - normale[2] * direction[1],
    normale[2] * direction[0] - normale[0] * direction[2],
    normale[0] * direction[1] - normale[1] * direction[0],
  ]
  const point = (distance: number, ecart = 0): [number, number, number] => [
    normale[0] * y + direction[0] * distance + lateral[0] * ecart,
    normale[1] * y + direction[1] * distance + lateral[1] * ecart,
    normale[2] * y + direction[2] * distance + lateral[2] * ecart,
  ]
  const a = point(-rayon)
  const b = point(rayon)
  const trait = [...a, ...b]
  const fleche = (signe: number) => {
    const pointe = point(signe * rayon)
    const pied = signe * rayon - signe * FLECHE
    trait.push(...pointe, ...point(pied, 0.6), ...pointe, ...point(pied, -0.6))
  }
  fleche(1)
  fleche(-1)
  return { trait, ancre: point(rayon + FLECHE), direction }
}

/**
 * Cote linéaire dans le plan. `decalage` pousse la ligne le long de la normale
 * (sens +90° de depart → arrivee). Millimètres.
 */
export function coteSegment(
  support: string,
  depart: [number, number],
  arrivee: [number, number],
  decalage: number,
  altitude = 0,
) {
  const { normale, axeU, axeV } = repere(support)
  const du = arrivee[0] - depart[0]
  const dv = arrivee[1] - depart[1]
  const longueur = Math.hypot(du, dv)
  const directionNulle: [number, number, number] = [axeU[0], axeU[1], axeU[2]]
  const normalePlan: [number, number, number] = [normale[0], normale[1], normale[2]]
  if (longueur < 1e-6) {
    return { trait: [] as number[], ancre: [0, 0, 0] as [number, number, number], direction: directionNulle, normale: normalePlan }
  }
  const ux = du / longueur
  const vx = dv / longueur
  const pu = -vx
  const pv = ux
  const decale = (u: number, v: number): [number, number] => [u + pu * decalage, v + pv * decalage]
  const p0 = decale(depart[0], depart[1])
  const p1 = decale(arrivee[0], arrivee[1])
  const spatial = (u: number, v: number): [number, number, number] => [
    normale[0] * altitude + axeU[0] * u + axeV[0] * v,
    normale[1] * altitude + axeU[1] * u + axeV[1] * v,
    normale[2] * altitude + axeU[2] * u + axeV[2] * v,
  ]
  const trait: number[] = []
  const segment = (a: [number, number], b: [number, number]) => {
    trait.push(...spatial(a[0], a[1]), ...spatial(b[0], b[1]))
  }
  segment(depart, p0)
  segment(arrivee, p1)
  segment(p0, p1)
  const fleche = Math.min(FLECHE, longueur * 0.3)
  const aile = Math.min(0.6, fleche * 0.35)
  const pointe = (sens: number) => {
    const t = sens > 0 ? p1 : p0
    const piedU = t[0] - ux * sens * fleche
    const piedV = t[1] - vx * sens * fleche
    segment(t, [piedU + pu * aile, piedV + pv * aile])
    segment(t, [piedU - pu * aile, piedV - pv * aile])
  }
  pointe(1)
  pointe(-1)
  const signe = decalage < 0 ? -1 : 1
  const mu = (p0[0] + p1[0]) / 2 + pu * signe * 1.5
  const mv = (p0[1] + p1[1]) / 2 + pv * signe * 1.5
  let dirU = ux
  let dirV = vx
  if (dirU < -1e-6 || (Math.abs(dirU) <= 1e-6 && dirV < 0)) {
    dirU = -dirU
    dirV = -dirV
  }
  const direction: [number, number, number] = [
    axeU[0] * dirU + axeV[0] * dirV,
    axeU[1] * dirU + axeV[1] * dirV,
    axeU[2] * dirU + axeV[2] * dirV,
  ]
  return { trait, ancre: spatial(mu, mv), direction, normale: normalePlan }
}

/** Glyphe du diamètre : texte sur la ligne de cote, juste hors du cercle. */
export function poseGlyphe(support: string, rayon: number, y: number, valeur: number, index = 0) {
  const { normale } = repere(support)
  const { ancre, direction } = coteDiametre(support, rayon, y, index)
  const arrondi = Math.round(valeur * 10) / 10
  return {
    texte: `Ø ${Number.isInteger(arrondi) ? arrondi.toFixed(0) : arrondi.toFixed(1)}`,
    origine: [ancre[0] * 0.001, ancre[1] * 0.001, ancre[2] * 0.001] as [number, number, number],
    normale: [normale[0], normale[1], normale[2]] as [number, number, number],
    tangente: [direction[0], direction[1], direction[2]] as [number, number, number],
  }
}

/** Segments de grille dans le plan, en millimètres. L'altitude est portée par la normale. */
export function grille(support: string, pas: number, etendue: number, altitude: number) {
  const { normale, axeU, axeV } = repere(support)
  const array: number[] = []
  const n = Math.floor(etendue / pas)
  const poser = (i: number, j: number) => {
    const x = normale[0] * altitude + axeU[0] * i + axeV[0] * j
    const y = normale[1] * altitude + axeU[1] * i + axeV[1] * j
    const z = normale[2] * altitude + axeU[2] * i + axeV[2] * j
    array.push(x, y, z)
  }
  for (let i = -n; i <= n; i++) {
    const u = i * pas
    poser(u, -etendue)
    poser(u, etendue)
    poser(-etendue, u)
    poser(etendue, u)
  }
  return array
}

function rang(face: Frontiere['faces'][number]) {
  if (face.sorte === 'couronne') return face.y > 0 ? 2 : 0
  return 1
}

function rayonDe(face: Frontiere['faces'][number]) {
  return face.sorte === 'cylindre' ? face.rayon : 0
}

function projeter(x: number, y: number, z: number, largeur: number, hauteur: number) {
  const echelle = 8
  return [largeur / 2 + (x - z) * echelle, hauteur / 2 - (y - (x + z) * 0.35) * echelle]
}

function cercle(rayon: number, y: number, largeur: number, hauteur: number) {
  const points: number[][] = []
  for (let i = 0; i < PAS; i++) {
    const angle = (i / PAS) * Math.PI * 2
    points.push(projeter(Math.cos(angle) * rayon, y, Math.sin(angle) * rayon, largeur, hauteur))
  }
  return points
}

type Sommet = { x: number; y: number; z: number }
type Point3 = [number, number, number]

const BIAIS = 0.35

function profondeur(x: number, y: number, z: number) {
  return x + z + 0.7 * y
}

function sommet(point: Point3, largeur: number, hauteur: number): Sommet {
  const [sx, sy] = projeter(point[0], point[1], point[2], largeur, hauteur)
  return { x: sx, y: sy, z: profondeur(point[0], point[1], point[2]) }
}

function cercle3(rayon: number, y: number): Point3[] {
  const points: Point3[] = []
  for (let i = 0; i < PAS; i++) {
    const angle = (i / PAS) * Math.PI * 2
    points.push([Math.cos(angle) * rayon, y, Math.sin(angle) * rayon])
  }
  return points
}

function rasteriser(triangle: Sommet[], tampon: Float64Array, largeur: number, hauteur: number) {
  const [a, b, c] = triangle
  const denom = (b.y - c.y) * (a.x - c.x) + (c.x - b.x) * (a.y - c.y)
  if (Math.abs(denom) < 1e-4) return
  const minX = Math.max(0, Math.floor(Math.min(a.x, b.x, c.x)))
  const maxX = Math.min(largeur - 1, Math.ceil(Math.max(a.x, b.x, c.x)))
  const minY = Math.max(0, Math.floor(Math.min(a.y, b.y, c.y)))
  const maxY = Math.min(hauteur - 1, Math.ceil(Math.max(a.y, b.y, c.y)))
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const px = x + 0.5
      const py = y + 0.5
      const w0 = ((b.y - c.y) * (px - c.x) + (c.x - b.x) * (py - c.y)) / denom
      const w1 = ((c.y - a.y) * (px - c.x) + (a.x - c.x) * (py - c.y)) / denom
      const w2 = 1 - w0 - w1
      if (w0 < -0.001 || w1 < -0.001 || w2 < -0.001) continue
      const z = w0 * a.z + w1 * b.z + w2 * c.z
      const index = y * largeur + x
      if (z > tampon[index]) tampon[index] = z
    }
  }
}

function devant(sx: number, sy: number, z: number, tampon: Float64Array, largeur: number, hauteur: number) {
  const x = Math.round(sx)
  const y = Math.round(sy)
  for (const [dx, dy] of [
    [0, 0],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]) {
    const px = x + dx
    const py = y + dy
    if (px < 0 || py < 0 || px >= largeur || py >= hauteur) continue
    const stockee = tampon[py * largeur + px]
    if (stockee > -1e20 && z >= stockee - BIAIS) return true
  }
  return false
}

function decouper(points: Point3[], tampon: Float64Array, largeur: number, hauteur: number) {
  const visibles: number[][][] = []
  let courant: number[][] = []
  let masques = 0
  const poser = (point: Point3) => {
    const ecran = sommet(point, largeur, hauteur)
    if (devant(ecran.x, ecran.y, ecran.z, tampon, largeur, hauteur)) courant.push([ecran.x, ecran.y])
    else {
      masques += 1
      if (courant.length > 1) visibles.push(courant)
      courant = []
    }
  }
  for (let i = 0; i < points.length; i++) poser(points[i])
  poser(points[0])
  if (courant.length > 1) visibles.push(courant)
  return { visibles, masques }
}

function chaine(points: Point3[], array: number[]) {
  for (let i = 0; i < points.length; i++) {
    const a = points[i]
    const b = points[(i + 1) % points.length]
    array.push(a[0], a[1], a[2], b[0], b[1], b[2])
  }
}

/** Cercle fermé ajouté au tableau de segments, en millimètres. */
export function cercleFerme(rayon: number, y: number, array: number[]) {
  chaine(cercle3(rayon, y), array)
}

/** Angle minimal entre deux triangles pour qu'une arête soit tracée. */
const ANGLE_VIF = 25

/** Arêtes vives d'un maillage : segments en millimètres, dans l'ordre du fil de fer. */
export function aretesVives(maillage: Maillage, angleVif = ANGLE_VIF) {
  const { positions, indices } = maillage
  const cle = (rang: number) => {
    const arrondi = (valeur: number) => Math.round(valeur * 1e4) / 1e4
    return `${arrondi(positions[rang * 3])},${arrondi(positions[rang * 3 + 1])},${arrondi(positions[rang * 3 + 2])}`
  }
  const normale = (i: number) => {
    const point = (rang: number) => [positions[rang * 3], positions[rang * 3 + 1], positions[rang * 3 + 2]]
    const [a, b, c] = [point(indices[i]), point(indices[i + 1]), point(indices[i + 2])]
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
    const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]]
    const brute = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
    const longueur = Math.hypot(brute[0], brute[1], brute[2])
    return longueur > 0 ? brute.map((valeur) => valeur / longueur) : null
  }
  const arretes = new Map<string, { points: [number[], number[]]; normales: number[][] }>()
  for (let i = 0; i < indices.length; i += 3) {
    const face = normale(i)
    if (!face) continue
    for (const [a, b] of [
      [0, 1],
      [1, 2],
      [2, 0],
    ]) {
      const premier = indices[i + a]
      const second = indices[i + b]
      const cles = [cle(premier), cle(second)]
      const nom = cles[0] < cles[1] ? `${cles[0]}|${cles[1]}` : `${cles[1]}|${cles[0]}`
      const point = (rang: number) => [positions[rang * 3], positions[rang * 3 + 1], positions[rang * 3 + 2]]
      const connue = arretes.get(nom)
      if (connue) connue.normales.push(face)
      else arretes.set(nom, { points: [point(premier), point(second)], normales: [face] })
    }
  }
  const cosSeuil = Math.cos((angleVif * Math.PI) / 180)
  const array: number[] = []
  for (const arete of arretes.values()) {
    const vive = arete.normales.some((une) =>
      arete.normales.some((autre) => une[0] * autre[0] + une[1] * autre[1] + une[2] * autre[2] < cosSeuil),
    )
    if (arete.normales.length === 1 || vive) {
      const [a, b] = arete.points
      array.push(a[0], a[1], a[2], b[0], b[1], b[2])
    }
  }
  return array
}

/**
 * Arêtes de frontière entre faces, en millimètres.
 * Une arête qui ne borde qu'une face, et dont le milieu repose sur cette même face, est écartée :
 * c'est une découpe intérieure laissée par le booléen. Une jonction entre deux faces coplanaires
 * non plus : les fonds de l'empreinte n'en font qu'un. Une jonction avec une face d'un autre plan est tracée.
 * Sans aucun partenaire, l'arête est tracée : le maillage est ouvert.
 */
export function aretesBrep(maillage: Maillage) {
  const { positions, indices, faces } = maillage
  if (!faces || faces.length === 0) return []
  const quantifie = (valeur: number) => Math.round(valeur * 1e4) / 1e4
  const cleSommet = (rang: number) =>
    `${quantifie(positions[rang * 3])},${quantifie(positions[rang * 3 + 1])},${quantifie(positions[rang * 3 + 2])}`
  const point = (rang: number) => [positions[rang * 3], positions[rang * 3 + 1], positions[rang * 3 + 2]]
  const normaleTriangle = (i: number) => {
    const sommet = (k: number) => {
      const s = indices[i + k] * 3
      return [positions[s], positions[s + 1], positions[s + 2]]
    }
    const a = sommet(0)
    const b = sommet(1)
    const c = sommet(2)
    const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
    const ac = [c[0] - a[0], c[1] - a[1], c[2] - a[2]]
    const n = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]]
    const longueur = Math.hypot(n[0], n[1], n[2]) || 1
    return [n[0] / longueur, n[1] / longueur, n[2] / longueur]
  }
  const arretes = new Map<string, { a: number[]; b: number[]; etiquettes: number[]; normales: number[][]; source: number }>()
  for (let i = 0; i < indices.length; i += 3) {
    const etiquette = faces[i / 3]
    const normale = normaleTriangle(i)
    for (const [u, v] of [
      [0, 1],
      [1, 2],
      [2, 0],
    ]) {
      const premier = indices[i + u]
      const second = indices[i + v]
      const cles = [cleSommet(premier), cleSommet(second)]
      const nom = cles[0] < cles[1] ? `${cles[0]}|${cles[1]}` : `${cles[1]}|${cles[0]}`
      const connue = arretes.get(nom)
      if (connue) {
        connue.etiquettes.push(etiquette)
        connue.normales.push(normale)
      } else {
        arretes.set(nom, { a: point(premier), b: point(second), etiquettes: [etiquette], normales: [normale], source: i })
      }
    }
  }
  const array: number[] = []
  const poser = (a: number[], b: number[]) => array.push(a[0], a[1], a[2], b[0], b[1], b[2])
  const seules: { a: number[]; b: number[]; etiquette: number; normale: number[]; source: number }[] = []
  for (const arete of arretes.values()) {
    const distinctes = new Set(arete.etiquettes)
    if (distinctes.size > 1) {
      const parFace = new Map<number, number[]>()
      arete.etiquettes.forEach((id, k) => {
        if (!parFace.has(id)) parFace.set(id, arete.normales[k])
      })
      const vecteurs = [...parFace.values()]
      const coplanaires = vecteurs.every((normale) => {
        const scalaire = vecteurs[0][0] * normale[0] + vecteurs[0][1] * normale[1] + vecteurs[0][2] * normale[2]
        return scalaire > 0.999
      })
      if (!coplanaires) poser(arete.a, arete.b)
    } else if (arete.etiquettes.length === 1) {
      seules.push({
        a: arete.a,
        b: arete.b,
        etiquette: arete.etiquettes[0],
        normale: arete.normales[0],
        source: arete.source,
      })
    }
  }
  const tolerance = 0.05
  const triangles: { face: number; p: number[][]; min: number[]; max: number[]; normale: number[]; source: number }[] = []
  for (let t = 0; t < indices.length; t += 3) {
    const p = [0, 1, 2].map((k) => {
      const s = indices[t + k] * 3
      return [positions[s], positions[s + 1], positions[s + 2]]
    })
    triangles.push({
      face: faces[t / 3],
      p,
      normale: normaleTriangle(t),
      source: t,
      min: [0, 1, 2].map((axe) => Math.min(p[0][axe], p[1][axe], p[2][axe])),
      max: [0, 1, 2].map((axe) => Math.max(p[0][axe], p[1][axe], p[2][axe])),
    })
  }
  const surTriangle = (point: number[], triangle: (typeof triangles)[number]) => {
    const [a, b, c] = triangle.p
    const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
    const ac = [c[0] - a[0], c[1] - a[1], c[2] - a[2]]
    const n = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]]
    const nl = Math.hypot(n[0], n[1], n[2]) || 1
    const dist = Math.abs((point[0] - a[0]) * n[0] + (point[1] - a[1]) * n[1] + (point[2] - a[2]) * n[2]) / nl
    if (dist > tolerance) return false
    const d00 = ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2]
    const d01 = ab[0] * ac[0] + ab[1] * ac[1] + ab[2] * ac[2]
    const d11 = ac[0] * ac[0] + ac[1] * ac[1] + ac[2] * ac[2]
    const d20 = (point[0] - a[0]) * ab[0] + (point[1] - a[1]) * ab[1] + (point[2] - a[2]) * ab[2]
    const d21 = (point[0] - a[0]) * ac[0] + (point[1] - a[1]) * ac[1] + (point[2] - a[2]) * ac[2]
    const denom = d00 * d11 - d01 * d01 || 1
    const v = (d11 * d20 - d01 * d21) / denom
    const w = (d00 * d21 - d01 * d20) / denom
    return Math.min(1 - v - w, v, w) >= -0.02
  }
  for (const arete of seules) {
    const milieu = [
      (arete.a[0] + arete.b[0]) / 2,
      (arete.a[1] + arete.b[1]) / 2,
      (arete.a[2] + arete.b[2]) / 2,
    ]
    let meme = false
    let autre = false
    let couvert = false
    for (const triangle of triangles) {
      if (milieu[0] < triangle.min[0] - tolerance || milieu[0] > triangle.max[0] + tolerance) continue
      if (milieu[1] < triangle.min[1] - tolerance || milieu[1] > triangle.max[1] + tolerance) continue
      if (milieu[2] < triangle.min[2] - tolerance || milieu[2] > triangle.max[2] + tolerance) continue
      if (triangle.source === arete.source || !surTriangle(milieu, triangle)) continue
      if (triangle.face === arete.etiquette) meme = true
      else {
        const scalaire =
          arete.normale[0] * triangle.normale[0] +
          arete.normale[1] * triangle.normale[1] +
          arete.normale[2] * triangle.normale[2]
        if (scalaire > 0.999) couvert = true
        else autre = true
      }
    }
    if (autre || (!meme && !couvert)) poser(arete.a, arete.b)
  }
  return array
}

/**
 * Flanc incliné que traverse ce perçage : `bout` est l'extrémité côté flanc,
 * `x(z)` la position du flanc à ce débord.
 */
function flancTraverse(frontiere: Frontiere, trou: Extract<Frontiere['faces'][number], { sorte: 'traverse' }>, peau: number) {
  for (const face of frontiere.faces) {
    if (face.sorte !== 'boite' || !face.plan || peau <= 0) continue
    if (trou.z < face.zmin || trou.z > face.zmax) continue
    const tau = Math.sign(face.xmin + face.xmax) || 1
    const sigma = Math.sign(face.zmin + face.zmax) || 1
    const bout = tau > 0 ? trou.fin : trou.debut
    if (bout < face.xmin - 1e-6 || bout > face.xmax + 1e-6) continue
    const a0 = Math.min(Math.abs(face.xmin), Math.abs(face.xmax))
    const u1 = Math.max(Math.abs(face.zmin), Math.abs(face.zmax))
    const geo = geometriePlan({ a0, u1, plan: face.plan, rayonPeau: peau })
    return {
      bout,
      x: (z: number) => tau * (geo.Ptip[0] - (geo.N[1] * (sigma * z - geo.Ptip[1])) / geo.N[0]),
    }
  }
  return null
}

/** Polylignes exactes, même tableau que `brepWireframe.position` de w3dts. */
export function filDeFer(frontiere: Frontiere) {
  const array: number[] = []
  const peau = Math.max(
    0,
    ...frontiere.faces
      .filter((face) => face.sorte === 'cylindre' && face.dehors > 0 && face.angleDeb === undefined)
      .map((face) => face.rayon),
  )
  const conges = frontiere.faces.filter(
    (face): face is Extract<Frontiere['faces'][number], { sorte: 'conge' }> => face.sorte === 'conge',
  )
  const segment = (a: Point3, b: Point3) => horsPeau(a, b, peau, array)
  for (const face of frontiere.faces) {
    if (face.sorte === 'couronne') {
      chaine(cercle3(face.rayonExt, face.y), array)
      chaine(cercle3(face.rayonInt, face.y), array)
    }
    if (face.sorte === 'boite') {
      const rayons = congesDe(face, conges)
      const horsDesAxes = face.xmin * face.xmax > 0 && face.zmin * face.zmax > 0
      if (horsDesAxes && (face.plan || rayons.haut > 0 || rayons.bas > 0)) {
        for (const pan of pansDeCorne(face, rayons, face.plan, undefined, peau)) {
          for (const [a, b] of contourPan(pan)) array.push(...a, ...b)
        }
        continue
      }
      const { xmin, xmax, ymin, ymax, zmin, zmax } = face
      for (const y of [ymin, ymax]) {
        segment([xmin, y, zmin], [xmax, y, zmin])
        segment([xmax, y, zmin], [xmax, y, zmax])
        segment([xmax, y, zmax], [xmin, y, zmax])
        segment([xmin, y, zmax], [xmin, y, zmin])
      }
      for (const [x, z] of [
        [xmin, zmin],
        [xmax, zmin],
        [xmax, zmax],
        [xmin, zmax],
      ]) {
        segment([x, ymin, z], [x, ymax, z])
      }
    }
    if (face.sorte === 'traverse') {
      const flanc = face.dehors < 0 ? flancTraverse(frontiere, face, peau) : null
      const cercle = (x: number) => {
        if (peau > 0 && Math.hypot(x, face.z) < peau - 1e-6) return
        const points: Point3[] = []
        for (let i = 0; i < PAS; i++) {
          const angle = (i / PAS) * Math.PI * 2
          const z = face.z + Math.sin(angle) * face.rayon
          points.push([flanc?.bout === x ? flanc.x(z) : x, face.y + Math.cos(angle) * face.rayon, z])
        }
        chaine(points, array)
      }
      cercle(face.debut)
      cercle(face.fin)
    }
  }
  return { position: { array }, segmentCount: array.length / 6 }
}

/** Intersection segment / cylindre vertical d’axe Y. */
function coupeCylindre(a: Point3, b: Point3, rayon: number): Point3 | undefined {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const dz = b[2] - a[2]
  const A = dx * dx + dz * dz
  const B = 2 * (a[0] * dx + a[2] * dz)
  const C = a[0] * a[0] + a[2] * a[2] - rayon * rayon
  const delta = B * B - 4 * A * C
  if (A < 1e-12 || delta < 0) return
  const racine = Math.sqrt(delta)
  const t = [(-B - racine) / (2 * A), (-B + racine) / (2 * A)].find((valeur) => valeur >= 0 && valeur <= 1)
  if (t === undefined) return
  return [a[0] + t * dx, a[1] + t * dy, a[2] + t * dz]
}

/** Garde d'un segment la part hors du cylindre vertical de la peau. */
function horsPeau(a: Point3, b: Point3, rayon: number, array: number[]) {
  if (rayon <= 0) {
    array.push(a[0], a[1], a[2], b[0], b[1], b[2])
    return
  }
  const ra = Math.hypot(a[0], a[2])
  const rb = Math.hypot(b[0], b[2])
  if (ra < rayon && rb < rayon) return
  if (ra >= rayon && rb >= rayon) {
    array.push(a[0], a[1], a[2], b[0], b[1], b[2])
    return
  }
  const coupe = coupeCylindre(a, b, rayon)
  if (!coupe) return
  if (ra >= rayon) array.push(a[0], a[1], a[2], coupe[0], coupe[1], coupe[2])
  else array.push(coupe[0], coupe[1], coupe[2], b[0], b[1], b[2])
}

/** Faces remplies et arêtes visibles. Le maillage n’entre pas dans ce dessin. */
export function rendu(frontiere: Frontiere, largeur: number, hauteur: number) {
  const faces: { contour: number[][]; trous: number[][][]; teinte: number; teintes?: [number, number] }[] = []
  const triangles: Sommet[][] = []
  const candidats: Point3[][] = []
  const rayonMax = Math.max(0, ...frontiere.faces.filter((face) => face.sorte === 'cylindre').map((face) => face.rayon))
  const ordonnees = [...frontiere.faces].sort((a, b) => rang(a) - rang(b) || rayonDe(a) - rayonDe(b))
  for (const face of ordonnees) {
    if (face.sorte === 'couronne') {
      const exterieur = cercle(face.rayonExt, face.y, largeur, hauteur)
      const interieur = cercle(face.rayonInt, face.y, largeur, hauteur)
      const ext3 = cercle3(face.rayonExt, face.y)
      const int3 = cercle3(face.rayonInt, face.y)
      faces.push({ contour: exterieur, trous: [interieur], teinte: face.y > 0 ? 0.86 : 0.42 })
      if (face.y > 0) candidats.push(ext3, int3)
      for (let i = 0; i < PAS; i++) {
        const j = (i + 1) % PAS
        triangles.push([sommet(ext3[i], largeur, hauteur), sommet(ext3[j], largeur, hauteur), sommet(int3[j], largeur, hauteur)])
        triangles.push([sommet(ext3[i], largeur, hauteur), sommet(int3[j], largeur, hauteur), sommet(int3[i], largeur, hauteur)])
      }
      continue
    }
    const bas = cercle3(face.rayon, face.bas)
    const haut = cercle3(face.rayon, face.haut)
    for (let i = 0; i < PAS; i++) {
      const j = (i + 1) % PAS
      const a0 = (i / PAS) * Math.PI * 2
      const a1 = (j / PAS) * Math.PI * 2
      const quad = [bas[i], haut[i], haut[j], bas[j]].map((point) => projeter(point[0], point[1], point[2], largeur, hauteur))
      const eclairer = (angle: number) => 0.55 + 0.3 * Math.cos(angle)
      faces.push({ contour: quad, trous: [], teinte: eclairer(a0), teintes: [eclairer(a0), eclairer(a1)] })
      triangles.push(
        [bas[i], haut[i], haut[j]].map((point) => sommet(point, largeur, hauteur)),
        [bas[i], haut[j], bas[j]].map((point) => sommet(point, largeur, hauteur)),
      )
    }
    if (face.rayon === rayonMax) candidats.push(bas)
  }
  const tampon = new Float64Array(largeur * hauteur).fill(-1e30)
  for (const triangle of triangles) rasteriser(triangle, tampon, largeur, hauteur)
  const aretes: number[][][] = []
  let pointsMasques = 0
  for (const candidat of candidats) {
    const decoupe = decouper(candidat, tampon, largeur, hauteur)
    aretes.push(...decoupe.visibles)
    pointsMasques += decoupe.masques
  }
  return { faces, aretes, pointsMasques }
}

/** Segments écran [x1, y1, x2, y2]. Y du modèle vers le haut. */
export function filaire(maillage: Maillage, largeur: number, hauteur: number) {
  const projet = (x: number, y: number, z: number) => {
    const profondeur = 80 + z
    const echelle = 700 / profondeur
    return [largeur / 2 + (x - z) * echelle, hauteur / 2 - (y - (x + z) * 0.35) * echelle]
  }
  const segments: number[][] = []
  for (let i = 0; i + 2 < maillage.indices.length; i += 3) {
    const coins = [0, 1, 2, 0].map((sommet) => {
      const index = maillage.indices[i + (sommet % 3)] * 3
      return projet(maillage.positions[index], maillage.positions[index + 1], maillage.positions[index + 2])
    })
    for (let arete = 0; arete < 3; arete++) {
      segments.push([...coins[arete], ...coins[arete + 1]])
    }
  }
  return segments
}
