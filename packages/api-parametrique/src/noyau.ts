import { evaluateurProvisoire } from './evaluateur.ts'
import { geometrieElevation, geometriePlan } from './corne.ts'
import { ombrer } from './ombre.ts'
import type { Ajout, Enlevement, Frontiere, NoyauGeometrique, Solide } from './types.ts'

function avecFaces(solide: Solide | null): Solide {
  const suivant: Solide = solide
    ? {
        faces: new Set(solide.faces),
        extrusions: solide.extrusions,
        enlevementsBorgnes: solide.enlevementsBorgnes,
        enlevements: [...solide.enlevements],
        ajouts: [...solide.ajouts],
      }
    : { faces: new Set(), extrusions: 0, enlevementsBorgnes: 0, enlevements: [], ajouts: [] }
  suivant.faces.add('face.dessus')
  suivant.faces.add('face.dessous')
  return suivant
}

/** Poses des faces nommées, sans solide exact. */
export const noyauProvisoire: NoyauGeometrique = {
  extruder(solide, ajout) {
    const suivant = avecFaces(solide)
    suivant.extrusions += 1
    if (ajout) suivant.ajouts.push(ajout)
    return suivant
  },
  enlever(solide, coupe) {
    const suivant = avecFaces(solide)
    suivant.enlevements.push(coupe)
    if (!coupe.traverse) suivant.enlevementsBorgnes += 1
    return suivant
  },
  aFace(solide, face) {
    return solide?.faces.has(face) ?? false
  },
  mailler(solide, parametres) {
    if (!solide) return { positions: [], normales: [], indices: [] }
    return ombrer(this.decrire(solide, parametres).faces)
  },
  decrire(solide, parametres) {
    if (!solide) return { faces: [] }
    const diametre = evaluateurProvisoire.evaluer('diametre_boite', parametres)
    const paroi = evaluateurProvisoire.evaluer('epaisseur_paroi', parametres)
    const hauteur = evaluateurProvisoire.evaluer('hauteur_carrure', parametres)
    const rayonExt = diametre / 2
    const rayonInt = rayonExt - paroi
    const dessus = solide.enlevements.find((coupe) => !coupe.traverse && coupe.support === 'face.dessus')
    const dessous = solide.enlevements.find((coupe) => !coupe.traverse && coupe.support === 'face.dessous')
    const portee = dessus && dessus.rayon > rayonInt && dessus.rayon < rayonExt ? dessus : null
    const levre = dessous && dessous.rayon < rayonInt ? dessous : null
    const fond = portee ? hauteur - portee.profondeur : hauteur
    const basPassage = levre ? levre.profondeur : 0
    const faces: Frontiere['faces'] = [
      { sorte: 'cylindre', rayon: rayonExt, bas: 0, haut: hauteur, dehors: 1 },
      { sorte: 'cylindre', rayon: rayonInt, bas: basPassage, haut: fond, dehors: -1 },
      { sorte: 'couronne', rayonExt, rayonInt: levre ? levre.rayon : rayonInt, y: 0, dehors: -1 },
    ]
    if (levre) {
      faces.push(
        { sorte: 'cylindre', rayon: levre.rayon, bas: 0, haut: levre.profondeur, dehors: -1 },
        { sorte: 'couronne', rayonExt: rayonInt, rayonInt: levre.rayon, y: levre.profondeur, dehors: 1 },
      )
    }
    if (!portee) faces.push({ sorte: 'couronne', rayonExt, rayonInt, y: hauteur, dehors: 1 })
    else {
      faces.push(
        { sorte: 'cylindre', rayon: portee.rayon, bas: fond, haut: hauteur, dehors: -1 },
        { sorte: 'couronne', rayonExt, rayonInt: portee.rayon, y: hauteur, dehors: 1 },
        { sorte: 'couronne', rayonExt: portee.rayon, rayonInt, y: fond, dehors: 1 },
      )
    }
    faces.push(...figures(solide.ajouts, solide.enlevements, rayonExt, rayonInt, hauteur, parametres))
    return { faces }
  },
  poser(esquisse, solide, parametres) {
    const cercles = esquisse.entites
      .filter((entite) => entite.sorte === 'cercle' && entite.diametre)
      .map((entite) => {
        const valeur = evaluateurProvisoire.evaluer(entite.diametre as string, parametres)
        return {
          rayon: valeur / 2,
          y: hauteurDuPlan(esquisse.support, solide, parametres),
          valeur,
        }
      })
    return { support: esquisse.support, cercles }
  },
}

