import { congesDe, geometrieElevation, geometriePlan, maillerPan, pansDeCorne } from './corne.ts'
import { classifieur, difference } from './csg.ts'
import { FLECHE, normaleDe, pasFleche, tesseler } from './tesseler.ts'
import { boite as boiteVolume, coque, cylindre as cylindreVolume } from './volumes.ts'
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

/** Demi-cylindre sous l’arc du dessous, limité au débord. */
function sousLeDessous(face: Boite, elevation: ElevationCorne, rayonPeau: number, fleche: number): Maillage {
  const sigma = Math.sign(face.zmin + face.zmax) || 1
  const u1 = Math.max(Math.abs(face.zmin), Math.abs(face.zmax))
  const elev = geometrieElevation({
    uPeau: rayonPeau,
    u1,
    H: face.ymax,
    y0: face.ymin,
    elevation,
    rh: 0,
    rb: 0,
  })
  if (!(elev.RBas < 1e12) || elev.yTipBas <= face.ymin + 1e-9) return { positions: [], indices: [] }
  const xmin = Math.min(face.xmin, face.xmax) - JEU
  const xmax = Math.max(face.xmin, face.xmax) + JEU
  const centreY = face.ymin + elev.RBas
  const centreZ = sigma * rayonPeau
  const R = elev.RBas + JEU * 0.1
  const cylindre = cylindreVolume({
    axe: 'x',
    rayon: R,
    debut: xmin,
    fin: xmax,
    a: centreY,
    b: centreZ,
    segments: Math.max(24, pasFleche(elev.RBas, fleche)),
  })
  const hautPlein = boiteVolume({
    xmin: xmin - JEU,
    xmax: xmax + JEU,
    ymin: centreY - JEU,
    ymax: centreY + R + JEU,
    zmin: Math.min(face.zmin, face.zmax) - R - JEU,
    zmax: Math.max(face.zmin, face.zmax) + R + JEU,
  })
  const versCentre = boiteVolume({
    xmin: xmin - JEU,
    xmax: xmax + JEU,
    ymin: face.ymin - R - JEU,
    ymax: face.ymax + R + JEU,
    zmin: sigma > 0 ? Math.min(face.zmin, face.zmax) - R - JEU : -rayonPeau + JEU,
    zmax: sigma > 0 ? rayonPeau - JEU : Math.max(face.zmin, face.zmax) + R + JEU,
  })
  return difference(difference(cylindre, hautPlein), versCentre)
}

/** Demi-cylindre au-dessus de l’arc du dessus, limité au débord. */
function horsDuDessus(face: Boite, elevation: ElevationCorne, rayonPeau: number, fleche: number): Maillage {
  const sigma = Math.sign(face.zmin + face.zmax) || 1
  const u1 = Math.max(Math.abs(face.zmin), Math.abs(face.zmax))
  const elev = geometrieElevation({
    uPeau: rayonPeau,
    u1,
    H: face.ymax,
    y0: face.ymin,
    elevation,
    rh: 0,
    rb: 0,
  })
  if (elev.chute <= 0 || !(elev.RHaut < 1e12)) return { positions: [], indices: [] }
  const xmin = Math.min(face.xmin, face.xmax) - JEU
  const xmax = Math.max(face.xmin, face.xmax) + JEU
  const centreY = face.ymax - elev.RHaut
  const centreZ = sigma * rayonPeau
  const R = elev.RHaut + JEU * 0.1
  const cylindre = cylindreVolume({
    axe: 'x',
    rayon: R,
    debut: xmin,
    fin: xmax,
    a: centreY,
    b: centreZ,
    segments: Math.max(24, pasFleche(elev.RHaut, fleche)),
  })
  const basPlein = boiteVolume({
    xmin: xmin - JEU,
    xmax: xmax + JEU,
    ymin: centreY - R - JEU,
    ymax: centreY + JEU,
    zmin: Math.min(face.zmin, face.zmax) - R - JEU,
    zmax: Math.max(face.zmin, face.zmax) + R + JEU,
  })
  const versCentre = boiteVolume({
    xmin: xmin - JEU,
    xmax: xmax + JEU,
    ymin: face.ymin - R - JEU,
    ymax: face.ymax + R + JEU,
    zmin: sigma > 0 ? Math.min(face.zmin, face.zmax) - R - JEU : -rayonPeau + JEU,
    zmax: sigma > 0 ? rayonPeau - JEU : Math.max(face.zmin, face.zmax) + R + JEU,
  })
  return difference(difference(cylindre, basPlein), versCentre)
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
        const dessus = horsDuDessus(face, face.elevation, rayonPeau, fleche)
        if (dessus.indices.length > 0) volume = difference(volume, dessus)
        const dessous = sousLeDessous(face, face.elevation, rayonPeau, fleche)
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

  for (const face of rondes) {
    const outils = [
      ...pleins.filter((plein) => plein.face.sorte === 'boite').map((plein) => plein.outil),
      ...vides,
    ]
    facettes.push(horsDe(surSurface(face, fleche), outils))
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
