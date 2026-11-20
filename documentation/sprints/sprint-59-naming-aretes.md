# Sprint 59 — nommage des arêtes (P4)

Code [naming-aretes.md](../veille/naming-aretes.md). Branche : `feature/naming-aretes`.

## But

Le solide OCCT expose `arete.haut` / `arete.bas` / `arete.vertical`. Un clic près d’un milieu choisit ce nom et l’affiche. Il n’ouvre pas d’esquisse.

## Périmètre

1. `nommerAretes` : mêmes classes que `fillet`, stables si la hauteur change.
2. `list_edges` voyage avec le maillage OCCT (vide si `pas`).
3. Clic sous le seuil → `areteChoisie` ; au-delà, esquisse comme avant.
4. Le viewport affiche le nom choisi.

Hors sprint : ruban, pick sur toute la courbe, `chamfer`.

## Terminé quand

- Les tests `aretesOcct` et `selectionArete` sont verts.
- Une boîte extrudée porte `arete.haut`.
- La feuille de route marque le naming en cours de P4, suite = ruban.
