# Sprint 70 — layout Dockview v6 (P4b)

Code [plan-integration-shell.md](../maquette/plan-integration-shell.md) phase 4. Branche : `feature/shell-layout-v6`.

Prérequis : [sprint 69](sprint-69-shell-ribbon.md). Spec layout : [plan-layout.md](../maquette/v2/plan-layout.md).

## But

Le shell adopte le layout Whittle : `browser` · `viewport` · `inspector` · `timeline` · `terminal`. Nouvelle clé de stockage (reset des layouts sauvés).

## Périmètre

1. `STORAGE_KEY` → `opencad.shell.dockview.layout.v6` ; `REQUIRED` = les cinq panneaux ci-dessus.
2. `browser` : arbre de construction + paramètres + méta document.
3. `inspector` : sélection, expression (`reglageFonction`), hints « prochaines étapes ».
4. `timeline` : historique horizontal (reprise via `pointe` si possible).
5. `terminal` conservé. `debug` / `preferences` hors `REQUIRED` (composants encore enregistrés pour usage futur).
6. Mettre à jour [editor-ui.md](../shell/editor-ui.md).

Hors sprint : overlays viewport (phase 5), espaces CAM / CTRL / Render, palette Ctrl+K réelle.

## Terminé quand

- [x] Layout par défaut Whittle + terminal au premier lancement (clé v6).
- [x] Browser / inspector / timeline branchés sur `storeShell` (pas de mock).
- [x] Terminal et actions Session inchangés ; tests ruban verts.
- [x] Doc `editor-ui.md` à jour.
