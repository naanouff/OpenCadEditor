# Noyau B-Rep : occt-kernel bootstrap de l’OpenCAD Kernel

Décision du 2026-10-10 ; amendée le 2026-10-11 (feuille de route). Vérification : [occt-kernel.md](../suivi/occt-kernel.md). Sprint infra : [sprint-24-noyau-occt.md](../sprints/sprint-24-noyau-occt.md). Cap : [feuille-de-route.md](../suivi/feuille-de-route.md).

## Décision

- **Moteur B-Rep** de OpenCadEditor : [`@naanouff/occt-wasm`](https://github.com/naanouff/occt-wasm) / artefact **`occt-kernel`** (v0.2.0).
- Ce moteur est le **bootstrap** du **OpenCAD Kernel (K3)** exigé par la doctrine OpenCAD : pas un moteur « externe à la place du produit ». Le pipeline (historique → wires → `runBatch`) sera extrait vers un paquet OpenCAD (phase **O2**) ; l’éditeur le consommera comme w3dts.
- Les **formats** restent : `.cadom`, `.cadompart`, `.cadomesh`, `.cadombrep`. STEP/BREP via OCCT = échange ou cache, jamais document de travail.
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

**Carrure** — anneau / poches / cornes sur le [pipeline générique](pipeline-occt.md) (sprint 30). Barrette et tube encore ignorés. Porter la carrure motif par motif vers OCCT reste **abandonné** ([direction-modeleur.md](direction-modeleur.md)).

## Suite (faite ou planifiée)

1. Sprints 25–31 — pipeline, GCS, pointe, faces, carrure, datums (**faits**).
2. Sprints 32–36 — `.cadompart`, `pas`, MCP, boulon, gitflow (**faits**).
3. Sprint 37 — recalage P0 ([recalage-cap.md](recalage-cap.md)).
4. P1 — barrette / tube OCCT, retrait `noyauProvisoire` ; W1 occt-wasm (arcs, helix) ; O2 extraction kernel OpenCAD.

## Ce qui sort du chemin chaud

`construireVis` spécialiste (fait, sprint 25). `noyauProvisoire` / BSP quand P1 couvre barrette et tube. Pas de port carrure dédié.

## Hors de cette décision

- Import PMI (`occt-step`). Lecture / écriture `.cadompart` : faite (32–33). Writers `.cadomesh` / `.cadombrep` : piste OpenCAD O3.
- Remplacement total du filet hélicoïdal dans OCCT (W1).
