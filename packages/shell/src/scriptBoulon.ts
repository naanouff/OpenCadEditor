/**
 * Boulon M4 tête hexagonale et son écrou (ISO 4017 / 4032, cotes nominales).
 * Le bout est fileté sur 12 mm, là où l'écrou se serre ; le fût qui traverse
 * le pied et le plateau reste lisse. Pointe à Y = 0, dessous de tête à `longueur`.
 */
export const BOULON_M4 = {
  diametre: 4,
  diametreAme: 3.24,
  pas: 0.7,
  angleFilet: 60,
  anglePointe: 175,
  longueurFilet: 12,
  longueur: 40,
  entreplat: 7,
  hauteurTete: 2.8,
} as const

export const ECROU_M4 = {
  entreplat: 7,
  hauteur: 3.2,
  percage: 4.3,
} as const

function n(valeur: number) {
  return String(Math.round(valeur * 1e6) / 1e6)
}

export const SCRIPT_BOULON = `
piece boulon
param diametre ${n(BOULON_M4.diametre)}
param diametre_ame ${n(BOULON_M4.diametreAme)}
param pas ${n(BOULON_M4.pas)}
param angle_filet ${n(BOULON_M4.angleFilet)}
param angle_pointe ${n(BOULON_M4.anglePointe)}
param longueur ${n(BOULON_M4.longueur)}
param entreplat ${n(BOULON_M4.entreplat)}
param hauteur_tete ${n(BOULON_M4.hauteurTete)}

esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon diametre_ame / 2
cote hauteur 0.2
segment
cote rayon diametre_ame / 2
cote hauteur ${n(BOULON_M4.longueurFilet)}
segment
cote rayon 0
cote hauteur ${n(BOULON_M4.longueurFilet)}
revolution
pas

esquisse plan.12h
segment
cote rayon 0
cote hauteur ${n(BOULON_M4.longueurFilet - 0.4)}
segment
cote rayon diametre / 2
cote hauteur ${n(BOULON_M4.longueurFilet - 0.4)}
segment
cote rayon diametre / 2
cote hauteur longueur
segment
cote rayon 0
cote hauteur longueur
revolution

esquisse face.dessus
hexagone
cote entreplat entreplat
extrude hauteur_tete
`.trim()

export const SCRIPT_ECROU = `
piece ecrou
param entreplat ${n(ECROU_M4.entreplat)}
param hauteur ${n(ECROU_M4.hauteur)}
param percage ${n(ECROU_M4.percage)}

esquisse plan.dessus
hexagone
cote entreplat entreplat
extrude hauteur

esquisse face.dessus
cercle
cote diametre percage
enleve hauteur
`.trim()
