# Verbe `polygone <n>`

Sprint : [sprint-41-polygone-n.md](../sprints/sprint-41-polygone-n.md). Phase **P1**. Axe : **modeleur générique**.

## But

Un seul verbe pour les polygones réguliers cotés par `entreplat`. `hexagone` et `octogone` restent des alias (`polygone 6` / `polygone 8`).

## Géométrie

Même formule que l’existant : rayon circum = `entreplat / (2·cos(π/n))`, flat-top (angle de départ `π/n`). `n ≥ 3`.

## Critères

1. `polygone 5` + `cote entreplat` → esquisse contrainte, 5 sommets.
2. `hexagone` / `octogone` inchangés (tests existants verts).
3. Pipeline OCCT rejoue `polygone` (boulon peut utiliser `polygone 6`).
