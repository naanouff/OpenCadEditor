# Sprint 40 — Affichage carrure OCCT

Code [carrure-occt-affichage.md](../veille/carrure-occt-affichage.md). Phase **P1**. Branche : `feature/carrure-occt-affichage`.

## But

**Build carrure** sert le maillage pipeline OCCT, plus le BREP Session.

## Périmètre

1. Retirer `historiqueCornesSession` du worker.
2. Supprimer la fonction et adapter les tests.
3. Doc / journal / feuille de route (P1 : 38–40 faits pour tube/barrette/affichage ; fillet et retrait total `noyauProvisoire` restent après).

Hors sprint : fillet/chamfer, suppression complète de `decrire` / BSP, `polygone n`.

## Terminé quand

- Aucune référence à `historiqueCornesSession`.
- Suite shell verte.

## État

Fait (PR [#16](https://github.com/naanouff/OpenCadEditor/pull/16) mergée). Bypass retiré, `historiqueCornesSession` supprimée.
