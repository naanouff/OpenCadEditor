# Barrette et tube sur le pipeline OCCT

Sprint : [sprint-38-tube-occt.md](../sprints/sprint-38-tube-occt.md) (tube). Barrettes : sprint 39. Phase **P1** — [feuille-de-route.md](../suivi/feuille-de-route.md). Axe : **modeleur générique** (plus d’ignore dans le pipeline).

## But

La fin du script carrure (`plan.12h` barrette, `plan.3h` tube) ne doit plus être sautée par [pipelineOcct.ts](../../packages/shell/src/occt/pipelineOcct.ts). Pas de second `construireCarrure`.

## État au consignage (2026-10-11)

| Élément | État |
|---------|------|
| Anneau / lunette / fond / cornes | Pipeline OCCT (sprint 30) |
| `extrude` sur `plan.3h` | **Ignoré** (« dégrade l’anneau ») |
| `enleve travers` sur `plan.12h` / `plan.3h` | **Ignoré** |
| Placement barrette | Motif dans `decrire` (z = bout − `recul_barrette`, 4 trous axe X) ; le cercle GCS est à l’origine |
| `symetrie` après `enleve` | No-op (esquisse déjà consommée) |
| GCS cercle | Centre toujours (0, 0) — pas de cote de position |

## Géométrie tube (plan.3h)

- Datum : normale +X, U = +Y, V = +Z ([datums.ts](../../packages/api-parametrique/src/datums.ts)).
- Cercle coté Ø `diametre_tube` au centre GCS → fil dans le plan YZ à l’**altitude** X du wire.
- Bossage : altitude ≈ `diametre_boite / 2 − chevauchement`, extrusion le long de +X sur `longueur_tube + chevauchement`, puis **fuse**.
- Tige : second cercle concentrique Ø `diametre_tige`, `enleve travers` le long de ±X assez long pour ouvrir le bossage et la paroi.

Sans chevauchement depuis la peau, un cylindre depuis X = 0 traverse le vide intérieur (faux).

## Géométrie barrette (report sprint 39)

Le script actuel ne positionne pas le trou : `decrire` invente quatre axes X. Tant que le GCS n’a pas de cote de position (ou un script à quatre trous explicites), porter la barrette en OCCT sans motif reviendrait à recopier `decrire`. **Hors sprint 38.**

## Direction d’extrusion sur datum

Aujourd’hui, sans `face.*`, le pipeline extrude toujours en +Y. Il doit suivre la **normale du datum** (`plan.3h` → +X, `plan.12h` → +Z, `plan.dessus` → +Y).

## Interdit

- Enrichir `noyau.decrire` / `Ajout` pour le tube.
- Branche `if (piece === 'carrure')` dans le worker.

## Critères (tube)

1. `SCRIPT_CARRURE` compile encore ; le tube n’est plus sauté.
2. Maillage OCCT : matière au-delà de `diametre_boite/2` vers +X (bossage) ; trou de tige ouvert.
3. Anneau / cornes toujours conformes (pas de disque plein, pas de destruction de paroi).

## État

Tube branché sur `feature/tube-occt` (sprint 38). Barrettes reportées au sprint 39.
