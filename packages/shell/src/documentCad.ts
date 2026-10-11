import type { EsquissePosee, Frontiere, MaillageOmbre } from '@opencad/api-parametrique'
import { aretesBrep, cercleFerme, coteDiametre, coteSegment, filDeFer, grille, pasGrille, repere } from './dessin.ts'

/** Le lecteur CAD et les overlays vector-lines sont en mètres. */
const METRE = 0.001
const PAS = 48

const RECUL_GRILLE = 0.15

function enMetres(array: number[]) {
  return {
    position: { array: array.map((valeur) => valeur * METRE) },
    segmentCount: array.length / 6,
  }
}

export function documentCad(
  frontiere: Frontiere,
  esquisse: EsquissePosee | null = null,
  volume: MaillageOmbre | null = null,
) {
  const esquisseMm: number[] = []
  const grilleMm: number[] = []
  const cotesMm: number[] = []
  if (esquisse) {
    const altitude = esquisse.cercles[0]?.y ?? 0
    const etendue = 30
    grilleMm.push(...grille(esquisse.support, pasGrille(etendue * 2), etendue, altitude - RECUL_GRILLE))
    esquisse.cercles.forEach((cercle, index) => {
      cercleFerme(cercle.rayon, cercle.y, esquisseMm)
      cotesMm.push(...coteDiametre(esquisse.support, cercle.rayon, cercle.y, index).trait)
    })
    const { normale, axeU, axeV } = repere(esquisse.support)
    const yPlan = esquisse.cercles[0]?.y ?? 0
    const poser = (u: number, v: number) => [
      normale[0] * yPlan + axeU[0] * u + axeV[0] * v,
      normale[1] * yPlan + axeU[1] * u + axeV[1] * v,
      normale[2] * yPlan + axeU[2] * u + axeV[2] * v,
    ]
    const traits = esquisse.traits ?? []
    for (let i = 0; i < traits.length; i += 4) {
      esquisseMm.push(...poser(traits[i], traits[i + 1]), ...poser(traits[i + 2], traits[i + 3]))
    }
    for (const cote of esquisse.cotesLineaires ?? []) {
      cotesMm.push(...coteSegment(esquisse.support, cote.a, cote.b, cote.decalage, yPlan).trait)
    }
  }
  const solide = !esquisse && volume && volume.indices.length > 0 ? volume : null
  return {
    brepWireframe: enMetres(
      esquisse ? [] : solide ? aretesBrep(solide) : frontiere.faces.length > 0 ? filDeFer(frontiere).position.array : [],
    ),
    grille: enMetres(grilleMm),
    esquisse: enMetres(esquisseMm),
    cotes: enMetres(cotesMm),
    maillage: esquisse ? { positions: [], normales: [], indices: [] } : solide ? enMetresOmbre(solide) : maillage(frontiere),
  }
}

/** Le noyau donne déjà la normale de chaque surface. Seules les longueurs changent d'unité. */
function enMetresOmbre(volume: MaillageOmbre) {
  return {
    positions: volume.positions.map((valeur) => valeur * METRE),
    normales: volume.normales,
    indices: volume.indices,
  }
}

