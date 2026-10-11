# Sprint 46 — enregistrer `.cadom`

Code [fichier-cadom.md](../veille/fichier-cadom.md). Suite sprints 44–45. Branche : `feature/enregistrer-cadom`.

## But

Quand un assemblage est chargé, Enregistrer écrit un `.cadom` via `encode(toLogical())` ; sinon `.cadompart` inchangé.

## Périmètre

1. **Store.** `enregistrer` / `demanderEnregistrement` branchent sur `assemblage`.
2. **Tests.** Fixture A → save → `decode` (roots, parts, URIs) ; pièce seule → toujours `.cadompart`.
3. **Doc.** Veille + feuille (46 = save ; fetch meshes ensuite).

Hors sprint : fetch URI, GLB/cadomesh, pièces Milgauss, Complete.

## Terminé quand

Aller-retour open/save fixture A vert ; feuille à jour.
