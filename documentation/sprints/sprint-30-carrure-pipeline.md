# Sprint 30 — carrure sur pipeline OCCT

Code [carrure-pipeline.md](../veille/carrure-pipeline.md). Suite des sprints 28–29. Branche prévue : `feature/carrure-pipeline` depuis `develop`.

## But

Anneau + poche(s) + cornes via le pipeline générique ; viewport **Build carrure** sans `noyauProvisoire`.

## Périmètre

Chaque numéro part d’un test rouge.

1. **Anneau.** Deux cercles concentriques → solide paroi (épaisseur vs `epaisseur_paroi`).
2. **Cuts.** Lunette / fond sur faces nommées (sprint 28).
3. **Cornes.** Wire GCS (sprint 29) → extrude → fuse au corps.
4. **Worker.** Historique compatible → OCCT ; fallback provisoire seulement hors périmètre.
5. **Preuve.** Tests mesh + validation visuelle Build carrure.

Barrette `plan.12h` et tube `plan.3h` : dans ce sprint si possible, sinon notés pour une suite sans bloquer le critère écran.

Hors sprint : congés d’élévation 3D, enrichissement de `decrire`, datums d’origine (sprint 31).

## Terminé quand

- Critères de [carrure-pipeline.md](../veille/carrure-pipeline.md) atteints.
- [direction-modeleur.md](../veille/direction-modeleur.md) item 6 en cours ou fait.
