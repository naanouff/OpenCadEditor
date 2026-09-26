/** Script de reconstruction de la carrure (fil Milgauss / Oyster). */
export const SCRIPT_CARRURE = `
piece carrure
param diametre_boite 36
param epaisseur_paroi 2.5
param hauteur_carrure 8
param diametre_lunette 32
param profondeur_lunette 1.2
param diametre_fond 30
param profondeur_fond 1
param entrecorne 20
param longueur_corne 4.5
param largeur_bout 2.2
param largeur_racine 6
param rayon_racine 3
param diametre_barrette 0.9
param recul_barrette 1.2
param diametre_tube 4
param longueur_tube 2
param diametre_tige 3
param rayon_bout_haut 1
param rayon_bout_bas 0.8
param plongee_bout 3.2
param epaisseur_bout 2

esquisse plan.dessus
cercle
cote diametre diametre_boite
cercle
concentrique cercle.exterieur
cote diametre diametre_boite - 2 * epaisseur_paroi
extrude hauteur_carrure

esquisse face.dessus
cercle
concentrique anneau
cote diametre diametre_lunette
enleve profondeur_lunette

esquisse face.dessous
cercle
concentrique anneau
cote diametre diametre_fond
enleve profondeur_fond

esquisse plan.dessus
segment
cote ecart entrecorne
segment
cote debord longueur_corne
cote largeur largeur_bout
segment
cote largeur largeur_racine
arc
cote rayon rayon_racine
arc
concentrique cercle.exterieur
symetrie vertical
symetrie horizontal
extrude hauteur_carrure

esquisse plan.12h
cercle
cote diametre diametre_barrette
enleve travers largeur_racine
symetrie horizontal

esquisse plan.3h
cercle
cote diametre diametre_tube
extrude longueur_tube
cercle
concentrique tube
cote diametre diametre_tige
enleve travers longueur_tube
`.trim()
