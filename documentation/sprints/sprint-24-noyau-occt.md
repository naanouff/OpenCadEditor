# Sprint 24 — noyau occt-kernel

Code la bascule décrite dans [noyau-occt.md](../veille/noyau-occt.md). Le sous-module `vendor/occt-wasm` porte le WASM. L’adaptateur et le worker sont dans `packages/shell` (et le replay dans `packages/api-parametrique` si besoin). Les formats OpenCAD ne sont pas lus sur disque.

## But

Le solide exact au recalcul passe par **occt-kernel**. Les deux pièces pilotes (vis et carrure) se reconstruisent et s’affichent via la tessellation OCCT. Le noyau OpenCAD et `noyauProvisoire` ne sont plus la cible.

## Périmètre

Chaque numéro part d’un test rouge, sauf le rapatriement sous-module.

1. **Doctrine.** README, analyse, journal et veille disent : moteur = occt-kernel ; noyau OpenCAD déprécié. (Déjà amorcé avec cette note.)
2. **Sous-module.** `vendor/occt-wasm` @ `v0.2.0`. Alias Vite vers `@naanouff/occt-wasm/kernel` et `kernel/batch`. Licences LGPL présentes. Wasm chargeable depuis le worker.
3. **Adaptateur.** Init `createOcctKernel` dans [geometrieWorker.ts](../../packages/shell/src/moteur/geometrieWorker.ts). Replay d’historique → ops batch (wires évalués côté hôte) → `tessellate` → `MaillageOmbre`. Protocole UI (`Demande` / `Reponse`) inchangé.
4. **Smoke.** Test ou script : box → extrude → tessellate via le module kernel (vert en CI ou smoke documenté).
5. **Vis.** `SCRIPT_VIS` : corps, tête et Pozi via `revolve` + `boolean_fuse` / `boolean_cut`. `pas` reste hybride (maillage hôte). Critère : [scriptVis.test.ts](../../packages/shell/tests/scriptVis.test.ts) vert ; Debug **Build vis** montre un solide fermé.
6. **Carrure.** `SCRIPT_CARRURE` : construction OCCT (anneau, cornes, barrettes, tube) à la place de `decrire` / `ombrer`. Critère : [scriptCarrure.test.ts](../../packages/shell/tests/scriptCarrure.test.ts) et tests carrure API adaptés ; Debug **Build carrure** affiche le volume OCCT.
7. **Nettoyage.** Chemin d’affichage unique (maillage OCCT). `Session` n’injecte plus `noyauProvisoire` pour l’ombré. BSP / `pansDeCorne` hors chemin chaud.

Hors sprint : `occt-step` PMI, fichiers `.cadom` / `.cadompart` sur disque, GCS, filet hélicoïdal entièrement dans OCCT, suppression physique de tout le code BSP (peut rester en `deprecated/` si le diff est trop large).

## Terminé quand

- `vendor/occt-wasm` est dans le dépôt, épinglé à v0.2.0.
- Les tests shell des deux scripts pilotes sont verts sur le chemin OCCT.
- Le journal dit que le moteur B-Rep est occt-kernel, que le noyau OpenCAD est déprécié, et que `pas` reste hybride.
- [noyau-occt.md](../veille/noyau-occt.md) et [analyse.md](../suivi/analyse.md) reflètent l’état « branché » (pas seulement « candidat »).
