import { describe, expect, it } from 'vitest'
import { RATIO_PIXELS_MAX, veilleurRatioPixels } from '../src/ratioPixels.ts'

describe('ratio de pixels', () => {
  it('rappelle une fois par changement de ratio', () => {
    let ratio = 1
    let appels = 0
    const veiller = veilleurRatioPixels(() => appels++, () => ratio)
    veiller()
    expect(appels).toBe(0)
    ratio = 1.5
    veiller()
    veiller()
    expect(appels).toBe(1)
    ratio = 2.5
    veiller()
    expect(appels).toBe(2)
  })

  it('plafonne le ratio', () => {
    expect(RATIO_PIXELS_MAX).toBe(2)
  })
})
