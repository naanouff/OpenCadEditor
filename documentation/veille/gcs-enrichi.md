# GCS enrichi — wires anneau et cornes

Suite de [gcs-esquisse.md](gcs-esquisse.md) (v1 rectangle / cercle / profil). Sprint : [sprint-29-gcs-enrichi.md](../sprints/sprint-29-gcs-enrichi.md). Débloque [carrure-pipeline.md](carrure-pipeline.md). Suit [topo-faces.md](topo-faces.md).

## But

Les esquisses de l’anneau et des cornes émettent des **polylines fermées** résolues, sans passer par `profil()` / motifs Oyster.

## Sous-ensemble

| Besoin | Effet |
|--------|--------|
| Deux cercles + `concentrique` | Centres coincidents ; rayons depuis diamètres |
| `ecart` / `debord` / `largeur` / `rayon` | Contour segment/arc d’une corne en plan |
| `concentrique cercle.exterieur` | Arc d’appui sur la peau |
| `symetrie vertical` / `horizontal` | Miroir des points (quatre régions ou wire multi-boucle) |

**Arcs v1 :** densifiés en polyline (tolérance documentée). Arcs kernel natifs plus tard.

## Sortie

Même `EsquisseResolue` que la v1, avec polylines **non vides** pour ces motifs. Statut sous/sur/contraint cohérent. Le stub « degres seuls, géométrie vide » pour `ecart`/`debord` disparaît.

## Critères

1. Solveur : anneau et contour corne contraints → polylines.
2. Extrude OCCT d’un contour corne (sans exiger toute la carrure).
3. `exigerEsquisse` refuse une esquisse sans géométrie résolue.

## État

Branché sur `feature/gcs-enrichi` (sprint 29) : anneau concentrique, contour corne + symétries, `exigerEsquisse` exige des polylines.

## Hors périmètre

Solveur numérique général, verbes `horizontal` / `coincidence` libres, élévation 3D des bouts.
