# Sélection face à la souris

Sprints : [56](../sprints/sprint-56-selection-face.md) (ouvrir), [57](../sprints/sprint-57-esquisse-cercle-souris.md) (cercle), [58](../sprints/sprint-58-esquisse-rectangle-souris.md) (rectangle). Suite de [topo-faces.md](topo-faces.md).

## But

Ouvrir une esquisse sur `face.dessus` / `face.dessous` par clic viewport, sans taper la commande.

## Modèle

| Élément | Décision |
|---------|----------|
| Plan | Bornes Y du maillage affiché → `faceDepuisBornesY` |
| Rayon | Ortho NDC + eye / focus caméra orbitale |
| Hit | Premier plan le long du rayon |
| Action | `esquisse <id>` via Session (verbe existant) |
| Garde | Ignoré si assemblage chargé, ou glisser > 4 px |
| Unités | Caméra en m ; plans / UV / diamètres en mm (`rayonVersMm` / `facesVersMetres`) |
| Esquisse | `face.*` → cercle (Ø = 2·‖UV‖) ; `plan.*` → rectangle (L×l = 2|u|×2|v|) ; centre GCS = origine |

## Hors périmètre

Ruban, centre de cercle libre, arêtes, faces après booléens complexes.
