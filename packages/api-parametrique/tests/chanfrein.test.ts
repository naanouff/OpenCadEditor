import { describe, expect, it } from 'vitest'
import { TYPES_FONCTION, indexFonctionParRang } from '../src/historique.ts'
import { Session } from '../src/session.ts'

describe('chanfrein', () => {
  it('enregistre le verbe et les sélecteurs', () => {
    const session = new Session({ geometrie: false })
    session.executer(`
piece boite
esquisse plan.dessus
rectangle
cote largeur 20
cote longueur 20
cote ecart 0
extrude 8
chanfrein 1 arete.bas
`)
    const op = session.historique().find((o) => o.type === 'chanfrein')
    expect(op?.arguments.expression).toBe('1')
    expect(op?.arguments.aretes).toBe('arete.bas')
    expect(TYPES_FONCTION.has('chanfrein')).toBe(true)
    expect(indexFonctionParRang(session.historique(), 2)).toBe(
      session.historique().findIndex((o) => o.type === 'chanfrein'),
    )
  })

  it('refuse un sélecteur inconnu', () => {
    const session = new Session({ geometrie: false })
    session.executer(`
piece boite
esquisse plan.dessus
rectangle
cote largeur 20
cote longueur 20
cote ecart 0
extrude 8
`)
    expect(() => session.commande('chanfrein 1 arete.foo')).toThrow(/sélecteur/)
  })
})
