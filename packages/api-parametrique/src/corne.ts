import { FLECHE, pasFleche } from './tesseler.ts'
import type { FaceExacte } from './types.ts'

type Point = [number, number, number]
type Boite = Extract<FaceExacte, { sorte: 'boite' }>
type Conge = Extract<FaceExacte, { sorte: 'conge' }>

/**
 * Une face de corne, en bande de colonnes : chaque colonne va d'un bord de la face à l'autre.
 * Le maillage relie deux colonnes voisines ; le contour est la première et la dernière colonne,
 * plus la chaîne des pieds et celle des têtes. Une colonne `lisse` raccorde la face en tangence
 * à sa voisine : le contour l'omet.
 */
export type Pan = {
  colonnes: [Point, Point][]
  normale: (point: Point) => Point
  lisses?: { debut?: boolean; fin?: boolean }
}

/** Contour en plan Oyster : bout étroit, flanc droit, congé creux à la racine. */
export type PlanCorne = {
  largeurBout: number
  largeurRacine: number
  rayonRacine: number
}

/** Valeurs croissantes de `debut` à `fin`, cassures comprises. */
function echantillons(debut: number, fin: number, nombre: number, cassures: number[] = []) {
  const valeurs = [debut, fin, ...cassures.filter((valeur) => valeur > debut && valeur < fin)]
  for (let i = 1; i < nombre; i++) valeurs.push(debut + ((fin - debut) * i) / nombre)
  valeurs.sort((a, b) => a - b)
  return valeurs.filter((valeur, rang) => rang === 0 || valeur - valeurs[rang - 1] > 1e-9)
}

function pansArc(rayon: number, angle: number, fleche: number) {
  return Math.max(4, Math.ceil((pasFleche(rayon, fleche) * angle) / (Math.PI * 2)))
}

/** Congés liés à cette boîte : même sens de largeur, rayon au coin haut et au coin bas du bout. */
export function congesDe(face: Boite, conges: Conge[]) {
  const a0 = Math.min(Math.abs(face.xmin), Math.abs(face.xmax))
  const a1 = Math.max(Math.abs(face.xmin), Math.abs(face.xmax))
  const lies = conges.filter((conge) => {
    const debut = Math.min(Math.abs(conge.debut), Math.abs(conge.fin))
    const fin = Math.max(Math.abs(conge.debut), Math.abs(conge.fin))
    return debut >= a0 - 1e-6 && fin <= a1 + 1e-6 && Math.sign(conge.debut + conge.fin) === Math.sign(face.xmin + face.xmax)
  })
  const parY = [...lies].sort((a, b) => a.y - b.y)
  return {
    haut: parY[parY.length - 1]?.rayon ?? 0,
    bas: parY.length > 1 ? parY[0].rayon : parY[0]?.y <= (face.ymin + face.ymax) / 2 ? parY[0].rayon : 0,
  }
}

/**
 * Géométrie du profil en plan dans le quart (a ≥ 0, u ≥ 0) :
 * flanc du coin de bout au point de peau à `largeurRacine`, congé creux tangent au flanc et à la peau.
 */
