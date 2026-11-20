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

describe('ligne refusée', () => {
  it('laisse l’historique intact et la ligne suivante passe', () => {
    const session = new Session({ geometrie: false })
    session.executer(BOITE)
    const avant = JSON.stringify(session.historique())
    expect(() => session.commande('extrude 8')).toThrow(/aucune esquisse/)
    expect(JSON.stringify(session.historique())).toBe(avant)
    expect(() => session.commande('param x 1')).not.toThrow()
  })

  it('n’est pas empilée : annuler défait la dernière ligne acceptée', () => {
    const session = new Session({ geometrie: false })
    session.executer(BOITE)
    expect(() => session.commande('regle 2 12')).toThrow(/rang de fonction invalide/)
    session.annuler()
    expect(session.historique().some((op) => op.type === 'extrude')).toBe(false)
  })
})
