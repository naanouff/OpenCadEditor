# Vues, unité, paramètres

La 3D est une isométrie. L’esquisse est dans son plan. Le document a une unité, les valeurs ont un type, et les paramètres s’affichent dans un panneau. Le sprint qui le code est [sprint 11](../sprints/sprint-11-vues-parametres.md).

Les panneaux viennent de `@naanouff/w3dts-viewer-editor`, Dockview et ses styles. Il n’y a pas de paquet `w3dts-editor-ui`. Le shell ne reprend pas le ruban.

## Vues

La 3D est orthographique : azimut 45°, environ 55° depuis la verticale, soit 35° au-dessus de l’horizon. L’esquisse est orthographique, le regard suit la normale du plan, le haut de la caméra est un axe de ce plan. Le panoramique et le zoom restent.

La projection orthographique vide encore l’image. La matrice vient de `mat4.ortho`, en profondeur OpenGL. Elle doit entrer dans l’intervalle WebGPU avant ces vues. Un regard pile sur la verticale dégénère : le haut de la caméra prend un axe du plan, plus l’axe Y du monde.

## Unité

Après `piece`, `unite` enregistre l’unité du document. Sans commande, il reste en millimètres. La grille, les cotes et l’évaluateur lisent cette unité.

## Types

Chaque argument chiffré déclare un entier ou un flottant. `param` porte une expression flottante. Un littéral hors type est refusé. Une cote comme `diametre_boite - 2 * epaisseur_paroi` reste un flottant.

## Panneau

Un panneau liste les paramètres : nom et expression. Il suit chaque `param`. Le terminal reste.

## Fond

Le viewport n’a plus de skybox. Le fond est le gris fixe de la passe des opaques. Il ne tourne pas avec la caméra.
