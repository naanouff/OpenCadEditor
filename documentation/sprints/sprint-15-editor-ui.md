# Sprint 15 — base shell `editor-ui`

Produit ce qui est décrit dans [editor-ui.md](../shell/editor-ui.md). Le paquet reste `packages/shell`.

## But

Le sous-module w3dts est sur `develop`. Le chrome du shell est `EditorDock` de `@naanouff/w3dts-editor-ui`. Les patches caméra OpenCad restent hors de `vendor/`.

## Périmètre

1. Checkout clean de `vendor/w3dts` sur `origin/develop`, `pnpm install` dans le sous-module, mise à jour du gitlink.
2. Surcharges dans `packages/shell/src/surcharges/` : `buildCameraProjectionMatrix` (`orthoZO`) et `OrbitalCameraController` (`setViewUp` / `keepViewUp`). Plugin Vite `resolveId` qui les impose aux imports internes de `w3dts-core`.
3. Dépendances React / Dockview / lucide, alias Vite vers les sources `editor-ui`, plugin React.
4. Remplacer la grille HTML par `main.tsx` + `App.tsx` : thème, `EditorDock`, panneaux viewport (canvas + logique actuelle), terminal (`Hote.ligne` / journal), paramètres (`session.parametres()`).
5. Les tests Vitest de `Hote` et du domaine restent verts. Smoke : `pnpm dev` montre Dockview, le thème, et la carrure.

Hors sprint : ruban, historique Dockview, Electron, `@naanouff/w3dts-viewer-editor`, upstream caméra dans w3dts.

## Terminé quand

- `vendor/w3dts` est sur un commit de `develop` qui contient `packages/editor-ui`.
- Aucun patch caméra n’est dirty dans le sous-module ; les surcharges sont dans `packages/shell`.
- La page charge `@naanouff/w3dts-editor-ui/styles.css` et ouvre trois panneaux Dockview : viewport, terminal, paramètres.
- Après le script de la carrure, le viewport WebGPU affiche encore le solide (isométrie) et l’esquisse (plan).
- Le journal dit que le chrome vient de `editor-ui` et que la caméra est surchargée côté OpenCad.

## Fait

Codé le 2026-09-25. Sous-module sur `develop` (`7a0651a9`). Host React + `EditorDock`. Surcharges dans `src/surcharges/`. Tests Vitest verts ; `vite build` OK.
