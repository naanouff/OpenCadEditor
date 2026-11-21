import { describe, expect, it } from 'vitest'
import type { Maillage } from '@opencad/api-parametrique'
import {
  carreauSousPointeur,
  nomCarreau,
  supportsCarreaux,
} from '../src/selectionCarreau.ts'
import { storeShell } from '../src/storeShell.ts'

/** Boîte 10×8×10 mm : dessus, dessous, +X (2 triangles chacun). */
function boiteMaillage(): Maillage {
  // Sommets : 0–3 dessus y=8, 4–7 dessous y=0, 8–11 côté +X
  const positions = [
    // dessus (y=8) : z=-5..5, x=-5..5
    -5, 8, -5, 5, 8, -5, 5, 8, 5, -5, 8, 5,
    // dessous (y=0)
    -5, 0, -5, 5, 0, -5, 5, 0, 5, -5, 0, 5,
    // +X (x=5)
    5, 0, -5, 5, 8, -5, 5, 8, 5, 5, 0, 5,
  ]
  const indices = [
    0, 2, 1, 0, 3, 2, // face 0 dessus (normale +Y)
    4, 5, 6, 4, 6, 7, // face 1 dessous (normale -Y)
    8, 9, 10, 8, 10, 11, // face 2 +X
  ]
  const faces = [0, 0, 1, 1, 2, 2]
  return { positions, indices, faces }
}

describe('selection carreau (P5)', () => {
  const maille = boiteMaillage()

  it('touche le carreau dessus depuis +Y', () => {
    const hit = carreauSousPointeur(maille, {
      origine: [0, 20, 0],
      direction: [0, -1, 0],
    })
    expect(hit?.faceId).toBe(0)
    expect(hit?.t).toBeCloseTo(12)
  })

  it('touche le carreau +X depuis l’extérieur', () => {
    const hit = carreauSousPointeur(maille, {
      origine: [20, 4, 0],
      direction: [-1, 0, 0],
    })
    expect(hit?.faceId).toBe(2)
  })

  it('rate un rayon qui ne croise rien', () => {
    expect(
      carreauSousPointeur(maille, {
        origine: [0, 20, 20],
        direction: [0, -1, 0],
      }),
    ).toBeNull()
  })

  it('nomme dessus / dessous et face.<n> pour le reste', () => {
    const { supports, noms } = supportsCarreaux(maille)
    expect(supports.get('face.dessus')?.origin[1]).toBeCloseTo(8)
    expect(supports.get('face.dessous')?.origin[1]).toBeCloseTo(0)
    expect(supports.has('face.2')).toBe(true)
    expect(nomCarreau(0, noms)).toBe('face.dessus')
    expect(nomCarreau(1, noms)).toBe('face.dessous')
    expect(nomCarreau(2, noms)).toBe('face.2')
  })

  it('donne une normale latérale pour face.2', () => {
    const lat = supportsCarreaux(maille).supports.get('face.2')!
    expect(lat.normal[0]).toBeGreaterThan(0.9)
    expect(Math.abs(lat.normal[1])).toBeLessThan(0.1)
  })
})

describe('clic dans le vide', () => {
  it('retire la face, l’arête et le datum', () => {
    storeShell.choisirFace(50, 'face.50')
    expect(storeShell.deselectionner()).toBe(true)
    expect(storeShell.faceChoisie()).toBeNull()

    storeShell.choisirAreteBrep(3, null)
    expect(storeShell.segmentChoisi()).toBe(3)
    expect(storeShell.deselectionner()).toBe(true)
    expect(storeShell.segmentChoisi()).toBeNull()

    storeShell.choisirDatum('plan.dessus')
    expect(storeShell.deselectionner()).toBe(true)
    expect(storeShell.datumChoisi()).toBeNull()
    expect(storeShell.deselectionner()).toBe(false)
  })
})
