# Sprint 24 — noyau occt-kernel

Code la bascule décrite dans [noyau-occt.md](../veille/noyau-occt.md). Le sous-module `vendor/occt-wasm` porte le WASM. L’adaptateur et le worker sont dans `packages/shell`. Les formats OpenCAD ne sont pas lus sur disque.

**Réorientation 2026-10-10** — voir [direction-modeleur.md](../veille/direction-modeleur.md). Les items 1–5 (infra + preuve vis) restent la cible de ce sprint. L’item **carrure OCCT motif par motif** est **abandonné** : la suite est le [pipeline générique](sprint-25-pipeline-occt.md), pas un second compilateur de pièce.

## But

Le solide exact au recalcul passe par **occt-kernel** pour la preuve pilote (vis). L’infrastructure (sous-module, adaptateur, smoke) est en place. La carrure reste sur `noyauProvisoire` jusqu’au pipeline générique.

## Périmètre

Chaque numéro part d’un test rouge, sauf le rapatriement sous-module.

1. **Doctrine.** README, analyse, journal et veille : moteur = occt-kernel ; noyau OpenCAD déprécié.
2. **Sous-module.** `vendor/occt-wasm` @ `v0.2.0`. Alias Vite, licences LGPL, wasm chargeable depuis le worker.
3. **Adaptateur.** Init `createOcctKernel` dans [geometrieWorker.ts](../../packages/shell/src/moteur/geometrieWorker.ts). Replay → ops batch → `tessellate` → `MaillageOmbre`. Protocole UI inchangé.
4. **Smoke.** Box → extrude → tessellate via le module kernel.
5. **Vis.** Corps, tête et Pozi via OCCT (`construireVis` temporaire). `pas` hybride (maillage hôte). Critère : [scriptVis.test.ts](../../packages/shell/tests/scriptVis.test.ts) vert ; Debug **Build vis**.
6. ~~**Carrure.**~~ **Annulé** — remplacé par [sprint 25](sprint-25-pipeline-occt.md) (features génériques) puis carrure seulement quand ce pipeline le permet.
7. **Nettoyage partiel.** Chemin d’affichage OCCT pour la vis. `noyauProvisoire` reste pour la carrure jusqu’au sprint 25+.

Hors sprint : `occt-step` PMI, `.cadom` / `.cadompart` sur disque, GCS, filet hélicoïdal entièrement OCCT, suppression BSP, carrure OCCT.

## Terminé quand

- `vendor/occt-wasm` est dans le dépôt, épinglé à v0.2.0.
- Les tests shell de la **vis** sont verts sur le chemin OCCT.
- Le journal dit que le moteur B-Rep est occt-kernel, que le noyau OpenCAD est déprécié, que `pas` reste hybride, et que la carrure OCCT motif est abandonnée au profit du pipeline générique.
- [noyau-occt.md](../veille/noyau-occt.md) et [analyse.md](../suivi/analyse.md) reflètent l’état « branché » pour l’infra + vis.
