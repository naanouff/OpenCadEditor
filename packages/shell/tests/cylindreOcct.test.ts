import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { chargerKernel } from '../src/occt/chargerKernel.ts'
import { maillagePipelineOcct } from '../src/occt/pipelineOcct.ts'
import { SCRIPT_BOITE } from '../src/scriptBoite.ts'
import { segmentsBrep } from '../src/selectionSegment.ts'

const RAYON_TROU = 4

describe('cercle d’esquisse en OCCT', () => {
  it('perce un vrai cylindre : une face de paroi, aucune arête le long du trou', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_BOITE)
    const maille = maillagePipelineOcct(occt, session)
    const paroi = new Set<number>()
    for (let t = 0; t < maille.indices.length / 3; t++) {
      const surParoi = [0, 1, 2].every((k) => {
        const s = maille.indices[t * 3 + k]! * 3
        return Math.abs(Math.hypot(maille.positions[s]!, maille.positions[s + 2]!) - RAYON_TROU) < 1e-3
      })
      if (surParoi) paroi.add(maille.faces![t]!)
    }
    expect(paroi.size).toBeGreaterThan(0)
    expect(paroi.size).toBeLessThanOrEqual(2)
    const verticaux = segmentsBrep(maille).filter(
      (s) =>
        Math.abs(s.a[0] - s.b[0]) < 1e-6 &&
        Math.abs(s.a[2] - s.b[2]) < 1e-6 &&
        Math.abs(Math.hypot(s.a[0], s.a[2]) - RAYON_TROU) < 1e-3,
    )
    expect(verticaux).toHaveLength(0)
  }, 180_000)
})
