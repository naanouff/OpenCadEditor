import { describe, expect, it } from 'vitest'
import { Session } from '../src/session.ts'
import { solveurGcs } from '../src/solveurGcs.ts'
import type { Esquisse } from '../src/types.ts'

describe('octogone', () => {
  it('contraint un octogone dès la cote entreplat', () => {
    const esquisse: Esquisse = {
      support: 'plan.dessus',
      entites: [{ id: 'o0', sorte: 'octogone', degres: 0, entreplat: '13' }],
    }
    const out = solveurGcs.resoudre(esquisse, new Map())
    expect(out.statut).toBe('contraint')
    expect(out.ferme).toBe(true)
    expect(out.points).toHaveLength(8)
    const us = out.points.map((p) => p.u)
    const vs = out.points.map((p) => p.v)
    expect(Math.max(...us) - Math.min(...us)).toBeCloseTo(13, 5)
    expect(Math.max(...vs) - Math.min(...vs)).toBeCloseTo(13, 5)
  })

  it('extrude une tête octogonale puis une tige', () => {
    const session = new Session({ geometrie: false })
    session.executer(`
piece boulon
param entreplat 13
param hauteur_tete 5.5
param diametre 8
param longueur 30
esquisse plan.dessus
octogone
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
