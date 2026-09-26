import { congesDe, geometrieElevation, geometriePlan, maillerPan, pansDeCorne, rayonsDeBout } from './corne.ts'
import { classifieur, difference } from './csg.ts'
import { FLECHE, normaleDe, pasFleche, tesseler } from './tesseler.ts'
import { boite as boiteVolume, coque, cylindre as cylindreVolume, prisme as prismeVolume } from './volumes.ts'
import type { FaceExacte, Maillage, MaillageOmbre } from './types.ts'
import type { ElevationCorne, PlanCorne } from './corne.ts'

/** Marge des volumes de classement : deux surfaces confondues ne se classent pas. */
const MARGE = 0.5

/** Jeu de classement, plus grand que la flèche : les polygones se recoupent franchement. */
const JEU = 0.05

type Point = [number, number, number]
type Traverse = Extract<FaceExacte, { sorte: 'traverse' }>
type Boite = Extract<FaceExacte, { sorte: 'boite' }>
type Conge = Extract<FaceExacte, { sorte: 'conge' }>

/** Une part de surface, avec la normale de la surface dont elle vient. */
type Facette = { maillage: Maillage; normale: (point: Point) => Point }

type Encombrement = { min: Point; max: Point }
type Outil = ReturnType<typeof classifieur> & { encombrement: Encombrement }

function encombrement(maillage: Maillage): Encombrement {
  const min: Point = [Infinity, Infinity, Infinity]
  const max: Point = [-Infinity, -Infinity, -Infinity]
  for (let i = 0; i < maillage.positions.length; i += 3) {
    for (let axe = 0; axe < 3; axe++) {
      min[axe] = Math.min(min[axe], maillage.positions[i + axe])
      max[axe] = Math.max(max[axe], maillage.positions[i + axe])
    }
  }
  return { min, max }
}

function seTouchent(a: Encombrement, b: Encombrement) {
  return [0, 1, 2].every((axe) => a.min[axe] <= b.max[axe] + JEU && b.min[axe] <= a.max[axe] + JEU)
}

/** Classifieur d'un volume, avec son encombrement : un outil loin d'une face la laisse entière. */
function outil(volume: Maillage): Outil {
  return { ...classifieur(volume), encombrement: encombrement(volume) }
}

/**
 * Enveloppe de la pièce tournée : le cylindre plein sous sa peau extérieure.
 * La matière ajoutée s'arrête dessus, donc les poches et les perçages restent entiers.
 */
function enveloppe(rondes: FaceExacte[], fleche: number): Maillage | null {
  const peaux = rondes.filter(
    (face): face is Extract<FaceExacte, { sorte: 'cylindre' }> => face.sorte === 'cylindre' && face.dehors > 0,
  )
  if (peaux.length === 0) return null
  const peau = peaux.reduce((plus, face) => (face.rayon > plus.rayon ? face : plus))
  return cylindreVolume({
    axe: 'y',
    rayon: peau.rayon - JEU,
    debut: peau.bas - JEU,
    fin: peau.haut + JEU,
    a: 0,
    b: 0,
    segments: pasFleche(peau.rayon, fleche),
  })
}

function volumeTraverse(face: Traverse, fleche: number, marge: number) {
  return cylindreVolume({
    axe: 'x',
    rayon: face.rayon,
    debut: face.debut - marge,
    fin: face.fin + marge,
    a: face.y,
    b: face.z,
    segments: pasFleche(face.rayon, fleche),
  })
}

/** Coin rectangle retiré par un congé de bout. */
function morsure(face: Boite, conge: Conge, fleche: number): Maillage {
  const R = conge.rayon
  const versPlus = face.zmax > 0
  const haut = Math.abs(conge.y - face.ymax) < Math.abs(conge.y - face.ymin)
  const coin = boiteVolume({
    xmin: Math.min(conge.debut, conge.fin) - JEU,
    xmax: Math.max(conge.debut, conge.fin) + JEU,
    ymin: haut ? face.ymax - R : face.ymin,
    ymax: haut ? face.ymax : face.ymin + R,
    zmin: versPlus ? face.zmax - R : face.zmin,
    zmax: versPlus ? face.zmax : face.zmin + R,
  })
  const noyau = cylindreVolume({
    axe: 'x',
    rayon: R + JEU * 0.1,
    debut: conge.debut - JEU,
    fin: conge.fin + JEU,
    a: conge.y,
    b: conge.z,
    segments: Math.max(24, pasFleche(R, fleche)),
  })
  return difference(coin, noyau)
}

