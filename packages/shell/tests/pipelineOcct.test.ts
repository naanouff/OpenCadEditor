import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { chargerKernel } from '../src/occt/chargerKernel.ts'
import { maillagePipelineOcct } from '../src/occt/pipelineOcct.ts'
import { SCRIPT_VIS } from '../src/scriptVis.ts'

function stats(maille: { positions: number[] }) {
  let yMax = -Infinity
  let rayonMax = 0
  for (let i = 0; i < maille.positions.length; i += 3) {
    yMax = Math.max(yMax, maille.positions[i + 1]!)
    rayonMax = Math.max(rayonMax, Math.hypot(maille.positions[i]!, maille.positions[i + 2]!))
  }
  return { yMax, rayonMax, triangles: maille.positions.length > 0 ? 0 : 0 }
}

describe('pipeline historique → OCCT', () => {
  it('extrude un rectangle sans script pièce', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(`
piece boite
esquisse plan.dessus
rectangle
cote largeur 10
cote longueur 20
cote ecart 0
extrude 8
`)
    const maille = maillagePipelineOcct(occt, session)
    expect(maille.indices.length).toBeGreaterThan(0)
    const { yMax } = stats(maille)
    expect(yMax).toBeGreaterThan(7)
    expect(yMax).toBeLessThan(9)
  }, 120_000)

  it('reconstruit la vis via le pipeline (hybride pas)', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_VIS)
    const maille = maillagePipelineOcct(occt, session)
    const { yMax, rayonMax } = stats(maille)
    expect(yMax).toBeCloseTo(30, 0)
    expect(rayonMax).toBeCloseTo(6, 0)
    let crete = false
    for (let i = 0; i < maille.positions.length; i += 3) {
      const y = maille.positions[i + 1]!
      const r = Math.hypot(maille.positions[i]!, maille.positions[i + 2]!)
      if (y > 14 && y < 24 && Math.abs(r - 3) < 0.15) crete = true
    }
    expect(crete).toBe(true)
  }, 180_000)

  it('pointe avant pas : pas de filet dans le maillage OCCT', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_VIS)
    session.commande('pointe 1')
    const maille = maillagePipelineOcct(occt, session)
    let crete = false
    for (let i = 0; i < maille.positions.length; i += 3) {
      const y = maille.positions[i + 1]!
      const r = Math.hypot(maille.positions[i]!, maille.positions[i + 2]!)
      if (y > 14 && y < 24 && Math.abs(r - 3) < 0.15) crete = true
    }
    expect(crete).toBe(false)
    expect(stats(maille).rayonMax).toBeLessThan(3.5)
  }, 180_000)
})
