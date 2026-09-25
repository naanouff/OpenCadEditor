import type { Frontiere } from '@opencad/api-parametrique'
import { filDeFer } from './dessin.ts'

/** Le lecteur CAD et les overlays vector-lines sont en mètres. */
const METRE = 0.001
const PAS = 48

export function documentCad(frontiere: Frontiere) {
  const fil = filDeFer(frontiere)
  return {
    brepWireframe: {
      position: { array: fil.position.array.map((valeur) => valeur * METRE) },
      segmentCount: fil.segmentCount,
    },
    maillage: maillage(frontiere),
  }
}

function maillage(frontiere: Frontiere) {
  const positions: number[] = []
  const normales: number[] = []
  const indices: number[] = []
  const rayonMax = Math.max(0, ...frontiere.faces.filter((face) => face.sorte === 'cylindre').map((face) => face.rayon))
  const poser = (x: number, y: number, z: number, nx: number, ny: number, nz: number) => {
    const debut = positions.length / 3
    positions.push(x * METRE, y * METRE, z * METRE)
    normales.push(nx, ny, nz)
    return debut
  }
  for (const face of frontiere.faces) {
    if (face.sorte === 'cylindre') {
      const versExterieur = face.rayon === rayonMax ? 1 : -1
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
        const ny = face.y > 0 ? 1 : -1
        anneau[rang].push(poser(Math.cos(angle) * rayon, face.y, Math.sin(angle) * rayon, 0, ny, 0))
      }
    }
    const [exterieur, interieur] = anneau
    for (let i = 0; i < PAS; i++) {
      const j = (i + 1) % PAS
      if (face.y > 0) indices.push(exterieur[i], interieur[j], exterieur[j], exterieur[i], interieur[i], interieur[j])
      else indices.push(exterieur[i], exterieur[j], interieur[j], exterieur[i], interieur[j], interieur[i])
    }
  }
  return { positions, normales, indices }
}
