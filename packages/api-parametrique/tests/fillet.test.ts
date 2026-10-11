import { describe, expect, it } from 'vitest'
import { TYPES_FONCTION, indexFonctionParRang } from '../src/historique.ts'
import { Session } from '../src/session.ts'

describe('fillet', () => {
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
fillet 1 arete.haut
`)
    const op = session.historique().find((o) => o.type === 'fillet')
    expect(op?.arguments.expression).toBe('1')
    expect(op?.arguments.aretes).toBe('arete.haut')
    expect(TYPES_FONCTION.has('fillet')).toBe(true)
    expect(indexFonctionParRang(session.historique(), 2)).toBe(
      session.historique().findIndex((o) => o.type === 'fillet'),
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
    expect(() => session.commande('fillet 1 arete.foo')).toThrow(/sélecteur/)
  })
})
