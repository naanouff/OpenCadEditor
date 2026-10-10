# Sprint 29 — GCS enrichi

Code [gcs-enrichi.md](../veille/gcs-enrichi.md). Suite des sprints 26 (GCS v1) et 28 (faces). Branche prévue : `feature/gcs-enrichi` depuis `develop`.

## But

Anneau et cornes : wires fermés issus du solveur, sans `profil()`.

## Périmètre

Chaque numéro part d’un test rouge.

1. **Concentrique.** Deux cercles → centres communs, diamètres évalués.
2. **Corne en plan.** Segments/arcs avec `ecart`, `debord`, `largeur`, `rayon` + ancrage peau → une polyline fermée.
3. **Symétrie.** `symetrie vertical` / `horizontal` miroite le contour.
4. **Polylines.** Arcs densifiés ; `esquissePolylines` consomme le résultat.
5. **Preuve.** Tests solveur + un extrude OCCT d’un contour corne.

Hors sprint : carrure complète OCCT, solveur général, élévation des bouts.

## Terminé quand

- Stub vide `ecart`/`debord` retiré pour les cas couverts.
- Tests verts ; extrude corne visible via pipeline.
- [gcs-enrichi.md](../veille/gcs-enrichi.md) dit « branché ».
