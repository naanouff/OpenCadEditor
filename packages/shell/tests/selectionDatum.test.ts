import { describe, expect, it } from 'vitest'
import {
  axeSousPointeur,
  contourPlan,
  DEMI_DATUM_MM,
  planSousPointeur,
  traitAxe,
} from '../src/selectionDatum.ts'

describe('datums viewport', () => {
  it('dessine un carré pour chaque plan et une triad', () => {
    expect(contourPlan('plan.dessus').length).toBe(24)
    expect(traitAxe('axe.y')).toEqual([0, 0, 0, 0, DEMI_DATUM_MM, 0])
  })

  it('choisit plan.dessus pour un rayon vertical dans le carré', () => {
    expect(planSousPointeur({ origine: [2, 30, -2], direction: [0, -1, 0] })).toBe('plan.dessus')
  })

  it('rate un rayon hors du carré', () => {
    expect(planSousPointeur({ origine: [200, 30, 0], direction: [0, -1, 0] })).toBeNull()
  })

  it('choisit l’axe X quand le rayon le longe', () => {
    expect(axeSousPointeur({ origine: [10, 0.2, 0], direction: [0, -1, 0] }, 1.2)).toBe('axe.x')
  })
})
