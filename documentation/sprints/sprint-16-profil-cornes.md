# Sprint 16 — profil des cornes

Produit le contour fermé décrit dans [profil-cornes.md](../veille/profil-cornes.md). Le code est dans `packages/api-parametrique` ; le shell trace les arcs dans `filDeFer`.

## But

Les cornes ont une joue courbe. Le geste reste esquisse → cotes → extrude → historique. Les angles droits du rectangle disparaissent.

## Périmètre

1. Test rouge, puis code. `segment` et `arc` entrent dans l’esquisse. `cote rayon` retient le rayon d’un arc. `extrude` copie un `Ajout` `{ sorte: 'profil', … }` sur le solide. L’ajout `rectangle` reste accepté.
2. Test rouge : préfixe jusqu’aux portées, puis le profil coté, les deux symétries, `extrude hauteur_carrure`. La frontière a un cylindre de joue de rayon `rayon_joue` par corne, et plus de `boite` issue du rectangle pour ces figures.
3. Test rouge : aucun sommet de corne ne reste au coin extérieur de l’ancien rectangle dans la zone coupée par l’arc de joue.
4. Test rouge : `param rayon_joue` change la cambrure. `param entrecorne 22` puis `param diametre_boite 42` reconstruisent.
5. Les quatre barrettes restent ouvertes. Le tube, sa fermeture sur la peau et le perçage de tige restent.
6. `FaceExacte` cylindre accepte `angleDeb` / `angleFin` optionnels. `tesseler` et `ombrer` maillent le tronçon. `filDeFer` trace segments et arcs de joue. Un test du shell trouve ces arcs.

Hors sprint : congés 3D, chanfrein de lunette, cotes du profil à l’écran, contours BRep restants du sprint 14, extrusion de profil hors des cornes.

## Terminé quand

- Le script de carrure extrude le profil des cornes dans `packages/api-parametrique`.
- `packages/shell` reste vert, arcs de joue compris.
- Le viewport montre des cornes à joue courbe après ces lignes.
- Le journal dit que le profil d’esquisse porte les cornes.
