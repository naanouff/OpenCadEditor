# Pipeline générique historique → OCCT

Plan d’exécution de [direction-modeleur.md](direction-modeleur.md). Remplace le chemin spécial `construireVis` / `decrire` + motifs.

## Chaîne cible

1. **Historique** — opérations `Session` (inchangé).
2. **Esquisse résolue** — segments / arcs / cercles → polylines 2D évaluées (paramètres numériques déjà dans les entités ; pas encore de GCS).
3. **Fonction** — `extrude` / `enlever` / `revolution` lit le wire résolu + profondeur / axe, émet des ops `runBatch` (pas de `if (piece === 'vis')`).
4. **occt-kernel** — `create_wire` / `extrude` / `revolve` / booléens → `tessellate` → `MaillageOmbre`.
5. **UI** — protocole worker inchangé.

## Critères de succès

- Une pièce définie uniquement par historique + esquisse rectangle + extrude produit un solide OCCT sans script dédié.
- La vis se reconstruit via ce pipeline (révolution + coupe Pozi) ; `construireVis.ts` disparaît ou devient un thin wrapper de tests.
- Aucune reconnaissance de motif (`3 segments + 1 arc`) sur le chemin chaud.

## Hors périmètre immédiat

GCS (sprint 26), naming topologique, pointe d’arbre, carrure complète, filet hélicoïdal OCCT.
