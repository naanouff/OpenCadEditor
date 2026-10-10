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

Sous-module `vendor/occt-wasm` @ tag `v0.2.0`, même pattern que `vendor/w3dts`. Consommation : `dist/occt-kernel.js`, `occt-kernel.wasm`, `js/kernel-batch.mjs`. Chargement dans le **worker** géométrie uniquement.

## Pièces pilotes

Les deux scripts Debug :

1. **Vis** — [scriptVis.ts](../../packages/shell/src/scriptVis.ts) : corps / tête / empreinte Pozi via `revolve` + booléens OCCT. Le filet `pas` (hélice) reste temporairement en maillage hôte : `occt-kernel` v1 n’expose pas pipe / hélice.
2. **Carrure** — [scriptCarrure.ts](../../packages/shell/src/scriptCarrure.ts) : anneau, cornes, barrettes, tube via wires, extrude, fuse/cut, fillets OCCT — à la place de `noyauProvisoire.decrire` et du BSP.

## Ce qui sort du chemin chaud

`noyauProvisoire`, [csg.ts](../../packages/api-parametrique/src/csg.ts), [ombre.ts](../../packages/api-parametrique/src/ombre.ts), [corne.ts](../../packages/api-parametrique/src/corne.ts) : dépréciés dès que les deux scripts passent les tests sur OCCT.

## Hors de cette décision

- Import PMI (`occt-step`), lecture/écriture fichiers OpenCAD sur disque.
- Solveur d’esquisse GCS.
- Remplacement total du filet hélicoïdal dans OCCT.
