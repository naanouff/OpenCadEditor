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
  const milieu = (face.ymin + face.ymax) / 2
  return {
    haut: lies.find((conge) => conge.y > milieu)?.rayon ?? 0,
    bas: lies.find((conge) => conge.y <= milieu)?.rayon ?? 0,
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
  const rh = Math.min(conges.haut, (H - y0) / 2, u1 - u0)
  const rb = Math.min(conges.bas, (H - y0) / 2, u1 - u0)
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

  const yHaut = (u: number) => (rh > 0 && u > u1 - rh ? H - rh + racine(rh, u - (u1 - rh)) : H)
  const yBas = (u: number) => (rb > 0 && u > u1 - rb ? y0 + rb - racine(rb, u - (u1 - rb)) : y0)
  const uElevation = (y: number) => {
    if (rh > 0 && y > H - rh) return u1 - rh + racine(rh, y - (H - rh))
    if (rb > 0 && y < y0 + rb) return u1 - rb + racine(rb, y0 + rb - y)
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
    { rayon: rh, centreY: H - rh, debut: 0, pans: pansHaut },
    { rayon: rb, centreY: y0 + rb, debut: Math.PI / 2, pans: pansBas },
  ].filter((conge) => conge.rayon > 0)
  const angleDe = (conge: (typeof congesBout)[number], u: number) => {
    const sinus = Math.min(1, Math.max(0, (u - (u1 - conge.rayon)) / conge.rayon))
    return conge.debut === 0 ? Math.asin(sinus) : Math.PI - Math.asin(sinus)
  }
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

  for (const [y, limite, sens] of [
    [H, u1 - rh, 1],
    [y0, u1 - rb, -1],
  ] as const) {
    // La dernière colonne se réduit au point où la racine touche la peau : elle ferme la bande.
    const colonnes = largeurs.map((a): [Point, Point] => {
      const depart = uDepart(a)
      return [monde(a, y, depart), monde(a, y, Math.max(depart, Math.min(uPlan(a), limite)))]
    })
    if (colonnes.length > 1) pans.push({ colonnes, normale: planNormale([0, sens, 0]) })
  }

  const hauteurs = congesBout.flatMap((conge, rang) => angles[rang].map((phi) => pointDe(conge, phi).y))
  {
    const depart = uDepart(a0)
    const colonnes = echantillons(y0, H, 1, hauteurs).map((y): [Point, Point] => [
      monde(a0, y, depart),
      monde(a0, y, Math.max(depart, Math.min(uElevation(y), uPlan(a0)))),
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
  if (aBout > a0 + 1e-9 && H - rh > y0 + rb + 1e-9) {
    pans.push({
      colonnes: [
        [monde(a0, y0 + rb, u1), monde(a0, H - rh, u1)],
        [monde(aBout, y0 + rb, u1), monde(aBout, H - rh, u1)],
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