/** Prisme hors du flanc : matière coupée du côté extérieur. */
function horsDuFlanc(face: Boite, plan: PlanCorne, rayonPeau: number): Maillage {
  const tau = Math.sign(face.xmin + face.xmax) || 1
  const sigma = Math.sign(face.zmin + face.zmax) || 1
  const a0 = Math.min(Math.abs(face.xmin), Math.abs(face.xmax))
  const u1 = Math.max(Math.abs(face.zmin), Math.abs(face.zmax))
  const geo = geometriePlan({ a0, u1, plan, rayonPeau })
  const Nx = tau * geo.N[0]
  const Nz = sigma * geo.N[1]
  const Px = tau * geo.Ptip[0]
  const Pz = sigma * geo.Ptip[1]
  const etendue = 30
  const Tx = -Nz
  const Tz = Nx
  const y0 = face.ymin - JEU
  const y1 = face.ymax + JEU
  const coin = (s: number, t: number, y: number): Point => [
    Px + Nx * s + Tx * t,
    y,
    Pz + Nz * s + Tz * t,
  ]
  const positions: number[] = []
  const indices: number[] = []
  const poser = (p: Point) => {
    const rang = positions.length / 3
    positions.push(...p)
    return rang
  }
  const quad = (a: Point, b: Point, c: Point, d: Point) => {
    const ia = poser(a)
    const ib = poser(b)
    const ic = poser(c)
    const id = poser(d)
    indices.push(ia, ib, ic, ia, ic, id)
  }
  const s0 = -JEU
  const s1 = etendue
  const t0 = -etendue
  const t1 = etendue
  quad(coin(s0, t0, y0), coin(s1, t0, y0), coin(s1, t1, y0), coin(s0, t1, y0))
  quad(coin(s0, t0, y1), coin(s0, t1, y1), coin(s1, t1, y1), coin(s1, t0, y1))
  quad(coin(s0, t0, y0), coin(s0, t0, y1), coin(s1, t0, y1), coin(s1, t0, y0))
  quad(coin(s0, t1, y0), coin(s1, t1, y0), coin(s1, t1, y1), coin(s0, t1, y1))
  quad(coin(s0, t0, y0), coin(s0, t1, y0), coin(s0, t1, y1), coin(s0, t0, y1))
  quad(coin(s1, t0, y0), coin(s1, t0, y1), coin(s1, t1, y1), coin(s1, t1, y0))
  return { positions, indices }
}

/** Profil d'élévation d'une corne, avec les rayons de congé de bout que les pans emploient. */
function elevationDe(face: Boite, elevation: ElevationCorne, rayonPeau: number, conges: Conge[]) {
  const { rh, rb } = rayonsDeBout(face, congesDe(face, conges))
  return geometrieElevation({
    uPeau: rayonPeau,
    u1: Math.max(Math.abs(face.zmin), Math.abs(face.zmax)),
    H: face.ymax,
    y0: face.ymin,
    elevation,
    rh,
    rb,
  })
}

/** Débords répartis sur l'arche, de la peau jusqu'au-delà du bout. */
function debordsArche(rayonPeau: number, demi: number, ampleur: number, u1: number, fleche: number) {
  const nombre = Math.max(16, pasFleche(Math.hypot(demi, ampleur), fleche) / 4)
  const pas = Math.ceil(nombre)
  const us = Array.from({ length: pas + 1 }, (_, rang) => rayonPeau + (demi * rang) / pas)
  return [...us, u1 + JEU]
}

