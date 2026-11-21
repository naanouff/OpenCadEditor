# Sprint 71 — overlays viewport (P4b)

Code [plan-integration-shell.md](../maquette/plan-integration-shell.md) phase 5. Branche : `feature/shell-viewport-hints`.

Prérequis : [sprint 70](sprint-70-shell-layout-v6.md).

## But

Le viewport réel gagne la barre flottante Tout / Corps / Face / Arête ; le pick respecte le filtre. Inspector et timeline restent branchés (déjà en 70).

## Périmètre

1. Barre flottante de filtre de sélection sur le canvas WebGPU.
2. Filtrer survol / clic selon le mode (face, arête, tout ; corps = faces du solide).
3. Pas de mock SVG ; pas de nouveaux verbes Session.

Hors sprint : cube de vues Whittle, snap/grid toggles, espaces CAM / CTRL / Render.

## Terminé quand

- [x] Filtre visible et persisté en session (état React viewport).
- [x] Pick / survol respectent le filtre.
- [x] Tests ruban verts.
