import { describe, expect, it } from 'vitest'
import { indicesDepuisSelecteurs, nommerAretes, type AreteKernel } from '../src/occt/aretesOcct.ts'

describe('aretesOcct', () => {
  const edges: AreteKernel[] = [
    { id: 0, length: 20, midPoint: [0, 8, 10] },
    { id: 1, length: 20, midPoint: [0, 8, -10] },
    { id: 2, length: 8, midPoint: [10, 4, 10] },
    { id: 3, length: 20, midPoint: [0, 0, 10] },
  ]

  it('sélectionne arete.haut / bas / vertical', () => {
    expect(indicesDepuisSelecteurs(edges, ['arete.haut'], 0, 8)).toEqual([0, 1])
    expect(indicesDepuisSelecteurs(edges, ['arete.bas'], 0, 8)).toEqual([3])
    expect(indicesDepuisSelecteurs(edges, ['arete.vertical'], 0, 8)).toEqual([2])
  })

  it('nomme les mêmes classes, et les garde quand la hauteur change', () => {
    const nommees = nommerAretes(edges, 0, 8)
    expect(nommees.map((a) => a.id)).toEqual(['arete.haut', 'arete.bas', 'arete.vertical'])
    expect(nommees.find((a) => a.id === 'arete.haut')?.indices).toEqual([0, 1])

    const plusHaut: AreteKernel[] = edges.map((e) =>
      e.midPoint[1] === 8 ? { ...e, midPoint: [e.midPoint[0], 12, e.midPoint[2]] } : e,
    )
    const apres = nommerAretes(plusHaut, 0, 12)
    expect(apres.find((a) => a.id === 'arete.haut')?.indices).toEqual([0, 1])
    expect(apres.find((a) => a.id === 'arete.bas')?.indices).toEqual([3])
  })
})
