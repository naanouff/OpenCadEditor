# Sprint 44 — ouvrir `.cadom`

Code [fichier-cadom.md](../veille/fichier-cadom.md). Suite O4 (SDK OpenCAD). Branche : `feature/fichier-cadom` depuis `develop`.

## But

Brancher `@opencad/cadom`, ouvrir un `.cadom` (fixture A) et afficher l’arbre d’assemblage dans Document.

## Périmètre

1. **Dépendance.** `file:../../vendor/opencad/packages/cadom` + alias Vite (même schéma que `@opencad/kernel`).
2. **Store.** `ouvrir` tente `.cadompart` puis `.cadom` ; `assemblage()` expose le `CadomDocument` ; refuse sans écraser session/assemblage.
3. **Sélecteur.** Accepte `.cadom` et `.cadompart`.
4. **UI.** Panneau Document liste les nœuds (nom + id court) quand un assemblage est chargé.
5. **Tests.** Decode fixture A ; arbre visible ; garbage → session inchangée.

Hors sprint : save `.cadom`, late-load meshes, pièces Milgauss séparées, Complete export.

## Terminé quand

- [fichier-cadom.md](../veille/fichier-cadom.md) décrit le chemin branché.
- `pnpm --filter @opencad/shell test` vert sur les tests fichier `.cadom`.
- Feuille : O4 fait, P3 commencé (sprint 44).