export function geometriePlan(opts: {
  a0: number
  u1: number
  plan: PlanCorne
  rayonPeau: number
}) {
  const { a0, u1, plan, rayonPeau } = opts
  const aBout = a0 + plan.largeurBout
  const aRacine = a0 + plan.largeurRacine
  const uPeauRacine = Math.sqrt(Math.max(0, rayonPeau * rayonPeau - aRacine * aRacine))
  const Ptip: [number, number] = [aBout, u1]
  const V: [number, number] = [aRacine - aBout, uPeauRacine - u1]
  const longueur = Math.hypot(V[0], V[1])
  const Vh: [number, number] = [V[0] / longueur, V[1] / longueur]
  const N: [number, number] = [-Vh[1], Vh[0]]
  const Rr = plan.rayonRacine
  const R = rayonPeau + Rr
  const Ox = Ptip[0] + Rr * N[0]
  const Oy = Ptip[1] + Rr * N[1]
  const B = 2 * (Ox * Vh[0] + Oy * Vh[1])
  const C0 = Ox * Ox + Oy * Oy - R * R
  const disc = Math.max(0, B * B - 4 * C0)
  const racines = [(-B - Math.sqrt(disc)) / 2, (-B + Math.sqrt(disc)) / 2]
  const tChoisi = racines.find((valeur) => valeur > 0 && valeur < longueur) ?? Math.min(...racines.filter((valeur) => valeur > 0))
  const C: [number, number] = [Ox + tChoisi * Vh[0], Oy + tChoisi * Vh[1]]
  const Qt: [number, number] = [Ptip[0] + tChoisi * Vh[0], Ptip[1] + tChoisi * Vh[1]]
  const peau: [number, number] = [(C[0] * rayonPeau) / R, (C[1] * rayonPeau) / R]
  const angleQt = Math.atan2(Qt[1] - C[1], Qt[0] - C[0])
  const anglePeau = Math.atan2(peau[1] - C[1], peau[0] - C[0])
  return { aBout, aRacine, Ptip, N, Vh, C, Qt, peau, angleQt, anglePeau, Rr, rayonPeau }
}

/** Part du débord que la chute du dessus occupe au plus : au-delà, l'arc tangent se redresse à la verticale. */
const MARGE_ARC = 0.8

/**
 * Profil d’élévation Oyster : le bout de corne plonge vers le bracelet.
 * `plongee` est la hauteur du bas du bout au-dessus du fond, `epaisseurBout` son épaisseur.
 * La chute du dessus en découle : `hauteur - plongee - epaisseurBout`.
 */
export type ElevationCorne = {
  plongee: number
  epaisseurBout: number
}

/**
 * Géométrie du profil en élévation le long du débord :
 * dessus et dessous en arcs tangents à la peau (croissant Oyster).
 */
export function geometrieElevation(opts: {
  uPeau: number
  u1: number
  H: number
  y0: number
  elevation: ElevationCorne
  rh: number
  rb: number
}) {
  const { uPeau, u1, H, y0, elevation, rh, rb } = opts
  const uFinHaut = Math.max(uPeau + 1e-9, u1 - Math.max(rh, 0))
  const uFinBas = Math.max(uPeau + 1e-9, u1 - Math.max(rb, 0))
  const epaisseur = Math.max(0, Math.min(elevation.epaisseurBout, H - y0 - 0.1))
  // Un arc tangent au dessus descend au plus de son propre débord ; la marge garde une pente finie au bout.
  const chuteMax = MARGE_ARC * (uFinHaut - uPeau)
  const plongeeMin = Math.max(0, H - y0 - epaisseur - chuteMax)
  const plongeeMax = Math.max(0, H - y0 - epaisseur - 0.1)
  const plongee = Math.min(Math.max(elevation.plongee, plongeeMin), plongeeMax)
  const yTipBas = y0 + plongee
  const yTipHaut = yTipBas + epaisseur
  const chute = H - yTipHaut
  const arc = (du: number, dy: number) =>
    Math.abs(dy) > 1e-9 ? (du * du + dy * dy) / (2 * Math.abs(dy)) : Number.POSITIVE_INFINITY
  const duHaut = uFinHaut - uPeau
  const duBas = uFinBas - uPeau
  const RHaut = arc(duHaut, chute)
  const RBas = arc(duBas, yTipBas - y0)
  const yHautPlan = (u: number) => {
    if (!(RHaut < 1e12) || chute <= 0 || u <= uPeau) return H
    const d = Math.min(u, uFinHaut) - uPeau
    if (d <= 0) return H
    if (d >= RHaut) return yTipHaut
    return H - (RHaut - Math.sqrt(RHaut * RHaut - d * d))
  }
  const yBasPlan = (u: number) => {
    if (!(RBas < 1e12) || u <= uPeau) return y0
    const d = Math.min(u, uFinBas) - uPeau
    if (d <= 0) return y0
    if (d >= RBas) return yTipBas
    return y0 + RBas - Math.sqrt(RBas * RBas - d * d)
  }
  return {
    plongee,
    chute,
    epaisseur,
    yTipHaut,
    yTipBas,
    RHaut,
    RBas,
    R: RBas,
    uPeau,
    uFinHaut,
    uFinBas,
    yHautPlan,
    yBasPlan,
  }
}

