import type { EsquissePosee, Frontiere } from '@opencad/api-parametrique'
import { cercleFerme, coteDiametre, filDeFer, grille, pasGrille } from './dessin.ts'

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

export function documentCad(frontiere: Frontiere, esquisse: EsquissePosee | null = null) {
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
  }
  return {
    brepWireframe: enMetres(filDeFer(frontiere).position.array),
    grille: enMetres(grilleMm),
    esquisse: enMetres(esquisseMm),
    cotes: enMetres(cotesMm),
    maillage: maillage(frontiere),
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
