import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { ErreurApi, Session, valeurTypee, type Maillage } from '../src/index.ts'
import { congesDe, geometrieElevation, pansDeCorne } from '../src/corne.ts'

function rayonExterieur(maillage: Maillage) {
  let max = 0
  for (let i = 0; i < maillage.positions.length; i += 3) {
    const x = maillage.positions[i]
    const z = maillage.positions[i + 2]
    max = Math.max(max, Math.hypot(x, z))
  }
  return max
}

export const script = `
piece carrure
param diametre_boite 40
param epaisseur_paroi 2.5
param hauteur_carrure 8
param diametre_lunette 36
param profondeur_lunette 1.2
param diametre_fond 34
param profondeur_fond 1
param entrecorne 20
param longueur_corne 4.2
param largeur_bout 2.2
param largeur_racine 6
param rayon_racine 3
param diametre_barrette 1.1
param recul_barrette 1.2
param diametre_tube 4
param longueur_tube 2
param diametre_tige 1.2
param rayon_bout_haut 1
param rayon_bout_bas 0.8
param plongee_bout 3.3
param epaisseur_bout 3.2

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

esquisse plan.12h
cercle
cote diametre diametre_barrette
enleve travers largeur_racine
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

  it('évalue le diamètre coté, et le met à jour avec le paramètre', () => {
    const session = new Session()
    session.executer(`
piece carrure
param diametre_boite 40
param epaisseur_paroi 2.5
esquisse plan.dessus
cercle
cote diametre diametre_boite
`)
    expect(session.esquisseCourante()?.cercles[0]?.valeur).toBeCloseTo(40)
    session.executer(`
