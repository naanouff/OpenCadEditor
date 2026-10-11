# Sprint 38 — Tube couronne sur pipeline OCCT

Code [barrette-tube-occt.md](../veille/barrette-tube-occt.md). Phase **P1**. Branche : `feature/tube-occt` depuis `develop`.

## But

Le tube de couronne (`plan.3h` + extrude + trou de tige) passe par historique → wires → OCCT. Les barrettes restent ignorées (sprint 39).

## Périmètre

1. **Direction datum.** Extrusion / coupe sans `face.*` : normale du datum (`plan.3h` → +X, etc.).
2. **Altitude tube.** Wire `plan.3h` à X ≈ `diametre_boite/2 − 0,3` (chevauchement peau) ; extrude `longueur_tube + 0,3` selon +X ; fuse.
3. **Tige.** Lever l’ignore `enleve travers` sur `plan.3h` ; coupe le long de ±X assez longue pour ouvrir bossage + paroi.
4. **Tests.** Étendre [carrurePipeline.test.ts](../../packages/shell/tests/carrurePipeline.test.ts) : sommets avec X > rayon peau + longueur_tube/2 ; pas de matière pleine au centre du tube (trou tige).
5. **Doc.** Feuille de route P1 en cours ; journal.

Hors sprint : barrettes, fillet, retrait `noyauProvisoire`, `polygone n`.

## Terminé quand

- Suite shell (dont carrure pipeline) verte.
- Critères veille tube atteints.
- Pas de régression anneau / cornes.

## État

Codé sur `feature/tube-occt` : direction datum, altitude peau + chevauchement, décalage mi-hauteur, tige traversante ; test `fuse le tube de couronne et ouvre le trou de tige`. Barrettes toujours ignorées (sprint 39).
