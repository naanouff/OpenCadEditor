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

  it('place l’esquisse sous la fonction, et les paramètres hors de l’arbre', () => {
    const session = new Session()
    session.executer(`
piece carrure
param diametre_boite 40
param epaisseur_paroi 2
param diametre_lunette 32
param profondeur_lunette 1
esquisse plan.dessus
cercle
cote diametre diametre_boite
cercle
concentrique cercle.exterieur
cote diametre diametre_boite - 2 * epaisseur_paroi
extrude 8
esquisse face.dessus
cercle
concentrique anneau
cote diametre diametre_lunette
enleve profondeur_lunette
`)
    const arbre = arbreConstruction(session.pieceCourante(), session.historique())
    expect(arbre).toHaveLength(1)
    expect(arbre[0]!.libelle).toBe('carrure')
    const enfants = arbre[0]!.enfants!
    expect(enfants.map((n) => n.libelle)).toEqual(['Origine', 'Extrusion 8', 'Enlèvement profondeur_lunette'])
    expect(enfants[0]!.enfants!.map((n) => n.libelle)).toEqual(['Plan dessus', 'Plan 12h', 'Plan 3h'])
    expect(enfants[1]!.enfants!.map((n) => n.libelle)).toEqual(['Esquisse plan.dessus'])
    expect(enfants[1]!.enfants![0]!.esquisse).toBe(true)
    expect(enfants[1]!.enfants![0]!.index).toBeTypeOf('number')
    expect(enfants[1]!.enfants![0]!.enfants!.map((n) => n.libelle)).toEqual([
      'Cercle',
      'Cote diametre diametre_boite',
      'Cercle',
      'Concentrique cercle.exterieur',
      'Cote diametre diametre_boite - 2 * epaisseur_paroi',
    ])
    expect(enfants[2]!.enfants!.map((n) => n.libelle)).toEqual(['Esquisse face.dessus'])
    expect(enfants[2]!.enfants![0]!.enfants!.map((n) => n.libelle)).toEqual([
      'Cercle',
      'Concentrique anneau',
      'Cote diametre diametre_lunette',
    ])
    expect(JSON.stringify(arbre)).not.toContain('Paramètres')
    expect(JSON.stringify(arbre)).not.toContain('diametre_boite =')
  })

  it('laisse voir l’esquisse encore ouverte', () => {
    const session = new Session()
    session.executer(`
piece carrure
esquisse plan.dessus
cercle
`)
    const enfants = arbreConstruction(session.pieceCourante(), session.historique())[0]!.enfants!
    expect(enfants.map((n) => n.libelle)).toEqual(['Origine', 'Esquisse plan.dessus'])
    expect(enfants[1]!.enfants!.map((n) => n.libelle)).toEqual(['Cercle'])
  })

  it('libellé d’enlèvement travers', () => {
    expect(
      libelleOperation({
        domaine: 'solide',
        type: 'enlever',
        arguments: { expression: '1.5', traverse: 'oui', support: 'x' },
        noms: [],
      }),
    ).toBe('Enlèvement travers 1.5')
  })
})
