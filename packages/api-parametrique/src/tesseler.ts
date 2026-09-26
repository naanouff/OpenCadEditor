import type { FaceExacte, MaillageOmbre } from './types.ts'

/** Flèche d'affichage : écart maximal entre la corde et la surface, en millimètres. */
export const FLECHE = 0.02

/** Garde-fou : une face ne dépasse pas ce nombre de pans. */
const PANS_MAX = 360

/** Nombre de pans d'un tour complet pour tenir la flèche sur ce rayon. */
export function pasFleche(rayon: number, fleche = FLECHE) {
  if (rayon <= 0) return 3
  const rapport = Math.min(0.999999, fleche / rayon)
  const pans = Math.ceil(Math.PI / Math.acos(1 - rapport))
  return Math.min(PANS_MAX, Math.max(3, pans))
}

type Point = [number, number, number]

function assembler() {
  const positions: number[] = []
  const normales: number[] = []
  const indices: number[] = []
  const poser = (point: Point, normale: Point) => {
    const rang = positions.length / 3
    positions.push(point[0], point[1], point[2])
    normales.push(normale[0], normale[1], normale[2])
    return rang
  }
  const triangle = (a: number, b: number, c: number) => indices.push(a, b, c)
  return { positions, normales, indices, poser, triangle }
}

/** Tessellise chaque face sur sa propre surface. Les sommets ne sont pas partagés entre faces. */
export function tesseler(faces: FaceExacte[], fleche = FLECHE): MaillageOmbre {
  const piece = assembler()
  for (const face of faces) {
    if (face.sorte === 'cylindre') paroi(piece, face, fleche)
    if (face.sorte === 'couronne') couronne(piece, face, fleche)
    if (face.sorte === 'traverse') traverse(piece, face, fleche)
    if (face.sorte === 'conge') conge(piece, face, fleche)
    if (face.sorte === 'racine') racine(piece, face, fleche)
  }
  return { positions: piece.positions, normales: piece.normales, indices: piece.indices }
}

/** Normale exacte de la surface en ce point, hors de la matière. */
export function normaleDe(face: FaceExacte, point: Point): Point {
  if (face.sorte === 'couronne') return [0, face.dehors, 0]
  if (face.sorte === 'cylindre') {
    const rayon = Math.hypot(point[0], point[2]) || 1
    return [(point[0] / rayon) * face.dehors, 0, (point[2] / rayon) * face.dehors]
  }
  if (face.sorte === 'racine') {
    const dx = point[0] - face.x
    const dz = point[2] - face.z
    const rayon = Math.hypot(dx, dz) || 1
    return [(dx / rayon) * face.dehors, 0, (dz / rayon) * face.dehors]
  }
  if (face.sorte === 'traverse' || face.sorte === 'conge') {
    const ecart = Math.hypot(point[1] - face.y, point[2] - face.z) || 1
    return [0, ((point[1] - face.y) / ecart) * face.dehors, ((point[2] - face.z) / ecart) * face.dehors]
  }
  return [0, 0, 0]
}

type Piece = ReturnType<typeof assembler>

function bande(piece: Piece, coins: [Point, Point, Point, Point], normales: [Point, Point, Point, Point]) {
  const rangs = coins.map((coin, index) => piece.poser(coin, normales[index]))
  piece.triangle(rangs[0], rangs[1], rangs[2])
  piece.triangle(rangs[0], rangs[2], rangs[3])
}

function paroi(piece: Piece, face: Extract<FaceExacte, { sorte: 'cylindre' }>, fleche: number) {
  const pansTour = pasFleche(face.rayon, fleche)
  const debut = face.angleDeb ?? 0
  const fin = face.angleFin ?? Math.PI * 2
  const span = fin - debut
  const pans = Math.max(1, Math.ceil((pansTour * Math.abs(span)) / (Math.PI * 2)))
  const point = (angle: number, y: number): Point => [Math.cos(angle) * face.rayon, y, Math.sin(angle) * face.rayon]
  const normale = (angle: number): Point => [Math.cos(angle) * face.dehors, 0, Math.sin(angle) * face.dehors]
  for (let i = 0; i < pans; i++) {
    const angle = debut + (i / pans) * span
    const suivant = debut + ((i + 1) / pans) * span
    const coins: [Point, Point, Point, Point] = [
      point(angle, face.bas),
      point(angle, face.haut),
      point(suivant, face.haut),
      point(suivant, face.bas),
    ]
    const sens: [Point, Point, Point, Point] = [normale(angle), normale(angle), normale(suivant), normale(suivant)]
    if (face.dehors > 0) bande(piece, coins, sens)
    else bande(piece, [coins[3], coins[2], coins[1], coins[0]], [sens[3], sens[2], sens[1], sens[0]])
  }
}

