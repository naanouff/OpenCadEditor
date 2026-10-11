import { describe, expect, it } from 'vitest'
import { Controle } from '../src/outils.ts'

const BOITE = `
piece boite
esquisse plan.dessus
rectangle
cote largeur 10
cote longueur 20
extrude 8
`

describe('outils', () => {
  it('une extrusion figure dans l’état', () => {
    const controle = new Controle()
    controle.executer(BOITE)
    const etat = controle.etat()
    expect(etat.piece).toBe('boite')
    expect(etat.parametres).toEqual([])
    expect(etat.historique.some((operation) => operation.type === 'extrude')).toBe(true)
    expect(etat.viewport).toBeNull()
    expect(etat.conflit).toBe(false)
    controle.annuler()
    expect(controle.etat().historique.some((operation) => operation.type === 'extrude')).toBe(false)
    controle.refaire()
    expect(controle.etat().historique.some((operation) => operation.type === 'extrude')).toBe(true)
  })

  it('une commande inconnue laisse l’historique intact', () => {
    const controle = new Controle()
    controle.commande('piece boite')
    expect(() => controle.commande('nexistepas')).toThrow(/inconnue/)
    expect(controle.etat().piece).toBe('boite')
    expect(controle.script()).toBe('piece boite')
  })

  it('une esquisse non contrainte laisse l’historique intact', () => {
    const controle = new Controle()
    expect(() =>
      controle.executer(`
piece boite
esquisse plan.dessus
cercle
extrude 5
`),
    ).toThrow(/non contrainte/)
    expect(controle.etat().piece).toBeNull()
    expect(controle.etat().historique).toEqual([])
    expect(controle.script()).toBe('')
  })

  it('éteint une extrusion et déplace la pointe', () => {
    const controle = new Controle()
    controle.executer(BOITE)
    const index = controle.etat().historique.find((operation) => operation.type === 'extrude')!.index
    controle.activer(index, false)
    expect(controle.etat().historique[index]?.actif).toBe(false)
    controle.pointe(1)
    expect(controle.etat().pointe).not.toBeNull()
    controle.pointe('fin')
    expect(controle.etat().pointe).toBeNull()
  })
})
