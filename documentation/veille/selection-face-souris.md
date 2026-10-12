# Sélection face à la souris

Sprint : [56](../sprints/sprint-56-selection-face.md). Suite de [topo-faces.md](topo-faces.md).

## But

Ouvrir une esquisse sur `face.dessus` / `face.dessous` par clic viewport, sans taper la commande.

## Modèle

| Élément | Décision |
|---------|----------|
| Plan | Bornes Y du maillage affiché → `faceDepuisBornesY` |
| Rayon | Ortho NDC + eye / focus caméra orbitale |
| Hit | Premier plan le long du rayon |
| Action | `esquisse <id>` via Session (verbe existant) |
| Garde | Ignoré si esquisse déjà ouverte, assemblage chargé, ou glisser > 4 px |

## Hors périmètre

Ruban, points GCS à la souris, arêtes, faces après booléens complexes.
