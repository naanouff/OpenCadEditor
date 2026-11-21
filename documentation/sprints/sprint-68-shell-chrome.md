# Sprint 68 — chrome + StatusBar (P4b)

Code [plan-integration-shell.md](../maquette/plan-integration-shell.md) phase 2. Branche : `feature/shell-chrome`.

Prérequis : [sprint 67](sprint-67-shell-ds.md). Charte : [charte.md](../graphique/charte.md).

## But

Le shell a un chrome OpenCad Editor (marque, fichier, undo, titre, recherche placeholder, thème) et une StatusBar sous le dock. Design seulement — pas d’espaces CAM / CTRL / Render.

## Périmètre

1. Porter `BrandMark` + `Chrome` dans `packages/shell` ; icônes kit dans `public/brand/`.
2. Brancher le réel : titre depuis pièce / assemblage / esquisse ; ouvrir / enregistrer via `storeShell` ; undo / redo via `annuler` / `refaire` ; thème via `OcTheme`.
3. Ctrl+K = placeholder (pas de palette).
4. `StatusBar` sous le dock : sélection topo, mode esquisse, unité.
5. Retirer le toggle thème du ruban (il vit dans le chrome).

Hors sprint : ruban Lucide (phase 3), layout Whittle v6, espaces CAM / CTRL / Render, command palette réelle.

## Terminé quand

- [x] Le chrome affiche la marque Editor et bascule light / dark (persistée).
- [x] Ouvrir / Enregistrer / Annuler / Rétablir appellent le store (ou restent disabled avec raison si inapplicable).
- [x] StatusBar reflète sélection / esquisse / unité.
- [x] Aucune nouvelle mutation hors lignes `Session` ; tests ruban verts.
