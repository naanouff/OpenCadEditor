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

/** Stations de l'arche du dessus, de l'amorce jusqu'au congé de bout. */
function stationsDessus(
  elev: { uOrigine: number; uFinHaut: number; chute: number },
  fleche: number,
) {
  const demi = elev.uFinHaut - elev.uOrigine
  if (demi <= 1e-9) return [elev.uOrigine]
  const nombre = Math.max(12, pansArc(Math.hypot(demi, Math.abs(elev.chute)), Math.PI, fleche))
  return Array.from({ length: nombre + 1 }, (_, rang) => elev.uOrigine + (demi * rang) / nombre)
}

/** Débords sur le cylindre, du flanc jusqu'au coin d'entrecorne, à la flèche d'affichage. */
function debordsSurPeau(rayon: number, uDebut: number, uFin: number, fleche: number) {
  const bas = Math.max(0, Math.min(uDebut, uFin))
  const haut = Math.min(Math.max(rayon - 1e-6, 0), Math.max(uDebut, uFin))
  if (!(rayon > 0) || haut - bas <= 1e-9) return []
  const angle = Math.abs(Math.asin(Math.min(1, haut / rayon)) - Math.asin(Math.min(1, bas / rayon)))
  const nombre = Math.max(2, pansArc(rayon, Math.max(angle, 1e-4), fleche))
  return Array.from({ length: nombre + 1 }, (_, rang) => bas + ((haut - bas) * rang) / nombre)
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

/**
 * Profil d’élévation Oyster : le bout de corne plonge vers le bracelet.
 * `plongee` est la hauteur du bas du bout au-dessus du fond, `epaisseurBout` son épaisseur.
 * La chute du dessus en découle : `hauteur - plongee - epaisseurBout`.
 */
export type ElevationCorne = {
  plongee: number
  epaisseurBout: number
  /** La courbe du dessus commence autant avant la peau, sur la boîte. */
  amorce?: number
}

/**
 * Géométrie du profil en élévation le long du débord : dessus et dessous en arches,
 * tangentes à l'horizontale à la peau et au bout. L'arche descend autant qu'on veut
 * sur son débord, là où un cercle tangent à l'horizontale plafonne à son propre rayon,
 * et elle arrive à plat : le bout reste une lame, sans mur vertical.
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
  const plongee = Math.min(Math.max(elevation.plongee, 0), H - y0 - epaisseur - 0.1)
  const yTipBas = y0 + plongee
  const yTipHaut = yTipBas + epaisseur
  const chute = H - yTipHaut
  const amorce = Math.max(0, elevation.amorce ?? 0)
  const uOrigine = Math.max(0, uPeau - amorce)
  const demiHaut = uFinHaut - uOrigine
  const demiBas = uFinBas - uOrigine
  const uBas = amorce > 0 ? uPeau : uOrigine
  const porteeBas = amorce > 0 ? Math.min(Math.max(uFinBas - uPeau, 1e-6), 1.6) : demiBas
  /** Arche (1 + cos πt) / 2 : 1 à la peau, 0 au bout, tangente horizontale aux deux bouts. */
  const arche = (d: number, demi: number) => {
    const t = Math.min(Math.max(d, 0), demi) / demi
    return (1 + Math.cos(Math.PI * t)) / 2
  }
  /** Dérivée de l'arche : nulle à la peau et au bout, maximale à mi-débord. */
  const pente = (d: number, demi: number) => {
    const t = Math.min(Math.max(d, 0), demi) / demi
    if (t <= 0 || t >= 1) return 0
    return (-Math.PI / (2 * demi)) * Math.sin(Math.PI * t)
  }
  const yHautPlan = (u: number) => (chute <= 0 ? H : yTipHaut + chute * arche(u - uOrigine, demiHaut))
  const yBasPlan = (u: number) => (plongee <= 0 ? y0 : yTipBas - plongee * arche(u - uBas, porteeBas))
  const penteHaut = (u: number) => (chute <= 0 ? 0 : chute * pente(u - uOrigine, demiHaut))
  const penteBas = (u: number) => (plongee <= 0 ? 0 : -plongee * pente(u - uBas, porteeBas))
  return {
    plongee,
    chute,
    epaisseur,
    amorce,
    yTipHaut,
    yTipBas,
    uOrigine,
    uPeau,
    uFinHaut,
    uFinBas,
    demiHaut,
    demiBas,
    yHautPlan,
    yBasPlan,
    penteHaut,
    penteBas,
  }
}

/**
 * Rayons de congé de bout tenables pour cette boîte : le congé ne dépasse pas la demi-épaisseur
 * du bout ni le débord. Les pans et les volumes de rognage partagent ce calcul, donc la même ellipse.
 */
