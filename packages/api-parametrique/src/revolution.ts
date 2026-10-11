import { difference, union } from './csg.ts'
import { ErreurApi, type Domaine, type Esquisse, type Evaluateur, type Maillage, type MaillageOmbre } from './types.ts'
import { boite } from './volumes.ts'

type Point = [number, number, number]
type Station = { r: number; y: number }

const SEGMENTS = 48

function assembler() {
  const positions: number[] = []
  const indices: number[] = []
  const poser = (point: Point) => {
    const rang = positions.length / 3
    positions.push(point[0], point[1], point[2])
    return rang
  }
  /** Pose un triangle. Un triangle sans surface est écarté. */
  const triangle = (a: Point, b: Point, c: Point) => {
    const ux = b[0] - a[0]
    const uy = b[1] - a[1]
    const uz = b[2] - a[2]
    const vx = c[0] - a[0]
    const vy = c[1] - a[1]
    const vz = c[2] - a[2]
    const nx = uy * vz - uz * vy
    const ny = uz * vx - ux * vz
    const nz = ux * vy - uy * vx
    if (nx * nx + ny * ny + nz * nz < 1e-16) return
    indices.push(poser(a), poser(b), poser(c))
  }
  return { positions, indices, triangle }
}

function anneau(rayon: number, y: number): Point[] {
  const points: Point[] = []
  for (let i = 0; i < SEGMENTS; i++) {
    const angle = (i / SEGMENTS) * Math.PI * 2
    points.push([Math.cos(angle) * rayon, y, Math.sin(angle) * rayon])
  }
  return points
}

/** Solide fermé obtenu en tournant la polyligne (rayon, hauteur) autour de Y. Chaque segment est une face. */
export function tourner(points: Station[]): Maillage {
  if (points.length < 3) throw new ErreurApi('profil trop court')
  const { positions, indices, triangle } = assembler()
  const faces: number[] = []
  const face = (a: Point, b: Point, c: Point, id: number) => {
    const avant = indices.length
    triangle(a, b, c)
    if (indices.length > avant) faces.push(id)
  }
  let precedent = anneau(points[0].r, points[0].y)
  for (let s = 1; s < points.length; s++) {
    const avant = points[s - 1]
    const courant = points[s]
    const suivant = anneau(courant.r, courant.y)
    for (let i = 0; i < SEGMENTS; i++) {
      const j = (i + 1) % SEGMENTS
      if (avant.r < 1e-8 && courant.r < 1e-8) continue
      if (avant.r < 1e-8) {
        face(precedent[0], suivant[i], suivant[j], s)
        continue
      }
      if (courant.r < 1e-8) {
        face(precedent[i], suivant[0], precedent[j], s)
        continue
      }
      face(precedent[i], suivant[i], suivant[j], s)
      face(precedent[i], suivant[j], precedent[j], s)
    }
    precedent = suivant
  }
  return { positions, indices, faces }
}

function retourner(maillage: Maillage): Maillage {
  const indices = [...maillage.indices]
  for (let i = 0; i < indices.length; i += 3) {
    const echange = indices[i + 1]
    indices[i + 1] = indices[i + 2]
    indices[i + 2] = echange
  }
  return {
    positions: maillage.positions,
    indices,
    normales: maillage.normales?.map((valeur) => -valeur),
    faces: maillage.faces,
  }
}

function radialMoyen(maillage: Maillage) {
  const { positions, indices } = maillage
  let somme = 0
  let compte = 0
  for (let i = 0; i < indices.length; i += 3) {
    const lire = (sommet: number) =>
      [positions[sommet * 3], positions[sommet * 3 + 1], positions[sommet * 3 + 2]] as Point
    const a = lire(indices[i])
    const b = lire(indices[i + 1])
    const c = lire(indices[i + 2])
    const ux = b[0] - a[0]
    const uy = b[1] - a[1]
    const uz = b[2] - a[2]
    const vx = c[0] - a[0]
    const vy = c[1] - a[1]
    const vz = c[2] - a[2]
    const nx = uy * vz - uz * vy
    const nz = ux * vy - uy * vx
    const mx = (a[0] + b[0] + c[0]) / 3
    const mz = (a[2] + b[2] + c[2]) / 3
    if (Math.hypot(mx, mz) < 1) continue
    somme += nx * mx + nz * mz
    compte += 1
  }
  return compte === 0 ? 0 : somme / compte
}