/**
 * Faces d'une corne : profil en plan (flanc droit et congé de racine) et profil en élévation
 * (congés de bout). Chaque face est bornée sur ses courbes exactes.
 */
export function pansDeCorne(
  face: Boite,
  conges: { haut: number; bas: number },
  plan: PlanCorne | undefined,
  fleche = FLECHE,
  rayonPeau = 0,
): Pan[] {
  const tau = Math.sign(face.xmin + face.xmax) || 1
  const sigma = Math.sign(face.zmin + face.zmax) || 1
  const a0 = Math.min(Math.abs(face.xmin), Math.abs(face.xmax))
  const u0 = Math.min(Math.abs(face.zmin), Math.abs(face.zmax))
  const u1 = Math.max(Math.abs(face.zmin), Math.abs(face.zmax))
  const y0 = face.ymin
  const H = face.ymax
  const yTipBasProv = face.elevation ? face.ymin + Math.max(0, face.elevation.plongee) : face.ymin
  const yTipHautProv = face.elevation
    ? yTipBasProv + Math.max(0, Math.min(face.elevation.epaisseurBout, face.ymax - yTipBasProv))
    : face.ymax
  const rh = Math.min(conges.haut, (yTipHautProv - yTipBasProv) / 2, u1 - u0)
  const rb = Math.min(conges.bas, (yTipHautProv - yTipBasProv) / 2, u1 - u0)
  const elev =
    face.elevation && rayonPeau > 0
      ? geometrieElevation({
          uPeau: rayonPeau,
          u1,
          H,
          y0,
          elevation: face.elevation,
          rh,
          rb,
        })
      : undefined
  const monde = (a: number, y: number, u: number): Point => [tau * a, y, sigma * u]

  const geo =
    plan && rayonPeau > 0
      ? geometriePlan({ a0, u1, plan, rayonPeau })
      : undefined

  const racine = (r: number, v: number) => Math.sqrt(Math.max(0, r * r - v * v))
  const uDepart = (a: number) => Math.max(u0, racine(rayonPeau, a))

  /** Débord max au plan pour la largeur `a` : flanc, puis congé de racine. */
  const uPlan = (a: number) => {
    if (!geo) return u1
    if (a <= geo.aBout + 1e-9) return u1
    if (a <= geo.Qt[0] + 1e-9) {
      const t = (a - geo.Ptip[0]) / (geo.Qt[0] - geo.Ptip[0] || 1)
      return geo.Ptip[1] + t * (geo.Qt[1] - geo.Ptip[1])
    }
    if (a > Math.max(geo.Qt[0], geo.peau[0]) + 1e-6) return uDepart(a)
    const dx = a - geo.C[0]
    const reste = geo.Rr * geo.Rr - dx * dx
    if (reste < 0) return uDepart(a)
    const uSur = geo.C[1] - Math.sqrt(reste)
    return Math.max(uDepart(a), uSur)
  }

  /** Largeur max au débord `u` : flanc ou congé. */
  const aPlan = (u: number) => {
    if (!geo) return Math.max(Math.abs(face.xmin), Math.abs(face.xmax))
    if (u >= geo.Qt[1] - 1e-9) {
      const t = (geo.Ptip[1] - u) / (geo.Ptip[1] - geo.Qt[1] || 1)
      return geo.Ptip[0] + t * (geo.Qt[0] - geo.Ptip[0])
    }
    const du = u - geo.C[1]
    const reste = geo.Rr * geo.Rr - du * du
    if (reste < 0) return geo.Qt[0]
    return geo.C[0] - Math.sqrt(reste)
  }

  const yHautPlan = (u: number) => (elev ? elev.yHautPlan(u) : H)
  const yBasPlan = (u: number) => (elev ? elev.yBasPlan(u) : y0)
  const yHaut = (u: number) => {
    if (rh > 0 && u > u1 - rh) {
      const cy = yHautPlan(u1) - rh
      return cy + racine(rh, u - (u1 - rh))
    }
    return yHautPlan(u)
  }
  const yBas = (u: number) => {
    if (rb > 0 && u > u1 - rb) {
      const cy = yBasPlan(u1) + rb
      return cy - racine(rb, u - (u1 - rb))
    }
    return yBasPlan(u)
  }
  const uElevation = (y: number) => {
    if (rh > 0 && y > yHautPlan(u1) - rh) return u1 - rh + racine(rh, y - (yHautPlan(u1) - rh))
    if (rb > 0 && y < yBasPlan(u1) + rb) return u1 - rb + racine(rb, yBasPlan(u1) + rb - y)
    return u1
  }

  const pansHaut = pansArc(rh, Math.PI / 2, fleche)
  const pansBas = pansArc(rb, Math.PI / 2, fleche)
  const pans: Pan[] = []
  const planNormale = (normale: Point): Pan['normale'] => {
    const sens: Point = [tau * normale[0], normale[1], sigma * normale[2]]
    return () => sens
  }

  const congesBout = [
    { rayon: rh, centreY: yHautPlan(u1) - rh, debut: 0, pans: pansHaut },
    { rayon: rb, centreY: yBasPlan(u1) + rb, debut: Math.PI / 2, pans: pansBas },
  ].filter((conge) => conge.rayon > 0)
  const pointDe = (conge: (typeof congesBout)[number], phi: number) => ({
    y: conge.centreY + conge.rayon * Math.cos(phi),
    u: u1 - conge.rayon + conge.rayon * Math.sin(phi),
  })
  const angles = congesBout.map((conge) =>
    echantillons(conge.debut, conge.debut + Math.PI / 2, conge.pans),
  )

  // Arc de racine, de sa tangence au flanc jusqu'à la peau : le dessus, le dessous et le pan de racine le partagent.
  let phisRacine: number[] = []
  if (geo) {
    let dAngle = geo.anglePeau - geo.angleQt
    while (dAngle > Math.PI) dAngle -= 2 * Math.PI
    while (dAngle < -Math.PI) dAngle += 2 * Math.PI
    phisRacine = echantillons(0, 1, pansArc(geo.Rr, Math.abs(dAngle), fleche)).map((t) => geo.angleQt + t * dAngle)
  }
  const aMax = geo ? geo.peau[0] : Math.max(Math.abs(face.xmin), Math.abs(face.xmax))
  const cassuresA = geo
    ? [
        geo.aBout,
        aPlan(u1 - rh),
        aPlan(u1 - rb),
        ...phisRacine.map((phi) => geo.C[0] + geo.Rr * Math.cos(phi)),
      ]
    : []
  const largeurs = echantillons(a0, aMax, 6, cassuresA)

  // Dessus : arc le long de u, colonnes selon u pour suivre la courbure.
  {
    const uMin = Math.min(...largeurs.map((a) => uDepart(a)))
    const usHaut = echantillons(
      uMin,
      u1 - rh,
      Math.max(6, pansArc(elev?.RHaut && elev.RHaut < 1e12 ? elev.RHaut : 20, Math.PI / 4, fleche)),
      [],
    )
    const aAu = (u: number) => {
      const surPeau = rayonPeau > u ? racine(rayonPeau, u) : 0
      return Math.max(a0, surPeau)
    }
    const colonnes = usHaut.map((u): [Point, Point] => {
      const aDeb = aAu(u)
      const aFin = Math.max(aDeb, Math.min(aPlan(u), aMax))
      return [monde(aDeb, yHautPlan(u), u), monde(aFin, yHautPlan(u), u)]
    })
    if (colonnes.length > 1) {
      pans.push({
        colonnes,
        normale: (point) => {
          const u = Math.abs(point[2])
          if (!elev || !(elev.RHaut < 1e12) || u <= elev.uPeau) return [0, 1, 0]
          const d = Math.min(u, elev.uFinHaut) - elev.uPeau
          const reste = elev.RHaut * elev.RHaut - d * d
          const deriv = reste > 1e-12 ? -d / Math.sqrt(reste) : 0
          const longueurN = Math.hypot(1, deriv) || 1
          return [0, 1 / longueurN, sigma * (-deriv / longueurN)]
        },
      })
    }
  }

  // Dessous : arc le long de u, colonnes selon u pour suivre la courbure.
  {
    const uMin = Math.min(...largeurs.map((a) => uDepart(a)))
    const usBas = echantillons(
      uMin,
      u1 - rb,
      Math.max(6, pansArc(elev?.RBas && elev.RBas < 1e12 ? elev.RBas : 20, Math.PI / 4, fleche)),
      [],
    )
    const aAu = (u: number) => {
      const surPeau = rayonPeau > u ? racine(rayonPeau, u) : 0
      return Math.max(a0, surPeau)
    }
    const colonnes = usBas.map((u): [Point, Point] => {
      const aDeb = aAu(u)
      const aFin = Math.max(aDeb, Math.min(aPlan(u), aMax))
      return [monde(aDeb, yBasPlan(u), u), monde(aFin, yBasPlan(u), u)]
    })
    if (colonnes.length > 1) {
      pans.push({
        colonnes,
        normale: (point) => {
          const u = Math.abs(point[2])
          if (!elev || !(elev.RBas < 1e12) || u <= elev.uPeau) return [0, -1, 0]
          const d = Math.min(u, elev.uFinBas) - elev.uPeau
          const reste = elev.RBas * elev.RBas - d * d
          const deriv = reste > 1e-12 ? d / Math.sqrt(reste) : 0
          const longueurN = Math.hypot(1, deriv) || 1
          return [0, -1 / longueurN, sigma * (deriv / longueurN)]
        },
      })
    }
  }

  const hauteurs = congesBout.flatMap((conge, rang) => angles[rang].map((phi) => pointDe(conge, phi).y))
  {
    const depart = uDepart(a0)
    const usInterieur = echantillons(
      depart,
      Math.min(uPlan(a0), u1),
      6,
      [
        ...hauteurs.map((y) => uElevation(y)),
        u1 - rh,
        u1 - rb,
      ],
    )
    const colonnes = usInterieur.map((u): [Point, Point] => [
      monde(a0, yBas(u), u),
      monde(a0, yHaut(u), u),
    ])
    pans.push({ colonnes, normale: planNormale([-1, 0, 0]) })
  }

  if (geo) {
    const usCongés = congesBout.flatMap((conge, rang) => angles[rang].map((phi) => pointDe(conge, phi).u))
    const usFlanc = echantillons(geo.Qt[1], u1, 6, usCongés)
    const colonnesFlanc = usFlanc.map((u): [Point, Point] => {
      const a = aPlan(u)
      return [monde(a, yBas(u), u), monde(a, yHaut(u), u)]
    })
    pans.push({
      colonnes: colonnesFlanc,
      normale: () => [tau * geo.N[0], 0, sigma * geo.N[1]],
      lisses: { debut: true },
    })

    const colonnesRacine = phisRacine.map((phi): [Point, Point] => {
      const a = geo.C[0] + geo.Rr * Math.cos(phi)
      const u = geo.C[1] + geo.Rr * Math.sin(phi)
      return [monde(a, yBas(u), u), monde(a, yHaut(u), u)]
    })
    pans.push({
      colonnes: colonnesRacine,
      normale: (point) => {
        const dx = point[0] - tau * geo.C[0]
        const dz = point[2] - sigma * geo.C[1]
        const longueurN = Math.hypot(dx, dz) || 1
        return [-dx / longueurN, 0, -dz / longueurN]
      },
      lisses: { debut: true, fin: true },
    })
  }

  const aBout = geo?.aBout ?? Math.max(Math.abs(face.xmin), Math.abs(face.xmax))
  const yBoutBas = yBasPlan(u1) + rb
  const yBoutHaut = yHautPlan(u1) - rh
  if (aBout > a0 + 1e-9 && yBoutHaut > yBoutBas + 1e-9) {
    pans.push({
      colonnes: [
        [monde(a0, yBoutBas, u1), monde(a0, yBoutHaut, u1)],
        [monde(aBout, yBoutBas, u1), monde(aBout, yBoutHaut, u1)],
      ],
      normale: planNormale([0, 0, 1]),
    })
  }

  congesBout.forEach((conge, rang) => {
    const colonnes = angles[rang].map((phi): [Point, Point] => {
      const { y, u } = pointDe(conge, phi)
      return [monde(a0, y, u), monde(Math.max(a0, aPlan(u)), y, u)]
    })
    const centreZ = sigma * (u1 - conge.rayon)
    pans.push({
      colonnes,
      normale: (point) => [0, (point[1] - conge.centreY) / conge.rayon, (point[2] - centreZ) / conge.rayon],
    })
  })
  return pans
}

