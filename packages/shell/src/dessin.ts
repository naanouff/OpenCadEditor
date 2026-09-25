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

/** Vue caméra qui regarde ce plan. */
export function vueDuPlan(support: string): 'posX' | 'negY' | 'posY' | 'posZ' {
  if (support === 'plan.3h') return 'posX'
  if (support === 'plan.12h') return 'posZ'
  if (support === 'face.dessous') return 'negY'
  return 'posY'
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

/** Polylignes exactes, même tableau que `brepWireframe.position` de w3dts. */
export function filDeFer(frontiere: Frontiere) {
  const array: number[] = []
  for (const face of frontiere.faces) {
    if (face.sorte === 'couronne') {
      chaine(cercle3(face.rayonExt, face.y), array)
      chaine(cercle3(face.rayonInt, face.y), array)
    }
  }
  return { position: { array }, segmentCount: array.length / 6 }
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
