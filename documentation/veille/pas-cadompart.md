# Filet `pas` dans le `.cadompart`

Suite de [fichier-cadompart.md](fichier-cadompart.md). Sprint : [sprint-33-pas-cadompart.md](../sprints/sprint-33-pas-cadompart.md). Le calcul du filet est dans [vis-maillage.md](vis-maillage.md) ; le pipeline hybride est dans [pipeline-occt.md](pipeline-occt.md).

## But

Enregistrer la commande `pas` dans le `.cadompart`, et la relire pour que la vis reconstruise le même filet. Le maillage ne va pas dans le fichier.

`pas` n’a aucun argument. Le filet se recalcule depuis le profil de la révolution qui précède et les paramètres `pas`, `diametre`, `diametre_ame`, `angle_filet`, `angle_pointe`. La session et `maillagePipelineOcct` le font déjà dès que l’historique contient la commande.

```mermaid
flowchart LR
  historique[Historique pas]
  helix["Feature helix name pas"]
  lecture[Commande pas]
  filet[Filet recalculé]
  historique --> helix
  helix --> lecture
  lecture --> filet
```

## Marqueur

Le proto v0.2 a déjà `HelixFeature` (`profile_sketch_id`, axe, `pitch`, `height`, `revolutions`) et `Feature.name`. On s’en sert tel quel. Copie locale : `packages/format-opencad/proto/cadompart.proto`, commit OpenCAD `73473f6af72ce919b1f3bb9584b63d46ed436bfb`.

À l’emplacement de `pas`, le codec écrit une feature :

- `name` = `pas`
- `helix.profile_sketch_id` = l’esquisse de la révolution qui précède, ou vide s’il n’y en a pas
- axe Y, comme la révolution
- `pitch` = valeur évaluée du paramètre `pas`, en millimètres, ou `0` si ce paramètre n’existe pas
- `suppressed` suit `actif === false`

`pas` ne ferme pas une esquisse ouverte : la révolution l’a déjà consommée. La commande est écrite même sans révolution précédente, pour rester fidèle à l’historique.

## Lecture

`name` vaut `pas` : la lecture émet la ligne `pas`. Elle ne reconstruit pas une hélice à partir de `pitch` ou de `height`. Le paramètre `pas` est déjà dans le fichier, avec son expression. Changer ce paramètre et rouvrir change le filet.

Une feature `helix` dont le nom n’est pas `pas` est refusée (`hélice non lue`). La session ouverte avant l’erreur reste en place. `ThreadFeature` (désignation cosmétique sur une face) n’est pas cette commande.

## Spec OpenCAD

La spec [cadompart v0.2.2](https://github.com/naanouff/OpenCAD/blob/develop/documentation/specification/cadompart-v0.md) et le proto restent à v0.2. `Feature.name` porte le marqueur. Un champ nouveau, ou un passage en v0.3, décrirait une hélice géométrique que cette commande n’est pas : le filet de l’éditeur se recalcule, il ne se stocke pas.

## État

Codé sur `feature/pas-cadompart`. `pas` s’écrit en `helix` nommé `pas` et se relit en commande. La vis rouverte a le même maillage OCCT. La spec OpenCAD reste v0.2.

## Hors de ce palier

Hélice géométrique (`height`, `revolutions`, taper), filetage cosmétique `ThreadFeature`, changement du proto OpenCAD, `.cadom`.
