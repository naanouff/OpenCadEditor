import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { chargerKernel } from '../src/occt/chargerKernel.ts'
import { maillagePipelineOcct } from '../src/occt/pipelineOcct.ts'

function largeurX(maille: { positions: number[] }) {
  let xmin = Infinity
  let xmax = -Infinity
  for (let i = 0; i < maille.positions.length; i += 3) {
    xmin = Math.min(xmin, maille.positions[i]!)
    xmax = Math.max(xmax, maille.positions[i]!)
  }
  return xmax - xmin
}

describe('GCS → pipeline OCCT', () => {
  it('agrandit l’extrusion quand la cote longueur change', async () => {
    const occt = await chargerKernel()
    const script = (L: number) => `
piece boite
param L ${L}
param l 10
esquisse plan.dessus
rectangle
cote largeur l
cote longueur L
extrude 8
`
    const a = new Session({ geometrie: false })
    a.executer(script(20))
    const b = new Session({ geometrie: false })
    b.executer(script(40))
    const ma = maillagePipelineOcct(occt, a)
    const mb = maillagePipelineOcct(occt, b)
    expect(largeurX(mb)).toBeGreaterThan(largeurX(ma) * 1.5)
  }, 120_000)
})
