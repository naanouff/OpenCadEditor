# Cotes en texte dans le plan

Les nombres de diamètre quittent l’étiquette HTML et deviennent des glyphes posés dans le plan de l’esquisse. Le sprint qui le code est [sprint 09](../sprints/sprint-09-cotes-texte.md).

L’étiquette HTML est recalculée seulement à la commande. Le trait est déjà un segment dans le plan. Après une orbite, les deux se séparent. Le nombre rejoint le trait, via `@naanouff/w3dts-text-mesh` (`createTextMeshFromFont`). La caméra d’esquisse reste libre : les glyphes tournent avec la vue.

## Convention

Chaque diamètre a sa propre ligne de cote. Elle traverse le centre et s’arrête sur son cercle, avec une flèche à chaque bout. Le texte `Ø` se pose sur cette ligne. Deux cercles concentriques ne partagent pas la même ligne : leurs diamètres sont décalés de 30°.

## Pose

`coteDiametre` garde le segment et l’ancre. Une fonction pure en dérive, pour chaque cercle coté :

- le texte `Ø` plus la valeur en millimètres
- l’origine en mètres, sur l’ancre, 8 mm hors du cercle, côtés alternés
- l’orientation `{ mode: 'plane', normal, tangent }` prise sur le repère du support. Le défaut de la bibliothèque est le plan XZ, normale vers le haut, donc `plan.dessus` tombe juste

## Maillage

Le shell charge une fois la police Open Sans. À chaque affichage, une esquisse ouverte pose un nœud par cote : taille d’environ 3 mm, texte centré sur l’ancre, matériau déjà utilisé par l’anneau, visible des deux côtés, teinte orange. La racine est reconstruite à chaque commande, le glyphe est régénéré avec elle.

Le calque HTML des cotes sort de la page. Le trait orange du fil reste.

Hors de ce lot : cotes de rectangle, cotes du solide, vue isométrique.
