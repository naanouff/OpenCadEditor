import { describe, expect, it } from 'vitest'
import { Session } from '../src/session.ts'
import { solveurGcs } from '../src/solveurGcs.ts'
import type { Esquisse } from '../src/types.ts'

describe('solveur GCS', () => {
  it('résout un rectangle coté en quatre coins centrés', () => {
    const esquisse: Esquisse = {
      support: 'plan.dessus',
      entites: [{ id: 'r1', sorte: 'rectangle', degres: 0, largeur: '10', longueur: '20' }],
    }
    const out = solveurGcs.resoudre(esquisse, new Map())
    expect(out.statut).toBe('contraint')
    expect(out.degres).toBe(0)
    expect(out.ferme).toBe(true)
    expect(out.polylines).toHaveLength(1)
    const ids = out.polylines[0]!.points
    expect(ids).toHaveLength(5)
    const pts = Object.fromEntries(out.points.map((p) => [p.id, p]))
    expect(pts[ids[0]!]!.u).toBeCloseTo(-10)
    expect(pts[ids[0]!]!.v).toBeCloseTo(-5)
    expect(pts[ids[1]!]!.u).toBeCloseTo(10)
    expect(pts[ids[1]!]!.v).toBeCloseTo(-5)
    expect(pts[ids[2]!]!.u).toBeCloseTo(10)
    expect(pts[ids[2]!]!.v).toBeCloseTo(5)
  })

  it('signale sous-contraint si une cote manque', () => {
    const esquisse: Esquisse = {
      support: 'plan.dessus',
      entites: [{ id: 'r1', sorte: 'rectangle', degres: 1, longueur: '20' }],
    }
    const out = solveurGcs.resoudre(esquisse, new Map())
    expect(out.statut).toBe('sous-contraint')
    expect(out.degres).toBeGreaterThan(0)
  })

  it('signale surcontraint si deux distances conflictuelles sur le même côté', () => {
    const esquisse: Esquisse = {
      support: 'plan.dessus',
      entites: [{ id: 'r1', sorte: 'rectangle', degres: 0, largeur: '10', longueur: '20' }],
    }
    const out = solveurGcs.resoudre(esquisse, new Map(), {
      contraintesExtra: [
        { sorte: 'distance', a: 'r1.a', b: 'r1.b', valeur: 99 },
      ],
    })
    expect(out.statut).toBe('surcontraint')
  })

  it('un paramètre qui change la cote double la longueur résolue', () => {
    const esquisse: Esquisse = {
      support: 'plan.dessus',
      entites: [{ id: 'r', sorte: 'rectangle', degres: 0, largeur: 'l', longueur: 'L' }],
    }
    const a = solveurGcs.resoudre(esquisse, new Map([['L', '20'], ['l', '10']]))
    const b = solveurGcs.resoudre(esquisse, new Map([['L', '40'], ['l', '10']]))
    expect(a.statut).toBe('contraint')
    const ua = a.points.find((p) => p.id.endsWith('.b'))!.u
    const ub = b.points.find((p) => p.id.endsWith('.b'))!.u
    expect(ub).toBeCloseTo(ua * 2)
  })

  it('Session.etatEsquisse signale le statut pendant l’édition', () => {
    const session = new Session({ geometrie: false })
    session.executer(`
piece boite
param L 20
esquisse plan.dessus
rectangle
cote longueur L
`)
    const etat = session.etatEsquisse()
    expect(etat?.statut).toBe('sous-contraint')
    expect(etat?.degres).toBeGreaterThan(0)
    session.commande('cote largeur 10')
    expect(session.etatEsquisse()?.statut).toBe('contraint')
  })

  it('extrude un rectangle dès que le GCS le dit contraint (2 cotes)', () => {
    const session = new Session({ geometrie: false })
    expect(() =>
      session.executer(`
piece boite
esquisse plan.dessus
rectangle
cote largeur 10
cote longueur 20
extrude 5
`),
    ).not.toThrow()
    expect(session.historique().some((o) => o.type === 'extrude')).toBe(true)
  })

  it('etatEsquisseDepuis lit une esquisse déjà consommée', () => {
    const session = new Session({ geometrie: false })
    session.executer(`
piece boite
esquisse plan.dessus
rectangle
cote largeur 10
cote longueur 20
extrude 5
`)
    const index = session.historique().findIndex((o) => o.type === 'ouvrir')
    expect(session.etatEsquisse()).toBeNull()
    expect(session.etatEsquisseDepuis(index)?.statut).toBe('contraint')
  })
})
