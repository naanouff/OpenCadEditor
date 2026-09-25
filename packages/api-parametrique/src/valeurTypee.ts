import { ErreurApi } from './types.ts'

/** Refuse un littéral qui n'a pas le type déclaré. */
export function valeurTypee(type: 'entier' | 'flottant', texte: string) {
  if (type === 'entier') {
    if (!/^-?\d+$/.test(texte)) throw new ErreurApi('entier attendu')
    return Number(texte)
  }
  if (!/^-?\d+(\.\d+)?$/.test(texte)) throw new ErreurApi('flottant attendu')
  return Number(texte)
}
