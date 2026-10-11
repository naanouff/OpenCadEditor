import { describe, expect, it } from 'vitest'
import { Session } from '../src/session.ts'
import { solveurGcs } from '../src/solveurGcs.ts'
import type { Esquisse } from '../src/types.ts'

describe('polygone', () => {
  it('contraint un pentagone dès la cote entreplat', () => {
    const esquisse: Esquisse = {
      support: 'plan.dessus',
      entites: [{ id: 'p0', sorte: 'polygone', degres: 0, pans: 5, entreplat: '13' }],
    }
    const out = solveurGcs.resoudre(esquisse, new Map())
    expect(out.statut).toBe('contraint')
    expect(out.ferme).toBe(true)
    expect(out.points).toHaveLength(5)
    const r = 13 / (2 * Math.cos(Math.PI / 5))
    expect(Math.hypot(out.points[0]!.u, out.points[0]!.v)).toBeCloseTo(r, 5)
  })

  it('refuse moins de trois pans', () => {
    const session = new Session({ geometrie: false })
    expect(() => session.commande('piece p')).not.toThrow()
    session.commande('esquisse plan.dessus')
    expect(() => session.commande('polygone 2')).toThrow(/pans/)
  })

  it('hexagone reste un alias de polygone 6', () => {
    const session = new Session({ geometrie: false })
    session.executer(`
piece tete
param entreplat 13
esquisse plan.dessus
polygone 6
cote entreplat entreplat
extrude 5
`)
    expect(session.historique().some((o) => o.type === 'polygone' && o.arguments.pans === '6')).toBe(true)
    expect(session.historique().filter((o) => o.type === 'extrude')).toHaveLength(1)
  })
})