function versExterieur(maillage: Maillage) {
  return radialMoyen(maillage) < 0 ? retourner(maillage) : maillage
}

const PLI = Math.cos((50 * Math.PI) / 180)

function cleSommet(x: number, y: number, z: number) {
  const q = (v: number) => Math.round(v * 1e4)
  return `${q(x)} ${q(y)} ${q(z)}`
}

/** Normales moyennées entre triangles voisins. Un pli au-delà de 50° reste vif, et deux étiquettes de face ne se moyennent pas. */
export function normalesLisses(maillage: Maillage): MaillageOmbre {
  const src = maillage.positions
  const faces: { n: Point; coins: Point[]; id: number }[] = []
  const parSommet = new Map<string, number[]>()
  for (let i = 0; i < maillage.indices.length; i += 3) {
    const coins = [0, 1, 2].map((k) => {
      const s = maillage.indices[i + k] * 3
      return [src[s], src[s + 1], src[s + 2]] as Point
    })
    const [a, b, c] = coins
    let nx = (b[1] - a[1]) * (c[2] - a[2]) - (b[2] - a[2]) * (c[1] - a[1])
    let ny = (b[2] - a[2]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[2] - a[2])
    let nz = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
    const longueur = Math.hypot(nx, ny, nz) || 1
    nx /= longueur
    ny /= longueur
    nz /= longueur
    const rang = faces.length
    faces.push({ n: [nx, ny, nz], coins, id: rang })
    for (const coin of coins) {
      const cle = cleSommet(coin[0], coin[1], coin[2])
      const liste = parSommet.get(cle)
      if (liste) liste.push(rang)
      else parSommet.set(cle, [rang])
    }
  }
  const positions: number[] = []
  const normales: number[] = []
  const indices: number[] = []
  for (const face of faces) {
    const base = positions.length / 3
    for (const coin of face.coins) {
      let sx = 0
      let sy = 0
      let sz = 0
      for (const autre of parSommet.get(cleSommet(coin[0], coin[1], coin[2])) ?? []) {
        const n = faces[autre].n
        const etiquettes = maillage.faces
        if (etiquettes && etiquettes[face.id] !== etiquettes[autre]) continue
        if (n[0] * face.n[0] + n[1] * face.n[1] + n[2] * face.n[2] < PLI) continue
        sx += n[0]
        sy += n[1]
        sz += n[2]
      }
      const longueur = Math.hypot(sx, sy, sz) || 1
      positions.push(coin[0], coin[1], coin[2])
      normales.push(sx / longueur, sy / longueur, sz / longueur)
    }
    indices.push(base, base + 1, base + 2)
  }
  return { positions, normales, indices, faces: maillage.faces ? [...maillage.faces] : undefined }
}

export function normalesPlates(maillage: Maillage): MaillageOmbre {
  const positions: number[] = []
  const normales: number[] = []
  const indices: number[] = []
  const src = maillage.positions
  for (let i = 0; i < maillage.indices.length; i += 3) {
    const lire = (sommet: number) => [src[sommet * 3], src[sommet * 3 + 1], src[sommet * 3 + 2]]
    const [ax, ay, az] = lire(maillage.indices[i])
    const [bx, by, bz] = lire(maillage.indices[i + 1])
    const [cx, cy, cz] = lire(maillage.indices[i + 2])
    let nx = (by - ay) * (cz - az) - (bz - az) * (cy - ay)
    let ny = (bz - az) * (cx - ax) - (bx - ax) * (cz - az)
    let nz = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax)
    const longueur = Math.hypot(nx, ny, nz) || 1
    nx /= longueur
    ny /= longueur
    nz /= longueur
    const base = positions.length / 3
    positions.push(ax, ay, az, bx, by, bz, cx, cy, cz)
    normales.push(nx, ny, nz, nx, ny, nz, nx, ny, nz)
    indices.push(base, base + 1, base + 2)
  }
  return { positions, normales, indices, faces: maillage.faces ? [...maillage.faces] : undefined }
}

