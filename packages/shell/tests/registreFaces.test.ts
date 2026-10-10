import { describe, expect, it } from 'vitest'
import { directionCoupe, faceDepuisBornesY, yPlanCoupe, yPlanFace } from '../src/occt/registreFaces.ts'

describe('registre faces', () => {
  it('pose face.dessus et face.dessous sur les bornes Y', () => {
    const faces = faceDepuisBornesY(0, 8)
    expect(yPlanFace(faces.get('face.dessus')!)).toBe(8)
    expect(yPlanFace(faces.get('face.dessous')!)).toBe(0)
    expect(faces.get('face.dessus')!.normal).toEqual([0, 1, 0])
    expect(faces.get('face.dessous')!.normal).toEqual([0, -1, 0])
  })

  it('place le wire au fond et extrude vers l’extérieur', () => {
    const faces = faceDepuisBornesY(0, 8)
    expect(yPlanCoupe(faces.get('face.dessus')!, 2)).toBe(6)
    expect(directionCoupe(faces.get('face.dessus')!, 2, 0.4)).toEqual([0, 2.4, 0])
    expect(yPlanCoupe(faces.get('face.dessous')!, 1)).toBe(1)
    expect(directionCoupe(faces.get('face.dessous')!, 1, 0.4)).toEqual([0, -1.4, 0])
  })
})