/** Prisme sous l’arche du dessous, à partir de la peau : l’anneau reste entier. */
function sousLeDessous(
  face: Boite,
  elevation: ElevationCorne,
  rayonPeau: number,
  fleche: number,
  conges: Conge[],
): Maillage {
  const sigma = Math.sign(face.zmin + face.zmax) || 1
  const u1 = Math.max(Math.abs(face.zmin), Math.abs(face.zmax))
  const elev = elevationDe(face, elevation, rayonPeau, conges)
  if (elev.plongee <= 0) return { positions: [], indices: [] }
  return prismeVolume({
      colonnes: debordsArche(rayonPeau, elev.demiBas, elev.plongee, u1, fleche).map((u) => ({
      z: sigma * u,
      bas: face.ymin - JEU,
      haut: Math.max(elev.yBasPlan(u), face.ymin),
    })),
    debut: Math.min(face.xmin, face.xmax) - JEU,
    fin: Math.max(face.xmin, face.xmax) + JEU,
  })
}

/** Prisme au-dessus de l’arche du dessus, à partir de la peau : l’anneau reste entier. */
function horsDuDessus(
  face: Boite,
  elevation: ElevationCorne,
  rayonPeau: number,
  fleche: number,
  conges: Conge[],
): Maillage {
  const sigma = Math.sign(face.zmin + face.zmax) || 1
  const u1 = Math.max(Math.abs(face.zmin), Math.abs(face.zmax))
  const elev = elevationDe(face, elevation, rayonPeau, conges)
  if (elev.chute <= 0) return { positions: [], indices: [] }
  return prismeVolume({
      colonnes: debordsArche(rayonPeau, elev.demiHaut, elev.chute, u1, fleche).map((u) => ({
      z: sigma * u,
      bas: Math.min(elev.yHautPlan(u), face.ymax),
      haut: face.ymax + JEU,
    })),
    debut: Math.min(face.xmin, face.xmax) - JEU,
    fin: Math.max(face.xmin, face.xmax) + JEU,
  })
}

/** Les six plans d'une boîte, chacun avec sa normale constante. */
function plansDeBoite(face: Boite): Facette[] {
  const { xmin, xmax, ymin, ymax, zmin, zmax } = face
  const quad = (coins: [Point, Point, Point, Point], normale: Point): Facette => ({
    maillage: {
      positions: coins.flat(),
      indices: [0, 1, 2, 0, 2, 3],
    },
    normale: () => normale,
  })
  return [
    quad([[xmax, ymin, zmin], [xmax, ymax, zmin], [xmax, ymax, zmax], [xmax, ymin, zmax]], [1, 0, 0]),
    quad([[xmin, ymin, zmax], [xmin, ymax, zmax], [xmin, ymax, zmin], [xmin, ymin, zmin]], [-1, 0, 0]),
    quad([[xmin, ymax, zmin], [xmin, ymax, zmax], [xmax, ymax, zmax], [xmax, ymax, zmin]], [0, 1, 0]),
    quad([[xmin, ymin, zmin], [xmax, ymin, zmin], [xmax, ymin, zmax], [xmin, ymin, zmax]], [0, -1, 0]),
    quad([[xmin, ymin, zmax], [xmax, ymin, zmax], [xmax, ymax, zmax], [xmin, ymax, zmax]], [0, 0, 1]),
    quad([[xmin, ymin, zmin], [xmin, ymax, zmin], [xmax, ymax, zmin], [xmax, ymin, zmin]], [0, 0, -1]),
  ]
}

/** Pans exacts d'une corne profilée, partant de la peau. Une boîte simple n'en a pas. */
function pansDeBoite(face: Boite, conges: Conge[], fleche: number, rayonPeau: number): Facette[] | null {
  const rayons = congesDe(face, conges)
  const horsDesAxes = face.xmin * face.xmax > 0 && face.zmin * face.zmax > 0
  if (!horsDesAxes || (!face.plan && rayons.haut === 0 && rayons.bas === 0)) return null
  return pansDeCorne(face, rayons, face.plan, fleche, rayonPeau).map((pan) => ({
    maillage: maillerPan(pan),
    normale: pan.normale,
  }))
}

