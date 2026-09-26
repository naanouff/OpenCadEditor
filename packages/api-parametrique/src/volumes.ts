import type { FaceExacte, Maillage } from './types.ts'

/** Segments des cylindres d'opération. Le BSP coûte cher au-delà. */
export const SEGMENTS = 24

type Point = [number, number, number]

function assembler() {
  const positions: number[] = []
  const indices: number[] = []
  const poser = (point: Point) => {
    const rang = positions.length / 3
    positions.push(point[0], point[1], point[2])
    return rang
  }
  const triangle = (a: Point, b: Point, c: Point) => {
    indices.push(poser(a), poser(b), poser(c))
  }
  const quadrilatere = (a: Point, b: Point, c: Point, d: Point) => {
    triangle(a, b, c)
    triangle(a, c, d)
  }
  return { positions, indices, triangle, quadrilatere }
}

/** Boîte fermée, normales vers l'extérieur. */
export function boite(bornes: { xmin: number; xmax: number; ymin: number; ymax: number; zmin: number; zmax: number }): Maillage {
  const { xmin, xmax, ymin, ymax, zmin, zmax } = bornes
  const { positions, indices, quadrilatere } = assembler()
  quadrilatere([xmax, ymin, zmin], [xmax, ymax, zmin], [xmax, ymax, zmax], [xmax, ymin, zmax])
  quadrilatere([xmin, ymin, zmax], [xmin, ymax, zmax], [xmin, ymax, zmin], [xmin, ymin, zmin])
  quadrilatere([xmin, ymax, zmin], [xmin, ymax, zmax], [xmax, ymax, zmax], [xmax, ymax, zmin])
  quadrilatere([xmin, ymin, zmin], [xmax, ymin, zmin], [xmax, ymin, zmax], [xmin, ymin, zmax])
  quadrilatere([xmin, ymin, zmax], [xmax, ymin, zmax], [xmax, ymax, zmax], [xmin, ymax, zmax])
  quadrilatere([xmin, ymin, zmin], [xmin, ymax, zmin], [xmax, ymax, zmin], [xmax, ymin, zmin])
  return { positions, indices }
}

/**
 * Prisme fermé le long de x, décrit colonne par colonne : à chaque `z`, la matière va de `bas`
 * à `haut`. La section peut suivre n'importe quel profil, l'ellipse comprise.
 */
export function prisme(forme: {
  colonnes: { z: number; bas: number; haut: number }[]
  debut: number
  fin: number
}): Maillage {
  const { debut, fin } = forme
  const colonnes = [...forme.colonnes].sort((une, autre) => une.z - autre.z)
  const { positions, indices, quadrilatere } = assembler()
  if (colonnes.length < 2) return { positions, indices }
  for (let i = 0; i < colonnes.length - 1; i++) {
    const ici = colonnes[i]
    const la = colonnes[i + 1]
    quadrilatere([debut, ici.haut, ici.z], [debut, la.haut, la.z], [fin, la.haut, la.z], [fin, ici.haut, ici.z])
    quadrilatere([debut, ici.bas, ici.z], [fin, ici.bas, ici.z], [fin, la.bas, la.z], [debut, la.bas, la.z])
    quadrilatere([fin, ici.bas, ici.z], [fin, ici.haut, ici.z], [fin, la.haut, la.z], [fin, la.bas, la.z])
    quadrilatere([debut, la.bas, la.z], [debut, la.haut, la.z], [debut, ici.haut, ici.z], [debut, ici.bas, ici.z])
  }
  const premiere = colonnes[0]
  const derniere = colonnes[colonnes.length - 1]
  quadrilatere(
    [debut, premiere.bas, premiere.z],
    [debut, premiere.haut, premiere.z],
    [fin, premiere.haut, premiere.z],
    [fin, premiere.bas, premiere.z],
  )
  quadrilatere(
    [debut, derniere.bas, derniere.z],
    [fin, derniere.bas, derniere.z],
    [fin, derniere.haut, derniere.z],
    [debut, derniere.haut, derniere.z],
  )
  return { positions, indices }
}

/**
 * Cylindre fermé le long d'un axe. `a` et `b` sont les deux autres coordonnées du centre,
 * dans l'ordre du repère : axe x donne (y, z), axe y donne (x, z), axe z donne (x, y).
 */
