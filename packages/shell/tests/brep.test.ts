import { describe, expect, it } from 'vitest'
import type { Frontiere } from '@opencad/api-parametrique'
import { filDeFer, rendu } from '../src/dessin.ts'

const anneau: Frontiere = {
  faces: [
    { sorte: 'cylindre', rayon: 20, bas: 0, haut: 8 },
    { sorte: 'cylindre', rayon: 17.5, bas: 0, haut: 8 },
    { sorte: 'couronne', rayonExt: 20, rayonInt: 17.5, y: 8 },
    { sorte: 'couronne', rayonExt: 20, rayonInt: 17.5, y: 0 },
  ],
}

describe('rendu b-rep', () => {
  it('lisse la paroi : la teinte est continue d’une bande à la suivante', () => {
    const bandes = rendu(anneau, 400, 300).faces.filter((face) => face.teintes?.length === 2)
    expect(bandes.length).toBeGreaterThan(8)
    expect(bandes[0].teintes![1]).toBeCloseTo(bandes[1].teintes![0])
    expect(bandes[0].teintes![0]).not.toBe(bandes[0].teintes![1])
  })

  it('décrit les cercles exacts au format du fil de fer B-rep', () => {
    const fil = filDeFer(anneau)
    expect(fil.position.array.length % 6).toBe(0)
    expect(fil.segmentCount).toBeGreaterThan(8)
    const rayons = new Set<number>()
    for (let i = 0; i < fil.position.array.length; i += 3) {
      rayons.add(Math.round(Math.hypot(fil.position.array[i], fil.position.array[i + 2]) * 10) / 10)
    }
    expect([...rayons].sort((a, b) => a - b)).toEqual([17.5, 20])
  })

  it('retire de la passe les points d’arête cachés par la paroi', () => {
    const dessin = rendu(anneau, 400, 300)
    expect(dessin.pointsMasques).toBeGreaterThan(0)
    expect(dessin.aretes.some((arete) => arete.length > 8)).toBe(true)
  })

  it('remplit les faces et trace le cercle extérieur en plus de huit points', () => {
    const dessin = rendu(anneau, 400, 300)
    expect(dessin.faces.length).toBeGreaterThan(0)
    expect(dessin.aretes.some((arete) => arete.length > 8)).toBe(true)
  })
})
