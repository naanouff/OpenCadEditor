# Découplage affichage / `noyauProvisoire`

Sprint : [sprint-43-retrait-provisoire.md](../sprints/sprint-43-retrait-provisoire.md). Phase **P1**. Axe : **modeleur générique**.

## But

Le fil de fer viewport suit le maillage OCCT (`aretesBrep`), plus le motif `decrire` quand un volume est présent. On ne supprime pas encore BSP / `poser` / fallback Session.

## Deux piles

| Pile | Rôle actuel |
|------|-------------|
| OCCT (`maillagePipelineOcct`) | Ombré Milgauss (carrure, vis, boulon) |
| Session (`decrire` / `ombrer` / BSP) | Fallback, esquisse `poser`, hybride `pas`, tests motif |

## Critères

1. `documentCad` + volume non vide → wireframe = `aretesBrep(volume)`, même si `frontiere.faces` non vide.
2. Sans volume → `filDeFer(frontiere)` inchangé.
3. `noyauProvisoire` reste dans l’arbre (Solide, `poser`, fallback worker).
