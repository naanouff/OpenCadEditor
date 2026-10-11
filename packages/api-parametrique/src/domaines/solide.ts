import { couperRectangles } from '../revolution.ts'
import { solveurGcs } from '../solveurGcs.ts'
import { ErreurApi, type Ajout, type Contexte, type Domaine, type Operation } from '../types.ts'

function profil(contexte: Contexte, operation: Operation): Ajout | undefined {
  const esquisse = contexte.esquisse
  if (!esquisse) return
  const evaluer = (expression: string) => contexte.evaluateur.evaluer(expression, contexte.parametres)
  const segments = esquisse.entites.filter((entite) => entite.sorte === 'segment')
  const arcs = esquisse.entites.filter((entite) => entite.sorte === 'arc')
  if (segments.length >= 3 && arcs.length >= 1) {
    const ecart = segments.find((entite) => entite.ecart)?.ecart
    const debord = segments.find((entite) => entite.debord)?.debord
    const largeurs = segments.filter((entite) => entite.largeur).map((entite) => entite.largeur as string)
    const rayon = arcs.find((entite) => entite.rayon)?.rayon
    if (ecart && debord && largeurs.length >= 2 && rayon) {
      const lire = (nom: string, defaut: number) =>
        contexte.parametres.has(nom) ? evaluer(nom) : defaut
      return {
        sorte: 'profil',
        ecart: evaluer(ecart),
        debord: evaluer(debord),
        largeurBout: evaluer(largeurs[0]),
        largeurRacine: evaluer(largeurs[1]),
        rayonRacine: evaluer(rayon),
        rayonBoutHaut: lire('rayon_bout_haut', 0),
        rayonBoutBas: lire('rayon_bout_bas', 0),
        plongeeBout: lire('plongee_bout', 0),
        epaisseurBout: lire('epaisseur_bout', 0),
        amorceDessus: lire('amorce_dessus', 0),
        hauteur: evaluer(operation.arguments.expression),
      }
    }
  }
  if (segments.length >= 2 && arcs.length >= 1) {
    const ecart = segments.find((entite) => entite.ecart)?.ecart
    const debord = segments.find((entite) => entite.debord)?.debord
    const largeur = segments.find((entite) => entite.largeur)?.largeur
    const rayon = arcs.find((entite) => entite.rayon)?.rayon
    if (ecart && debord && largeur && rayon) {
      const lire = (nom: string, defaut: number) =>
        contexte.parametres.has(nom) ? evaluer(nom) : defaut
      const largeurBout = evaluer(largeur)
      return {
        sorte: 'profil',
        ecart: evaluer(ecart),
        debord: evaluer(debord),
        largeurBout,
        largeurRacine: largeurBout,
        rayonRacine: 0,
        rayonBoutHaut: lire('rayon_bout_haut', 0),
        rayonBoutBas: lire('rayon_bout_bas', 0),
        plongeeBout: lire('plongee_bout', 0),
        epaisseurBout: lire('epaisseur_bout', 0),
        amorceDessus: lire('amorce_dessus', 0),
        hauteur: evaluer(operation.arguments.expression),
      }
    }
  }
  const rectangle = [...esquisse.entites].reverse().find((entite) => entite.sorte === 'rectangle')
  if (rectangle?.ecart && rectangle.debord && rectangle.largeur) {
    return {
      sorte: 'rectangle',
      ecart: evaluer(rectangle.ecart),
      debord: evaluer(rectangle.debord),
      largeur: evaluer(rectangle.largeur),
      hauteur: evaluer(operation.arguments.expression),
    }
  }
  if (esquisse.support !== 'plan.3h') return
  const cercle = [...esquisse.entites].reverse().find((entite) => entite.sorte === 'cercle' && entite.diametre)
  if (!cercle?.diametre) return
  return {
    sorte: 'cercle',
    support: esquisse.support,
    rayon: evaluer(cercle.diametre) / 2,
    longueur: evaluer(operation.arguments.expression),
  }
}

function exigerEsquisse(contexte: Contexte) {
  if (!contexte.esquisse) throw new ErreurApi('aucune esquisse')
  const etat = contexte.solveur.etat(contexte.esquisse, contexte.parametres)
  if (!etat.ferme || etat.degres > 0 || etat.statut === 'surcontraint') {
    throw new ErreurApi('esquisse non contrainte')
  }
  const resolue = solveurGcs.resoudre(contexte.esquisse, contexte.parametres)
  if (resolue.polylines.length === 0) {
    throw new ErreurApi('esquisse non contrainte')
  }
}