/** Disque plan au bout d'une traverse pleine, normale le long de l'axe. */
function boutDeTraverse(face: Traverse, fleche: number): Facette {
  const pans = pasFleche(face.rayon, fleche)
  const positions: number[] = [face.fin, face.y, face.z]
  const indices: number[] = []
  for (let i = 0; i <= pans; i++) {
    const angle = (i / pans) * Math.PI * 2
    positions.push(face.fin, face.y + Math.cos(angle) * face.rayon, face.z + Math.sin(angle) * face.rayon)
    if (i > 0) indices.push(0, i, i + 1)
  }
  return { maillage: { positions, indices }, normale: () => [1, 0, 0] }
}

function surSurface(face: FaceExacte, fleche: number): Facette {
  const { positions, indices } = tesseler([face], fleche)
  return { maillage: { positions, indices }, normale: (point) => normaleDe(face, point) }
}

/** Paroi d'une traverse creuse, orientée vers son axe. */
function paroiDeTrou(face: Traverse, fleche: number): Facette {
  const pans = pasFleche(face.rayon, fleche)
  const positions: number[] = []
  const indices: number[] = []
  for (let i = 0; i < pans; i++) {
    const angle = (i / pans) * Math.PI * 2
    const suivant = ((i + 1) / pans) * Math.PI * 2
    const point = (x: number, a: number) => [x, face.y + Math.cos(a) * face.rayon, face.z + Math.sin(a) * face.rayon]
    const rang = positions.length / 3
    positions.push(...point(face.debut, angle), ...point(face.fin, angle), ...point(face.fin, suivant), ...point(face.debut, suivant))
    indices.push(rang, rang + 1, rang + 2, rang, rang + 2, rang + 3)
  }
  return { maillage: { positions, indices }, normale: (point) => normaleDe(face, point) }
}

/**
 * Sommets du dessus de corne posés sur le cylindre.
 * L'habillage reprend ces points pour que le joint soit une seule ligne.
 */
function jonctionsDessus(face: Boite, conges: Conge[], fleche: number, rayon: number): Point[] {
  const pans = pansDeCorne(face, congesDe(face, conges), face.plan, fleche, rayon)
  const bandes = pans.filter((pan) => pan.colonnes.every(([pied, tete]) => Math.abs(pied[1] - tete[1]) < 1e-6))
  if (bandes.length === 0) return []
  const moyenne = (pan: (typeof bandes)[number]) =>
    pan.colonnes.reduce((somme, [pied]) => somme + pied[1], 0) / pan.colonnes.length
  const dessus = bandes.reduce((a, b) => (moyenne(a) > moyenne(b) ? a : b))
  const points: Point[] = []
  for (const [pied, tete] of dessus.colonnes) {
    const bord = Math.hypot(pied[0], pied[2]) <= Math.hypot(tete[0], tete[2]) ? pied : tete
    if (Math.abs(Math.hypot(bord[0], bord[2]) - rayon) < 1e-4) points.push(bord)
  }
  const miroirs: Point[] = []
  for (const [x, y, z] of points) {
    for (const sx of [1, -1]) {
      for (const sz of [1, -1]) miroirs.push([sx * Math.abs(x), y, sz * Math.abs(z)])
    }
  }
  return miroirs
}

/**
 * Haut de la boîte quand la courbe commence avant la peau.
 * L'entrecorne (|x| < a0) reste droite, à pleine hauteur.
 * Le mur, le rebord et la jupe de lunette partagent les mêmes hauteurs sur les cornes.
 */
