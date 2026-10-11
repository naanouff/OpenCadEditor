# Sprint 37 — Recalage du cap

Code [recalage-cap.md](../veille/recalage-cap.md). Feuille de route [feuille-de-route.md](../suivi/feuille-de-route.md) (phase **P0**). Branche : `feature/recalage` depuis `develop`.

## But

Remettre `develop` mesurable et documenté avant P1 et O1 : suite de tests verte, CI qui l’exécute, doc alignée sur les arbitrages kernel / expressions, hygiène workspace.

## Périmètre

Ordre TDD / exécution :

1. **Test rouge → vert.** Corriger [tube-bout.test.ts](../../packages/api-parametrique/tests/tube-bout.test.ts) : importer `SCRIPT_CARRURE` depuis [`fixtures/scriptCarrure.ts`](../../packages/api-parametrique/tests/fixtures/scriptCarrure.ts) (plus depuis `carrure.test.ts`). Si le test suppose encore le chemin `noyauProvisoire` / faces exactes et échoue pour une autre raison, le recentrer sur une assertion encore vraie (tube ignoré par le pipeline OCCT = comportement documenté) ou le marquer `skip` avec motif — **préférer le fixture** d’abord.
2. **CI.** Créer [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) :
   - `pull_request` + `push` sur `develop` / `main`
   - checkout avec sous-modules
   - pour chaque paquet : `pnpm install --frozen-lockfile` + `pnpm test`
   - **`tsc` reporté** : imports `.ts` et typages échouent sous `tsc` pur (écart noté)
   - artefacts `occt-kernel.wasm` déjà versionnés dans `packages/shell/occt/`
3. **Required check.** Sources JSON des rulesets : status check `tests`. Appliquer via API GitHub après une run verte sur `develop` (admin bypass tant que non synchronisé).
4. **Doc.** README, analyse, noyau-occt, documentation/README, journal, feuille de route.
5. **Workspace.** Supprimer les quatre `packages/*/pnpm-workspace.yaml` parasites. Pas de workspace racine.
6. **Branches locales.** Supprimer les `feature/*` / `chore/*` déjà contenus dans `develop`.

Hors sprint : P1, O1, required reviews, réparation `tsc` globale.

## Terminé quand

- Les quatre paquets ont une suite de tests verte en local et dans Actions.
- `ci.yml` est sur la branche mergée dans `develop`.
- README / analyse / noyau-occt / documentation/README reflètent l’état post-36 et la feuille de route.
- Aucun `pnpm-workspace.yaml` sous `packages/`.
- [recalage-cap.md](../veille/recalage-cap.md) et cette note indiquent le palier exécuté.
- Entrée journal 2026-10-11 (ou date d’exécution).

## État

Fait (PR [#12](https://github.com/naanouff/OpenCadEditor/pull/12) mergée dans `develop`). `tube-bout` → fixture ; `ci.yml` job `tests` vert ; rulesets GitHub sync (check `tests`, app Actions 15368) ; stubs workspace ignorés ; branches locales nettoyées ; doc alignée. Écarts : `tsc` hors CI ; tests shell CI seulement avec secret `SUBMODULES_PAT`.
