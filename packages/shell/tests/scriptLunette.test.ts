import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { chargerKernel } from '../src/occt/chargerKernel.ts'
import { maillagePipelineOcct } from '../src/occt/pipelineOcct.ts'
import { SCRIPT_LUNETTE } from '../src/scriptLunette.ts'

describe('script de lunette', () => {
  it('porte les cotes alignées sur la carrure', () => {
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_LUNETTE)
    expect(session.expression('diametre_exterieur')).toBe('36')
    expect(session.expression('diametre_ouverture')).toBe('30')
    expect(session.expression('hauteur')).toBe('1.2')
    expect(session.historique().map((o) => o.type)).toEqual([
      'param',
      'param',
      'param',
      'ouvrir',
      'cercle',
      'cote',
      'cercle',
      'concentrique',
      'cote',
      'extrude',
    ])
  })

  it('extrude un anneau Ø36 / Ø30 hauteur 1.2 via OCCT', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_LUNETTE)
    const { positions, indices } = maillagePipelineOcct(occt, session)
    expect(indices.length).toBeGreaterThan(0)
    let yMax = -Infinity
    let yMin = Infinity
    let rayonMax = 0
    let rayonInt = Infinity
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]!
      const y = positions[i + 1]!
      const z = positions[i + 2]!
      const r = Math.hypot(x, z)
      yMax = Math.max(yMax, y)
      yMin = Math.min(yMin, y)
      rayonMax = Math.max(rayonMax, r)
      if (r > 0.5) rayonInt = Math.min(rayonInt, r)
    }
    expect(yMin).toBeCloseTo(0, 1)
    expect(yMax).toBeCloseTo(1.2, 1)
    expect(rayonMax).toBeCloseTo(18, 0)
    expect(rayonInt).toBeCloseTo(15, 0)
  }, 120_000)
})
