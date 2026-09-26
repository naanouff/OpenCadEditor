import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { arbreConstruction, libelleOperation } from '../src/arbreConstruction.ts'

describe('arbre de construction', () => {
  it('expose l’historique de la pièce', () => {
    const session = new Session()
    session.commande('piece carrure')
    session.commande('param diametre_boite 40')
    session.commande('esquisse plan.dessus')
    session.commande('cercle')
    expect(session.pieceCourante()).toBe('carrure')
    expect(session.historique().map((o) => o.type)).toEqual(['param', 'ouvrir', 'cercle'])
  })

  it('groupe paramètres et esquisse sous la pièce', () => {
    const session = new Session()
    session.executer(`
piece carrure
param diametre_boite 40
esquisse plan.dessus
cercle
cote diametre diametre_boite
extrude 8
`)
    const arbre = arbreConstruction(session.pieceCourante(), session.historique())
    expect(arbre).toHaveLength(1)
    expect(arbre[0]!.libelle).toBe('carrure')
    const groupes = arbre[0]!.enfants!.map((n) => n.libelle)
    expect(groupes[0]).toBe('Paramètres')
    expect(groupes[1]).toBe('Esquisse plan.dessus')
    expect(arbre[0]!.enfants![1]!.enfants!.map((n) => n.libelle)).toEqual([
      'Cercle',
      'Cote diametre diametre_boite',
      'Extrude 8',
    ])
  })

  it('libellé d’enlèvement travers', () => {
    expect(
      libelleOperation({
        domaine: 'solide',
        type: 'enlever',
        arguments: { expression: '1.5', traverse: 'oui', support: 'x' },
        noms: [],
      }),
    ).toBe('Enlève travers 1.5')
  })
})
