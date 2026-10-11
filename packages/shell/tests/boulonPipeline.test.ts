import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { chargerKernel } from '../src/occt/chargerKernel.ts'
import { historiqueCompatibleOcct, maillagePipelineOcct } from '../src/occt/pipelineOcct.ts'

/** Préfixe tête hex + tige (sans `pas`) — sprint 35, test pipeline. */
const SCRIPT_TETE_HEX = `
piece boulon
param entreplat 13
param hauteur_tete 5.5
param diametre 8
param longueur 20
esquisse plan.dessus
hexagone
cote entreplat entreplat
extrude hauteur_tete
esquisse face.dessus
cercle
cote diametre diametre
extrude longueur
`.trim()

/** Script MCP cible : fût fileté plat puis tête hex sur face.dessus. */
export const SCRIPT_BOULON_M8 = `
piece boulon
param diametre 8
param diametre_ame 6.5
param longueur 30
param pas 1.25
param angle_filet 60
param angle_pointe 175
param entreplat 13
param hauteur_tete 5.5
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon diametre_ame / 2
cote hauteur 0
segment
cote rayon diametre_ame / 2
cote hauteur longueur
segment
cote rayon 0
cote hauteur longueur
revolution
pas
esquisse face.dessus
hexagone
cote entreplat entreplat
extrude hauteur_tete
`.trim()

describe('boulon pipeline OCCT', () => {
  it('compile hexagone + extrude', () => {
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_TETE_HEX)
    expect(historiqueCompatibleOcct(session.historique(), session.pointeCourante())).toBe(true)
  })

  it('compile polygone 6 comme alias hexagone', () => {
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_TETE_HEX.replace('hexagone', 'polygone 6'))
    expect(historiqueCompatibleOcct(session.historique(), session.pointeCourante())).toBe(true)
  })

  it('maille une tête hexagonale extrudée', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_TETE_HEX)
    const maille = maillagePipelineOcct(occt, session)
    expect(maille.indices.length).toBeGreaterThan(0)
    expect(maille.positions.length).toBeGreaterThan(0)
  }, 180_000)

  it('accepte le script boulon M8 (revolution + pas + tête hex)', () => {
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_BOULON_M8)
    expect(historiqueCompatibleOcct(session.historique(), session.pointeCourante())).toBe(true)
    expect(session.historique().some((o) => o.type === 'pas')).toBe(true)
    expect(session.historique().filter((o) => o.type === 'extrude')).toHaveLength(1)
  })

  it('maille le boulon M8 hybride (filet hôte + tête OCCT)', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_BOULON_M8)
    const maille = maillagePipelineOcct(occt, session)
    expect(maille.indices.length).toBeGreaterThan(100)
    let yMax = -Infinity
    for (let i = 1; i < maille.positions.length; i += 3) {
      yMax = Math.max(yMax, maille.positions[i]!)
    }
    // Fût 30 + tête 5.5
    expect(yMax).toBeGreaterThan(34)
    expect(yMax).toBeLessThan(37)
  }, 180_000)
})
