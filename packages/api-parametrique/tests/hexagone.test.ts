import { describe, expect, it } from 'vitest'
import { Session } from '../src/session.ts'
import { solveurGcs } from '../src/solveurGcs.ts'
import type { Esquisse } from '../src/types.ts'

/** Sprint 35 — miroir de `octogone.test.ts` (tests rouges tant que `hexagone` n’est pas branché). */
describe('hexagone', () => {
  it('contraint un hexagone dès la cote entreplat', () => {
    const esquisse: Esquisse = {
      support: 'plan.dessus',
      entites: [{ id: 'h0', sorte: 'hexagone', degres: 0, entreplat: '13' }],
    }
    const out = solveurGcs.resoudre(esquisse, new Map())
    expect(out.statut).toBe('contraint')
    expect(out.ferme).toBe(true)
    expect(out.points).toHaveLength(6)
    const us = out.points.map((p) => p.u)
    const vs = out.points.map((p) => p.v)
    // Flat-top : entreplat en largeur ; pointe à pointe en hauteur = entreplat / cos(π/6)
    expect(Math.max(...us) - Math.min(...us)).toBeCloseTo(13, 5)
    expect(Math.max(...vs) - Math.min(...vs)).toBeCloseTo(13 / Math.cos(Math.PI / 6), 5)
  })

  it('extrude une tête hexagonale puis une tige', () => {
    const session = new Session({ geometrie: false })
    session.executer(`
piece boulon
param entreplat 13
param hauteur_tete 5.5
param diametre 8
param longueur 30
esquisse plan.dessus
hexagone
cote entreplat entreplat
extrude hauteur_tete
esquisse face.dessous
cercle
cote diametre diametre
extrude longueur
`)
    expect(session.pieceCourante()).toBe('boulon')
    expect(session.historique().filter((o) => o.type === 'extrude')).toHaveLength(2)
    expect(session.etatEsquisse()).toBeNull()
  })
})
