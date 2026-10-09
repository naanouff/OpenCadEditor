import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { aretesBrep } from '../src/dessin.ts'
import { documentCad } from '../src/documentCad.ts'

describe('fil de fer des faces', () => {
  it('trace les deux cercles d’un cylindre tourné, rien sur le fût', () => {
    const session = new Session()
    session.executer(`
piece cylindre
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 2
cote hauteur 0
segment
cote rayon 2
cote hauteur 5
segment
cote rayon 0
cote hauteur 5
revolution
`)
    const fil = aretesBrep(session.maillage())
    expect(fil.length / 6).toBe(96)
    for (let i = 0; i < fil.length; i += 6) {
      const y = fil[i + 1]
      const rayon = Math.hypot(fil[i], fil[i + 2])
      expect(Math.abs(y) < 1e-4 || Math.abs(y - 5) < 1e-4).toBe(true)
      expect(rayon).toBeCloseTo(2, 2)
      expect(fil[i + 4]).toBeCloseTo(y, 4)
    }
    const document = documentCad({ faces: [] }, null, session.maillage())
    expect(document.brepWireframe.segmentCount).toBe(96)
  })
})