function stations(esquisse: Esquisse, evaluateur: Evaluateur, parametres: Map<string, string>): Station[] {
  const segments = esquisse.entites.filter((entite) => entite.sorte === 'segment')
  if (segments.length < 3) throw new ErreurApi('profil trop court')
  return segments.map((segment) => {
    if (!segment.rayon || !segment.hauteur) throw new ErreurApi('segment sans cote')
    return {
      r: evaluateur.evaluer(segment.rayon, parametres),
      y: evaluateur.evaluer(segment.hauteur, parametres),
    }
  })
}

/** Deux rectangles croisés, longueur selon X et largeur selon Z, creusés depuis le haut. */
export function couperRectangles(
  volume: MaillageOmbre,
  esquisse: Esquisse,
  profondeur: number,
  evaluateur: Evaluateur,
  parametres: Map<string, string>,
): MaillageOmbre {
  const rectangles = esquisse.entites.filter((entite) => entite.sorte === 'rectangle')
  if (rectangles.length === 0) throw new ErreurApi('profil sans rectangle')
  let yMax = -Infinity
  for (let i = 1; i < volume.positions.length; i += 3) yMax = Math.max(yMax, volume.positions[i])
  let courant: Maillage = {
    positions: volume.positions,
    indices: volume.indices,
    normales: volume.normales,
    faces: volume.faces,
  }
  for (const rectangle of rectangles) {
    if (!rectangle.largeur || !rectangle.longueur) throw new ErreurApi('rectangle sans cote')
    const largeur = evaluateur.evaluer(rectangle.largeur, parametres)
    const longueur = evaluateur.evaluer(rectangle.longueur, parametres)
    const brut = boite({
      xmin: -longueur / 2,
      xmax: longueur / 2,
      ymin: yMax - profondeur,
      ymax: yMax + 0.4,
      zmin: -largeur / 2,
      zmax: largeur / 2,
    })
    const deja = courant.faces && courant.faces.length > 0 ? Math.max(...courant.faces) + 1 : 0
    const outil = normalesPlates(decalerFaces(brut, deja))
    courant = difference(courant, outil)
  }
  if (!courant.normales) throw new ErreurApi('normales absentes')
  return { positions: courant.positions, normales: courant.normales, indices: courant.indices, faces: courant.faces }
}

function rayonDuProfil(profil: Station[], y: number) {
  for (let i = 1; i < profil.length; i++) {
    const avant = profil[i - 1]
    const courant = profil[i]
    if ((y - avant.y) * (y - courant.y) > 1e-9) continue
    const ecart = courant.y - avant.y
    if (Math.abs(ecart) < 1e-9) return Math.max(avant.r, courant.r)
    const t = (y - avant.y) / ecart
    return avant.r + (courant.r - avant.r) * t
  }
  return profil[profil.length - 1].r
}

/** Dernière hauteur encore au rayon du fût, avant que le profil s'ouvre en tête. */
function epaule(profil: Station[], rTige: number) {
  let y = profil[0].y
  for (let i = 1; i < profil.length; i++) {
    if (profil[i].r > rTige + 1e-4 && profil[i - 1].r <= rTige + 1e-4) return profil[i - 1].y
    if (profil[i].r <= rTige + 1e-4) y = profil[i].y
  }
  return y
}

