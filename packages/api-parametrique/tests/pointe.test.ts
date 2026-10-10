import { describe, expect, it } from 'vitest'
import { Session } from '../src/session.ts'
import { indexFonctionParRang, indexesFonctions } from '../src/historique.ts'
import { SCRIPT_CARRURE } from './fixtures/scriptCarrure.ts'

const SCRIPT_VIS_CORPS = `
piece vis
param longueur 30
param diametre 6
param diametre_ame 3.5
param diametre_tete 12
param angle_tete 90
param angle_pointe 30
param angle_filet 40
param pas 2.6
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon diametre_ame / 2
cote hauteur 3.031
segment
cote rayon diametre_ame / 2
cote hauteur longueur - (diametre_tete - diametre) / 2
segment
cote rayon 0
cote hauteur longueur - (diametre_tete - diametre) / 2
revolution
pas
`

describe('pointe de reconstruction', () => {
  it('tronque la carrure avant les cornes', () => {
    const session = new Session()
    session.executer(SCRIPT_CARRURE)
    expect(session.frontiere().faces.some((f) => f.sorte === 'boite')).toBe(true)
    session.commande('pointe 1')
    expect(session.pointeCourante()).toBe(indexFonctionParRang(session.historique(), 1))
    const faces = session.frontiere().faces
    expect(faces.some((f) => f.sorte === 'cylindre')).toBe(true)
    expect(faces.some((f) => f.sorte === 'boite')).toBe(false)
    expect(faces.some((f) => f.sorte === 'racine')).toBe(false)
    expect(faces.some((f) => f.sorte === 'traverse')).toBe(false)
  })

  it('annuler restaure la pointe précédente', () => {
    const session = new Session()
    session.executer(SCRIPT_CARRURE)
    expect(session.pointeCourante()).toBeNull()
    session.commande('pointe 1')
    expect(session.pointeCourante()).not.toBeNull()
    session.annuler()
    expect(session.pointeCourante()).toBeNull()
    expect(session.frontiere().faces.some((f) => f.sorte === 'boite')).toBe(true)
  })

  it('pointe fin remet la reconstruction complète', () => {
    const session = new Session()
    session.executer(SCRIPT_CARRURE)
    session.commande('pointe 1')
    session.commande('pointe fin')
    expect(session.pointeCourante()).toBeNull()
    expect(session.frontiere().faces.some((f) => f.sorte === 'boite')).toBe(true)
  })

  it('indexesFonctions liste extrude enlever revolution pas', () => {
    const session = new Session({ geometrie: false })
    session.executer(`
piece p
esquisse plan.dessus
rectangle
cote largeur 10
cote longueur 20
extrude 5
esquisse plan.dessus
rectangle
cote largeur 2
cote longueur 2
enleve 1
`)
    expect(indexesFonctions(session.historique())).toHaveLength(2)
  })

  it('tronque la vis avant le pas', () => {
    const session = new Session()
    session.executer(SCRIPT_VIS_CORPS)
    const avecFilet = session.maillage().positions.length
    session.commande('pointe 1')
    expect(session.pointeCourante()).toBe(indexFonctionParRang(session.historique(), 1))
    expect(session.maillage().positions.length).toBeLessThan(avecFilet)
  })
})