export function rayonsDeBout(face: Boite, conges: { haut: number; bas: number }) {
  const u0 = Math.min(Math.abs(face.zmin), Math.abs(face.zmax))
  const u1 = Math.max(Math.abs(face.zmin), Math.abs(face.zmax))
  const bas = face.elevation ? face.ymin + Math.max(0, face.elevation.plongee) : face.ymin
  const haut = face.elevation
    ? bas + Math.max(0, Math.min(face.elevation.epaisseurBout, face.ymax - bas))
    : face.ymax
  const demi = (haut - bas) / 2
  return {
    rh: Math.min(conges.haut, demi, u1 - u0),
    rb: Math.min(conges.bas, demi, u1 - u0),
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
  const { rh, rb } = rayonsDeBout(face, conges)
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
  /** Débords du dessous : l'arche part de la peau. */
  const parArche = (demi: number, ampleur: number) => {
    if (demi <= 0) return []
    const nombre = Math.max(12, pansArc(Math.hypot(demi, ampleur), Math.PI, fleche))
    return Array.from({ length: nombre + 1 }, (_, rang) => rayonPeau + (demi * rang) / nombre)
  }
  const aAu = (u: number) => {
    const surPeau = rayonPeau > u ? racine(rayonPeau, u) : 0
    return Math.max(a0, surPeau)
  }
  const uLocal = (point: Point) => sigma * point[2]

  const colonnesFlanc: [Point, Point][] = []
  const colonnesRacine: [Point, Point][] = []
  if (geo) {
    const usCongés = congesBout.flatMap((conge, rang) => angles[rang].map((phi) => pointDe(conge, phi).u))
    const uCoin = rayonPeau > a0 ? Math.sqrt(Math.max(0, rayonPeau * rayonPeau - a0 * a0)) : geo.Qt[1]
    const archeHaut = elev ? stationsDessus(elev, fleche) : []
    const archeBas = elev ? parArche(elev.demiBas, elev.plongee) : []
    const jonction = debordsSurPeau(rayonPeau, geo.Qt[1], uCoin, fleche)
    const usFlanc = echantillons(geo.Qt[1], u1, elev ? 1 : 6, [
      ...usCongés,
      ...archeHaut,
      ...archeBas,
      ...jonction,
      uCoin,
      u1 - rh,
      u1 - rb,
    ])
    for (const u of usFlanc) {
      const a = aPlan(u)
      colonnesFlanc.push([monde(a, yBas(u), u), monde(a, yHaut(u), u)])
    }
    for (const phi of phisRacine) {
      const a = geo.C[0] + geo.Rr * Math.cos(phi)
      const u = geo.C[1] + geo.Rr * Math.sin(phi)
      colonnesRacine.push([monde(a, yBas(u), u), monde(a, yHaut(u), u)])
    }
  }

  const trier = (points: Point[]) => {
    const tries = [...points].sort((a, b) => uLocal(a) - uLocal(b))
    return tries.filter(
      (point, rang) =>
        rang === 0 ||
        Math.hypot(point[0] - tries[rang - 1][0], point[1] - tries[rang - 1][1], point[2] - tries[rang - 1][2]) > 1e-6,
    )
  }
  const bande = (exterieurs: Point[], normale: Pan['normale']) => {
    const colonnes = exterieurs.map((bord): [Point, Point] => {
      const u = uLocal(bord)
      return [monde(Math.min(aAu(u), tau * bord[0]), bord[1], u), bord]
    })
    if (colonnes.length > 1) pans.push({ colonnes, normale })
  }

  const bordsHaut = trier(
    [...colonnesRacine.map(([, haut]) => haut), ...colonnesFlanc.map(([, haut]) => haut)].filter(
      (point) => uLocal(point) <= u1 - rh + 1e-6,
    ),
  )
  const bordsBas = trier(
    [...colonnesRacine.map(([pied]) => pied), ...colonnesFlanc.map(([pied]) => pied)].filter(
      (point) => uLocal(point) <= u1 - rb + 1e-6,
    ),
  )
  if (!geo) {
    const largeur = Math.max(Math.abs(face.xmin), Math.abs(face.xmax))
    const poser = (fin: number, yDe: (u: number) => number, normale: Pan['normale']) => {
      const colonnes = echantillons(uDepart(a0), fin, 4).map(
        (u): [Point, Point] => [monde(aAu(u), yDe(u), u), monde(largeur, yDe(u), u)],
      )
      if (colonnes.length > 1) pans.push({ colonnes, normale })
    }
    poser(u1 - rh, yHautPlan, () => [0, 1, 0])
    poser(u1 - rb, yBasPlan, () => [0, -1, 0])
  }
  if (bordsHaut.length > 1) {
    bande(bordsHaut, (point) => {
      if (!elev) return [0, 1, 0]
      const deriv = elev.penteHaut(Math.abs(point[2]))
      const longueurN = Math.hypot(1, deriv) || 1
      return [0, 1 / longueurN, sigma * (-deriv / longueurN)]
    })
  }
  if (bordsBas.length > 1) {
    bande(bordsBas, (point) => {
      if (!elev) return [0, -1, 0]
      const deriv = elev.penteBas(Math.abs(point[2]))
      const longueurN = Math.hypot(1, deriv) || 1
      return [0, -1 / longueurN, sigma * (deriv / longueurN)]
    })
  }

  const hauteurs = congesBout.flatMap((conge, rang) => angles[rang].map((phi) => pointDe(conge, phi).y))
  {
    const depart = uDepart(a0)
    const fin = Math.min(uPlan(a0), u1)
    const usInterieur = echantillons(depart, fin, 0, [
      ...hauteurs.map((y) => uElevation(y)),
      u1 - rh,
      u1 - rb,
      ...[...bordsHaut, ...bordsBas].map((point) => uLocal(point)),
    ])
    const colonnes = usInterieur.map((u): [Point, Point] => [monde(a0, yBas(u), u), monde(a0, yHaut(u), u)])
    pans.push({ colonnes, normale: planNormale([-1, 0, 0]) })
  }

  if (geo) {
    pans.push({
      colonnes: colonnesFlanc,
      normale: () => [tau * geo.N[0], 0, sigma * geo.N[1]],
      lisses: { debut: true },
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
