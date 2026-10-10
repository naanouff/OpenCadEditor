import { describe, expect, it } from 'vitest'
import {
  datumsOrigine,
  datumParId,
  estDatumOrigine,
  gcsVersMonde,
  uvVersMonde,
} from '../src/datums.ts'
import { REPERE_REFERENCE } from '../src/types.ts'

describe('datums d’origine', () => {
  it('expose les trois plans depuis le repère document', () => {
    const ids = datumsOrigine(REPERE_REFERENCE).map((d) => d.id)
    expect(ids).toEqual(['plan.dessus', 'plan.12h', 'plan.3h'])
    expect(datumsOrigine().map((d) => d.libelle)).toEqual(['Plan dessus', 'Plan 12h', 'Plan 3h'])
  })

  it('garde U × V = normale', () => {
    for (const d of datumsOrigine()) {
      const cx = d.axeU[1] * d.axeV[2] - d.axeU[2] * d.axeV[1]
      const cy = d.axeU[2] * d.axeV[0] - d.axeU[0] * d.axeV[2]
      const cz = d.axeU[0] * d.axeV[1] - d.axeU[1] * d.axeV[0]
      expect(cx).toBeCloseTo(d.normale[0], 9)
      expect(cy).toBeCloseTo(d.normale[1], 9)
      expect(cz).toBeCloseTo(d.normale[2], 9)
    }
  })

  it('mappe UV → monde (affichage) et GCS → monde (wires)', () => {
    const dessus = datumParId('plan.dessus')!
    expect(uvVersMonde(dessus, 3, 4, 8)).toEqual([3, 8, -4])
    expect(gcsVersMonde(dessus, 3, 4, 8)).toEqual([3, 8, 4])
    const trois = datumParId('plan.3h')!
    expect(uvVersMonde(trois, 2, 5, 1)).toEqual([1, 2, 5])
    expect(gcsVersMonde(trois, 2, 5, 1)).toEqual([1, 2, 5])
  })

  it('reconnaît les datums d’origine', () => {
    expect(estDatumOrigine('plan.dessus')).toBe(true)
    expect(estDatumOrigine('face.dessus')).toBe(false)
  })
})