/** La matière ajoutée s'enfonce jusqu'au passage : l'enveloppe de l'anneau la borne. */
function enfoncement(rayonInt: number, demiLargeur: number) {
  const reste = rayonInt * rayonInt - demiLargeur * demiLargeur
  return reste > 0 ? Math.sqrt(reste) : 0
}

function figures(
  ajouts: Ajout[],
  enlevements: Enlevement[],
  rayonExt: number,
  rayonInt: number,
  hauteur: number,
  parametres: Map<string, string>,
): Frontiere['faces'] {
  const faces: Frontiere['faces'] = []
  const rectangle = ajouts.find((ajout) => ajout.sorte === 'rectangle')
  const profilAjout = ajouts.find((ajout) => ajout.sorte === 'profil')
  const corne = profilAjout ?? rectangle
  if (corne) {
    const interieur = corne.ecart / 2
    const largeurBout = profilAjout?.largeurBout ?? (corne.sorte === 'rectangle' ? corne.largeur : 0)
    const largeurRacine = profilAjout?.largeurRacine ?? (corne.sorte === 'rectangle' ? corne.largeur : largeurBout)
    const rayonRacine = profilAjout?.rayonRacine ?? 0
    const plan =
      profilAjout && rayonRacine > 0
        ? { largeurBout, largeurRacine, rayonRacine }
        : undefined
    const elevation =
      profilAjout && profilAjout.epaisseurBout > 0
        ? {
            plongee: profilAjout.plongeeBout,
            epaisseurBout: profilAjout.epaisseurBout,
            amorce: profilAjout.amorceDessus,
          }
        : undefined
    const bout = rayonExt + corne.debord
    const geo =
      plan &&
      geometriePlan({
        a0: interieur,
        u1: bout,
        plan,
        rayonPeau: rayonExt,
      })
    const elev =
      elevation &&
      geometrieElevation({
        uPeau: rayonExt,
        u1: bout,
        H: corne.hauteur,
        y0: 0,
        elevation,
        rh: profilAjout?.rayonBoutHaut ?? 0,
        rb: profilAjout?.rayonBoutBas ?? 0,
      })
    const exterieur = geo
      ? Math.max(interieur + largeurRacine, geo.Qt[0], geo.peau[0]) + 0.05
      : interieur + (corne.sorte === 'rectangle' ? corne.largeur : largeurRacine)
    const depart = enfoncement(rayonInt, Math.min(exterieur, rayonInt - 1e-6))
    for (const [xmin, xmax, zmin, zmax] of [
      [interieur, exterieur, depart, bout],
      [-exterieur, -interieur, depart, bout],
      [interieur, exterieur, -bout, -depart],
      [-exterieur, -interieur, -bout, -depart],
    ]) {
      faces.push({
        sorte: 'boite',
        xmin,
        xmax,
        ymin: 0,
        ymax: corne.hauteur,
        zmin,
        zmax,
        ...(plan ? { plan } : {}),
        ...(elevation ? { elevation } : {}),
      })
      if (profilAjout) {
        const haut = profilAjout.rayonBoutHaut
        const bas = profilAjout.rayonBoutBas
        const versPlus = zmax > 0
        const a0 = Math.min(Math.abs(xmin), Math.abs(xmax))
        const aBout = a0 + largeurBout
        const debutCongé = xmin > 0 ? a0 : xmax < 0 ? -aBout : xmin
        const finCongé = xmin > 0 ? aBout : xmax < 0 ? -a0 : xmax
        const yTipHaut = elev?.yTipHaut ?? corne.hauteur
        const yTipBas = elev?.yTipBas ?? 0
        if (haut > 0 && haut < yTipHaut - yTipBas) {
          faces.push({
            sorte: 'conge',
            debut: debutCongé,
            fin: finCongé,
            y: yTipHaut - haut,
            z: versPlus ? zmax - haut : zmin + haut,
            rayon: haut,
            angleDeb: versPlus ? 0 : -Math.PI / 2,
            angleFin: versPlus ? Math.PI / 2 : 0,
            dehors: 1,
          })
        }
        if (bas > 0 && bas < yTipHaut - yTipBas) {
          faces.push({
            sorte: 'conge',
            debut: debutCongé,
            fin: finCongé,
            y: yTipBas + bas,
            z: versPlus ? zmax - bas : zmin + bas,
            rayon: bas,
            angleDeb: versPlus ? Math.PI / 2 : Math.PI,
            angleFin: versPlus ? Math.PI : (3 * Math.PI) / 2,
            dehors: 1,
          })
        }
      }
    }
    if (geo) {
      for (const [tau, sigma] of [
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
      ] as const) {
        const x = tau * geo.C[0]
        const z = sigma * geo.C[1]
        const angleQtMonde = Math.atan2(sigma * (geo.Qt[1] - geo.C[1]), tau * (geo.Qt[0] - geo.C[0]))
        const anglePeauMonde = Math.atan2(sigma * (geo.peau[1] - geo.C[1]), tau * (geo.peau[0] - geo.C[0]))
        faces.push({
          sorte: 'racine',
          x,
          z,
          rayon: geo.Rr,
          bas: 0,
          haut: corne.hauteur,
          angleDeb: Math.min(angleQtMonde, anglePeauMonde),
          angleFin: Math.max(angleQtMonde, anglePeauMonde),
          dehors: -1,
        })
      }
    }
    const barrette = enlevements.find((coupe) => coupe.traverse && coupe.support === 'plan.12h')
    if (barrette) {
      const recul = parametres.has('recul_barrette')
        ? evaluateurProvisoire.evaluer('recul_barrette', parametres)
        : corne.debord / 2
      const z = bout - recul
      const aFin = exterieur
      const yBarrette = elev ? (elev.yTipHaut + elev.yTipBas) / 2 : hauteur / 2
      for (const [debut, fin, cote] of [
        [interieur, aFin, z],
        [-aFin, -interieur, z],
        [interieur, aFin, -z],
        [-aFin, -interieur, -z],
      ] as const) {
        faces.push({
          sorte: 'traverse',
          rayon: barrette.rayon,
          debut,
          fin,
          y: yBarrette,
          z: cote,
          dehors: -1,
        })
      }
    }
  }
  const tube = ajouts.find((ajout) => ajout.sorte === 'cercle' && ajout.support === 'plan.3h')
  if (tube) {
    faces.push({
      sorte: 'traverse',
      rayon: tube.rayon,
      debut: enfoncement(rayonInt, tube.rayon),
      fin: rayonExt + tube.longueur,
      y: hauteur / 2,
      z: 0,
      dehors: 1,
    })
    const tige = enlevements.find((coupe) => coupe.traverse && coupe.support === 'plan.3h')
    if (tige) {
      faces.push({
        sorte: 'traverse',
        rayon: tige.rayon,
        debut: 0,
        fin: rayonExt + tube.longueur,
        y: hauteur / 2,
        z: 0,
        dehors: -1,
      })
    }
  }
  return faces
}

/** Les plans d'origine sont au niveau zéro. Les faces d'un solide sont à ses bornes. */
function hauteurDuPlan(support: string, solide: Solide | null, parametres: Map<string, string>) {
  if (!solide || support !== 'face.dessus') return 0
  return evaluateurProvisoire.evaluer('hauteur_carrure', parametres)
}