function lireFillet(reste: string): Operation {
  const parts = reste.trim().split(/\s+/).filter(Boolean)
  if (parts.length < 1) throw new ErreurApi('fillet sans rayon')
  const [expression, ...aretes] = parts
  for (const a of aretes) {
    if (a !== 'arete.haut' && a !== 'arete.bas' && a !== 'arete.vertical') {
      throw new ErreurApi(`sélecteur d'arête inconnu: ${a}`)
    }
  }
  return {
    type: 'fillet',
    arguments: {
      expression: expression!,
      ...(aretes.length > 0 ? { aretes: aretes.join(' ') } : {}),
    },
    noms: [],
  }
}

export const domaineSolide: Domaine = {
  id: 'solide',
  verbes: {
    extrude: (reste) => ({ type: 'extrude', arguments: { expression: reste }, noms: [] }),
    fillet: (reste) => lireFillet(reste),
    'enleve travers': (reste) => ({
      type: 'enlever',
      arguments: { expression: reste, traverse: 'oui' },
      noms: [],
    }),
    enleve: (reste) => ({
      type: 'enlever',
      arguments: { expression: reste, traverse: 'non' },
      noms: [],
    }),
  },
  operations: {
    extrude: {
      dansHistorique: true,
      faire(contexte, operation) {
        exigerEsquisse(contexte)
        const support = contexte.esquisse?.support
        contexte.solide = contexte.noyau.extruder(contexte.solide, profil(contexte, operation))
        contexte.piece.solide = contexte.solide
        contexte.esquisse = null
        contexte.piece.esquisse = null
        if (support === 'plan.3h') contexte.noms.set('tube', 'tube')
        else if (!contexte.noms.has('anneau')) contexte.noms.set('anneau', 'axe')
      },
      defaire() {},
    },
    fillet: {
      dansHistorique: true,
      faire(contexte) {
        if (!contexte.solide && !contexte.piece.volume) throw new ErreurApi('aucun solide')
        // Géométrie portée par le pipeline OCCT (noyau provisoire : no-op).
      },
      defaire() {},
    },
    enlever: {
      dansHistorique: true,
      faire(contexte, operation) {
        const rectangles = contexte.esquisse?.entites.some((entite) => entite.sorte === 'rectangle' && entite.longueur)
        if (!contexte.piece.volume && rectangles) {
          contexte.esquisse = null
          contexte.piece.esquisse = null
          return
        }
        if (contexte.piece.volume) {
          if (contexte.geometrie === false) {
            contexte.esquisse = null
            contexte.piece.esquisse = null
            return
          }
          if (!contexte.esquisse) throw new ErreurApi('aucune esquisse')
          const profondeur = contexte.evaluateur.evaluer(operation.arguments.expression, contexte.parametres)
          contexte.piece.volume = couperRectangles(
            contexte.piece.volume,
            contexte.esquisse,
            profondeur,
            contexte.evaluateur,
            contexte.parametres,
          )
          contexte.esquisse = null
          contexte.piece.esquisse = null
          return
        }
        exigerEsquisse(contexte)
        if (!contexte.solide) throw new ErreurApi('aucun solide')
        const esquisse = contexte.esquisse
        if (!esquisse) throw new ErreurApi('aucune esquisse')
        const cercle = [...esquisse.entites].reverse().find((entite) => entite.sorte === 'cercle')
        if (!cercle?.diametre) throw new ErreurApi('profil sans diamètre')
        const diametre = contexte.evaluateur.evaluer(cercle.diametre, contexte.parametres)
        const profondeur = contexte.evaluateur.evaluer(operation.arguments.expression, contexte.parametres)
        contexte.solide = contexte.noyau.enlever(contexte.solide, {
          support: esquisse.support,
          rayon: diametre / 2,
          profondeur,
          traverse: operation.arguments.traverse === 'oui',
        })
        contexte.piece.solide = contexte.solide
        contexte.esquisse = null
        contexte.piece.esquisse = null
        if (contexte.solide.enlevementsBorgnes >= 2) {
          const hauteur = contexte.evaluateur.evaluer('hauteur_carrure', contexte.parametres)
          const lunette = contexte.evaluateur.evaluer('profondeur_lunette', contexte.parametres)
          const fond = contexte.evaluateur.evaluer('profondeur_fond', contexte.parametres)
          if (hauteur - lunette - fond <= 0) throw new ErreurApi('collerette invalide')
        }
      },
      defaire() {},
    },
  },
}
