/**
 * Calculs de la caméra orbitale CAO : molette, zoom vers le curseur, rotation autour d’un pivot.
 * Angles du contrôleur w3dts : l’œil est à `focus + rayon × directionOrbite(azimut, polaire)`.
 */
import { quat, vec3 } from 'gl-matrix'

/** Pixels de défilement pour un facteur e. 120 px (un cran) ≈ 18 % de zoom. */
const PIXELS_PAR_E = 600

/** `WheelEvent.deltaMode` : 0 pixels, 1 lignes, 2 pages. */
const PIXELS_PAR_MODE = [1, 16, 800]

/** Facteur de la demi-hauteur visible : < 1 rapproche (molette vers l’avant). */
export function facteurMolette(deltaY: number, deltaMode: number) {
  const pixels = deltaY * (PIXELS_PAR_MODE[deltaMode] ?? 1)
  return Math.exp(pixels / PIXELS_PAR_E)
}

export function directionOrbite(azimut: number, polaire: number): vec3 {
  const s = Math.sin(polaire)
  return vec3.fromValues(s * Math.sin(azimut), Math.cos(polaire), s * Math.cos(azimut))
}

/** Droite et haut de l’écran, monde Y vers le haut (même base que le contrôleur). */
export function baseCamera(azimut: number, polaire: number) {
  const avant = vec3.negate(vec3.create(), directionOrbite(azimut, polaire))
  const droite = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), avant, [0, 1, 0]))
  const haut = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), droite, avant))
  return { avant, droite, haut }
}

/**
 * Nouveau focus orthographique après un zoom de facteur `k` : le point à (nx, ny) en NDC
 * reste sous le curseur.
 */
export function zoomVersPoint(
  focus: vec3,
  droite: vec3,
  haut: vec3,
  nx: number,
  ny: number,
  demiHauteur: number,
  aspect: number,
  k: number,
): vec3 {
  const suivant = vec3.clone(focus)
  vec3.scaleAndAdd(suivant, suivant, droite, nx * demiHauteur * aspect * (1 - k))
  vec3.scaleAndAdd(suivant, suivant, haut, ny * demiHauteur * (1 - k))
  return suivant
}

/** Focus après passage des angles (az0, pol0) à (az1, pol1) en tournant autour de `pivot`. */
export function orbiterAutour(
  focus: vec3,
  pivot: vec3,
  az0: number,
  pol0: number,
  az1: number,
  pol1: number,
): vec3 {
  const autourY = quat.setAxisAngle(quat.create(), [0, 1, 0], az1 - az0)
  const versPolaire = quat.rotationTo(quat.create(), directionOrbite(az1, pol0), directionOrbite(az1, pol1))
  const rotation = quat.multiply(quat.create(), versPolaire, autourY)
  const relatif = vec3.sub(vec3.create(), focus, pivot)
  vec3.transformQuat(relatif, relatif, rotation)
  return vec3.add(relatif, relatif, pivot)
}