/**
 * Filet balayé le long de l'hélice, comme en CAO.
 *
 * À chaque angle, le profil d'un pas est posé sur la matière : mi-fond, fond,
 * crête, fond, mi-fond. Le mi-fond d'un tour est le mi-fond du tour suivant :
 * la bande hélicoïdale couvre tout le corps. Crête et fonds sont des arêtes du maillage.
 *
 * Le filet est un triangle vif d'angle inclus `angleInclus`, un pas entre deux crêtes.
 * Le fond reste le rayon du profil. La crête va au Ø nominal, et suit le cône de pointe
 * tant qu'il est plus étroit : sur la pointe, le filet s'amincit puis s'éteint.
 *
 * La naissance est un éventail depuis la pointe jusqu'au premier mi-fond, sur le cône.
 * L'arrêt sous la tête remplit le dernier tour jusqu'au cercle de l'épaulement,
 * puis se referme à plat au rayon du fût. La couronne visible est le fond de la tête.
 */
function maillerFilet(
  profil: Station[],
  rTige: number,
  rAme: number,
  pas: number,
  angleInclus: number,
  anglePointe: number,
): Maillage {
  const y0 = profil[0].y
  const yBut = epaule(profil, rTige)
  const N = SEGMENTS
  const yDebut = y0 + pas / 2
  const rangs = Math.floor(((yBut - y0 - pas) * N) / pas)
  if (pas <= 0 || rangs < N) return tourner(profil)

  const pente = Math.tan((angleInclus / 2) * (Math.PI / 180))
  const penteCone = Math.tan((anglePointe / 2) * (Math.PI / 180))
  const ajout = Math.max(0, rTige - rAme)
  const theta = (i: number) => ((i % N) / N) * Math.PI * 2
  const point = (i: number, y: number, r: number): Point => {
    const t = theta(i)
    return [Math.cos(t) * r, y, Math.sin(t) * r]
  }
  const surMatiere = (i: number, y: number) => point(i, y, rayonDuProfil(profil, y))

  /** Coudes du profil entre la pointe et l'épaulement : le fond les suit. */
  const coudes = profil
    .slice(1, -1)
    .map((station) => station.y)
    .filter((y) => y > y0 + 1e-6 && y < yBut - 1e-6)
    .sort((a, b) => a - b)

  /**
   * Fond entre deux hauteurs, de `bas` inclus à `haut` exclu, avec les coudes
   * du profil qui s'y trouvent. Le nombre de points est le même pour tous les rangs :
   * les places libres répètent `haut`, et ces triangles sans surface sont écartés.
   */
  const fond = (i: number, bas: number, haut: number): Point[] => {
    const hauteurs = [bas, ...coudes.filter((y) => y > bas + 1e-6 && y < haut - 1e-6)]
    while (hauteurs.length < 1 + coudes.length) hauteurs.push(haut)
    return hauteurs.map((y) => surMatiere(i, y))
  }

  /** Mi-fond, fond, crête, fond, mi-fond du rang, coudes compris. */
  const rang = (i: number): Point[] => {
    const yc = yDebut + (i * pas) / N
    const rSil = rayonDuProfil(profil, yc)
    const cone = (yc - y0) * penteCone
    const rCrete =
      cone < rTige - 1e-4 ? Math.max(rSil, Math.min(rTige, cone)) : Math.min(rTige, rSil + ajout)
    const profondeur = Math.max(0, rCrete - rSil)
    const flanc = Math.min(profondeur * pente, pas / 2)
    return [
      ...fond(i, yc - pas / 2, yc - flanc),
      surMatiere(i, yc - flanc),
      point(i, yc, rSil + profondeur),
      ...fond(i, yc + flanc, yc + pas / 2),
      surMatiere(i, yc + pas / 2),
    ]
  }
  const lignes = Array.from({ length: rangs + 1 }, (_, i) => rang(i))
  const colonnes = lignes[0].length
  const dernier = colonnes - 1

  const { positions, indices, triangle } = assembler()
  const faces: number[] = []
  const FUT = 1
  const FLANC_BAS = 2
  const FLANC_HAUT = 3
  const NAISSANCE = 4
  const DISQUE = 5
  const nFond = 1 + coudes.length
  /** Le flanc bas relie le fond à la crête, le flanc haut repart de la crête. */
  const faceBande = (k: number) => (k === nFond ? FLANC_BAS : k === nFond + 1 ? FLANC_HAUT : FUT)
  const avec = (a: Point, b: Point, c: Point, id: number) => {
    const avant = indices.length
    triangle(a, b, c)
    if (indices.length > avant) faces.push(id)
  }
  /** Quadrilatère entre deux rangs voisins, vers l'extérieur. */
  const bande = (bas: Point, hautBas: Point, hautHaut: Point, basHaut: Point, id: number) => {
    avec(bas, basHaut, hautBas, id)
    avec(basHaut, hautHaut, hautBas, id)
  }
  for (let i = 0; i < rangs; i++) {
    const a = lignes[i]
    const b = lignes[i + 1]
    for (let k = 0; k < dernier; k++) bande(a[k], b[k], b[k + 1], a[k + 1], faceBande(k))
  }

  const pointe: Point = [0, y0, 0]
  for (let i = 0; i < N; i++) avec(pointe, lignes[i][0], lignes[i + 1][0], NAISSANCE)

  const rCol = rayonDuProfil(profil, yBut)
  const collet = (i: number) => point(i, yBut, rCol)
  for (let i = rangs - N; i < rangs; i++) {
    bande(lignes[i][dernier], lignes[i + 1][dernier], collet(i + 1), collet(i), FUT)
  }
  const centre: Point = [0, yBut, 0]
  for (let i = 0; i < N; i++) avec(collet(i), centre, collet(i + 1), DISQUE)
  return { positions, indices, faces }
}

