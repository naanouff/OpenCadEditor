import { COTE_PLATEAU } from './cotesPlateau.ts'

type Sommet = { u: number; v: number; arc: boolean }

const S45 = Math.SQRT1_2

function n(valeur: number) {
  return String(Math.round(valeur * 1e6) / 1e6)
}

const pt = (u: number, v: number): Sommet => ({ u, v, arc: false })
const arc = (u: number, v: number): Sommet => ({ u, v, arc: true })

/**
 * D vu de dessus, en (u, v) : u le long du petit côté, v vers l’extérieur depuis l’axe des trous.
 * Les bras partent des trous (u = ±entraxe/2, v = 0), finissent en demi-cercle autour du trou,
 * et rejoignent la barre (v = saillie) par un coude. Chaque arc passe par son point milieu.
 */
export function profilD(): Sommet[] {
  const { largeurBras, saillie, rayonCoude: rc, entraxeVis } = COTE_PLATEAU
  const e = largeurBras / 2
  const u = entraxeVis / 2
  const cu = u - rc
  const cv = saillie - rc
  const R = rc + e
  const r = rc - e
  return [
    pt(u - e, 0),
    arc(u, -e),
    pt(u + e, 0),
    pt(u + e, cv),
    arc(cu + R * S45, cv + R * S45),
    pt(cu, saillie + e),
    pt(-cu, saillie + e),
    arc(-cu - R * S45, cv + R * S45),
    pt(-u - e, cv),
    pt(-u - e, 0),
    arc(-u, -e),
    pt(-u + e, 0),
    pt(-u + e, cv),
    arc(-cu - r * S45, cv + r * S45),
    pt(-cu, saillie - e),
    pt(cu, saillie - e),
    arc(cu + r * S45, cv + r * S45),
    pt(u - e, cv),
  ]
}

/** Cercle centré en (u, 0), en deux arcs. */
function cercle(u: number, rayon: number): Sommet[] {
  return [pt(u + rayon, 0), arc(u, rayon), pt(u - rayon, 0), arc(u, -rayon)]
}

function esquisse(sommets: Sommet[]) {
  return `esquisse plan.12h\n${sommets
    .map((s) => `${s.arc ? 'arc' : 'segment'}\ncote rayon ${n(s.u)}\ncote hauteur ${n(s.v)}`)
    .join('\n')}`
}

const { entraxeVis, diametreLamage, diametrePassage } = COTE_PLATEAU
const trous = [-entraxeVis / 2, entraxeVis / 2]

/**
 * Poignée laiton : D esquissé sur plan.12h, extrudé en +Z sur sa hauteur.
 * z = 0 est le dessus de la poignée posée : lamage puis passage y sont creusés à chaque trou.
 * Un enlèvement sur un plan d’origine va 0,4 mm plus loin que sa cote : le lamage la retranche.
 */
export const SCRIPT_POIGNEE = `
piece poignee
param hauteur ${COTE_PLATEAU.hauteurPoignee}
param profondeur_lamage ${COTE_PLATEAU.profondeurLamage}
param conge ${COTE_PLATEAU.congePoignee}

${esquisse(profilD())}
extrude hauteur

${trous.map((u) => `${esquisse(cercle(u, diametreLamage / 2))}\nenleve profondeur_lamage - 0.4`).join('\n\n')}

${trous.map((u) => `${esquisse(cercle(u, diametrePassage / 2))}\nenleve hauteur`).join('\n\n')}

fillet conge arete.tranche
`.trim()