/** Triangles d'un pan, dans le sens de sa normale. */
export function maillerPan(pan: Pan) {
  const positions: number[] = []
  const indices: number[] = []
  const triangle = (p: Point, q: Point, r: Point) => {
    const u = [q[0] - p[0], q[1] - p[1], q[2] - p[2]]
    const v = [r[0] - p[0], r[1] - p[1], r[2] - p[2]]
    const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
    if (Math.hypot(n[0], n[1], n[2]) < 1e-12) return
    const centre: Point = [(p[0] + q[0] + r[0]) / 3, (p[1] + q[1] + r[1]) / 3, (p[2] + q[2] + r[2]) / 3]
    const attendue = pan.normale(centre)
    const rang = positions.length / 3
    if (n[0] * attendue[0] + n[1] * attendue[1] + n[2] * attendue[2] >= 0) positions.push(...p, ...q, ...r)
    else positions.push(...p, ...r, ...q)
    indices.push(rang, rang + 1, rang + 2)
  }
  for (let i = 0; i < pan.colonnes.length - 1; i++) {
    const [pied, tete] = pan.colonnes[i]
    const [piedSuivant, teteSuivante] = pan.colonnes[i + 1]
    triangle(pied, tete, teteSuivante)
    triangle(pied, teteSuivante, piedSuivant)
  }
  return { positions, indices }
}

/** Contour d'un pan : première et dernière colonne hors colonnes lisses, chaîne des pieds, chaîne des têtes. */
export function contourPan(pan: Pan): [Point, Point][] {
  const segments: [Point, Point][] = []
  const { colonnes } = pan
  if (colonnes.length === 0) return segments
  if (!pan.lisses?.debut) segments.push(colonnes[0])
  if (!pan.lisses?.fin) segments.push(colonnes[colonnes.length - 1])
  for (let i = 0; i < colonnes.length - 1; i++) {
    segments.push([colonnes[i][0], colonnes[i + 1][0]], [colonnes[i][1], colonnes[i + 1][1]])
  }
  return segments.filter(
    ([p, q]) => Math.hypot(q[0] - p[0], q[1] - p[1], q[2] - p[2]) > 1e-9,
  )
}
