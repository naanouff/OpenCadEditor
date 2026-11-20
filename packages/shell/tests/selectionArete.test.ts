import { describe, expect, it } from 'vitest'
import { nommerAretes, type AreteKernel } from '../src/occt/aretesOcct.ts'
import { areteSousPointeur, SEUIL_ARETE_MM } from '../src/selectionArete.ts'

describe('arête sous le pointeur', () => {
  const edges: AreteKernel[] = [
    { id: 0, length: 20, midPoint: [0, 8, 10] },
    { id: 1, length: 20, midPoint: [0, 8, -10] },
    { id: 2, length: 8, midPoint: [10, 4, 10] },
    { id: 3, length: 20, midPoint: [0, 0, 10] },
  ]
  const nommees = nommerAretes(edges, 0, 8)

  it('nomme arete.haut quand le rayon passe par le milieu', () => {
    const nom = areteSousPointeur(
      nommees,
      { origine: [0, 8, -40], direction: [0, 0, 1] },
      SEUIL_ARETE_MM,
    )
    expect(nom).toBe('arete.haut')
  })

  it('ne nomme rien au centre de la face, loin des milieux', () => {
    const nom = areteSousPointeur(
      nommees,
      { origine: [-40, 8, 0], direction: [1, 0, 0] },
      SEUIL_ARETE_MM,
    )
    expect(nom).toBeNull()
  })
})
