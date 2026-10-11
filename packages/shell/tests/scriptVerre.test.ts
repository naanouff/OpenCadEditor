import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { chargerKernel } from '../src/occt/chargerKernel.ts'
import { maillagePipelineOcct } from '../src/occt/pipelineOcct.ts'
import { SCRIPT_VERRE } from '../src/scriptVerre.ts'

describe('script de verre', () => {
  it('porte les cotes alignées sur l’ouverture lunette', () => {
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_VERRE)
    expect(session.expression('diametre')).toBe('30')
    expect(session.expression('epaisseur')).toBe('0.8')
    expect(session.historique().map((o) => o.type)).toEqual([
      'param',
      'param',
      'ouvrir',
      'cercle',
      'cote',
      'extrude',
    ])
  })

  it('extrude un disque Ø30 épaisseur 0.8 via OCCT', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_VERRE)
    const { positions, indices } = maillagePipelineOcct(occt, session)
    expect(indices.length).toBeGreaterThan(0)
    let yMax = -Infinity
    let yMin = Infinity
    let rayonMax = 0
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]!
      const y = positions[i + 1]!
      const z = positions[i + 2]!
      const r = Math.hypot(x, z)
      yMax = Math.max(yMax, y)
      yMin = Math.min(yMin, y)
      rayonMax = Math.max(rayonMax, r)
    }
    expect(yMin).toBeCloseTo(0, 1)
    expect(yMax).toBeCloseTo(0.8, 1)
    expect(rayonMax).toBeCloseTo(15, 0)
    expect(indices.length / 3).toBeGreaterThan(20)
  }, 120_000)
})
