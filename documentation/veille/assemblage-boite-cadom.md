# Assemblage boîte `.cadom`

Sprints : [52](../sprints/sprint-52-assemblage-boite-cadom.md) (Design), [53](../sprints/sprint-53-assemblage-complete.md) (Complete bindings). Pièces : 48–51. SDK : `@opencad/cadom`.

## But

Un document `.cadom` unit les cinq pièces sous « Boîte Milgauss ».

| Badge | API | Assets par pièce |
|-------|-----|------------------|
| Design | `assemblageBoiteMilgauss()` | `parametric` → `.cadompart` |
| Complete | `assemblageBoiteComplete()` | + `mesh` → `.cadomesh` |

Transforms locaux indicatifs (mm) — pas de mates. Les URI `.cadomesh` sont déclarées ; les octets mesh ne sont pas encore écrits (rebuild viewport = `SCRIPT_*` + OCCT).

```mermaid
flowchart TB
  root[Boîte Milgauss]
  root --> carrure
  root --> lunette
  root --> verre
  root --> fond
  root --> couronne
```

## Viewport

À l’ouverture, reconstruction des pièces connues (`SCRIPT_*`), transforms monde, fusion `maillageAffiche`.

## Hors périmètre

Écriture fichiers `.cadomesh` / zip, lecture assets externes, mates, Exact.