function maillage(frontiere: Frontiere) {
  const positions: number[] = []
  const normales: number[] = []
  const indices: number[] = []
  const poser = (x: number, y: number, z: number, nx: number, ny: number, nz: number) => {
    const debut = positions.length / 3
    positions.push(x * METRE, y * METRE, z * METRE)
    normales.push(nx, ny, nz)
    return debut
  }
  for (const face of frontiere.faces) {
    if (face.sorte === 'cylindre') {
      const versExterieur = face.dehors
      const bas: number[] = []
      const haut: number[] = []
      for (let i = 0; i < PAS; i++) {
        const angle = (i / PAS) * Math.PI * 2
        const x = Math.cos(angle) * face.rayon
        const z = Math.sin(angle) * face.rayon
        const nx = Math.cos(angle) * versExterieur
        const nz = Math.sin(angle) * versExterieur
        bas.push(poser(x, face.bas, z, nx, 0, nz))
        haut.push(poser(x, face.haut, z, nx, 0, nz))
      }
      for (let i = 0; i < PAS; i++) {
        const j = (i + 1) % PAS
        if (versExterieur > 0) indices.push(bas[i], haut[i], haut[j], bas[i], haut[j], bas[j])
        else indices.push(bas[i], haut[j], haut[i], bas[i], bas[j], haut[j])
      }
      continue
    }
    if (face.sorte === 'boite') {
      const { xmin, xmax, ymin, ymax, zmin, zmax } = face
      const quad = (
        a: [number, number, number],
        b: [number, number, number],
        c: [number, number, number],
        d: [number, number, number],
        n: [number, number, number],
      ) => {
        const ia = poser(a[0], a[1], a[2], n[0], n[1], n[2])
        const ib = poser(b[0], b[1], b[2], n[0], n[1], n[2])
        const ic = poser(c[0], c[1], c[2], n[0], n[1], n[2])
        const id = poser(d[0], d[1], d[2], n[0], n[1], n[2])
        indices.push(ia, ib, ic, ia, ic, id)
      }
      quad([xmax, ymin, zmin], [xmax, ymax, zmin], [xmax, ymax, zmax], [xmax, ymin, zmax], [1, 0, 0])
      quad([xmin, ymin, zmax], [xmin, ymax, zmax], [xmin, ymax, zmin], [xmin, ymin, zmin], [-1, 0, 0])
      quad([xmin, ymax, zmin], [xmax, ymax, zmin], [xmax, ymax, zmax], [xmin, ymax, zmax], [0, 1, 0])
      quad([xmin, ymin, zmax], [xmax, ymin, zmax], [xmax, ymin, zmin], [xmin, ymin, zmin], [0, -1, 0])
      quad([xmin, ymin, zmax], [xmax, ymin, zmax], [xmax, ymax, zmax], [xmin, ymax, zmax], [0, 0, 1])
      quad([xmin, ymax, zmin], [xmax, ymax, zmin], [xmax, ymin, zmin], [xmin, ymin, zmin], [0, 0, -1])
      continue
    }
    if (face.sorte === 'traverse') {
      const versExterieur = face.dehors
      const debut: number[] = []
      const fin: number[] = []
      for (let i = 0; i < PAS; i++) {
        const angle = (i / PAS) * Math.PI * 2
        const y = face.y + Math.cos(angle) * face.rayon
        const z = face.z + Math.sin(angle) * face.rayon
        const ny = Math.cos(angle) * versExterieur
        const nz = Math.sin(angle) * versExterieur
        debut.push(poser(face.debut, y, z, 0, ny, nz))
        fin.push(poser(face.fin, y, z, 0, ny, nz))
      }
      for (let i = 0; i < PAS; i++) {
        const j = (i + 1) % PAS
        if (versExterieur > 0) indices.push(debut[i], fin[i], fin[j], debut[i], fin[j], debut[j])
        else indices.push(debut[i], fin[j], fin[i], debut[i], debut[j], fin[j])
      }
      continue
    }
    const anneau: number[][] = [[], []]
    for (const [rang, rayon] of [face.rayonExt, face.rayonInt].entries()) {
      for (let i = 0; i < PAS; i++) {
        const angle = (i / PAS) * Math.PI * 2
        anneau[rang].push(poser(Math.cos(angle) * rayon, face.y, Math.sin(angle) * rayon, 0, face.dehors, 0))
      }
    }
    const [exterieur, interieur] = anneau
    for (let i = 0; i < PAS; i++) {
      const j = (i + 1) % PAS
      if (face.dehors > 0) indices.push(exterieur[i], interieur[j], exterieur[j], exterieur[i], interieur[i], interieur[j])
      else indices.push(exterieur[i], exterieur[j], interieur[j], exterieur[i], interieur[j], interieur[i])
    }
  }
  return { positions, normales, indices }
}
