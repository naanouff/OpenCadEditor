# Sprint 42 — Fillet OCCT + refs d’arêtes

Code [fillet-aretes.md](../veille/fillet-aretes.md). Branche : `feature/fillet-occt`.

## But

Verbe `fillet` → `fillet_edges` kernel, sélecteurs `arete.*`.

## Périmètre

1. Verbe + historique `fillet` (fonction, ne consomme pas l’esquisse).
2. Pipeline : après solide, résolution `list_edges` puis `fillet_edges`.
3. Sélecteurs `arete.haut` / `arete.bas` / `arete.vertical` ; sans sélecteur = toutes.
4. Tests + doc (clôture sprint 41).

Hors sprint : `chamfer`, picking UI (P4), retrait `noyauProvisoire`.

## État

Fait (PR [#18](https://github.com/naanouff/OpenCadEditor/pull/18) mergée).
