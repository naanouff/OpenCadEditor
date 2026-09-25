# Sprint 08 — cotes d’esquisse

Produit l’affichage décrit dans [cotes-esquisse.md](../veille/cotes-esquisse.md). La valeur est dans `packages/api-parametrique`. Le trait et l’étiquette sont dans `packages/shell`.

## But

Un cercle coté montre son diamètre dans le plan. Changer le paramètre change le nombre affiché.

## Périmètre

1. Test rouge, puis code : après `cote diametre diametre_boite`, le cercle porte `valeur` 40. `param diametre_boite 42` la passe à 42. Le second cercle, coté `diametre_boite - 2 * epaisseur_paroi`, vaut 35.
2. Test rouge : le trait relie deux points à ± le rayon, l’ancre est hors du cercle, le maillage ne change pas.
3. La page pose une étiquette `Ø` et la valeur en millimètres par cote. Les deux cercles du plan de dessus les montrent. Après `extrude`, elles disparaissent.

Hors sprint : cotes de rectangle, cotes du solide en 3D, saisie à la souris, flèches, texte GPU.

## Terminé quand

- Les tests des deux paquets passent.
- Sur la page, l’esquisse du dessus montre `Ø 40` et `Ø 35`. `param diametre_boite 42` passe la première à `Ø 42`.
- Le journal dit que la cote affichée suit l’expression.
