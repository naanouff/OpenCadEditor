# Fillet OCCT et refs d’arêtes

Sprint : [sprint-42-fillet-aretes.md](../sprints/sprint-42-fillet-aretes.md). Phase **P1**. Axe : **modeleur générique**.

## But

Congé kernel (`fillet_edges`) après un solide, avec sélecteurs d’arêtes stables dans le script (pas d’indices BREP bruts).

## Syntaxe

```text
fillet <rayon>
fillet <rayon> arete.haut
fillet <rayon> arete.haut arete.bas
```

Sans sélecteur : toutes les arêtes (`indexCount < 0`). Sélecteurs géométriques résolus via `list_edges` (midPoint) au moment du maillage.

| Ref | Heuristique (extrusion +Y) |
|-----|----------------------------|
| `arete.haut` | midPoint.y ≈ yMax |
| `arete.bas` | midPoint.y ≈ yMin |
| `arete.vertical` | midPoint.y ≈ (yMin+yMax)/2 |

## Critères

1. Boîte extrudée + `fillet 1 arete.haut` → maillage OCCT non vide.
2. `fillet` est une fonction (pointe / arbre).
3. Session provisoire : no-op géométrie ; le worker OCCT porte le congé.
