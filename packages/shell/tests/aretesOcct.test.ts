import { describe, expect, it } from 'vitest'
import { indicesDepuisSelecteurs, type AreteKernel } from '../src/occt/aretesOcct.ts'

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
})
