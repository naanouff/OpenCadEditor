# Sprint 07 — modes 3D et esquisse

Produit les deux vues décrites dans [modes-vue.md](../veille/modes-vue.md). Le code est dans `packages/shell`. Le moteur w3dts fournit déjà la projection orthographique.

## But

Ouvrir une esquisse pose la caméra face à son plan, avec une grille en millimètres. Fermer l’esquisse rend la perspective.

## Périmètre

1. Test rouge : `pasGrille` vaut 1 mm sur une petite étendue, 10 mm sur une grande.
2. Test rouge : `plan.dessus` est horizontal, `plan.3h` est vertical, les deux axes sont orthogonaux à la normale.
3. Test rouge : la grille d’un plan horizontal a tous ses points à la même hauteur, et l’écart entre deux traits voisins est le pas. Le maillage ne change pas.
4. Si une esquisse est posée, la caméra passe en `orthographic` et vise le plan. Sinon elle reste en `perspective`. Le cadrage ne se refait qu’au changement de mode, pas à chaque cote.
5. La page passe l’esquisse comme aujourd’hui. Le solide reste dessiné.

Hors sprint : cotes dessinées, icônes de contraintes, saisie à la souris, grille recalculée pendant le zoom, soustraction booléenne.

## Terminé quand

- Les tests du shell passent.
- Sur la page, `esquisse plan.dessus` puis les deux cercles cotés montrent la grille et les cercles de face. `extrude` rend la perspective et le solide.
- Le journal dit que le mode suit l’esquisse ouverte.