function couronne(piece: Piece, face: Extract<FaceExacte, { sorte: 'couronne' }>, fleche: number) {
  const pans = pasFleche(face.rayonExt, fleche)
  const normale: Point = [0, face.dehors, 0]
  const point = (rayon: number, angle: number): Point => [Math.cos(angle) * rayon, face.y, Math.sin(angle) * rayon]
  for (let i = 0; i < pans; i++) {
    const angle = (i / pans) * Math.PI * 2
    const suivant = ((i + 1) / pans) * Math.PI * 2
    const coins: [Point, Point, Point, Point] = [
      point(face.rayonInt, angle),
      point(face.rayonInt, suivant),
      point(face.rayonExt, suivant),
      point(face.rayonExt, angle),
    ]
    const sens: [Point, Point, Point, Point] = [normale, normale, normale, normale]
    if (face.dehors > 0) bande(piece, coins, sens)
    else bande(piece, [coins[3], coins[2], coins[1], coins[0]], sens)
  }
}

/** Paroi d'une traverse d'axe X : le tube ou la paroi d'un perçage. */
function traverse(piece: Piece, face: Extract<FaceExacte, { sorte: 'traverse' }>, fleche: number) {
  const pans = pasFleche(face.rayon, fleche)
  const point = (angle: number, x: number): Point => [
    x,
    face.y + Math.cos(angle) * face.rayon,
    face.z + Math.sin(angle) * face.rayon,
  ]
  const normale = (angle: number): Point => [0, Math.cos(angle) * face.dehors, Math.sin(angle) * face.dehors]
  for (let i = 0; i < pans; i++) {
    const angle = (i / pans) * Math.PI * 2
    const suivant = ((i + 1) / pans) * Math.PI * 2
    const coins: [Point, Point, Point, Point] = [
      point(angle, face.debut),
      point(angle, face.fin),
      point(suivant, face.fin),
      point(suivant, face.debut),
    ]
    const sens: [Point, Point, Point, Point] = [normale(angle), normale(angle), normale(suivant), normale(suivant)]
    // L'ordre (debut, fin, suivant) donne une normale géométrique vers l'axe : on inverse pour le dehors.
    if (face.dehors > 0) bande(piece, [coins[3], coins[2], coins[1], coins[0]], [sens[3], sens[2], sens[1], sens[0]])
    else bande(piece, coins, sens)
  }
}

/** Tronçon de congé de bout : cylindre d’axe X, angles dans le plan YZ. */
function conge(piece: Piece, face: Extract<FaceExacte, { sorte: 'conge' }>, fleche: number) {
  const pansTour = pasFleche(face.rayon, fleche)
  const span = face.angleFin - face.angleDeb
  const pans = Math.max(1, Math.ceil((pansTour * Math.abs(span)) / (Math.PI * 2)))
  const point = (angle: number, x: number): Point => [
    x,
    face.y + Math.cos(angle) * face.rayon,
    face.z + Math.sin(angle) * face.rayon,
  ]
  const normale = (angle: number): Point => [
    0,
    Math.cos(angle) * face.dehors,
    Math.sin(angle) * face.dehors,
  ]
  for (let i = 0; i < pans; i++) {
    const angle = face.angleDeb + (i / pans) * span
    const suivant = face.angleDeb + ((i + 1) / pans) * span
    const coins: [Point, Point, Point, Point] = [
      point(angle, face.debut),
      point(angle, face.fin),
      point(suivant, face.fin),
      point(suivant, face.debut),
    ]
    const sens: [Point, Point, Point, Point] = [normale(angle), normale(angle), normale(suivant), normale(suivant)]
    if (face.dehors > 0) bande(piece, [coins[3], coins[2], coins[1], coins[0]], [sens[3], sens[2], sens[1], sens[0]])
    else bande(piece, coins, sens)
  }
}

/** Congé creux à la racine : cylindre d'axe Y décentré. */
function racine(piece: Piece, face: Extract<FaceExacte, { sorte: 'racine' }>, fleche: number) {
  const pansTour = pasFleche(face.rayon, fleche)
  const span = face.angleFin - face.angleDeb
  const pans = Math.max(1, Math.ceil((pansTour * Math.abs(span)) / (Math.PI * 2)))
  const point = (angle: number, y: number): Point => [
    face.x + Math.cos(angle) * face.rayon,
    y,
    face.z + Math.sin(angle) * face.rayon,
  ]
  const normale = (angle: number): Point => [Math.cos(angle) * face.dehors, 0, Math.sin(angle) * face.dehors]
  for (let i = 0; i < pans; i++) {
    const angle = face.angleDeb + (i / pans) * span
    const suivant = face.angleDeb + ((i + 1) / pans) * span
    const coins: [Point, Point, Point, Point] = [
      point(angle, face.bas),
      point(angle, face.haut),
      point(suivant, face.haut),
      point(suivant, face.bas),
    ]
    const sens: [Point, Point, Point, Point] = [normale(angle), normale(angle), normale(suivant), normale(suivant)]
    if (face.dehors > 0) bande(piece, coins, sens)
    else bande(piece, [coins[3], coins[2], coins[1], coins[0]], [sens[3], sens[2], sens[1], sens[0]])
  }
}
