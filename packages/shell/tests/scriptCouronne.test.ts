import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { chargerKernel } from '../src/occt/chargerKernel.ts'
import { maillagePipelineOcct } from '../src/occt/pipelineOcct.ts'
import { SCRIPT_COURONNE } from '../src/scriptCouronne.ts'

describe('script de couronne', () => {
  it('porte les cotes tube / tête alignées sur la carrure', () => {
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_COURONNE)
    expect(session.expression('diametre_tube')).toBe('4')
    expect(session.expression('longueur_tube')).toBe('2')
    expect(session.expression('diametre_tete')).toBe('7')
    expect(session.expression('hauteur_tete')).toBe('2')
    expect(session.historique().map((o) => o.type)).toContain('revolution')
  })

  it('révolution tube Ø4 + tête Ø7 hauteur totale 4 via OCCT', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_COURONNE)
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
    expect(yMax).toBeCloseTo(4, 1)
    expect(rayonMax).toBeCloseTo(3.5, 0)
    expect(indices.length / 3).toBeGreaterThan(40)
  }, 120_000)
})
