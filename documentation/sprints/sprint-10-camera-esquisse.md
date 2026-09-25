# Sprint 10 — caméra figée en esquisse

Produit le verrou décrit dans [camera-esquisse.md](../veille/camera-esquisse.md). Tout est dans `packages/shell`.

## But

Une esquisse ouverte se parcourt en panoramique et en zoom. Elle ne tourne plus en 3D.

## Périmètre

1. Test rouge : le jeu esquisse n’a aucune liaison de rotation, et le panoramique contient le clic gauche. Le jeu solide contient le clic droit.
2. Au changement de mode, le shell applique ce jeu. Hors esquisse, les liaisons par défaut reviennent. L’angle face au plan est posé comme aujourd’hui.
3. Sur la page, un glisser en esquisse déplace la feuille. Le clic droit ne la fait pas tourner. Après `extrude`, le clic droit orbite de nouveau.

Hors sprint : projection orthographique, vue isométrique.

## Terminé quand

- Les tests du shell passent.
- Sur la page, l’esquisse se déplace et zoome, sans tourner.
- Le journal dit que la rotation revient avec le solide.
