import { describe, expect, it } from 'vitest'
import { SCRIPT_BOITE } from '../src/scriptBoite.ts'
import { storeShell } from '../src/storeShell.ts'

describe('ouvrirEsquisseSurFace', () => {
  it('ouvre face.dessus après extrude (script avant poche)', () => {
    const avantPoche = SCRIPT_BOITE.split('esquisse face.dessus')[0]!
    storeShell.executer(avantPoche)
    expect(storeShell.hote().session.esquisseCourante()).toBeNull()
    const journalAvant = storeShell.hote().journal.length
    expect(storeShell.ouvrirEsquisseSurFace('face.dessus')).toBe(true)
    expect(storeShell.hote().session.esquisseCourante()?.support).toBe('face.dessus')
    expect(storeShell.hote().journal.length).toBeGreaterThan(journalAvant)
  })

  it('ne réouvre pas si une esquisse est déjà ouverte', () => {
    const jusquaEsquisse = SCRIPT_BOITE.split('cercle')[0]!
    storeShell.executer(jusquaEsquisse)
    expect(storeShell.hote().session.esquisseCourante()?.support).toBe('face.dessus')
    expect(storeShell.ouvrirEsquisseSurFace('face.dessous')).toBe(false)
    expect(storeShell.hote().session.esquisseCourante()?.support).toBe('face.dessus')
  })
})

