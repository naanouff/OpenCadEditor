import { estDatumOrigine } from '../datums.ts'
import { ErreurApi, type Domaine, type EntiteEsquisse } from '../types.ts'

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
    segment: () => ({ type: 'segment', arguments: {}, noms: [] }),
    arc: () => ({ type: 'arc', arguments: {}, noms: [] }),
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
        if (!estDatumOrigine(support) && !contexte.noyau.aFace(contexte.solide, support)) {
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
    segment: {
      dansHistorique: true,
      faire(contexte) {
        rouvrirSiBesoin(contexte)
        const rang = contexte.esquisse!.entites.filter((entite) => entite.sorte === 'segment').length
        contexte.esquisse!.entites.push({
          id: `segment.${contexte.piece.compteur++}`,
          sorte: 'segment',
          degres: rang === 0 ? 1 : rang === 1 ? 2 : 1,
        })
      },
      defaire() {},
    },
    arc: {
      dansHistorique: true,
      faire(contexte) {
        rouvrirSiBesoin(contexte)
        contexte.esquisse!.entites.push({
          id: `arc.${contexte.piece.compteur++}`,
          sorte: 'arc',
          degres: 1,
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
        entite.concentrique = operation.arguments.cible
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
        const cible = operation.arguments.cible
        if (cible === 'diametre') entite.diametre = operation.arguments.expression
        if (cible === 'ecart') entite.ecart = operation.arguments.expression
        if (cible === 'debord') entite.debord = operation.arguments.expression
        if (cible === 'largeur') entite.largeur = operation.arguments.expression
        if (cible === 'rayon') entite.rayon = operation.arguments.expression
        if (cible === 'hauteur') entite.hauteur = operation.arguments.expression
        if (cible === 'longueur') entite.longueur = operation.arguments.expression
      },
      defaire() {},
    },
    symetrie: {
      dansHistorique: true,
      faire(contexte, operation) {
        if (!contexte.esquisse) return
        const axe = operation.arguments.axe
        if (axe !== 'vertical' && axe !== 'horizontal') {
          throw new ErreurApi(`axe inconnu: ${axe}`)
        }
        const liste = contexte.esquisse.symetries ?? []
        liste.push(axe)
        contexte.esquisse.symetries = liste
      },
      defaire() {},
    },
  },
}
