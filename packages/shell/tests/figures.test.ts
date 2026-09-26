import { describe, expect, it } from 'vitest'
import type { Frontiere, MaillageOmbre } from '@opencad/api-parametrique'
import { documentCad } from '../src/documentCad.ts'
import { geometriePlan } from '@opencad/api-parametrique'
import { aretesVives, filDeFer } from '../src/dessin.ts'

const figures: Frontiere = {
  faces: [
    { sorte: 'boite', xmin: 10, xmax: 14, ymin: 0, ymax: 8, zmin: 20, zmax: 25 },
    { sorte: 'traverse', rayon: 2, debut: 20, fin: 22, y: 4, z: 0, dehors: 1 },
  ],
}

describe('boîte et traversée', () => {
  it('maille des sommets hors de l’anneau', () => {
    const { positions } = documentCad(figures).maillage
    let dehors = false
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const z = positions[i + 2]
      if (Math.hypot(x, z) > 0.02) dehors = true
    }
    expect(dehors).toBe(true)
    expect(positions.length).toBeGreaterThan(0)
  })

  it('trace les arêtes de la boîte et les deux cercles de la traversée', () => {
    const fil = filDeFer(figures)
    expect(fil.segmentCount).toBeGreaterThan(12)
  })

  it('tire le fil de fer des faces exactes, pas des découpes du maillage', () => {
    // Deux triangles coplanaires qui ne partagent pas leurs sommets : la découpe BSP
    // laisse des arêtes ouvertes au milieu de la face, absentes de la topologie.
    const volume: MaillageOmbre = {
      positions: [0, 0, 0, 4, 0, 0, 2, 4, 0, 0.01, 0, 0, 4.01, 0, 0, 2.01, 4, 0],
      normales: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      indices: [0, 1, 2, 3, 4, 5],
    }
    const exact = filDeFer(figures).segmentCount
    expect(aretesVives(volume).length / 6).toBeGreaterThan(0)
    expect(documentCad(figures, null, volume).brepWireframe.segmentCount).toBe(exact)
  })

  it('coupe les arêtes des cornes à la peau, omet le cercle enterré de la tige', () => {
    const carrure: Frontiere = {
      faces: [
        { sorte: 'cylindre', rayon: 20, bas: 0, haut: 8, dehors: 1 },
        { sorte: 'cylindre', rayon: 17.5, bas: 0, haut: 8, dehors: -1 },
        { sorte: 'boite', xmin: 10, xmax: 14, ymin: 0, ymax: 8, zmin: 10.5, zmax: 25 },
        { sorte: 'traverse', rayon: 0.6, debut: 0, fin: 22, y: 4, z: 0, dehors: -1 },
        { sorte: 'traverse', rayon: 2, debut: 17.4, fin: 22, y: 4, z: 0, dehors: 1 },
      ],
    }
    const { position } = filDeFer(carrure)
    let dansLePassage = 0
    let cercleAuCentre = 0
    let cerclePerçage = 0
    let cercleTube = 0
    for (let i = 0; i < position.array.length; i += 6) {
      const ax = position.array[i]
      const ay = position.array[i + 1]
      const az = position.array[i + 2]
      const bx = position.array[i + 3]
      const by = position.array[i + 4]
      const bz = position.array[i + 5]
      if (Math.hypot(ax, az) < 19.5 && Math.hypot(bx, bz) < 19.5) dansLePassage += 1
      if (Math.abs(ax) < 0.1 && Math.abs(bx) < 0.1 && Math.hypot(ax, az) < 1) cercleAuCentre += 1
      if (Math.abs(ax - 22) < 0.01 && Math.abs(bx - 22) < 0.01) {
        const ra = Math.hypot(ay - 4, az)
        const rb = Math.hypot(by - 4, bz)
        if (Math.abs(ra - 0.6) < 0.05 && Math.abs(rb - 0.6) < 0.05) cerclePerçage += 1
        if (Math.abs(ra - 2) < 0.05 && Math.abs(rb - 2) < 0.05) cercleTube += 1
      }
    }
    expect(dansLePassage).toBe(0)
    expect(cercleAuCentre).toBe(0)
    expect(cerclePerçage).toBeGreaterThan(0)
    expect(cercleTube).toBeGreaterThan(0)
  })

  it('trace le flanc et l’arc de racine', () => {
    const corne: Frontiere = {
      faces: [
        { sorte: 'cylindre', rayon: 20, bas: 0, haut: 8, dehors: 1 },
        {
          sorte: 'boite',
          xmin: 10,
          xmax: 16.3,
          ymin: 0,
          ymax: 8,
          zmin: 10.5,
          zmax: 24.2,
          plan: { largeurBout: 2.2, largeurRacine: 6, rayonRacine: 3 },
        },
      ],
    }
    const { position, segmentCount } = filDeFer(corne)
    expect(segmentCount).toBeGreaterThan(8)
    let surFlanc = 0
    let surRacine = 0
    const C = { x: 18.715940866588546, z: 13.368379014613582 }
    for (let i = 0; i < position.array.length; i += 3) {
      const x = position.array[i]
      const z = position.array[i + 2]
      if (x > 12 && x < 16 && z > 12.5 && z < 24) surFlanc += 1
      if (Math.abs(Math.hypot(x - C.x, z - C.z) - 3) < 0.08) surRacine += 1
    }
    expect(surFlanc).toBeGreaterThan(4)
    expect(surRacine).toBeGreaterThan(2)
  })

  it('omet les arêtes lisses du congé de racine, tangent au flanc et à la peau', () => {
    const plan = { largeurBout: 2.2, largeurRacine: 6, rayonRacine: 3 }
    const geo = geometriePlan({ a0: 10, u1: 24.2, plan, rayonPeau: 20 })
    const corne: Frontiere = {
      faces: [
        { sorte: 'cylindre', rayon: 20, bas: 0, haut: 8, dehors: 1 },
        { sorte: 'boite', xmin: 10, xmax: 16.3, ymin: 0, ymax: 8, zmin: 10.5, zmax: 24.2, plan },
      ],
    }
    const { position } = filDeFer(corne)
    let verticales = 0
    for (let i = 0; i < position.array.length; i += 6) {
      const [ax, ay, az, bx, by, bz] = position.array.slice(i, i + 6)
      if (Math.abs(ax - bx) > 1e-9 || Math.abs(az - bz) > 1e-9 || Math.abs(ay - by) < 1e-9) continue
      for (const [x, z] of [geo.Qt, geo.peau]) {
        if (Math.hypot(ax - x, az - z) < 1e-6) verticales += 1
      }
    }
    expect(verticales).toBe(0)
  })

  it('colle le cercle de sortie du perçage sur le flanc incliné', () => {
    const plan = { largeurBout: 2.2, largeurRacine: 6, rayonRacine: 3 }
    const geo = geometriePlan({ a0: 10, u1: 24.2, plan, rayonPeau: 20 })
    const trou: Frontiere = {
      faces: [
        { sorte: 'cylindre', rayon: 20, bas: 0, haut: 8, dehors: 1 },
        { sorte: 'boite', xmin: 10, xmax: 16.3, ymin: 0, ymax: 8, zmin: 10.5, zmax: 24.2, plan },
        { sorte: 'traverse', rayon: 0.55, debut: 10, fin: 16.3, y: 4, z: 23, dehors: -1 },
      ],
    }
    const { position } = filDeFer(trou)
    let autourDuTrou = 0
    for (let i = 0; i < position.array.length; i += 3) {
      const [x, y, z] = [position.array[i], position.array[i + 1], position.array[i + 2]]
      if (Math.abs(Math.hypot(y - 4, z - 23) - 0.55) > 1e-6 || x < 10.5) continue
      autourDuTrou += 1
      expect(geo.N[0] * (x - geo.Ptip[0]) + geo.N[1] * (z - geo.Ptip[1])).toBeCloseTo(0, 6)
    }
    expect(autourDuTrou).toBeGreaterThan(8)
  })

  it('trace les arcs de congé de bout', () => {
    const conge: Frontiere = {
      faces: [
        {
          sorte: 'boite',
          xmin: 10,
          xmax: 12.2,
          ymin: 0,
          ymax: 8,
          zmin: 10.5,
          zmax: 24.2,
          plan: { largeurBout: 2.2, largeurRacine: 6, rayonRacine: 3 },
        },
        {
          sorte: 'conge',
          debut: 10,
          fin: 12.2,
          y: 7,
          z: 23.2,
          rayon: 1,
          angleDeb: 0,
          angleFin: Math.PI / 2,
          dehors: 1,
        },
      ],
    }
    const { position, segmentCount } = filDeFer(conge)
    expect(segmentCount).toBeGreaterThan(4)
    let surArc = 0
    for (let i = 0; i < position.array.length; i += 3) {
      const ecart = Math.hypot(position.array[i + 1] - 7, position.array[i + 2] - 23.2)
      if (Math.abs(ecart - 1) < 0.05) surArc += 1
    }
    expect(surArc).toBeGreaterThan(4)
  })

  it('omet les arêtes du coin de bout déjà remplacé par le congé', () => {
    const corne: Frontiere = {
      faces: [
        { sorte: 'cylindre', rayon: 20, bas: 0, haut: 8, dehors: 1 },
        {
          sorte: 'boite',
          xmin: 10,
          xmax: 16.3,
          ymin: 0,
          ymax: 8,
          zmin: 10.5,
          zmax: 24.2,
          plan: { largeurBout: 2.2, largeurRacine: 6, rayonRacine: 3 },
        },
        {
          sorte: 'conge',
          debut: 10,
          fin: 12.2,
          y: 7,
          z: 23.2,
          rayon: 1,
          angleDeb: 0,
          angleFin: Math.PI / 2,
          dehors: 1,
        },
        {
          sorte: 'conge',
          debut: 10,
          fin: 12.2,
          y: 0.8,
          z: 23.4,
          rayon: 0.8,
          angleDeb: Math.PI / 2,
          angleFin: Math.PI,
          dehors: 1,
        },
      ],
    }
    const { position } = filDeFer(corne)
    let coinHaut = 0
    for (let i = 0; i < position.array.length; i += 3) {
      const y = position.array[i + 1]
      const z = position.array[i + 2]
      if (Math.abs(y - 8) < 0.05 && Math.abs(z - 24.2) < 0.05) coinHaut += 1
    }
    expect(coinHaut).toBe(0)
  })
})
