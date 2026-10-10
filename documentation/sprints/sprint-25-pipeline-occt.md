# Sprint 25 — pipeline historique → OCCT

Code la chaîne de [pipeline-occt.md](../veille/pipeline-occt.md) après le verdict [direction-modeleur.md](../veille/direction-modeleur.md). Suite du sprint 24 (infra kernel + preuve vis), **sans** porter la carrure motif par motif.

## But

Un seul chemin d’évaluation : historique → wires résolus → `runBatch` OCCT → maillage. La vis n’est plus un compilateur séparé ; la carrure n’est pas l’objectif de ce sprint.

## Périmètre

Chaque numéro part d’un test rouge.

1. **Esquisse → polylines.** À partir des entités d’une esquisse (segments, arcs, cercles) et de leurs paramètres numériques, produire des polylines fermées évaluées (pas de GCS). Critère : test unitaire sur rectangle et cercle.
2. **Fonction → ops batch.** `extrude` / `enlever` / `revolution` génériques : wire + profondeur / axe → liste d’ops occt-kernel. Critère : box extrudée via Session (ou API minimale) + tessellate, sans `construireVis`.
3. **Worker unique.** Le worker appelle ce pipeline pour toute pièce ; plus de branche `pieceCourante() === 'vis'` vers un constructeur dédié (sauf filet hybride temporaire documenté).
4. **Vis sur le pipeline.** Réécrire `SCRIPT_VIS` pour que corps / tête / Pozi passent par extrude/revolution/booléens génériques. Critère : [scriptVis.test.ts](../../packages/shell/tests/scriptVis.test.ts) vert ; Debug **Build vis** inchangé côté utilisateur. `pas` peut rester hybride.
5. **Retrait du spécialiste.** Supprimer ou réduire `construireVis.ts` au minimum de tests ; plus de reconnaissance de motif sur le chemin chaud pour la vis.

Hors sprint : GCS, carrure OCCT, naming topologique, pointe d’arbre, suppression BSP.

## Terminé quand

- Une extrusion rectangle générique produit un solide OCCT sans script pièce.
- La vis passe par ce chemin ; les tests vis restent verts.
- [pipeline-occt.md](../veille/pipeline-occt.md) et le journal disent « branché » pour ce pipeline.
- Aucun travail carrure motif→OCCT n’a été ajouté.

**2026-10-10** — critères atteints sur `feature/pipeline-occt` : tests verts + **Build vis** conforme à l’écran.