cercle
concentrique cercle.exterieur
cote diametre diametre_boite - 2 * epaisseur_paroi
`)
    expect(session.esquisseCourante()?.cercles[1]?.valeur).toBeCloseTo(35)
    session.commande('param diametre_boite 42')
    expect(session.esquisseCourante()?.cercles[0]?.valeur).toBeCloseTo(42)
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

  it('décrit la portée du fond par une lèvre plus étroite que le passage', () => {
    const session = new Session()
    session.executer(script.split('segment')[0])
    const faces = () => session.frontiere().faces
    const cylindre = (rayon: number) => faces().find((face) => face.sorte === 'cylindre' && face.rayon === rayon)
    const couronne = (y: number) => faces().find((face) => face.sorte === 'couronne' && face.y === y)
    expect(cylindre(17)).toMatchObject({ bas: 0, haut: 1, dehors: -1 })
    expect(cylindre(17.5)).toMatchObject({ bas: 1, haut: 6.8, dehors: -1 })
    expect(couronne(1)).toMatchObject({ rayonExt: 17.5, rayonInt: 17, dehors: 1 })
    expect(couronne(0)).toMatchObject({ rayonExt: 20, rayonInt: 17, dehors: -1 })
    expect(cylindre(18)).toMatchObject({ bas: 6.8, haut: 8 })
    session.commande('param diametre_fond 32')
    expect(cylindre(16)).toMatchObject({ bas: 0, haut: 1 })
    session.commande('param profondeur_fond 2')
    expect(cylindre(16)).toMatchObject({ haut: 2 })
    expect(cylindre(17.5)).toMatchObject({ bas: 2 })
  })

  it('décrit les cornes par un flanc et un congé de racine', () => {
    const session = new Session()
    session.executer(script.split('esquisse plan.12h')[0])
    const racines = () => session.frontiere().faces.filter((face) => face.sorte === 'racine')
    expect(racines()).toHaveLength(4)
    expect(racines()[0]?.rayon).toBeCloseTo(3)
    expect(Math.hypot(racines()[0]!.x, racines()[0]!.z)).toBeCloseTo(23, 5)
    const conges = () => session.frontiere().faces.filter((face) => face.sorte === 'conge')
    expect(conges()).toHaveLength(8)
    expect(conges().filter((face) => face.rayon === 1)).toHaveLength(4)
    expect(conges().filter((face) => face.rayon === 0.8)).toHaveLength(4)
    const boites = () => session.frontiere().faces.filter((face) => face.sorte === 'boite')
    expect(boites()).toHaveLength(4)
    expect(boites()[0]?.plan).toMatchObject({ largeurBout: 2.2, largeurRacine: 6, rayonRacine: 3 })
    const bout = () => boites().find((face) => face.zmax > 0)?.zmax ?? 0
    expect(bout()).toBeCloseTo(24.2)
    session.commande('param largeur_bout 2.5')
    expect(boites()[0]?.plan?.largeurBout).toBeCloseTo(2.5)
    session.commande('param entrecorne 22')
    expect(boites().map((face) => Math.min(Math.abs(face.xmin), Math.abs(face.xmax))).sort((a, b) => a - b)[0]).toBeCloseTo(11)
  })

  it('effile le bout et coupe le coin extérieur du rectangle', () => {
    const session = new Session()
    session.executer(script.split('esquisse plan.12h')[0])
    const { positions } = session.maillage()
    let coin = 0
    let auBout = 0
    let horsFlanc = 0
    const aBout = 10 + 2.2
    for (let i = 0; i < positions.length; i += 3) {
      const x = Math.abs(positions[i])
      const z = Math.abs(positions[i + 2])
      if (Math.abs(x - 16) < 0.35 && Math.abs(z - 24.2) < 0.35) coin += 1
      if (z > 24 && x > aBout + 0.15) horsFlanc += 1
      if (Math.abs(z - 24.2) < 0.2 && x > 9.5 && x < aBout + 0.15) auBout += 1
    }
    expect(coin).toBe(0)
    expect(horsFlanc).toBe(0)
    expect(auBout).toBeGreaterThan(0)
  })

  it('place les sommets du congé de racine sur son cylindre', () => {
    const session = new Session()
    session.executer(script.split('esquisse plan.12h')[0])
    const racine = session.frontiere().faces.find((face) => face.sorte === 'racine' && face.x > 0 && face.z > 0)!
    expect(racine.rayon).toBeCloseTo(3)
    expect(Math.hypot(racine.x, racine.z)).toBeCloseTo(23, 5)
    const { positions } = session.maillage()
    let surRacine = 0
    for (let i = 0; i < positions.length; i += 3) {
      const d = Math.hypot(positions[i] - racine.x, positions[i + 2] - racine.z)
      if (Math.abs(d - racine.rayon) < 0.25) surRacine += 1
    }
    expect(surRacine).toBeGreaterThan(0)
  })

  it('ombre les quatre cornes sous la limite des index 16 bits', () => {
    const session = new Session()
    session.executer(script)
    const { positions, indices } = session.maillage()
    expect(positions.length / 3).toBeLessThan(0x10000)
    const parCorne = new Map<string, number>()
    for (let t = 0; t < indices.length; t += 3) {
      const centre = [0, 2].map(
        (axe) => (positions[indices[t] * 3 + axe] + positions[indices[t + 1] * 3 + axe] + positions[indices[t + 2] * 3 + axe]) / 3,
      )
      if (Math.hypot(centre[0], centre[1]) < 20.5 || Math.abs(centre[0]) < 9) continue
      const cle = `${Math.sign(centre[0])},${Math.sign(centre[1])}`
      parCorne.set(cle, (parCorne.get(cle) ?? 0) + 1)
    }
    expect(parCorne.size).toBe(4)
    for (const nombre of parCorne.values()) expect(nombre).toBeGreaterThan(100)
  })

  it('abaisse le dessus et remonte le dessous au bout', () => {
    const session = new Session()
    session.executer(script.split('esquisse plan.12h')[0])
    const boites = session.frontiere().faces.filter((face) => face.sorte === 'boite')
    expect(boites[0]?.elevation).toMatchObject({ plongee: 3.3, epaisseurBout: 3.2 })
    const { positions } = session.maillage()
    let yMaxAuBout = 0
    let yMinAuBout = 8
    for (let i = 0; i < positions.length; i += 3) {
      const y = positions[i + 1]
      const z = Math.abs(positions[i + 2])
      if (z < 24.05) continue
      yMaxAuBout = Math.max(yMaxAuBout, y)
      yMinAuBout = Math.min(yMinAuBout, y)
    }
    expect(yMaxAuBout).toBeLessThan(6.6)
    expect(yMaxAuBout).toBeGreaterThan(5.3)
    expect(yMinAuBout).toBeGreaterThan(3.0)
    expect(yMinAuBout).toBeLessThan(4.0)
  })

  it('fait plonger le bout quand plongee_bout descend', () => {
    const session = new Session()
    session.executer(script.split('esquisse plan.12h')[0])
    session.commande('param plongee_bout 2.5')
    const boite = session.frontiere().faces.find((face) => face.sorte === 'boite')!
    expect(boite.elevation).toMatchObject({ plongee: 2.5, epaisseurBout: 3.2 })
    const { positions } = session.maillage()
    let yMaxAuBout = 0
    let yMinAuBout = 8
    for (let i = 0; i < positions.length; i += 3) {
      const y = positions[i + 1]
      if (Math.abs(positions[i + 2]) < 24.05) continue
      yMaxAuBout = Math.max(yMaxAuBout, y)
      yMinAuBout = Math.min(yMinAuBout, y)
    }
    expect(yMaxAuBout).toBeLessThan(5.5)
    expect(yMinAuBout).toBeLessThan(3.1)
  })

  it('retient la plongée au débord que l’arc du dessus peut descendre', () => {
    const elev = geometrieElevation({
      uPeau: 20,
      u1: 24.2,
      H: 8,
      y0: 0,
      elevation: { plongee: 0, epaisseurBout: 3.2 },
      rh: 1,
      rb: 0.8,
    })
    expect(elev.chute).toBeCloseTo(0.8 * (24.2 - 1 - 20), 5)
    expect(elev.plongee).toBeCloseTo(8 - 3.2 - elev.chute, 5)
    expect(elev.RHaut).toBeGreaterThan(elev.chute)
    expect(elev.yHautPlan(elev.uFinHaut)).toBeCloseTo(elev.yTipHaut, 5)
  })

  it('suit l’arc du dessous entre la peau et le bout', () => {
    const session = new Session()
    session.executer(script.split('esquisse plan.12h')[0])
    const boite = session.frontiere().faces.find((face) => face.sorte === 'boite' && face.zmax > 0)!
    expect(boite.elevation).toMatchObject({ plongee: 3.3, epaisseurBout: 3.2 })
    const elev = geometrieElevation({
      uPeau: 20,
      u1: 24.2,
      H: 8,
      y0: 0,
      elevation: boite.elevation!,
      rh: 1,
      rb: 0.8,
    })
    expect(elev.yBasPlan(20)).toBeCloseTo(0, 5)
    expect(elev.yBasPlan(elev.uFinBas)).toBeCloseTo(elev.yTipBas, 5)
    expect(elev.yHautPlan(elev.uFinHaut)).toBeCloseTo(elev.yTipHaut, 5)
    const conges = session.frontiere().faces.filter((face) => face.sorte === 'conge')
    const pans = pansDeCorne(boite, congesDe(boite, conges as never), boite.plan, undefined, 20)
    const dessous = pans.find((pan) => {
      if (pan.normale(pan.colonnes[0][0])[1] >= -0.5) return false
      const us = pan.colonnes.map((c) => Math.abs(c[0][2]))
      return Math.max(...us) - Math.min(...us) > 2
    })!
    let surArc = 0
    for (const [pied, tete] of dessous.colonnes) {
      for (const p of [pied, tete]) {
        const u = Math.abs(p[2])
        if (u <= 20.2 || u >= elev.uFinBas - 0.05) continue
        expect(p[1]).toBeCloseTo(elev.yBasPlan(u), 3)
        surArc += 1
      }
    }
    expect(surArc).toBeGreaterThan(0)
  })

  it('arrondit les coins de bout en élévation', () => {
    const session = new Session()
    session.executer(script.split('esquisse plan.12h')[0])
    const { positions } = session.maillage()
    let yMaxAuBout = 0
    let yMinAuBout = 8
    let surCongéHaut = 0
    const yTipBas = 3.3
    const yTipHaut = yTipBas + 3.2
    for (let i = 0; i < positions.length; i += 3) {
      const y = positions[i + 1]
      const z = Math.abs(positions[i + 2])
      if (z > 24.05) {
        yMaxAuBout = Math.max(yMaxAuBout, y)
        yMinAuBout = Math.min(yMinAuBout, y)
      }
      const cy = yTipHaut - 1
      const cz = 24.2 - 1
      if (Math.abs(Math.hypot(y - cy, z - cz) - 1) < 0.25 && y > yTipHaut - 1.6 && z > 22.5) surCongéHaut += 1
    }
    expect(yMaxAuBout).toBeLessThan(yTipHaut - 0.05)
    expect(yMinAuBout).toBeGreaterThan(yTipBas - 0.4)
    expect(yMinAuBout).toBeLessThan(yTipBas + 1.2)
    expect(surCongéHaut).toBeGreaterThan(0)
    session.commande('param rayon_bout_haut 1.5')
    expect(session.frontiere().faces.filter((face) => face.sorte === 'conge' && face.rayon === 1.5)).toHaveLength(4)
  })

  it('perce la barrette près du bout', () => {
    const session = new Session()
    session.executer(script.split('esquisse plan.3h')[0])
    const trous = session.frontiere().faces.filter((face) => face.sorte === 'traverse' && face.rayon < 1)
    expect(trous).toHaveLength(4)
    expect(trous[0]).toMatchObject({ rayon: 0.55 })
    expect(trous[0]!.y).toBeCloseTo(3.3 + 3.2 / 2, 5)
    expect(Math.abs(trous[0]!.z)).toBeCloseTo(24.2 - 1.2, 5)
    const flancAuTrou = 12.2 + (1.2 * (16 - 12.2)) / (24.2 - 12)
    for (const trou of trous) {
      expect(Math.min(Math.abs(trou.debut), Math.abs(trou.fin))).toBeLessThanOrEqual(10)
      expect(Math.max(Math.abs(trou.debut), Math.abs(trou.fin))).toBeGreaterThan(flancAuTrou + 0.2)
    }
  })

  it('décrit le tube et le trou de tige le long de 3 h', () => {
    const session = new Session()
    session.executer(script)
    const tube = session.frontiere().faces.find((face) => face.sorte === 'traverse' && face.rayon === 2)
    const tige = session.frontiere().faces.find((face) => face.sorte === 'traverse' && face.rayon === 0.6)
    expect(tube).toMatchObject({ fin: 22, y: 4, z: 0, dehors: 1 })
    expect(Math.hypot(tube?.debut ?? 0, 2)).toBeCloseTo(17.5)
    expect(tige).toMatchObject({ debut: 0, fin: 22, y: 4, z: 0, dehors: -1 })
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

  it('réunit les cornes et l’anneau en un seul volume', () => {
    const session = new Session()
    session.executer(script.split('esquisse plan.12h')[0])
    const { positions } = session.maillage()
    let dedans = 0
    for (let i = 0; i < positions.length; i += 3) {
      const rayon = Math.hypot(positions[i], positions[i + 2])
      const y = positions[i + 1]
      if (rayon < 19.9 && rayon > 17.6 && y > 1.1 && y < 6.7) dedans += 1
    }
    expect(dedans).toBe(0)
    session.commande('param entrecorne 22')
    expect(session.maillage().indices.length).toBeGreaterThan(0)
    session.commande('param diametre_boite 42')
    expect(session.maillage().indices.length).toBeGreaterThan(0)
  })

  it('perce la paroi avec le trou de tige', () => {
    const session = new Session()
    session.executer(script)
    const { positions } = session.maillage()
    let auPassage = 0
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const ecart = Math.hypot(positions[i + 1] - 4, positions[i + 2])
      if (x < 17.6 && x > 0 && ecart < 0.61) auPassage += 1
    }
    expect(auPassage).toBeGreaterThan(0)
  })

  it('laisse le passage libre sous les cornes et le tube', () => {
    const session = new Session()
    session.executer(script)
    const { positions } = session.maillage()
    let dedans = 0
    for (let i = 0; i < positions.length; i += 3) {
      const rayon = Math.hypot(positions[i], positions[i + 2])
      if (rayon < 17.45 && positions[i + 1] > 1.05) dedans += 1
    }
    expect(dedans).toBe(0)
  })

  it('soude le tube à la paroi, un seul disque au bout', () => {
    const session = new Session()
    session.executer(script)
    const { positions, normales } = session.maillage()
    let depart = 0
    for (let i = 0; i < positions.length; i += 3) {
      const ecart = Math.hypot(positions[i + 1] - 4, positions[i + 2])
      const rayon = Math.hypot(positions[i], positions[i + 2])
      if (normales[i] > 0.99 && positions[i] < 20.5 && ecart < 2.1 && rayon > 20.05) depart += 1
    }
    expect(depart).toBe(0)
  })

  it('garde la fermeture du tube sur la peau', () => {
    const session = new Session()
    session.executer(script)
    const { positions, normales } = session.maillage()
    let fermeture = 0
    for (let i = 0; i < positions.length; i += 3) {
      const rayon = Math.hypot(positions[i], positions[i + 2])
      const ecart = Math.hypot(positions[i + 1] - 4, positions[i + 2])
      const radiale = Math.hypot(normales[i], normales[i + 2])
      if (rayon > 19.7 && rayon < 20.3 && ecart > 0.7 && ecart < 1.9 && radiale > 0.9) fermeture += 1
    }
    expect(fermeture).toBeGreaterThan(0)
  })

  it('décrit l’anneau par un tube dont le rayon suit diametre_boite', () => {
    const session = new Session()
    session.executer(script.split('segment')[0])
    const rayon = rayonExterieur(session.maillage())
    expect(rayon).toBeCloseTo(20)
    session.commande('param diametre_boite 42')
    expect(rayonExterieur(session.maillage())).toBeCloseTo(21)
  })

  it('enregistre l’unité après la pièce, millimètres sinon', () => {
    const session = new Session()
    expect(session.unite()).toBe('mm')
    session.commande('piece carrure')
    expect(session.unite()).toBe('mm')
    session.commande('unite mm')
    expect(session.unite()).toBe('mm')
  })

  it('refuse un flottant là où un entier est attendu, et accepte l’expression de param', () => {
    expect(() => valeurTypee('entier', '1.5')).toThrow(ErreurApi)
    const session = new Session()
    session.executer(`
piece carrure
param diametre_boite 40
param epaisseur_paroi 2.5
param diametre_passage diametre_boite - 2 * epaisseur_paroi
`)
    expect(session.expression('diametre_passage')).toBe('diametre_boite - 2 * epaisseur_paroi')
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
