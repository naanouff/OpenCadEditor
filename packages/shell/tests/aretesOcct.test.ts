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

  it('sélectionne les arêtes verticales d’une poche, pas celles du bord', () => {
    const plateau: AreteKernel[] = [
      { id: 0, length: 15, midPoint: [250, 7.5, 175], ends: [250, 0, 175, 250, 15, 175], line: true },
      { id: 1, length: 10, midPoint: [235, 10, 160], ends: [235, 5, 160, 235, 15, 160], line: true },
      { id: 2, length: 10, midPoint: [-235, 10, 160], ends: [-235, 15, 160, -235, 5, 160], line: true },
      { id: 3, length: 470, midPoint: [0, 5, 160], ends: [-235, 5, 160, 235, 5, 160], line: true },
      { id: 4, length: 10, midPoint: [100, 10, 0], ends: [100, 5, 0, 100, 15, 0], line: false },
    ]
    expect(indicesDepuisSelecteurs(plateau, ['arete.poche'], 0, 15)).toEqual([1, 2])
    expect(indicesDepuisSelecteurs(plateau, ['arete.vertical'], 0, 15)).toEqual([0])
  })

  it('sélectionne le pourtour d’une extrusion en Z et le fond d’une poche', () => {
    const bords: AreteKernel[] = [
      { id: 0, length: 40, midPoint: [0, 0, 0], ends: [-20, 0, 0, 20, 0, 0], line: true },
      { id: 1, length: 40, midPoint: [0, 65, 16], ends: [-20, 65, 16, 20, 65, 16], line: true },
      { id: 2, length: 16, midPoint: [20, 0, 8], ends: [20, 0, 0, 20, 0, 16], line: true },
      { id: 3, length: 30, midPoint: [0, 5, 0], ends: [-15, 5, 0, 15, 5, 0], line: true },
    ]
    expect(indicesDepuisSelecteurs(bords, ['arete.tranche'], 0, 65)).toEqual([0, 1, 3])
    // Le fond d’un lamage est dans un plan de Z constant, mais pas sur une face d’extrémité.
    const lamage = [...bords, { id: 5, length: 13, midPoint: [0, 4, 2.5], ends: [4, 0, 2.5, -4, 0, 2.5], line: false }]
    expect(indicesDepuisSelecteurs(lamage, ['arete.tranche'], 0, 65)).toEqual([0, 1, 3])
    expect(indicesDepuisSelecteurs(bords, ['arete.fond'], 0, 65)).toEqual([3])
    expect(indicesDepuisSelecteurs(bords, ['arete.bas'], 0, 65)).toEqual([0, 2])
  })
})
