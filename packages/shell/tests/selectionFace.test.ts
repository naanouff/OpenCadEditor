import { describe, expect, it } from 'vitest'
import { faceDepuisBornesY } from '../src/occt/registreFaces.ts'
import {
  faceSousPointeur,
  facesDepuisMaillage,
  rayonCoupePlan,
  rayonOrthoDepuisNdc,
} from '../src/selectionFace.ts'

describe('selection face (P4)', () => {
  const faces = [...faceDepuisBornesY(0, 8).values()]

  it('coupe le plan dessus depuis +Y', () => {
    const t = rayonCoupePlan(
      { origine: [0, 20, 0], direction: [0, -1, 0] },
      faces.find((f) => f.id === 'face.dessus')!,
    )
    expect(t).toBeCloseTo(12)
  })

  it('choisit face.dessus pour un rayon vertical', () => {
    expect(
      faceSousPointeur(faces, { origine: [1, 20, 1], direction: [0, -1, 0] }),
    ).toBe('face.dessus')
  })

  it('choisit face.dessous depuis dessous', () => {
    expect(
      faceSousPointeur(faces, { origine: [0, -5, 0], direction: [0, 1, 0] }),
    ).toBe('face.dessous')
  })

  it('rate un rayon parallèle', () => {
    expect(
      faceSousPointeur(faces, { origine: [0, 4, 0], direction: [1, 0, 0] }),
    ).toBeNull()
  })

  it('dérive les faces depuis le maillage', () => {
    const positions = [0, 0, 0, 1, 0, 0, 0, 8, 0, 1, 8, 0]
    const ids = facesDepuisMaillage(positions).map((f) => f.id).sort()
    expect(ids).toEqual(['face.dessous', 'face.dessus'])
  })

  it('rayon ortho NDC centre vise le focus', () => {
    const rayon = rayonOrthoDepuisNdc(
      0,
      0,
      [10, 10, 10],
      [0, 4, 0],
      [0, 1, 0],
      5,
      1,
    )
    expect(rayon.origine[0]).toBeCloseTo(10)
    expect(rayon.origine[1]).toBeCloseTo(10)
    expect(rayon.origine[2]).toBeCloseTo(10)
    const hit = faceSousPointeur(faces, rayon)
    expect(hit).toBe('face.dessus')
  })
})