function habillageDessus(
  rayon: number,
  hauteur: number,
  rayonJupe: number,
  basJupe: number,
  a0: number,
  elev: ReturnType<typeof geometrieElevation>,
  fleche: number,
  jonctions: Point[] = [],
): { murs: Facette; dessus: Facette; jupe: Facette } | null {
  if (elev.amorce <= 0 || rayonJupe >= rayon - 0.2) return null
  const pans = Math.max(96, pasFleche(rayon, fleche))
  const yDe = (u: number) => Math.min(hauteur, elev.yHautPlan(u))
  const rayons = [rayonJupe, rayon]
  const bord = (r: number, theta: number) =>
    Math.abs(r * Math.cos(theta)) < a0 ? hauteur : yDe(Math.abs(r * Math.sin(theta)))
  const angles = Array.from({ length: pans + 1 }, (_, i) => (i / pans) * Math.PI * 2)
  if (a0 < rayon) {
    const limite = Math.acos(a0 / rayon)
    const tour = Math.PI * 2
    for (const base of [0, Math.PI]) {
      for (const theta of [base - limite, base + limite]) {
        let angle = theta % tour
        if (angle < 0) angle += tour
        if (angle > 1e-8 && angle < tour - 1e-8) angles.push(angle)
      }
    }
  }
  angles.sort((a, b) => a - b)
  const tour = Math.PI * 2
  const normaliser = (theta: number) => {
    let angle = theta % tour
    if (angle < 0) angle += tour
    return angle
  }
  const anglesJonction = jonctions.map(([x, , z]) => normaliser(Math.atan2(z, x)))
  const parQuadrant = new Map<string, number[]>()
  for (const [x, , z] of jonctions) {
    const cle = `${Math.sign(x) || 1},${Math.sign(z) || 1}`
    const liste = parQuadrant.get(cle) ?? []
    liste.push(normaliser(Math.atan2(z, x)))
    parQuadrant.set(cle, liste)
  }
  const secteurs: [number, number][] = []
  for (const liste of parQuadrant.values()) {
    liste.sort((p, q) => p - q)
    if (liste[liste.length - 1] - liste[0] > 1e-6) secteurs.push([liste[0], liste[liste.length - 1]])
  }
  const dansSecteur = (theta: number) => secteurs.some(([bas, haut]) => theta > bas + 1e-7 && theta < haut - 1e-7)
  const estJonction = (theta: number) => anglesJonction.some((angle) => Math.abs(angle - theta) < 1e-7)
  for (const angle of anglesJonction) angles.push(angle)
  const anglesJoints = angles.filter((theta) => !dansSecteur(theta) || estJonction(theta))
  anglesJoints.sort((a, b) => a - b)
  const thetas = anglesJoints.filter((theta, rang) => rang === 0 || theta - anglesJoints[rang - 1] > 1e-8)
  const positions: number[] = []
  const mur: number[] = []
  const dessus: number[] = []
  const jupe: number[] = []
  const poser = (x: number, y: number, z: number) => {
    const rang = positions.length / 3
    positions.push(x, y, z)
    return rang
  }
  const ajouter = (indices: number[], a: number, b: number, c: number, sens: Point) => {
    const pa = positions.slice(a * 3, a * 3 + 3)
    const pb = positions.slice(b * 3, b * 3 + 3)
    const pc = positions.slice(c * 3, c * 3 + 3)
    const u = [pb[0] - pa[0], pb[1] - pa[1], pb[2] - pa[2]]
    const v = [pc[0] - pa[0], pc[1] - pa[1], pc[2] - pa[2]]
    const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
    if (Math.hypot(n[0], n[1], n[2]) < 1e-8) return
    if (n[0] * sens[0] + n[1] * sens[1] + n[2] * sens[2] >= 0) indices.push(a, b, c)
    else indices.push(a, c, b)
  }
  for (let i = 0; i < thetas.length - 1; i++) {
    const t0 = thetas[i]
    const t1 = thetas[i + 1]
    const c0 = Math.cos(t0)
    const s0 = Math.sin(t0)
    const c1 = Math.cos(t1)
    const s1 = Math.sin(t1)
    const joint0 = jonctions.find((_, index) => Math.abs(anglesJonction[index] - normaliser(t0)) < 1e-7)
    const joint1 = jonctions.find((_, index) => Math.abs(anglesJonction[index] - normaliser(t1)) < 1e-7)
    const yHaut0 = joint0 ? joint0[1] : bord(rayon, t0)
    const yHaut1 = joint1 ? joint1[1] : bord(rayon, t1)
    const bas0 = poser(c0 * rayon, 0, s0 * rayon)
    const haut0 = poser(joint0 ? joint0[0] : c0 * rayon, yHaut0, joint0 ? joint0[2] : s0 * rayon)
    const haut1 = poser(joint1 ? joint1[0] : c1 * rayon, yHaut1, joint1 ? joint1[2] : s1 * rayon)
    const bas1 = poser(c1 * rayon, 0, s1 * rayon)
    const sensMur: Point = [c0 + c1, 0, s0 + s1]
    ajouter(mur, bas0, haut0, haut1, sensMur)
    ajouter(mur, bas0, haut1, bas1, sensMur)
    const poserRayon = (r: number, theta: number, c: number, s: number, joint: Point | undefined) =>
      Math.abs(r - rayon) < 1e-9 && joint ? poser(joint[0], joint[1], joint[2]) : poser(c * r, bord(r, theta), s * r)
    const ligne0 = rayons.map((r) => poserRayon(r, t0, c0, s0, joint0))
    const ligne1 = rayons.map((r) => poserRayon(r, t1, c1, s1, joint1))
    for (let j = 0; j < rayons.length - 1; j++) {
      const sens: Point = [0, 1, 0]
      ajouter(dessus, ligne0[j], ligne1[j], ligne1[j + 1], sens)
      ajouter(dessus, ligne0[j], ligne1[j + 1], ligne0[j + 1], sens)
    }
    const yJ0 = Math.max(basJupe, bord(rayonJupe, t0))
    const yJ1 = Math.max(basJupe, bord(rayonJupe, t1))
    const jBas0 = poser(c0 * rayonJupe, basJupe, s0 * rayonJupe)
    const jHaut0 = poser(c0 * rayonJupe, yJ0, s0 * rayonJupe)
    const jHaut1 = poser(c1 * rayonJupe, yJ1, s1 * rayonJupe)
    const jBas1 = poser(c1 * rayonJupe, basJupe, s1 * rayonJupe)
    const sensJupe: Point = [-(c0 + c1), 0, -(s0 + s1)]
    ajouter(jupe, jBas0, jHaut1, jHaut0, sensJupe)
    ajouter(jupe, jBas0, jBas1, jHaut1, sensJupe)
  }
  const face = (indices: number[], normale: (point: Point) => Point): Facette => ({
    maillage: { positions: positions.slice(), indices },
    normale,
  })
  return {
    murs: face(mur, (point) => {
      const rayonPoint = Math.hypot(point[0], point[2]) || 1
      return [point[0] / rayonPoint, 0, point[2] / rayonPoint]
    }),
    dessus: face(dessus, (point) => {
      if (Math.abs(point[0]) < a0) return [0, 1, 0]
      const signe = Math.sign(point[2]) || 1
      const p = elev.penteHaut(Math.abs(point[2]))
      const longueur = Math.hypot(1, p) || 1
      return [0, 1 / longueur, (-signe * p) / longueur]
    }),
    jupe: face(jupe, (point) => {
      const rayonPoint = Math.hypot(point[0], point[2]) || 1
      return [-point[0] / rayonPoint, 0, -point[2] / rayonPoint]
    }),
  }
}

