import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { SCRIPT_CARRURE } from '../src/scriptCarrure.ts'

/** Cotes relevées sur documentation/references/plan01.jpg. */
describe('script de carrure', () => {
  it('porte les cotes du plan Oyster', () => {
    const session = new Session()
    session.executer(SCRIPT_CARRURE)
    expect(session.expression('diametre_boite')).toBe('36')
    expect(session.expression('entrecorne')).toBe('20')
    expect(session.expression('longueur_corne')).toBe('4.5')
    expect(session.expression('diametre_barrette')).toBe('0.9')
    expect(session.expression('diametre_tige')).toBe('3')
    expect(session.expression('epaisseur_bout')).toBe('2')
  })

  it('tient le corne à corne de 45 mm, bout de 2 mm sous la mi-hauteur', () => {
    const session = new Session()
    session.executer(SCRIPT_CARRURE)
    const boite = session.frontiere().faces.find((face) => face.sorte === 'boite' && face.zmax > 0)!
    expect(boite.zmax).toBeCloseTo(22.5, 5)
    expect(boite.elevation).toMatchObject({ plongee: 3.2, epaisseurBout: 2 })
    const { positions, indices } = session.maillage()
    expect(indices.length).toBeGreaterThan(0)
    let yMinAuBout = 8
    let yMaxAuBout = 0
    for (let i = 0; i < positions.length; i += 3) {
      if (Math.abs(positions[i + 2]) < 22) continue
      yMinAuBout = Math.min(yMinAuBout, positions[i + 1])
      yMaxAuBout = Math.max(yMaxAuBout, positions[i + 1])
    }
    expect(yMinAuBout).toBeGreaterThan(3)
    expect(yMinAuBout).toBeLessThan(3.6)
    expect(yMaxAuBout).toBeLessThan(5.3)
    expect(yMaxAuBout).toBeGreaterThan(4.4)
  })
})
