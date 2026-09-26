import { describe, expect, it } from 'vitest'
import { ErreurApi } from '../src/types.ts'
import { Session } from '../src/session.ts'

function produitMixte(x: readonly number[], y: readonly number[], z: readonly number[]) {
  const croix = [y[1] * z[2] - y[2] * z[1], y[2] * z[0] - y[0] * z[2], y[0] * z[1] - y[1] * z[0]]
  return x[0] * croix[0] + x[1] * croix[1] + x[2] * croix[2]
}

describe('document', () => {
  it('pose le repère identité en millimètres', () => {
    const session = new Session()
    const document = session.document()
    expect(document.auteur).toBe('')
    expect(document.unite).toBe('mm')
    expect(document.repere.origine).toEqual([0, 0, 0])
    expect(document.repere.x).toEqual([1, 0, 0])
    expect(document.repere.y).toEqual([0, 1, 0])
    expect(document.repere.z).toEqual([0, 0, 1])
    expect(produitMixte(document.repere.x, document.repere.y, document.repere.z)).toBe(1)
  })

  it('rend une copie', () => {
    const session = new Session()
    const document = session.document()
    document.unite = 'in'
    document.auteur = 'Ada'
    document.version = '9.9.9'
    const y = document.repere.y as unknown as number[]
    y[1] = 0
    expect(session.document().unite).toBe('mm')
    expect(session.document().auteur).toBe('')
    expect(session.document().version).toBe('0.0.0')
    expect(session.document().repere.y).toEqual([0, 1, 0])
  })

  it('enregistre l’unité sur le document', () => {
    const session = new Session()
    session.commande('piece carrure')
    session.commande('unite in')
    expect(session.unite()).toBe('in')
    expect(session.document().unite).toBe('in')
  })

  it('enregistre l’auteur sur le document', () => {
    const session = new Session()
    session.commande('auteur Ada Lovelace')
    expect(session.document().auteur).toBe('Ada Lovelace')
    session.commande('auteur Grace Hopper')
    session.annuler()
    expect(session.document().auteur).toBe('Ada Lovelace')
  })

  it('porte une version semantique, 0.0.0 au départ', () => {
    const session = new Session()
    expect(session.document().version).toBe('0.0.0')
    session.commande('version 1.2.3')
    expect(session.document().version).toBe('1.2.3')
    session.commande('version 2.0.0-alpha.1')
    session.annuler()
    expect(session.document().version).toBe('1.2.3')
    expect(() => session.commande('version 1.2')).toThrow(ErreurApi)
    expect(() => session.commande('version v1.0.0')).toThrow(ErreurApi)
    expect(session.document().version).toBe('1.2.3')
  })
})
