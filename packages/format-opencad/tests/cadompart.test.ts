import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { rejouables, Session } from '@opencad/api-parametrique'
import { ErreurFichier, ecrire, lire, ouvrirSession } from '../src/index.ts'
import { cadompart } from '../src/gen/cadompart.js'

const v0 = cadompart.v0_2

function decoder(octets: Uint8Array) {
  return v0.CadompartFile.decode(octets)
}

function sessionDe(script: string, geometrie = false) {
  const session = new Session({ geometrie })
  session.executer(script)
  return session
}

const CONE = `
piece cone
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 3
cote hauteur 10
segment
cote rayon 0
cote hauteur 10
revolution
`

describe('cadompart', () => {
  it('écrit un document vide en millimètres, version 0.2, sans feature', () => {
    const fichier = decoder(ecrire(new Session()))
    expect(fichier.versionMajor).toBe(0)
    expect(fichier.versionMinor).toBe(2)
    expect(fichier.units).toBe(v0.LengthUnit.LENGTH_UNIT_MILLIMETRES)
    expect(fichier.features).toHaveLength(0)
  })

  it('évalue le paramètre et extrude le cercle en aveugle', () => {
    const session = sessionDe(`
piece plaque
param diametre 20*2
esquisse plan.dessus
cercle
cote diametre diametre
extrude 10
`)
    const octets = ecrire(session)
    const fichier = decoder(octets)
    const extrude = fichier.features.find((feature) => feature.extrude)?.extrude
    const cercle = fichier.features.find((feature) => feature.sketch)?.sketch?.curves?.[0]?.circle
    expect(extrude?.endCondition).toBe(v0.EndCondition.END_CONDITION_BLIND)
    expect(extrude?.cut).toBe(false)
    expect(extrude?.distance).toBe(10)
    expect(cercle?.radius).toBe(20)
    expect(fichier.parameters[0]?.expression).toBe('20*2')
    expect(fichier.parameters[0]?.floatValue).toBe(40)

    const relu = ouvrirSession(octets)
    expect(relu.expression('diametre')).toBe('20*2')
    expect(relu.historique().find((operation) => operation.type === 'extrude')?.arguments.expression).toBe('10')
    expect(relu.historique().find((operation) => operation.type === 'cote')?.arguments.expression).toBe('diametre')
  })

  it('enregistre les cercles concentriques, l’arc et les symétries', () => {
    const octets = ecrire(sessionDe(`
piece carrure
param diametre_boite 36
param epaisseur_paroi 2.5
param hauteur_carrure 8
param entrecorne 20
param longueur_corne 4.5
param largeur_bout 2.2
param largeur_racine 6
param rayon_racine 3
esquisse plan.dessus
cercle
cote diametre diametre_boite
cercle
concentrique cercle.exterieur
cote diametre diametre_boite - 2 * epaisseur_paroi
extrude hauteur_carrure
esquisse plan.dessus
segment
cote ecart entrecorne
segment
cote debord longueur_corne
cote largeur largeur_bout
segment
cote largeur largeur_racine
arc
cote rayon rayon_racine
arc
concentrique cercle.exterieur
symetrie vertical
symetrie horizontal
extrude hauteur_carrure
`))
    const cercles = decoder(octets).features.find((feature) => feature.sketch)?.sketch
    expect(cercles?.curves).toHaveLength(2)
    expect(cercles?.constraints?.some((contrainte) => contrainte.id === 'concentrique:1:cercle.exterieur')).toBe(true)

    const relu = ouvrirSession(octets)
    const liens = relu.historique().filter((operation) => operation.type === 'concentrique')
    expect(liens.map((operation) => operation.arguments.cible)).toEqual(['cercle.exterieur', 'cercle.exterieur'])
    expect(relu.historique().filter((operation) => operation.type === 'arc')).toHaveLength(2)
    expect(relu.historique().filter((operation) => operation.type === 'symetrie').map((operation) => operation.arguments.axe)).toEqual([
      'vertical',
      'horizontal',
    ])
    expect(relu.expression('diametre_boite')).toBe('36')
  })

  it('enregistre le script de carrure', () => {
    const source = readFileSync(new URL('../../shell/src/scriptCarrure.ts', import.meta.url), 'utf8')
    const script = source.slice(source.indexOf('`') + 1, source.lastIndexOf('`'))
    const depart = sessionDe(script, true)
    const relu = ouvrirSession(ecrire(sessionDe(script)))
    expect(relu.pieceCourante()).toBe('carrure')
    const empreinte = (session: Session) => {
      const maille = session.maillage()
      const somme = maille.positions.reduce((total, valeur) => total + valeur, 0)
      return { positions: maille.positions.length, indices: maille.indices.length, somme }
    }
    expect(empreinte(depart).positions).toBeGreaterThan(0)
    expect(empreinte(relu)).toEqual(empreinte(depart))
    expect(
      relu.historique().find((operation) => operation.arguments.expression?.includes('epaisseur_paroi'))?.arguments
        .expression,
    ).toBe('diametre_boite - 2 * epaisseur_paroi')
    expect(relu.historique().find((operation) => operation.type === 'extrude')?.arguments.expression).toBe(
      'hauteur_carrure',
    )
    expect(relu.expression('diametre_boite')).toBe('36')
  })

  it('écrit un enlèvement avec cut et le relit en poche', () => {
    const octets = ecrire(sessionDe(`
piece poche
param L 20
param l 20
esquisse plan.dessus
rectangle
cote largeur l
cote longueur L
extrude 8
esquisse face.dessus
cercle
cote diametre 8
enleve 2
`))
    const extrudes = decoder(octets).features.filter((feature) => feature.extrude)
    expect(extrudes[1]?.extrude?.cut).toBe(true)
    expect(extrudes[1]?.extrude?.distance).toBe(2)
    const relu = ouvrirSession(octets)
    expect(relu.historique().find((operation) => operation.type === 'enlever')?.arguments.expression).toBe('2')
  })

  it('fait l’aller-retour d’une révolution', () => {
    const relu = ouvrirSession(ecrire(sessionDe(CONE)))
    const maille = relu.maillage()
    let yMax = -Infinity
    let rayonMax = 0
    for (let i = 0; i < maille.positions.length; i += 3) {
      yMax = Math.max(yMax, maille.positions[i + 1]!)
      rayonMax = Math.max(rayonMax, Math.hypot(maille.positions[i]!, maille.positions[i + 2]!))
    }
    expect(yMax).toBeCloseTo(10, 1)
    expect(rayonMax).toBeCloseTo(3, 1)
  })

  it('écrit le rectangle en quatre lignes et une boucle, puis reconstruit le profil', () => {
    const octets = ecrire(sessionDe(`
piece boite
param L 20
param l 12
esquisse plan.dessus
rectangle
cote largeur l
cote longueur L
extrude 8
`))
    const sketch = decoder(octets).features.find((feature) => feature.sketch)?.sketch
    expect(sketch?.curves).toHaveLength(4)
    expect(sketch?.curves?.every((courbe) => courbe.line)).toBe(true)
    expect(sketch?.loops?.[0]?.outer).toBe(true)
    expect(sketch?.loops?.[0]?.curveIndices).toEqual([0, 1, 2, 3])

    const relu = ouvrirSession(octets)
    const cotes = relu.historique().filter((operation) => operation.type === 'cote')
    expect(cotes.map((operation) => [operation.arguments.cible, operation.arguments.expression])).toEqual([
      ['largeur', 'l'],
      ['longueur', 'L'],
    ])
    expect(relu.expression('l')).toBe('12')
    expect(relu.expression('L')).toBe('20')
  })

  it('relit les formules d’un profil de révolution et de deux rectangles', () => {
    const octets = ecrire(sessionDe(`
piece pointe
param diametre_ame 3.5
param longueur 30
param diametre 6
param diametre_tete 12
param diametre_pozi 6.6
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon diametre_ame / 2
cote hauteur longueur - (diametre_tete - diametre) / 2
segment
cote rayon 0
cote hauteur longueur - (diametre_tete - diametre) / 2
revolution
esquisse plan.dessus
rectangle
cote largeur diametre_pozi / 4
cote longueur diametre_pozi
rectangle
cote largeur diametre_pozi
cote longueur diametre_pozi / 4
extrude 2
`))
    const relu = ouvrirSession(octets)
    const textes = relu.historique().filter((operation) => operation.type === 'cote').map((operation) => operation.arguments.expression)
    expect(textes).toContain('diametre_ame / 2')
    expect(textes).toContain('longueur - (diametre_tete - diametre) / 2')
    expect(textes).toContain('diametre_pozi / 4')
    expect(textes.filter((expression) => expression === 'diametre_pozi')).toHaveLength(2)
  })

  it('garde une feature éteinte et la saute au rejeu', () => {
    const session = sessionDe(`
piece plaque
esquisse plan.dessus
cercle
cote diametre 8
extrude 4
`)
    const index = session.historique().findIndex((operation) => operation.type === 'extrude')
    session.activer(index, false)
    const octets = ecrire(session)
    expect(decoder(octets).features.find((feature) => feature.extrude)?.suppressed).toBe(true)
    const relu = ouvrirSession(octets)
    const extrude = relu.historique().find((operation) => operation.type === 'extrude')
    expect(extrude?.actif).toBe(false)
    expect(rejouables(relu.historique()).some((operation) => operation.type === 'extrude')).toBe(false)
  })

  it('relit un fichier en mètres comme des millimètres', () => {
    const octets = v0.CadompartFile.encode({
      versionMajor: 0,
      versionMinor: 2,
      name: 'plaque',
      units: v0.LengthUnit.LENGTH_UNIT_METRES,
      upAxis: v0.UpAxis.UP_AXIS_Y,
      parameters: [
        {
          id: 'diametre',
          name: 'diametre',
          type: v0.ParamType.PARAM_TYPE_FLOAT,
          floatValue: 0.04,
          unit: 'm',
          expression: 'ignoree',
        },
      ],
      features: [
        {
          id: 'sketch-1',
          name: 'plan.dessus',
          sketch: {
            datumPlaneId: 'plan.dessus',
            curves: [{ circle: { id: 'c', center: { x: 0, y: 0 }, radius: 0.02 } }],
          },
        },
        {
          id: 'extrude-1',
          extrude: {
            profileSketchId: 'sketch-1',
            endCondition: v0.EndCondition.END_CONDITION_BLIND,
            distance: 0.01,
            cut: false,
            merge: true,
          },
        },
      ],
    }).finish()
    const relu = ouvrirSession(octets)
    expect(relu.expression('diametre')).toBe('40')
    expect(relu.historique().find((operation) => operation.type === 'extrude')?.arguments.expression).toBe('10')
    expect(relu.historique().find((operation) => operation.type === 'cote')?.arguments.expression).toBe('40')
  })

  it('enregistre le pas comme une hélice nommée et le relit', () => {
    const session = sessionDe(`
piece vis
param pas 2.6
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 3
cote hauteur 1
segment
cote rayon 0
cote hauteur 1
revolution
pas
`)
    const index = session.historique().findIndex((operation) => operation.type === 'pas')
    session.activer(index, false)
    const octets = ecrire(session)
    const helix = decoder(octets).features.find((feature) => feature.helix)
    expect(helix?.name).toBe('pas')
    expect(helix?.suppressed).toBe(true)
    expect(helix?.helix?.pitch).toBe(2.6)
    expect(helix?.helix?.profileSketchId).toBe('sketch-1')
    expect(helix?.helix?.axisDirection).toMatchObject({ x: 0, y: 1, z: 0 })

    const lecture = lire(octets)
    expect(lecture.script).toContain('revolution\npas')
    expect(lecture.eteins).toContain(index)
    const relu = new Session({ geometrie: false })
    relu.executer(lecture.script)
    expect(relu.historique().some((operation) => operation.type === 'pas')).toBe(true)
    expect(relu.expression('pas')).toBe('2.6')

    const sansRevolution = ecrire(sessionDe('piece nue\npas'))
    expect(decoder(sansRevolution).features.find((feature) => feature.helix)?.helix?.profileSketchId).toBe('')
  })

  it('refuse une hélice géométrique, une feature inconnue, un id dupliqué et un corps vide', () => {
    const helice = v0.CadompartFile.encode({
      versionMajor: 0,
      versionMinor: 2,
      units: v0.LengthUnit.LENGTH_UNIT_MILLIMETRES,
      features: [{ id: 'helix-1', name: 'ressort', helix: { pitch: 2 } }],
    }).finish()
    const garde = sessionDe('piece garde\nparam garde 1')
    expect(() => lire(helice)).toThrow(/hélice non lue/)
    expect(garde.expression('garde')).toBe('1')

    const fillet = v0.CadompartFile.encode({
      versionMajor: 0,
      versionMinor: 2,
      units: v0.LengthUnit.LENGTH_UNIT_MILLIMETRES,
      features: [{ id: 'cong', fillet: { sets: [] } }],
    }).finish()
    expect(() => lire(fillet)).toThrow(/fillet/)

    const doublon = v0.CadompartFile.encode({
      versionMajor: 0,
      versionMinor: 2,
      units: v0.LengthUnit.LENGTH_UNIT_MILLIMETRES,
      parameters: [
        { id: 'diametre', type: v0.ParamType.PARAM_TYPE_FLOAT, floatValue: 1 },
        { id: 'diametre', type: v0.ParamType.PARAM_TYPE_FLOAT, floatValue: 2 },
      ],
    }).finish()
    expect(() => lire(doublon)).toThrow(/dupliqué/)

    const vide = v0.CadompartFile.encode({
      versionMajor: 0,
      versionMinor: 2,
      units: v0.LengthUnit.LENGTH_UNIT_MILLIMETRES,
      features: [{ id: 'vide' }],
    }).finish()
    expect(() => lire(vide)).toThrow(/sans corps/)
  })
})
