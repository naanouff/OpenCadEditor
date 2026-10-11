import { describe, expect, it } from 'vitest'
import { Session } from '../src/session.ts'

describe('réinitialiser', () => {
  it('vide la pièce et les deux piles', () => {
    const session = new Session()
    session.executer('piece boite\nparam largeur 10\nunite in')
    session.annuler()
    expect(session.aRefaire).toBe(true)
    session.reinitialiser()
    expect(session.pieceCourante()).toBeNull()
    expect(session.unite()).toBe('mm')
    expect(session.aRefaire).toBe(false)
    expect(() => session.annuler()).toThrow(/rien à annuler/)
    expect(() => session.refaire()).toThrow(/rien à refaire/)
  })
})
