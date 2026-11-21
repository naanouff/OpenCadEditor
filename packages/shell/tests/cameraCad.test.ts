import { describe, expect, it } from 'vitest'
import { vec3 } from 'gl-matrix'
import { baseCamera, directionOrbite, facteurMolette, orbiterAutour, zoomVersPoint } from '../src/cameraCad.ts'

const ecran = (point: vec3, focus: vec3, azimut: number, polaire: number) => {
  const { droite, haut } = baseCamera(azimut, polaire)
  const relatif = vec3.sub(vec3.create(), point, focus)
  return [vec3.dot(relatif, droite), vec3.dot(relatif, haut)]
}

describe('caméra CAO', () => {
  it('molette vers l’avant rapproche, proportionnellement au défilement', () => {
    expect(facteurMolette(-120, 0)).toBeLessThan(1)
    expect(facteurMolette(120, 0)).toBeGreaterThan(1)
    expect(facteurMolette(-120, 0) * facteurMolette(120, 0)).toBeCloseTo(1, 10)
    const cran = 1 - facteurMolette(-120, 0)
    expect(1 - facteurMolette(-4, 0)).toBeLessThan(cran / 10)
    expect(facteurMolette(-3, 1)).toBeCloseTo(facteurMolette(-48, 0), 10)
  })

  it('zoome vers le point sous le curseur sans le déplacer à l’écran', () => {
    const focus = vec3.fromValues(1, 2, 3)
    const az = 0.7
    const pol = 1.1
    const { droite, haut } = baseCamera(az, pol)
    const demi = 0.5
    const aspect = 1.6
    const nx = 0.4
    const ny = -0.3
    const vise = vec3.clone(focus)
    vec3.scaleAndAdd(vise, vise, droite, nx * demi * aspect)
    vec3.scaleAndAdd(vise, vise, haut, ny * demi)
    const k = 0.8
    const suivant = zoomVersPoint(focus, droite, haut, nx, ny, demi, aspect, k)
    const [u, v] = ecran(vise, suivant, az, pol)
    expect(u / (demi * k * aspect)).toBeCloseTo(nx, 6)
    expect(v / (demi * k)).toBeCloseTo(ny, 6)
  })

  it('tourne autour du pivot : il garde sa place à l’écran', () => {
    const focus = vec3.fromValues(0, 0, 0)
    const pivot = vec3.fromValues(0.03, 0.01, -0.02)
    const avant = ecran(pivot, focus, 0.4, 1.0)
    const suivant = orbiterAutour(focus, pivot, 0.4, 1.0, 1.3, 0.6)
    const apres = ecran(pivot, suivant, 1.3, 0.6)
    expect(apres[0]).toBeCloseTo(avant[0]!, 6)
    expect(apres[1]).toBeCloseTo(avant[1]!, 6)
    const profondeur = (f: vec3, az: number, pol: number) =>
      vec3.dot(vec3.sub(vec3.create(), pivot, f), directionOrbite(az, pol))
    expect(profondeur(suivant, 1.3, 0.6)).toBeCloseTo(profondeur(focus, 0.4, 1.0), 6)
  })
})
