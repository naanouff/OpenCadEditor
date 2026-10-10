# Sprint 26 — solveur d’esquisse (GCS)

Après le [pipeline générique](sprint-25-pipeline-occt.md). Doctrine : [direction-modeleur.md](../veille/direction-modeleur.md).

## But

L’esquisse 2D devient **contrainte** : les cotes et relations résolvent les sommets avant l’émission des wires vers OCCT. Sans cela, le pipeline du sprint 25 reste une évaluation paramétrique simple, pas un modeleur FreeCAD / Creo.

## Périmètre

1. **Modèle de contraintes.** Coïncidence, horizontal / vertical, parallélisme, perpendicularité, égalité de longueur, cote distance / rayon — sous-ensemble minimal documenté.
2. **Solveur.** Intégrer un GCS (style FreeCAD ou solveur maison) : entrée = entités + contraintes ; sortie = coordonnées résolues + DOF / under/over-constrained signalé.
3. **Branche esquisse.** Remplacer l’évaluation « lire les champs numériques » du sprint 25 par « résoudre puis polylines ». Critère : déplacer une cote reconstruit le solide via le pipeline OCCT.
4. **UI minimale.** Afficher sous-contraint / surcontraint dans le panneau esquisse (pas forcément le dessin souris complet).

Hors sprint : naming topologique, pointe d’arbre, carrure, édition 3D interactive complète.

## Terminé quand

- Un rectangle coté se redimensionne via le solveur et reconstruit un extrude OCCT.
- [direction-modeleur.md](../veille/direction-modeleur.md) marque le GCS comme amorcé.
- Les tests vis / extrusion générique restent verts.

**2026-10-10** — critères atteints sur `feature/gcs-esquisse` : GCS v1, pipeline, UI statut, **Build boite** + « Esquisse contrainte » à l’écran.
