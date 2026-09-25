import { ErreurApi, type Domaine, type EntiteEsquisse } from '../types.ts'

const PLANS = new Set(['plan.dessus', 'plan.12h', 'plan.3h'])

function rouvrirSiBesoin(contexte: {
  esquisse: { support: string; entites: EntiteEsquisse[] } | null
  piece: { esquisse: { support: string; entites: EntiteEsquisse[] } | null; dernierSupport: string | null }
}) {
  if (contexte.esquisse) return
  const support = contexte.piece.dernierSupport
  if (!support) throw new ErreurApi('aucune esquisse')
  contexte.esquisse = { support, entites: [] }
  contexte.piece.esquisse = contexte.esquisse
}

function derniere(contexte: { esquisse: { entites: EntiteEsquisse[] } | null }): EntiteEsquisse {
  const entite = contexte.esquisse?.entites.at(-1)
  if (!entite) throw new ErreurApi('esquisse vide')
  return entite
}

export const domaineEsquisse: Domaine = {
  id: 'esquisse',
  verbes: {
    esquisse: (reste) => ({ type: 'ouvrir', arguments: { support: reste }, noms: [] }),
    cercle: () => ({ type: 'cercle', arguments: {}, noms: [] }),
    rectangle: () => ({ type: 'rectangle', arguments: {}, noms: [] }),
    concentrique: (reste) => ({ type: 'concentrique', arguments: { cible: reste }, noms: [] }),
    cote: (reste) => {
      const espace = reste.indexOf(' ')
      const cible = espace === -1 ? reste : reste.slice(0, espace)
      const expression = espace === -1 ? '' : reste.slice(espace + 1).trim()
      return { type: 'cote', arguments: { cible, expression }, noms: [] }
    },
    symetrie: (reste) => ({ type: 'symetrie', arguments: { axe: reste }, noms: [] }),
  },
  operations: {
    ouvrir: {
      dansHistorique: true,
      faire(contexte, operation) {
        const support = operation.arguments.support
        if (!PLANS.has(support) && !contexte.noyau.aFace(contexte.solide, support)) {
          throw new ErreurApi(`${support} absente`)
        }
        contexte.esquisse = { support, entites: [] }
        contexte.piece.esquisse = contexte.esquisse
        contexte.piece.dernierSupport = support
      },
      defaire() {},
    },
    cercle: {
      dansHistorique: true,
      faire(contexte) {
        rouvrirSiBesoin(contexte)
        const id = `cercle.${contexte.piece.compteur++}`
        contexte.esquisse!.entites.push({ id, sorte: 'cercle', degres: 1 })
        if (!contexte.noms.has('cercle.exterieur')) {
          contexte.noms.set('cercle.exterieur', id)
        }
      },
      defaire() {},
    },
    rectangle: {
      dansHistorique: true,
      faire(contexte) {
        rouvrirSiBesoin(contexte)
        contexte.esquisse!.entites.push({
          id: `rectangle.${contexte.piece.compteur++}`,
          sorte: 'rectangle',
          degres: 3,
        })
      },
      defaire() {},
    },
    concentrique: {
      dansHistorique: true,
      faire(contexte, operation) {
        if (!contexte.noms.has(operation.arguments.cible)) {
          throw new ErreurApi(`cible inconnue: ${operation.arguments.cible}`)
        }
        const entite = derniere(contexte)
        entite.degres = Math.max(0, entite.degres - 1)
      },
      defaire() {},
    },
    cote: {
      dansHistorique: true,
      faire(contexte, operation) {
        contexte.evaluateur.evaluer(operation.arguments.expression, contexte.parametres)
        const entite = derniere(contexte)
        entite.degres = Math.max(0, entite.degres - 1)
      },
      defaire() {},
    },
    symetrie: {
      dansHistorique: true,
      faire(contexte, operation) {
        if (!contexte.esquisse) return
        if (operation.arguments.axe !== 'vertical' && operation.arguments.axe !== 'horizontal') {
          throw new ErreurApi(`axe inconnu: ${operation.arguments.axe}`)
        }
      },
      defaire() {},
    },
  },
}
