import { describe, expect, it } from 'vitest'
import { Session } from '../src/session.ts'

const BOITE = `
piece boite
esquisse plan.dessus
rectangle
cote largeur 10
cote longueur 20
cote ecart 0
extrude 8
`

describe('réglage d’une fonction', () => {
  it('remplace l’expression, et l’annulation la rend', () => {
    const session = new Session({ geometrie: false })
    session.executer(BOITE)
    const index = session.historique().findIndex((op) => op.type === 'extrude')
    session.commande('regle 1 12')
    expect(session.historique()[index]?.arguments.expression).toBe('12')
    expect(session.historique().filter((op) => op.type === 'extrude')).toHaveLength(1)
    session.annuler()
    expect(session.historique()[index]?.arguments.expression).toBe('8')
    session.refaire()
    expect(session.historique()[index]?.arguments.expression).toBe('12')
  })

  it('rejoue le même script en une session neuve', () => {
    const session = new Session({ geometrie: false })
    session.executer(`${BOITE}\nregle 1 h + 4\n`.replace('piece boite', 'piece boite\nparam h 8'))
    const extrusion = session.historique().find((op) => op.type === 'extrude')
    expect(extrusion?.arguments.expression).toBe('h + 4')
  })

  it('refuse un rang hors fonction et une expression vide', () => {
    const session = new Session({ geometrie: false })
    session.executer(BOITE)
    expect(() => session.commande('regle 2 12')).toThrow(/rang de fonction invalide/)
    expect(() => session.commande('regle 1')).toThrow(/expression vide/)
    const extrusion = session.historique().find((op) => op.type === 'extrude')
    expect(extrusion?.arguments.expression).toBe('8')
  })
})
