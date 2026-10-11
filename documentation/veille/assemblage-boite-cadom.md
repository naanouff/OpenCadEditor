# Assemblage boîte `.cadom`

Sprint : [sprint-52-assemblage-boite-cadom.md](../sprints/sprint-52-assemblage-boite-cadom.md). Pièces : sprints 48–51. SDK : `@opencad/cadom`.

## But

Un document `.cadom` unit les cinq pièces de la boîte sous une racine « Boîte Milgauss ». Chaque nœud lie un asset `cadompart` (rôle parametric). Transforms locaux indicatifs (mm) — pas de solveur de mates.

```mermaid
flowchart TB
  root[Boîte Milgauss]
  root --> carrure
  root --> lunette
  root --> verre
  root --> fond
  root --> couronne
```

## Hors périmètre

Chargement / rebuild des `.cadompart`, meshes late-load, mates, Complete export.
