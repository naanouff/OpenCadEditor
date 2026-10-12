import { describe, expect, it } from 'vitest'
import {
  diametreDepuisUv,
  pointSurPlan,
  rayonVersMm,
  uvDepuisMonde,
} from '../src/esquissePointeur.ts'
import { SCRIPT_BOITE } from '../src/scriptBoite.ts'
import { storeShell } from '../src/storeShell.ts'

describe('esquisse pointeur (P4)', () => {
  it('convertit un rayon mètres → mm', () => {
    const mm = rayonVersMm({ origine: [0.01, 0.02, 0], direction: [0, -1, 0] })
    expect(mm.origine[0]).toBeCloseTo(10)
    expect(mm.origine[1]).toBeCloseTo(20)
  })

  it('projette sur face.dessus et lit UV', () => {
    const hit = pointSurPlan(
      { origine: [3, 20, -4], direction: [0, -1, 0] },
      'face.dessus',
      8,
    )
    expect(hit).not.toBeNull()
    expect(hit![1]).toBeCloseTo(8)
    const { u, v } = uvDepuisMonde(hit!, 'face.dessus', 8)
    expect(u).toBeCloseTo(3)
    expect(v).toBeCloseTo(4) // axeV = (0,0,-1) → v = -(-4) = 4
  })

  it('accroche le diamètre au millimètre', () => {
    expect(diametreDepuisUv(4, 0)).toBe(8)
    expect(diametreDepuisUv(3.2, 0)).toBe(6)
    expect(diametreDepuisUv(0, 0)).toBe(1)
  })

  it('pose cercle + cote diametre sur esquisse ouverte', () => {
    const avantPoche = SCRIPT_BOITE.split('esquisse face.dessus')[0]!
    storeShell.executer(avantPoche)
    storeShell.ligne('esquisse face.dessus')
    expect(storeShell.poserCercleDiametre(8)).toBe(true)
    const posee = storeShell.hote().session.esquisseCourante()
    expect(posee?.cercles.some((c) => c.valeur === 8)).toBe(true)
    // extrude 8 → face.dessus à y=8 (pas 0), sinon la grille « disparaît » hors vue
    expect(posee?.cercles[0]?.y).toBeCloseTo(8)
  })
})
