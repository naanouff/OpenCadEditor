import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { lignesDocument } from '../src/documentAffichage.ts'

describe('affichage du document', () => {
  it('liste l’unité et le repère identité', () => {
    const lignes = lignesDocument(new Session().document())
    expect(lignes.map((ligne) => [ligne.libelle, ligne.valeur])).toEqual([
      ['Auteur', ''],
      ['Version', '0.0.0'],
      ['Unité', 'mm'],
      ['Origine', '0 0 0'],
      ['X · 3 h', '1 0 0'],
      ['Y · verticale', '0 1 0'],
      ['Z · 12 h', '0 0 1'],
    ])
  })

  it('suit la commande unite', () => {
    const session = new Session()
    session.commande('piece carrure')
    session.commande('unite in')
    const unite = lignesDocument(session.document()).find((ligne) => ligne.id === 'unite')
    expect(unite?.valeur).toBe('in')
  })

  it('suit la commande auteur', () => {
    const session = new Session()
    session.commande('auteur Ada Lovelace')
    const auteur = lignesDocument(session.document()).find((ligne) => ligne.id === 'auteur')
    expect(auteur?.valeur).toBe('Ada Lovelace')
  })

  it('suit la commande version', () => {
    const session = new Session()
    session.commande('version 0.2.0')
    const version = lignesDocument(session.document()).find((ligne) => ligne.id === 'version')
    expect(version?.valeur).toBe('0.2.0')
  })
})