/**
 * Maillage d'affichage de la frontière : chaque face est tessellée sur sa surface,
 * puis rognée par les volumes voisins. Le classement est un détail interne.
 */
export function ombrer(faces: FaceExacte[], fleche = FLECHE): MaillageOmbre {
  const rondes = faces.filter(
    (face) => (face.sorte === 'cylindre' && face.angleDeb === undefined) || face.sorte === 'couronne',
  )
  const boites = faces.filter((face): face is Boite => face.sorte === 'boite')
  const conges = faces.filter((face): face is Conge => face.sorte === 'conge')
  const pleines = faces.filter((face): face is Traverse => face.sorte === 'traverse' && face.dehors > 0)
  const creuses = faces.filter((face): face is Traverse => face.sorte === 'traverse' && face.dehors < 0)
  const rayonMax = Math.max(1, ...rondes.map((face) => (face.sorte === 'cylindre' ? face.rayon : face.rayonExt)))
  const anneau = rondes.length > 0 ? classifieur(coque(rondes, pasFleche(rayonMax, fleche))) : null
  const peau = enveloppe(rondes, fleche)
  const dehorsDeLaPeau = peau ? outil(peau) : null
  const rayonPeau = Math.max(
    0,
    ...rondes.map((face) => (face.sorte === 'cylindre' && face.dehors > 0 ? face.rayon : 0)),
  )
  const hors = (volume: Maillage) => (peau ? difference(volume, peau) : volume)
  const pleins = [
    ...boites.map((face) => {
      let volume = boiteVolume(face)
      if (face.plan && rayonPeau > 0) {
        volume = difference(volume, horsDuFlanc(face, face.plan, rayonPeau))
        const tau = Math.sign(face.xmin + face.xmax) || 1
        const sigma = Math.sign(face.zmin + face.zmax) || 1
        const a0 = Math.min(Math.abs(face.xmin), Math.abs(face.xmax))
        const u1 = Math.max(Math.abs(face.zmin), Math.abs(face.zmax))
        const geo = geometriePlan({ a0, u1, plan: face.plan, rayonPeau })
        volume = difference(
          volume,
          cylindreVolume({
            axe: 'y',
            rayon: geo.Rr + JEU * 0.1,
            debut: face.ymin - JEU,
            fin: face.ymax + JEU,
            a: tau * geo.C[0],
            b: sigma * geo.C[1],
            segments: Math.max(24, pasFleche(geo.Rr, fleche)),
          }),
        )
      }
      if (face.elevation && rayonPeau > 0) {
        const dessus = horsDuDessus(face, face.elevation, rayonPeau, fleche, conges)
        if (dessus.indices.length > 0) volume = difference(volume, dessus)
        const dessous = sousLeDessous(face, face.elevation, rayonPeau, fleche, conges)
        if (dessous.indices.length > 0) volume = difference(volume, dessous)
      }
      for (const conge of conges) {
        const a0 = Math.min(Math.abs(face.xmin), Math.abs(face.xmax))
        const a1 = Math.max(Math.abs(face.xmin), Math.abs(face.xmax))
        const debut = Math.min(Math.abs(conge.debut), Math.abs(conge.fin))
        const fin = Math.max(Math.abs(conge.debut), Math.abs(conge.fin))
        if (debut < a0 - 1e-6 || fin > a1 + 1e-6) continue
        if (Math.sign(conge.debut + conge.fin) !== Math.sign(face.xmin + face.xmax)) continue
        volume = difference(volume, morsure(face, conge, fleche))
      }
      return { face, outil: outil(hors(volume)) }
    }),
    ...pleines.map((face) => ({ face, outil: outil(hors(volumeTraverse(face, fleche, 0))) })),
  ]
  const vides = creuses.map((face) => outil(volumeTraverse(face, fleche, MARGE)))
  const boiteAmorce = boites.find((face) => (face.elevation?.amorce ?? 0) > 0 && face.zmax > 0)
  const elevDessus =
    boiteAmorce?.elevation && rayonPeau > 0
      ? elevationDe(boiteAmorce, boiteAmorce.elevation, rayonPeau, conges)
      : null
  const rebord =
    elevDessus && boiteAmorce
      ? rondes.find(
          (face) =>
            face.sorte === 'couronne' &&
            !face.pente &&
            Math.abs(face.y - boiteAmorce.ymax) < 1e-6 &&
            Math.abs(face.rayonExt - rayonPeau) < 1e-6,
        )
      : undefined
  const jupe =
    rebord?.sorte === 'couronne'
      ? rondes.find(
          (face) =>
            face.sorte === 'cylindre' &&
            face.dehors < 0 &&
            Math.abs(face.rayon - rebord.rayonInt) < 1e-6 &&
            Math.abs(face.haut - (rebord.sorte === 'couronne' ? rebord.y : 0)) < 1e-6,
        )
      : undefined
  const peauExt = rondes.find((face) => face.sorte === 'cylindre' && face.dehors > 0 && face.angleDeb === undefined)
  const habillage =
    elevDessus && boiteAmorce && rebord?.sorte === 'couronne' && jupe?.sorte === 'cylindre' && peauExt
      ? habillageDessus(
          rayonPeau,
          boiteAmorce.ymax,
          rebord.rayonInt,
          jupe.bas,
          Math.min(Math.abs(boiteAmorce.xmin), Math.abs(boiteAmorce.xmax)),
          elevDessus,
          fleche,
          jonctionsDessus(boiteAmorce, conges, fleche, rayonPeau),
        )
      : null
  const remplaces = new Set<FaceExacte>(habillage ? [peauExt!, rebord!, jupe!] : [])

  const facettes: Facette[] = []
  const horsDe = (facette: Facette, outils: Outil[]) => {
    let reste = facette.maillage
    const place = encombrement(reste)
    for (const un of outils) {
      if (reste.indices.length === 0) break
      if (seTouchent(place, un.encombrement)) reste = un.dehors(reste)
    }
    return { maillage: reste, normale: facette.normale }
  }

  const outilsCornes = pleins.filter((plein) => plein.face.sorte === 'boite').map((plein) => plein.outil)
  for (const face of rondes) {
    if (remplaces.has(face)) continue
    facettes.push(horsDe(surSurface(face, fleche), [...outilsCornes, ...vides]))
  }
  if (habillage) {
    // La corne est hors de la peau : rogner le mur avec son volume ouvre un jour
    // que le pan ne referme pas. Les trous (barrette, tige) restent à découper.
    facettes.push(horsDe(habillage.murs, vides))
    facettes.push(horsDe(habillage.dessus, vides))
    facettes.push(horsDe(habillage.jupe, vides))
  }
  for (const { face, outil } of pleins) {
    const autres = [...pleins.filter((plein) => plein.outil !== outil).map((plein) => plein.outil), ...vides]
    const corne = face.sorte === 'boite' ? pansDeBoite(face, conges, fleche, rayonPeau) : null
    const outils = dehorsDeLaPeau && !corne ? [dehorsDeLaPeau, ...autres] : autres
    const propres: Facette[] =
      corne ??
      (face.sorte === 'boite' ? plansDeBoite(face) : [surSurface(face, fleche), boutDeTraverse(face, fleche)])
    for (const facette of propres) facettes.push(horsDe(facette, outils))
  }
  creuses.forEach((face, rang) => {
    const paroi = paroiDeTrou(face, fleche)
    const autresVides = vides.filter((_, index) => index !== rang)
    const contenants = [...(anneau ? [anneau] : []), ...pleins.map((plein) => plein.outil)]
    for (const contenant of contenants) {
      const dedans = contenant.dedans(paroi.maillage)
      if (dedans.indices.length === 0) continue
      facettes.push(horsDe({ maillage: dedans, normale: paroi.normale }, autresVides))
    }
  })
  return reunir(facettes)
}

function reunir(facettes: Facette[]): MaillageOmbre {
  const positions: number[] = []
  const normales: number[] = []
  const indices: number[] = []
  for (const facette of facettes) {
    const decalage = positions.length / 3
    for (let i = 0; i < facette.maillage.positions.length; i += 3) {
      const point: Point = [
        facette.maillage.positions[i],
        facette.maillage.positions[i + 1],
        facette.maillage.positions[i + 2],
      ]
      const normale = facette.normale(point)
      positions.push(point[0], point[1], point[2])
      normales.push(normale[0], normale[1], normale[2])
    }
    for (const rang of facette.maillage.indices) indices.push(decalage + rang)
  }
  return { positions, normales, indices }
}
