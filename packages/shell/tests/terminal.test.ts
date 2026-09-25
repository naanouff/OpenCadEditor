import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { Hote } from '../src/hote.ts'

describe('terminal', () => {
  it('une ligne valide allonge l’historique', () => {
    const hote = new Hote()
    hote.ligne('piece carrure')
    hote.ligne('param diametre_boite 40')
    expect(hote.session.longueurHistorique).toBe(1)
    expect(hote.journal.at(-1)).toEqual({ ligne: 'param diametre_boite 40', erreur: null })
  })

  it('une ligne inconnue reste une erreur et la suivante passe', () => {
    const hote = new Hote()
    hote.ligne('piece carrure')
    hote.ligne('nexistepas')
    hote.ligne('param diametre_boite 40')
    expect(hote.journal.at(-2)?.erreur).toMatch(/inconnue/)
    expect(hote.session.expression('diametre_boite')).toBe('40')
  })

  it('annuler retire la dernière ligne du journal et l’opération', () => {
    const hote = new Hote()
    hote.ligne('piece carrure')
    hote.ligne('param diametre_boite 40')
    hote.annuler()
    expect(hote.journal.map((entree) => entree.ligne)).toEqual(['piece carrure'])
    expect(hote.session.longueurHistorique).toBe(0)
  })

  it('enregistre un panneau sans que l’hôte cite son id', () => {
    const hote = new Hote()
    hote.enregistrer({
      id: 'essai',
      faire() {},
      afficher() {
        return 'essai'
      },
    })
    const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../src/hote.ts'), 'utf8')
    expect(source.includes('essai')).toBe(false)
    expect(hote.afficher().join(' ')).toContain('essai')
  })
})
