# Noyau B-Rep : occt-kernel remplace le noyau OpenCAD

Décision du 2026-10-10. Vérification préalable : [occt-kernel.md](../suivi/occt-kernel.md). Sprint : [sprint-24-noyau-occt.md](../sprints/sprint-24-noyau-occt.md).

## Décision

- **Moteur B-Rep** de OpenCadEditor : [`@naanouff/occt-wasm`](https://github.com/naanouff/occt-wasm) / artefact **`occt-kernel`** (v0.2.0).
- Le **noyau OpenCAD** (recalcul `.cadompart` → `.cadombrep` dans le dépôt OpenCAD) est **déprécié** comme cible moteur dans ce projet. Il n’est pas branché ici ; on ne l’attend plus.
- Les **formats** restent : `.cadom`, `.cadompart`, `.cadomesh`. STEP/BREP via OCCT = échange ou cache, jamais document de travail.
- L’**historique** reste dans la `Session` (puis `.cadompart`) ; OCCT calcule des handles éphémères et un maillage.

```mermaid
flowchart LR
  session[Session historique]
  batch[runBatch ops]
  kernel[occt-kernel.wasm]
  mesh[tessellate]
  viewport[Viewport w3dts]
  session --> batch
  batch --> kernel
  kernel --> mesh
  mesh --> viewport
```

## Rapatriement

Sous-module `vendor/occt-wasm` @ tag `v0.2.0`, même pattern que `vendor/w3dts`. Les binaires ne sont pas dans le git du sous-module : release → `packages/shell/occt/` via `scripts/fetch-occt-kernel.mjs`. Batch : `vendor/occt-wasm/js/kernel-batch.mjs` (alias `@naanouff/occt-wasm/kernel/batch`). Chargement dans le **worker** géométrie (`chargerKernel`).

## Preuve pilote (sprint 24)

**Vis** — [scriptVis.ts](../../packages/shell/src/scriptVis.ts) via `construireVis` temporaire : corps / tête / Pozi en `revolve` + booléens OCCT. Filet `pas` hybride (maillage hôte) : pas d’hélice dans le kernel v1.

**Carrure** — reste sur `noyauProvisoire` jusqu’au [pipeline générique](pipeline-occt.md). Porter la carrure motif par motif vers OCCT est **abandonné** ([direction-modeleur.md](direction-modeleur.md)).

## Suite (après la preuve)

1. Sprint 25 — historique → wires → OCCT sans `if (piece === 'vis')`.
2. Sprint 26 — GCS.
3. Carrure uniquement quand ce pipeline sait anneau + profil + cut.

## Ce qui sort du chemin chaud

`construireVis` spécialiste (sprint 25), puis `noyauProvisoire` / BSP quand le pipeline générique couvre les pièces. Pas de port carrure dédié.

## Hors de cette décision

- Import PMI (`occt-step`). Lecture et écriture `.cadompart` : [fichier-cadompart.md](fichier-cadompart.md), sprint 32. `.cadom`, `.cadomesh` et `.cadombrep` restent après.
- Solveur d’esquisse GCS (sprint 26).
- Remplacement total du filet hélicoïdal dans OCCT.
