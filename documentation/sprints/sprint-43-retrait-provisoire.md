# Sprint 43 — Découplage wireframe / provisoire

Code [retrait-provisoire.md](../veille/retrait-provisoire.md). Branche : `feature/retrait-provisoire`.

## But

Fil de fer viewport depuis le volume OCCT ; `decrire` n’est plus la source d’affichage quand un maillage est là.

## Périmètre

1. `documentCad` : préférer `aretesBrep(volume)` si volume non vide.
2. `App` viewport : ne pas appeler `frontiere()` quand le moteur sert un volume.
3. Tests + doc (clôture sprint 42).

Hors sprint : suppression `noyau.ts` / BSP, helix `pas` OCCT (W1), chamfer.

## État

Fait (PR [#19](https://github.com/naanouff/OpenCadEditor/pull/19) mergée). Fil tessellé (aretesBrep) accepté en attendant wireframe kernel.
