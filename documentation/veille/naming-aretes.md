# Nommage des arêtes

Sprint : [sprint-59-naming-aretes.md](../sprints/sprint-59-naming-aretes.md). Phase **P4**. Axe : **modeleur générique**. Suite de [fillet-aretes.md](fillet-aretes.md) et de [selection-face-souris.md](selection-face-souris.md).

## But

Après une extrusion, les arêtes du solide OCCT portent les mêmes noms que le script de congé : `arete.haut`, `arete.bas`, `arete.vertical`. Un clic près d’un milieu retient le nom, sans ouvrir d’esquisse. Le centre d’une face ouvre toujours l’esquisse.

## Modèle

| Élément | Décision |
|---------|----------|
| Source | `list_edges` dans le même batch que la tessellation |
| Noms | Milieu en Y : max = haut, min = bas, mi-hauteur = vertical. Identique au `fillet` |
| Stabilité | Les noms suivent les bornes. Une hauteur plus grande laisse `arete.haut` sur le nouveau dessus |
| Clic | Rayon à moins de 3 mm d’un milieu, esquisse fermée. Le viewport affiche le nom |
| Face | Un clic loin des milieux garde le geste esquisse (sprint 56–58) |
| `pas` | Maillage hybride : pas d’arêtes nommées (le fût n’est pas le solide OCCT) |

Le kernel v0.2.0 ne donne que le milieu, pas la courbe. Le clic vise ce point, pas toute l’arête.

## Hors périmètre

Ruban, `chamfer`, verbe `nommer`, arêtes après booléens complexes, pick le long de la courbe.
