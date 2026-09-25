import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { ErreurApi, Session, type Maillage } from '../src/index.ts'

function rayonExterieur(maillage: Maillage) {
  let max = 0
  for (let i = 0; i < maillage.positions.length; i += 3) {
    const x = maillage.positions[i]
    const z = maillage.positions[i + 2]
    max = Math.max(max, Math.hypot(x, z))
  }
  return max
}

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

  it('décrit l’anneau par des faces exactes dont le rayon suit diametre_boite', () => {
    const session = new Session()
    session.executer(script.split('esquisse face.dessus')[0])
    const rayons = () =>
      session
        .frontiere()
        .faces.filter((face) => face.sorte === 'cylindre')
        .map((face) => face.rayon)
        .sort((a, b) => a - b)
    expect(rayons()).toEqual([17.5, 20])
    expect(session.frontiere().faces.filter((face) => face.sorte === 'couronne')).toHaveLength(2)
    session.commande('param diametre_boite 42')
    expect(rayons()[1]).toBeCloseTo(21)
  })

  it('décrit la portée de lunette par un épaulement', () => {
    const session = new Session()
    session.executer(script.split('esquisse face.dessous')[0])
    const epaulement = () =>
      session.frontiere().faces.find((face) => face.sorte === 'cylindre' && face.bas > 0)
    const dessus = () =>
      session.frontiere().faces.find((face) => face.sorte === 'couronne' && face.y === 8)
    const poche = () =>
      session.frontiere().faces.find((face) => face.sorte === 'couronne' && face.y < 8 && face.y > 0)
    expect(epaulement()).toMatchObject({ rayon: 18, bas: 6.8 })
    expect(dessus()).toMatchObject({ rayonInt: 18, rayonExt: 20 })
    expect(poche()).toMatchObject({ rayonInt: 17.5, rayonExt: 18, y: 6.8 })
    session.commande('param diametre_lunette 38')
    expect(epaulement()?.rayon).toBeCloseTo(19)
    session.commande('param profondeur_lunette 2')
    expect(poche()?.y).toBeCloseTo(6)
  })

  it('montre l’esquisse en cours, puis plus rien après la fonction', () => {
    const session = new Session()
    session.executer(script.split('esquisse plan.dessus')[0])
    expect(session.esquisseCourante()).toBeNull()
    session.executer(`
esquisse plan.dessus
cercle
cote diametre diametre_boite
`)
    expect(session.esquisseCourante()).toMatchObject({
      support: 'plan.dessus',
      cercles: [{ rayon: 20, y: 0 }],
    })
    session.executer(`
cercle
concentrique cercle.exterieur
cote diametre diametre_boite - 2 * epaisseur_paroi
extrude hauteur_carrure
`)
    expect(session.esquisseCourante()).toBeNull()
    session.executer(`
esquisse face.dessus
cercle
concentrique anneau
cote diametre diametre_lunette
`)
    expect(session.esquisseCourante()).toMatchObject({
      support: 'face.dessus',
      cercles: [{ rayon: 18, y: 8 }],
    })
  })

  it('porte le côté matière de chaque face', () => {
    const session = new Session()
    session.executer(script.split('esquisse face.dessous')[0])
    const faces = session.frontiere().faces
    const cylindre = (rayon: number) => faces.find((face) => face.sorte === 'cylindre' && face.rayon === rayon)
    const couronne = (y: number) => faces.find((face) => face.sorte === 'couronne' && face.y === y)
    expect(cylindre(20)?.dehors).toBe(1)
    expect(cylindre(17.5)?.dehors).toBe(-1)
    expect(cylindre(18)?.dehors).toBe(-1)
    expect(couronne(8)?.dehors).toBe(1)
    expect(couronne(6.8)?.dehors).toBe(1)
    expect(couronne(0)?.dehors).toBe(-1)
  })

  it('arrête la paroi du passage au fond de la poche', () => {
    const session = new Session()
    session.executer(script.split('esquisse face.dessous')[0])
    const passage = session.frontiere().faces.find((face) => face.sorte === 'cylindre' && face.rayon === 17.5)
    expect(passage).toMatchObject({ bas: 0, haut: 6.8 })
  })

  it('creuse le cercle coté, pas le paramètre de lunette', () => {
    const session = new Session()
    session.executer(script.split('esquisse face.dessus')[0])
    session.executer(`
esquisse face.dessus
cercle
concentrique anneau
cote diametre 38
enleve 2
`)
    const epaulement = session.frontiere().faces.find((face) => face.sorte === 'cylindre' && face.bas > 0)
    const poche = session.frontiere().faces.find((face) => face.sorte === 'couronne' && face.y < 8 && face.y > 0)
    expect(epaulement).toMatchObject({ rayon: 19, bas: 6 })
    expect(poche).toMatchObject({ y: 6, rayonExt: 19 })
    expect(session.expression('diametre_lunette')).toBe('36')
    expect(session.expression('profondeur_lunette')).toBe('1.2')
  })

  it('décrit l’anneau par un tube dont le rayon suit diametre_boite', () => {
    const session = new Session()
    session.executer(script)
    const rayon = rayonExterieur(session.maillage())
    expect(rayon).toBeCloseTo(20)
    session.commande('param diametre_boite 42')
    expect(rayonExterieur(session.maillage())).toBeCloseTo(21)
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
