# Recalage du cap — hygiène, CI, documentation

Sprint : [sprint-37-recalage.md](../sprints/sprint-37-recalage.md). Feuille de route : [feuille-de-route.md](../suivi/feuille-de-route.md). Axe : **tenir le cap** (garde-fous), pas une nouvelle pièce.

## But

Remettre le dépôt en état mesurable avant P1 (sortie du provisoire) et avant la piste OpenCAD O1 : tests verts, CI qui les voit, documentation alignée sur les arbitrages 2026-10-11, hygiène workspace / branches.

## État au consignage (2026-10-11)

| Élément | État |
|---------|------|
| Sprints 03–36 | Mergés dans `develop` |
| Pipeline OCCT + GCS + faces + datums | Fait |
| `.cadompart` + `pas` + MCP + boulon | Fait |
| `api-parametrique` tests | **131/132** — `tube-bout.test.ts` importe `script` depuis `carrure.test.ts` (n’exporte plus ; fixture déjà dans [`tests/fixtures/scriptCarrure.ts`](../../packages/api-parametrique/tests/fixtures/scriptCarrure.ts)) |
| CI | Seul [branch-policy.yml](../../.github/workflows/branch-policy.yml) ; aucun job vitest / tsc |
| Rulesets | PR obligatoire ; **pas** de required status check de tests |
| README / analyse | En retard (état sprint 24 / 03–23) |
| [noyau-occt.md](noyau-occt.md) | Dit « noyau OpenCAD déprécié » — contredit l’arbitrage K3 bootstrap |
| `packages/*/pnpm-workspace.yaml` | Quatre fichiers parasites non suivis (`allowBuilds: esbuild…`) |
| Branches locales | Nombreuses `feature/*` déjà dans `develop` |

## Arbitrages à refléter dans la doc

1. **OpenCAD Kernel** = occt-kernel en bootstrap ; le pipeline sera extrait vers OpenCAD (O2). L’éditeur ne « déprécie » plus le noyau produit : il en est le laboratoire.
2. **Expressions** : dialecte versionné cadompart v0.3 (piste O1) ; jusqu’à O1, l’éditeur continue d’écrire `expression` (écart connu, noté dans la feuille de route).

## Écarts à combler (P0)

1. **Test tube-bout.** Importer `SCRIPT_CARRURE` depuis `tests/fixtures/scriptCarrure.ts` (ou adapter le test au chemin OCCT si le maillage provisoire n’est plus le sujet). Suite verte.
2. **CI tests.** Workflow `ci.yml` : checkout + sous-modules, `pnpm install --frozen-lockfile` + `pnpm test` sur les quatre paquets. Job nommé `tests`. **`tsc` reporté** (imports `.ts` / typages). Sources rulesets : required check `tests` ; sync API après run verte sur `develop`.
3. **Documentation.** README, [analyse.md](../suivi/analyse.md), [noyau-occt.md](noyau-occt.md), [feuille-de-route.md](../suivi/feuille-de-route.md).
4. **Workspace.** **Supprimer** les quatre `packages/*/pnpm-workspace.yaml` parasites. Pas de monorepo racine.
5. **Branches locales.** Supprimer les `feature/*` / `chore/*` déjà contenues dans `develop`.

## Hors périmètre

- Barrette / tube OCCT, retrait `noyauProvisoire` (P1).
- Doctrine / cadompart v0.3 dans le dépôt OpenCAD (O1).
- Required reviews, promotion `develop` → `main`.

## Critères

1. `pnpm test` vert sur les quatre paquets.
2. `ci.yml` présent (job `tests`) ; required check dans les JSON rulesets ; sync API post-merge.
3. README et analyse décrivent sprints 24–36 et `packages/mcp`.
4. [noyau-occt.md](noyau-occt.md) parle de bootstrap K3, pas de dépréciation.
5. Aucun `pnpm-workspace.yaml` sous `packages/`.

## État

Exécuté sur `feature/recalage` (sprint [37](../sprints/sprint-37-recalage.md)).
