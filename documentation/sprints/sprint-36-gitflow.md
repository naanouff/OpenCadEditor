# Sprint 36 — gitflow : suppression post-merge et politique de PR

Code [gitflow-protection.md](../veille/gitflow-protection.md). Doctrine [gitflow.md](../gitflow.md). Suit les rulesets déjà actifs (entrée journal 2026-10-10). Branche : `feature/gitflow` depuis `develop`.

## But

Après merge d’une PR `feature/*` ou `fix/*`, la branche source disparaît. Les PR hors-flux vers `main` sont refusées par la CI. Les branches déjà intégrées dans `develop` sont nettoyées une fois.

## Périmètre

Pas de test rouge produit : réglages GitHub + workflow + doc.

1. **Suppression auto.** `gh api … -X PATCH -f delete_branch_on_merge=true`. Vérifier la lecture API.
2. **Doc.** [gitflow.md](../gitflow.md) et la veille décrivent protections, suppression auto et CI.
3. **CI.** [`.github/workflows/branch-policy.yml`](../../.github/workflows/branch-policy.yml) : base `main` ⇒ head = `develop` uniquement ; base `develop` ⇒ `feature/*` | `fix/*` | `chore/*`.
4. **Nettoyage.** Supprimer sur origin les refs déjà contenues dans `develop` (liste dans la veille). Ne pas toucher au travail local non poussé sans confirmation.
5. **Vérif.** Rulesets actifs ; `delete_branch_on_merge` vrai ; workflow dans le dépôt ; journal à jour.

Hors sprint : required status checks, reviews obligatoires, promotion `develop` → `main`, tags.

## Terminé quand

- [gitflow-protection.md](../veille/gitflow-protection.md) dit le palier exécuté.
- `delete_branch_on_merge` vaut `true`.
- `branch-policy.yml` est sur la branche mergée dans `develop`.
- Les branches listées dans la veille ne sont plus sur origin (ou l’écart est noté).

## État

Codé sur `feature/gitflow` : `delete_branch_on_merge` activé, `branch-policy.yml` versionné, doc alignée. Refs déjà dans `develop` supprimées sur origin (`feature/pas-cadompart`, `mcp-geometrie`, `boulon-hexagonal`, `datums-origine`, `carrure-pipeline`, `pointe-arbre`, `gcs-esquisse`, `pipeline-occt`, `noyau-occt`, `initial`, `chore/feuille-route-31`).
