# Pipeline générique historique → OCCT

Plan d’exécution de [direction-modeleur.md](direction-modeleur.md). Remplace le chemin spécial `construireVis` / `decrire` + motifs. **Branché** sur `feature/pipeline-occt` (sprint 25).

## Chaîne (état)

1. **Historique** — opérations `Session` (inchangé).
2. **Esquisse résolue** — [`esquissePolylines.ts`](../../packages/shell/src/occt/esquissePolylines.ts) + GCS v1 ; enrichissement anneau/cornes et `face.*` : sprints 28–29.
3. **Fonction** — [`opsDepuisFonction.ts`](../../packages/shell/src/occt/opsDepuisFonction.ts) + [`pipelineOcct.ts`](../../packages/shell/src/occt/pipelineOcct.ts) : `extrude` / `enlever` / `revolution` → `runBatch` (pas de `if (piece === 'vis')`).
4. **occt-kernel** — wire / extrude / revolve / booléens → `tessellate` → `MaillageOmbre`.
5. **Worker** — [`geometrieWorker.ts`](../../packages/shell/src/moteur/geometrieWorker.ts) : pipeline si compilable, sinon Session (carrure).
6. **`pas`** — hybride temporaire : fût = filet hôte ; tête + Pozi = OCCT.

**Vigilance.** Cercles / arcs → polylines densifiées avant `make_wire_polyline` : facettes visibles dans le fil de fer. Cibles natives (cercle / arc kernel) hors v1 — voir [topo-faces.md](topo-faces.md).

## Critères

- Extrusion rectangle générique → solide OCCT (test `pipelineOcct`).
- Vis via le même chemin ; `construireVis.ts` = façade de tests.
- Aucune reconnaissance de motif sur le chemin chaud OCCT.

## Hors périmètre immédiat

GCS (sprint 26), naming topologique, pointe d’arbre, carrure complète, filet hélicoïdal OCCT.
