import { ErreurApi } from './types.ts'

/**
 * Semver 2.0.0 : MAJEUR.MINEUR.CORRECTIF, préversion et métadonnées facultatives.
 * https://semver.org/spec/v2.0.0.html
 */
const SEMVER =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

/** Renvoie le texte s'il est une version semantique, sinon lève. */
export function versionSemantique(texte: string) {
  if (!SEMVER.test(texte)) throw new ErreurApi('version semantique attendue')
  return texte
}
