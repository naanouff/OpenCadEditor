# Sprint 17 — profil d’élévation des cornes

Produit les congés de bout décrits dans [profil-elevation-cornes.md](../veille/profil-elevation-cornes.md). Le code est dans `packages/api-parametrique` ; le shell trace les arcs dans `filDeFer`.

## But

Vue de côté, chaque bout de corne a un congé haut large et un congé bas petit. La joue en plan (`rayon_joue` 27,5) reste. Les barrettes restent ouvertes.

## Périmètre

1. `param rayon_joue 27.5` dans le script de carrure (valeur validée).
2. Test rouge, puis code. `param rayon_bout_haut` et `param rayon_bout_bas` entrent dans le script. L’ajout `profil` porte ces deux rayons.
3. Test rouge : aucun sommet au coin supérieur de l’ancien bout rectangle ; aucun au coin inférieur.
4. Test rouge : `param rayon_bout_haut` puis `param rayon_bout_bas` changent la silhouette ; les quatre barrettes restent.
5. `FaceExacte` cylindre porte les tronçons de congé (axe // largeur du bout). `ombrer` et `filDeFer` les maillent et les tracent. Un test du shell trouve ces arcs.

Hors sprint : congé à la racine, esquisse d’élévation cotée, chanfrein de lunette, cotes à l’écran.

## Terminé quand

- Le script de carrure porte `rayon_joue 27.5`, `rayon_bout_haut` et `rayon_bout_bas`.
- `packages/api-parametrique` et `packages/shell` restent verts.
- Le viewport montre des bouts arrondis en élévation.
- Le journal dit que le profil d’élévation porte les congés de bout.
