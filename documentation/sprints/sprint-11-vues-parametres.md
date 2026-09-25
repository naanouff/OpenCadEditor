# Sprint 11 — vues, unité, paramètres

Produit ce qui est décrit dans [vues-parametres.md](../veille/vues-parametres.md).

## But

La 3D est une isométrie, l’esquisse est dans son plan, le document a une unité, et les paramètres sont listés.

## Périmètre

1. La profondeur orthographique entre dans l’intervalle WebGPU. La 3D s’affiche en isométrie. L’esquisse s’affiche dans son plan, le haut de la caméra dans ce plan. Le panoramique et le zoom restent.
2. Test rouge : après `piece`, `unite mm` enregistre l’unité. Sans commande, elle vaut `mm`.
3. Test rouge : un argument entier refuse un flottant. `param` accepte une expression flottante.
4. Un panneau de `@naanouff/w3dts-viewer-editor` liste le nom et l’expression de chaque paramètre, à jour après `param`.
5. La skybox ne dessine plus. Le fond est le gris fixe.

Hors sprint : ruban, cotes de rectangle, vue autre que l’isométrie et le plan d’esquisse.

## Terminé quand

- Les tests passent.
- Sur la page, le solide est en isométrie, l’esquisse est dans son plan, le fond ne tourne pas.
- Le journal dit que l’unité et le panneau suivent le document.
