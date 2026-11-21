# Sprint 67 — design system OpenCad dans le shell (P4b)

Code [plan-integration-shell.md](../maquette/plan-integration-shell.md) phase 1. Branche : `feature/shell-ds`.

Charte : [charte.md](../graphique/charte.md). Chrome Dockview : [editor-ui.md](../shell/editor-ui.md). Source DS : [maquette/v2/src/ds/](../maquette/v2/src/ds/).

## But

Le shell consomme les tokens et primitives OpenCad de la maquette v2 (light / dark). Le layout Dockview et le ruban restent ceux d’aujourd’hui.

## Périmètre

1. Porter `documentation/maquette/v2/src/ds/` vers `packages/shell/src/ds/` (tokens, theme, Button, IconButton, Tool, Hint, Field, Badge, PanelSection, TimelineItem, StatusBar).
2. Étendre Tailwind du shell avec les classes `oc-*` (miroir maquette).
3. Unifier le thème au démarrage : préférence `light|dark` (`opencad.shell.theme`), `applyOcTheme`, mapping vers `ResolvedThemeId` pour `EditorDock`, bridge `--oc-*` → `--color-*`.
4. Appliquer les tokens aux surfaces déjà visibles (fond shell, ruban) sans changer les ids Dockview (`layout.v5`).

Hors sprint : Chrome / StatusBar (phase 2), ruban Lucide (phase 3), layout Whittle v6 (phase 4), espaces CAM / CTRL / Render, extraction `packages/ui`.

## Terminé quand

- [x] `pnpm dev` dans le shell bascule light / dark et persiste la préférence.
- [x] Les primitives DS sont importables depuis `packages/shell/src/ds/`.
- [x] Dockview et le viewport restent lisibles (pas de clear / thème cassé).
- [x] Aucune nouvelle mutation hors lignes `Session` ; `ruban.ts` et les tests ruban restent verts.
- [x] [plan-integration-shell.md](../maquette/plan-integration-shell.md) et la feuille de route pointent ce sprint.
