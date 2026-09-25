import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { ErreurApi, Session } from '../src/index.ts'

const script = `
piece carrure
param diametre_boite 40
param epaisseur_paroi 2.5
param hauteur_carrure 8
param diametre_lunette 36
param profondeur_lunette 1.2
param diametre_fond 34
param profondeur_fond 1
param entrecorne 20
param longueur_corne 5
param largeur_corne 4
param diametre_barrette 1.5
param diametre_tube 4
param longueur_tube 2
param diametre_tige 1.2

esquisse plan.dessus
cercle
cote diametre diametre_boite
cercle
concentrique cercle.exterieur
cote diametre diametre_boite - 2 * epaisseur_paroi
extrude hauteur_carrure

esquisse face.dessus
cercle
concentrique anneau
cote diametre diametre_lunette
enleve profondeur_lunette

esquisse face.dessous
cercle
concentrique anneau
cote diametre diametre_fond
enleve profondeur_fond

esquisse plan.dessus
rectangle
cote ecart entrecorne
cote debord longueur_corne
cote largeur largeur_corne
symetrie vertical
symetrie horizontal
extrude hauteur_carrure

esquisse plan.12h
cercle
cote diametre diametre_barrette
enleve travers largeur_corne
symetrie horizontal

esquisse plan.3h
cercle
cote diametre diametre_tube
extrude longueur_tube
cercle
concentrique tube
cote diametre diametre_tige
enleve travers longueur_tube
`

describe('carrure', () => {
  it('exécute le script', () => {
    const session = new Session()
    session.executer(script)
    expect(session.expression('diametre_boite')).toBe('40')
    expect(session.longueurHistorique).toBeGreaterThan(10)
  })

  it('refuse une face avant le premier solide', () => {
    const session = new Session()
    session.commande('piece carrure')
    expect(() => session.commande('esquisse face.dessus')).toThrow(ErreurApi)
    expect(() => session.commande('esquisse face.dessus')).toThrow(/face\.dessus absente/)
  })

  it('arrête la reconstruction si la collerette n’est pas positive', () => {
    const session = new Session()
    session.executer(script)
    expect(() => session.commande('param profondeur_fond 7')).toThrow(/collerette invalide/)
  })

  it('annule la dernière opération et la refait', () => {
    const session = new Session()
    session.executer(script)
    const avant = session.longueurHistorique
    session.annuler()
    expect(session.longueurHistorique).toBe(avant - 1)
    session.refaire()
    expect(session.longueurHistorique).toBe(avant)
  })

  it('restaure l’expression précédente d’un paramètre', () => {
    const session = new Session()
    session.executer(script)
    session.commande('param diametre_boite 42')
    expect(session.expression('diametre_boite')).toBe('42')
    session.annuler()
    expect(session.expression('diametre_boite')).toBe('40')
  })

  it('une commande nouvelle vide la branche à refaire', () => {
    const session = new Session()
    session.executer(script)
    session.annuler()
    expect(session.aRefaire).toBe(true)
    session.commande('param diametre_barrette 2')
    expect(session.aRefaire).toBe(false)
    expect(() => session.refaire()).toThrow(/rien à refaire/)
  })

  it('enregistre un domaine sans que la session cite son type', () => {
    const session = new Session()
    session.commande('piece carrure')
    session.enregistrer({
      id: 'essai',
      verbes: {
        ping: () => ({ type: 'ping', arguments: {}, noms: [] }),
      },
      operations: {
        ping: {
          dansHistorique: true,
          faire(contexte) {
            contexte.noms.set('ping', 'ok')
          },
          defaire() {},
        },
      },
    })
    session.commande('ping')
    const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../src/session.ts'), 'utf8')
    expect(source.includes('essai')).toBe(false)
    expect(session.longueurHistorique).toBe(1)
  })
})