export function cylindre(forme: {
  axe: 'x' | 'y' | 'z'
  rayon: number
  debut: number
  fin: number
  a: number
  b: number
  segments?: number
}): Maillage {
  const { axe, rayon, debut, fin, a, b } = forme
  const segments = forme.segments ?? SEGMENTS
  const piece = assembler()
  const { positions, indices } = piece
  // L'axe au milieu du triplet change la main du repère : l'ordre des sommets suit.
  const renverse = axe === 'y'
  const triangle = (p: Point, q: Point, r: Point) =>
    renverse ? piece.triangle(r, q, p) : piece.triangle(p, q, r)
  const quadrilatere = (p: Point, q: Point, r: Point, s: Point) =>
    renverse ? piece.quadrilatere(s, r, q, p) : piece.quadrilatere(p, q, r, s)
  const point = (long: number, angle: number): Point => {
    const u = a + Math.cos(angle) * rayon
    const v = b + Math.sin(angle) * rayon
    if (axe === 'x') return [long, u, v]
    if (axe === 'y') return [u, long, v]
    return [u, v, long]
  }
  const centreDebut: Point = axe === 'x' ? [debut, a, b] : axe === 'y' ? [a, debut, b] : [a, b, debut]
  const centreFin: Point = axe === 'x' ? [fin, a, b] : axe === 'y' ? [a, fin, b] : [a, b, fin]
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    const suivant = ((i + 1) / segments) * Math.PI * 2
    quadrilatere(point(debut, angle), point(debut, suivant), point(fin, suivant), point(fin, angle))
    triangle(centreDebut, point(debut, suivant), point(debut, angle))
    triangle(centreFin, point(fin, angle), point(fin, suivant))
  }
  return { positions, indices }
}

/** Coque fermée d'un jeu de cylindres et de couronnes, orientée par `dehors`. */
export function coque(faces: FaceExacte[], segments = SEGMENTS): Maillage {
  const { positions, indices, quadrilatere } = assembler()
  const point = (rayon: number, y: number, angle: number): Point => [Math.cos(angle) * rayon, y, Math.sin(angle) * rayon]
  for (const face of faces) {
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const suivant = ((i + 1) / segments) * Math.PI * 2
      if (face.sorte === 'cylindre') {
        const bande: [Point, Point, Point, Point] = [
          point(face.rayon, face.bas, angle),
          point(face.rayon, face.haut, angle),
          point(face.rayon, face.haut, suivant),
          point(face.rayon, face.bas, suivant),
        ]
        if (face.dehors > 0) quadrilatere(...bande)
        else quadrilatere(bande[3], bande[2], bande[1], bande[0])
        continue
      }
      if (face.sorte !== 'couronne') continue
      const bande: [Point, Point, Point, Point] = [
        point(face.rayonInt, face.y, angle),
        point(face.rayonInt, face.y, suivant),
        point(face.rayonExt, face.y, suivant),
        point(face.rayonExt, face.y, angle),
      ]
      if (face.dehors > 0) quadrilatere(...bande)
      else quadrilatere(bande[3], bande[2], bande[1], bande[0])
    }
  }
  return { positions, indices }
}

/** Tube annulaire fermé : paroi extérieure, passage, deux couronnes. */
export function tube(forme: {
  rayonExt: number
  rayonInt: number
  bas: number
  haut: number
  segments?: number
}): Maillage {
  const { rayonExt, rayonInt, bas, haut } = forme
  const segments = forme.segments ?? SEGMENTS
  const { positions, indices, quadrilatere } = assembler()
  const point = (rayon: number, y: number, angle: number): Point => [Math.cos(angle) * rayon, y, Math.sin(angle) * rayon]
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    const suivant = ((i + 1) / segments) * Math.PI * 2
    quadrilatere(
      point(rayonExt, bas, angle),
      point(rayonExt, haut, angle),
      point(rayonExt, haut, suivant),
      point(rayonExt, bas, suivant),
    )
    quadrilatere(
      point(rayonInt, bas, suivant),
      point(rayonInt, haut, suivant),
      point(rayonInt, haut, angle),
      point(rayonInt, bas, angle),
    )
    quadrilatere(
      point(rayonInt, haut, angle),
      point(rayonInt, haut, suivant),
      point(rayonExt, haut, suivant),
      point(rayonExt, haut, angle),
    )
    quadrilatere(
      point(rayonExt, bas, angle),
      point(rayonExt, bas, suivant),
      point(rayonInt, bas, suivant),
      point(rayonInt, bas, angle),
    )
  }
  return { positions, indices }
}
