import { describe, expect, it } from 'vitest'
import { boite, coque, cylindre, difference, union } from '@opencad/api-parametrique'
import { aretesVives } from '../src/dessin.ts'

const anneau = coque([
  { sorte: 'cylindre', rayon: 20, bas: 0, haut: 8, dehors: 1 },
  { sorte: 'cylindre', rayon: 17.5, bas: 0, haut: 8, dehors: -1 },
  { sorte: 'couronne', rayonExt: 20, rayonInt: 17.5, y: 8, dehors: 1 },
  { sorte: 'couronne', rayonExt: 20, rayonInt: 17.5, y: 0, dehors: -1 },
])

describe('arêtes vives', () => {
  it('garde les douze arêtes d’un cube', () => {
    const cube = boite({ xmin: 0, xmax: 2, ymin: 0, ymax: 2, zmin: 0, zmax: 2 })
    expect(aretesVives(cube).length / 6).toBe(12)
  })

  it('laisse la paroi lisse d’un cylindre, garde ses deux cercles', () => {
    const barreau = cylindre({ axe: 'x', rayon: 2, debut: 0, fin: 5, a: 0, b: 0, segments: 24 })
    expect(aretesVives(barreau).length / 6).toBe(48)
  })

  it('trace le raccord d’une corne, absent de l’anneau nu', () => {
    const corne = boite({ xmin: 10, xmax: 14, ymin: 0, ymax: 8, zmin: 14.2, zmax: 25 })
    const avec = aretesVives(union(anneau, corne))
    const sans = aretesVives(anneau)
    // Le raccord donne des arêtes verticales sur la paroi. L'anneau lisse n'a que ses cercles.
    const auRaccord = (segments: number[]) => {
      let compte = 0
      for (let i = 0; i < segments.length; i += 6) {
        const rayon = Math.hypot(segments[i], segments[i + 2])
        const verticale = Math.abs(segments[i + 4] - segments[i + 1])
        const horizontale = Math.hypot(segments[i + 3] - segments[i], segments[i + 5] - segments[i + 2])
        if (rayon > 19.5 && rayon < 20.5 && verticale > 0.5 && horizontale < 0.1) compte += 1
      }
      return compte
    }
    expect(auRaccord(avec)).toBeGreaterThan(0)
    expect(auRaccord(sans)).toBe(0)
  })

  it('ouvre le trou percé dans la corne', () => {
    const corne = boite({ xmin: 10, xmax: 14, ymin: 0, ymax: 8, zmin: 14.2, zmax: 25 })
    const trou = cylindre({ axe: 'x', rayon: 0.75, debut: 9.5, fin: 14.5, a: 4, b: 22.5 })
    expect(aretesVives(difference(corne, trou)).length).toBeGreaterThan(aretesVives(corne).length)
  })
})
