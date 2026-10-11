# Sprint 39 — Barrettes sur pipeline OCCT

Suite de [barrette-tube-occt.md](../veille/barrette-tube-occt.md) (section barrette). Phase **P1**. Branche : `feature/barrette-occt` depuis `develop`.

## But

Les quatre trous de barrette du script carrure sont coupés en OCCT. Placement **pédagogique** (mêmes paramètres que `decrire`) tant que le GCS n’a pas de cote de position — documenté, pas un second compilateur de pièce dans le worker.

## Périmètre

1. Lever l’ignore `enleve travers` sur `plan.12h`.
2. Quatre outils cylindriques d’axe X : `z = ±(diametre_boite/2 + longueur_corne − recul_barrette)`, `y` à mi-épaisseur de bout (ou `hauteur_carrure/2`), rayon = Ø esquisse / 2, traverse de `±entrecorne/2` à la largeur de corne.
3. Test : sommets de trou près des bouts de corne ; pas de matière au centre d’un trou.
4. Doc / journal / feuille de route.

Hors sprint : cotes GCS de position, retrait `historiqueCornesSession`, fillet, `noyauProvisoire`.

## Terminé quand

- `SCRIPT_CARRURE` maille OCCT avec tube (38) + 4 barrettes.
- Suite shell verte.

## État

Codé sur `feature/barrette-occt` : `opsBarrettesPedagogiques`, test `perce les quatre trous de barrette`.
