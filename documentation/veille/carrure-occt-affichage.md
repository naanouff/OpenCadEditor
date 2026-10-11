# Affichage carrure via pipeline OCCT

Sprint : [sprint-40-carrure-occt-affichage.md](../sprints/sprint-40-carrure-occt-affichage.md). Phase **P1**. Axe : **modeleur générique**.

## But

Le worker ne détourne plus la carrure vers `session.maillage()` / `noyauProvisoire`. Debug **Build carrure** affiche le maillage OCCT (anneau, poches, cornes + élévation, tube, barrettes).

## État au consignage

| Élément | État |
|---------|------|
| Pipeline OCCT carrure complète | Fait (sprints 30, 38, 39) |
| `historiqueCornesSession` | Force encore le maillage Session dès qu’il y a un profil corne |
| Motif | Contournement posé quand le prisme OCCT divergait du BREP ; l’élévation OCCT + tube + barrettes rendent le détour inutile |

## Action

Retirer le branchement dans [geometrieWorker.ts](../../packages/shell/src/moteur/geometrieWorker.ts). Supprimer `historiqueCornesSession` (plus d’appelants). Le fil de fer viewport lit déjà les faces du maillage reçu quand présentes.

## Interdit

- Réintroduire un `if (piece === 'carrure')` dans le worker.
- Enrichir `decrire` pour « rattraper » l’affichage.

## Critères

1. Worker : `historiqueCompatibleOcct` → `maillagePipelineOcct` pour `SCRIPT_CARRURE`.
2. Tests pipeline inchangés / adaptés (plus d’attente `historiqueCornesSession === true`).
3. Suite shell verte.

## État

Exécuté sur `feature/carrure-occt-affichage` (sprint 40).