function decalerFaces(maillage: Maillage, base: number): Maillage {
  if (!maillage.faces || base === 0) return maillage
  return { ...maillage, faces: maillage.faces.map((id) => id + base) }
}

export const domaineRevolution: Domaine = {
  id: 'revolution',
  verbes: {
    revolution: () => ({ type: 'revolution', arguments: {}, noms: [] }),
    pas: () => ({ type: 'pas', arguments: {}, noms: [] }),
  },
  operations: {
    revolution: {
      dansHistorique: true,
      faire(contexte) {
        if (!contexte.esquisse) throw new ErreurApi('aucune esquisse')
        const profil = stations(contexte.esquisse, contexte.evaluateur, contexte.parametres)
        contexte.piece.demiProfil = profil
        contexte.esquisse = null
        contexte.piece.esquisse = null
        // Faces nommées pour une tête sur face.dessus (boulon), même si le corps est en `pas` hôte.
        const faces = new Set(contexte.solide?.faces ?? [])
        faces.add('face.dessus')
        faces.add('face.dessous')
        contexte.solide = contexte.solide
          ? { ...contexte.solide, faces }
          : { faces, extrusions: 0, enlevementsBorgnes: 0, enlevements: [], ajouts: [] }
        contexte.piece.solide = contexte.solide
        if (contexte.geometrie === false) return
        let ajoute = normalesLisses(versExterieur(tourner(profil)))
        const deja = contexte.piece.volume
        if (deja?.faces && deja.faces.length > 0) ajoute = decalerFaces(ajoute, Math.max(...deja.faces) + 1)
        const maille = deja && deja.indices.length > 0 ? union(deja, ajoute) : ajoute
        if (!maille.normales) throw new ErreurApi('normales absentes')
        contexte.piece.volume = {
          positions: maille.positions,
          normales: maille.normales,
          indices: maille.indices,
          faces: maille.faces,
        }
      },
      defaire() {},
    },
    pas: {
      dansHistorique: true,
      faire(contexte) {
        const profil = contexte.piece.demiProfil
        if (!profil || contexte.geometrie === false) return
        const lire = (nom: string) => contexte.evaluateur.evaluer(nom, contexte.parametres)
        const maille = maillerFilet(
          profil,
          lire('diametre') / 2,
          lire('diametre_ame') / 2,
          lire('pas'),
          lire('angle_filet'),
          lire('angle_pointe'),
        )
        contexte.piece.volume = normalesLisses(versExterieur(maille))
      },
      defaire() {},
    },
  },
}
