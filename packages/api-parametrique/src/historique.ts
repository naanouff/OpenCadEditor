import type { Operation } from './types.ts'

export const SOUS_ESQUISSE = new Set([
  'cercle',
  'rectangle',
  'segment',
  'arc',
  'octogone',
  'concentrique',
  'cote',
  'symetrie',
])

export const CONSOMME_ESQUISSE = new Set(['extrude', 'enlever', 'revolution'])

/** Fonctions qui peuvent porter la pointe de reconstruction. */
export const TYPES_FONCTION = new Set(['extrude', 'enlever', 'revolution', 'pas'])

export function indexesFonctions(historique: Operation[]): number[] {
  const indexes: number[] = []
  for (let i = 0; i < historique.length; i++) {
    if (TYPES_FONCTION.has(historique[i]!.type)) indexes.push(i)
  }
  return indexes
}

/** Rang 1-based → index historique de la fonction. */
export function indexFonctionParRang(historique: Operation[], rang: number): number {
  const indexes = indexesFonctions(historique)
  if (!Number.isInteger(rang) || rang < 1 || rang > indexes.length) {
    throw new Error(`rang de fonction invalide: ${rang}`)
  }
  return indexes[rang - 1]!
}

/**
 * Opérations à rejouer. Saute les fonctions éteintes (`actif === false`).
 * Si `pointe` est un index historique de fonction, s’arrête après l’avoir émise.
 */
export function rejouables(historique: Operation[], pointe: number | null = null): Operation[] {
  const sortie: Operation[] = []
  let tampon: Operation[] = []
  const verser = () => {
    sortie.push(...tampon)
    tampon = []
  }
  for (let i = 0; i < historique.length; i++) {
    const operation = historique[i]!
    if (operation.type === 'ouvrir') {
      verser()
      tampon = [operation]
      continue
    }
    if (SOUS_ESQUISSE.has(operation.type)) {
      tampon.push(operation)
      continue
    }
    if (CONSOMME_ESQUISSE.has(operation.type)) {
      if (operation.actif === false) tampon = []
      else {
        sortie.push(...tampon, operation)
        tampon = []
        if (pointe !== null && i === pointe) return sortie
      }
      continue
    }
    if (operation.type === 'pas') {
      if (operation.actif !== false) {
        sortie.push(operation)
        if (pointe !== null && i === pointe) return sortie
      }
      continue
    }
    if (operation.actif !== false) sortie.push(operation)
  }
  verser()
  return sortie
}
