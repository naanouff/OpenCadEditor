# Sprint 60 — ruban (P4)

Code [ruban.md](../veille/ruban.md). Branche : `feature/ruban`.

## But

Le ruban lance plan, rectangle, cercle, extrusion, enlèvement et congé. Les cotes de départ sont fixes. L’assemblage n’a pas de boutons.

## Périmètre

1. `boutonsRuban` selon l’esquisse, le profil et l’arête choisie.
2. Barre au-dessus du dock : onglets Esquisse et Fonctions.
3. Un clic envoie le script en un lot (`executer`).

Hors sprint : assemblage, révolution, édition des cotes dans un panneau.

## Terminé quand

- `ruban.test.ts` est vert, y compris rectangle puis `extrude`.
- La feuille de route marque le ruban dans P4.
