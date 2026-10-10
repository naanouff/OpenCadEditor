import { describe, expect, it } from 'vitest'
import { chargerKernel } from '../src/occt/chargerKernel.ts'
import { corpsLisseOcct, maillageVisHybride, solideVisOcct, solideVisOcctSansPozi } from '../src/occt/construireVis.ts'

function stats(maille: { positions: number[] }) {
  let yMax = -Infinity
  let rayonMax = 0
  for (let i = 0; i < maille.positions.length; i += 3) {
    yMax = Math.max(yMax, maille.positions[i + 1]!)
    rayonMax = Math.max(rayonMax, Math.hypot(maille.positions[i]!, maille.positions[i + 2]!))
  }
  return { yMax, rayonMax, sommets: maille.positions.length / 3 }
}

describe('construireVis OCCT', () => {
  it('tourne corps et tête, coupe la Pozi', async () => {
    const occt = await chargerKernel()
    const sans = solideVisOcctSansPozi(occt)
    const maille = solideVisOcct(occt)
    const { yMax, rayonMax, sommets } = stats(maille)
    expect(sommets).toBeGreaterThan(100)
    expect(yMax).toBeCloseTo(30, 0)
    expect(rayonMax).toBeCloseTo(6, 0)
    expect(maille.indices.length).toBeGreaterThan(sans.indices.length)
  }, 120_000)

  it('greffe le filet hôte sur la tête OCCT', async () => {
    const occt = await chargerKernel()
    const maille = maillageVisHybride(occt)
    const { yMax, rayonMax } = stats(maille)
    expect(yMax).toBeCloseTo(30, 0)
    expect(rayonMax).toBeCloseTo(6, 0)
    let crete = false
    let ame = false
    for (let i = 0; i < maille.positions.length; i += 3) {
      const y = maille.positions[i + 1]!
      const r = Math.hypot(maille.positions[i]!, maille.positions[i + 2]!)
      if (y > 14 && y < 24 && Math.abs(r - 3) < 0.1) crete = true
      if (y > 14 && y < 24 && Math.abs(r - 1.75) < 0.2) ame = true
    }
    expect(crete).toBe(true)
    expect(ame).toBe(true)
    expect(corpsLisseOcct(occt).positions.length).toBeGreaterThan(0)
  }, 180_000)
})
