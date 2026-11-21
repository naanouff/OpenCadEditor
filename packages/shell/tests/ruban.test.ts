import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { boutonsRuban, ligneReglage, reglageFonction } from '../src/ruban.ts'

const vide = {
  piece: true,
  support: null as string | null,
  profil: 'vide' as const,
  arete: null as string | null,
  assemblage: false,
}

describe('ruban', () => {
  it('ouvre le plan du dessus, et crée la pièce s’il n’y en a pas', () => {
    const boutons = boutonsRuban({ ...vide, onglet: 'esquisse', piece: false })
    expect(boutons.map((b) => b.libelle)).toEqual(['Plan dessus'])
    const session = new Session({ geometrie: false })
    session.executer(boutons[0]!.lignes.join('\n'))
    expect(session.esquisseCourante()?.support).toBe('plan.dessus')
  })

  it('pose un rectangle coté, puis l’extrude', () => {
    const rectangle = boutonsRuban({ ...vide, onglet: 'esquisse', support: 'plan.dessus' })
    expect(rectangle[0]!.lignes[0]).toBe('rectangle')
    const session = new Session({ geometrie: false })
    session.executer(['piece boite', 'esquisse plan.dessus', ...rectangle[0]!.lignes].join('\n'))
    const fonctions = boutonsRuban({
      ...vide,
      onglet: 'fonctions',
      support: 'plan.dessus',
      profil: 'rectangle',
    })
    expect(fonctions.map((b) => b.libelle)).toEqual(['Extruder'])
    session.executer(fonctions[0]!.lignes.join('\n'))
    expect(session.historique().some((op) => op.type === 'extrude')).toBe(true)
    expect(session.esquisseCourante()).toBeNull()
  })

  it('propose un cercle sur une face, puis l’enlèvement', () => {
    const esquisse = boutonsRuban({ ...vide, onglet: 'esquisse', support: 'face.dessus' })
    expect(esquisse[0]!.lignes[0]).toBe('cercle')
    const fonctions = boutonsRuban({
      ...vide,
      onglet: 'fonctions',
      support: 'face.dessus',
      profil: 'cercle',
    })
    expect(fonctions[0]!.lignes).toEqual(['enleve 2'])
  })

  it('congé sur l’arête choisie', () => {
    const boutons = boutonsRuban({ ...vide, onglet: 'fonctions', arete: 'arete.haut' })
    expect(boutons).toEqual([
      { id: 'fillet', libelle: 'Congé', lignes: ['fillet 1 arete.haut'] },
      { id: 'chanfrein', libelle: 'Chanfrein', lignes: ['chanfrein 1 arete.haut'] },
    ])
  })

  it('ne propose rien sur un assemblage', () => {
    expect(boutonsRuban({ ...vide, onglet: 'esquisse', assemblage: true })).toEqual([])
    expect(boutonsRuban({ ...vide, onglet: 'fonctions', arete: 'arete.bas', assemblage: true })).toEqual([])
  })

  it('retient l’expression de la dernière extrusion', () => {
    const session = new Session({ geometrie: false })
    session.executer(`
piece boite
esquisse plan.dessus
rectangle
cote largeur 10
cote longueur 20
cote ecart 0
extrude 8
`)
    const reglage = reglageFonction(session.historique())
    expect(reglage).toEqual({ rang: 1, expression: '8' })
    session.commande(ligneReglage(reglage!.rang, ' 12 '))
    expect(reglageFonction(session.historique())).toEqual({ rang: 1, expression: '12' })
    expect(session.historique().filter((op) => op.type === 'extrude')).toHaveLength(1)
  })
})
