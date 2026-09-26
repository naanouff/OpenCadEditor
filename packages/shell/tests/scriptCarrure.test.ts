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
    expect(session.expression('plongee_bout')).toBe('1.2')
    expect(session.expression('amorce_dessus')).toBe('3.5')
    expect(session.expression('rayon_bout_haut')).toBe('0.4')
    expect(session.expression('rayon_bout_bas')).toBe('0.2')
  })

  it('tient le corne à corne de 45 mm, le dessus descend avant la peau et le bout plonge', () => {
    const session = new Session()
    session.executer(SCRIPT_CARRURE)
    const boite = session.frontiere().faces.find((face) => face.sorte === 'boite' && face.zmax > 0)!
    expect(boite.zmax).toBeCloseTo(22.5, 5)
    expect(boite.elevation).toMatchObject({ plongee: 1.2, epaisseurBout: 2, amorce: 3.5 })
    const { positions, indices } = session.maillage()
    expect(indices.length).toBeGreaterThan(0)
    let yMinAuBout = 8
    let yMaxAuBout = 0
    let yMaxAuMilieu = 0
    let yMaxALaPeau = 0
    let yEntrecorne = 0
    let platCentral = 0
    for (let i = 0; i < positions.length; i += 3) {
      const x = Math.abs(positions[i])
      const y = positions[i + 1]
      const u = Math.abs(positions[i + 2])
      if (u > 11 && u < 13 && Math.abs(y - 8) < 0.15) platCentral += 1
      if (x < 6 && u > 16.5 && Math.hypot(x, u) > 17) yEntrecorne = Math.max(yEntrecorne, y)
      if (x > 9 && u > 17.8 && u < 18.3) yMaxALaPeau = Math.max(yMaxALaPeau, y)
      if (u > 19.9 && u < 20.3) yMaxAuMilieu = Math.max(yMaxAuMilieu, y)
      if (u < 22.35) continue
      yMinAuBout = Math.min(yMinAuBout, y)
      yMaxAuBout = Math.max(yMaxAuBout, y)
    }
    expect(platCentral).toBeGreaterThan(0)
    expect(yEntrecorne).toBeGreaterThan(7.8)
    expect(yMaxALaPeau).toBeGreaterThan(5)
    expect(yMaxALaPeau).toBeLessThan(6.6)
    expect(yMaxAuMilieu).toBeGreaterThan(3.4)
    expect(yMaxAuMilieu).toBeLessThan(5)
    expect(yMinAuBout).toBeGreaterThan(1)
    expect(yMinAuBout).toBeLessThan(1.7)
    expect(yMaxAuBout).toBeGreaterThan(2.6)
    expect(yMaxAuBout).toBeLessThan(3.4)
  })

  it('garde le dessus fermé : rien au-dessus du plat, rien à travers le trou de lunette', () => {
    const session = new Session()
    session.executer(SCRIPT_CARRURE)
    const { positions, indices } = session.maillage()
    const rayonJupe = Number(session.expression('diametre_lunette')) / 2
    let auDessusDuPlat = 0
    let aTraversLeTrou = 0
    for (let t = 0; t < indices.length; t += 3) {
      const sommets = [0, 1, 2].map((k) => {
        const i = indices[t + k] * 3
        return { x: positions[i], y: positions[i + 1], z: positions[i + 2] }
      })
      if (sommets.every((p) => p.y > 8.05)) auDessusDuPlat += 1
      if (sommets.every((p) => Math.hypot(p.x, p.z) < rayonJupe - 0.4 && p.y > 7)) aTraversLeTrou += 1
    }
    expect(auDessusDuPlat).toBe(0)
    expect(aTraversLeTrou).toBe(0)
  })
})
