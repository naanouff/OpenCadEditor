# Caméra figée en esquisse

En mode esquisse, la vue reste face au plan. Le glisser déplace la feuille, la molette zoome. La rotation revient avec le solide. Le sprint qui le code est [sprint 10](../sprints/sprint-10-camera-esquisse.md).

Ouvrir une esquisse pose l’angle une fois. Le clic droit orbite encore : c’est l’action `cameraRotate`. Le bouton milieu déplace, la molette zoome. Le mode esquisse retire la rotation et fait du glisser un panoramique.

## Liaisons

En esquisse, `cameraRotate` n’a plus de bouton. `cameraPan` prend le clic gauche et le bouton milieu. `cameraZoom` garde la molette. Au retour du solide, les liaisons par défaut reviennent, clic droit compris.

Le panoramique passe par `cameraPan`. Le mode du clic gauche du contrôleur reste vide, pour ne pas déplacer deux fois.

Hors de ce lot : projection orthographique, vue isométrique.
