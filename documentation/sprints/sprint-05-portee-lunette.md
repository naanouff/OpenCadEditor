# Sprint 05 — portée de lunette

Produit l’épaulement décrit dans [portee-lunette.md](../veille/portee-lunette.md). Le code est dans `packages/api-parametrique`. L’affichage réutilise le mailleur déjà dans `packages/shell`.

## But

Après l’anneau, les cinq lignes de la portée de lunette donnent un épaulement visible. `diametre_lunette` et `profondeur_lunette` le pilotent.

## Périmètre

1. Test rouge, puis code. Le test des faces exactes du tube nu s’arrête à `extrude hauteur_carrure` : rayons 17,5 et 20, deux couronnes.
2. Test rouge : préfixe de l’anneau, puis `esquisse face.dessus`, `cercle`, `concentrique anneau`, `cote diametre diametre_lunette`, `enleve profondeur_lunette`. La frontière a un cylindre de rayon 18 dont le bas est à 6,8, une couronne du dessus de rayon intérieur 18, et une couronne à y = 6,8.
3. `param diametre_lunette 38` porte ce rayon à 19. `param profondeur_lunette 2` porte le fond de poche à y = 6.
4. `decrire` émet ces faces dès le premier enlèvement borgne. Sans enlèvement, le tube nu reste.
5. Les tests du shell qui fabriquent un tube à la main ne changent pas. La page Vite montre l’épaulement après ces cinq lignes.

Hors sprint : portée du fond, cornes, trou de barrette, tube de couronne, ruban, arbre, Electron, solveur réel, noyau B-rep.

## Terminé quand

- Le tube nu et l’épaulement passent dans `packages/api-parametrique`.
- `packages/shell` reste vert.
- Le viewport montre l’épaulement sur la face du dessus.
- Le journal dit que cette portée précède celle du fond.
