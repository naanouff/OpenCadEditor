import { describe, expect, it } from 'vitest'
import type { Frontiere } from '@opencad/api-parametrique'
import { documentCad } from '../src/documentCad.ts'

const anneau: Frontiere = {
  faces: [
    { sorte: 'cylindre', rayon: 20, bas: 0, haut: 8, dehors: 1 },
    { sorte: 'cylindre', rayon: 17.5, bas: 0, haut: 8, dehors: -1 },
    { sorte: 'couronne', rayonExt: 20, rayonInt: 17.5, y: 8, dehors: 1 },
    { sorte: 'couronne', rayonExt: 20, rayonInt: 17.5, y: 0, dehors: -1 },
  ],
}

describe('document CAD w3dts', () => {
  it('exprime le fil de fer et le maillage en mètres', () => {
    const document = documentCad(anneau)
    expect(document.brepWireframe.position.array.length % 6).toBe(0)
    expect(document.brepWireframe.segmentCount).toBeGreaterThan(8)
    const x = document.brepWireframe.position.array[0]
    const z = document.brepWireframe.position.array[2]
    expect(Math.hypot(x, z)).toBeCloseTo(0.02)
    const sommet = document.maillage.positions
    expect(Math.hypot(sommet[0], sommet[2])).toBeCloseTo(0.02)
  })

  it('suit le côté matière porté par la face', () => {
    const bossage: Frontiere = {
      faces: [
        { sorte: 'cylindre', rayon: 20, bas: 0, haut: 8, dehors: 1 },
        { sorte: 'cylindre', rayon: 4, bas: 0, haut: 2, dehors: 1 },
        { sorte: 'couronne', rayonExt: 20, rayonInt: 4, y: 0, dehors: 1 },
      ],
    }
    const { positions, normales } = documentCad(bossage).maillage
    let petitVersDehors = true
    let couronneVersHaut = true
    for (let i = 0; i < normales.length; i += 3) {
      const rayon = Math.hypot(positions[i], positions[i + 2])
      const versAxe = normales[i] * positions[i] + normales[i + 2] * positions[i + 2]
      if (rayon > 0.003 && rayon < 0.005 && versAxe < 0) petitVersDehors = false
      if (normales[i + 1] !== 0 && normales[i + 1] < 0) couronneVersHaut = false
    }
    expect(petitVersDehors).toBe(true)
    expect(couronneVersHaut).toBe(true)
  })

  it('dessine le cercle de l’esquisse en cours', () => {
    const sans = documentCad(anneau).brepWireframe.segmentCount
    const avec = documentCad(anneau, { support: 'face.dessus', cercles: [{ rayon: 18, y: 8 }] })
    expect(sans).toBeGreaterThan(0)
    expect(avec.brepWireframe.segmentCount).toBe(0)
    expect(avec.esquisse.segmentCount).toBeGreaterThan(0)
    let trouve = false
    const tableau = avec.esquisse.position.array
    for (let i = 0; i < tableau.length; i += 3) {
      if (Math.abs(Math.hypot(tableau[i], tableau[i + 2]) - 0.018) < 1e-6) trouve = true
    }
    expect(trouve).toBe(true)
    expect(avec.maillage.indices).toEqual([])
  })

  it('ferme le solide et oriente les normales hors de la matière', () => {
    const { positions, normales } = documentCad(anneau).maillage
    let couronne = false
    let exterieur = false
    let interieur = false
    for (let i = 0; i < normales.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]
      const rayon = Math.hypot(x, z)
      const versAxe = normales[i] * x + normales[i + 2] * z
      if (normales[i + 1] > 0.5 && y > 0.007) couronne = true
      if (rayon > 0.019 && versAxe > 0) exterieur = true
      if (rayon < 0.018 && versAxe < 0) interieur = true
    }
    expect(couronne && exterieur && interieur).toBe(true)
  })
})
