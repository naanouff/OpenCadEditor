# Sprint 61 — régler l’expression (P4)

Code [regler-fonction.md](../veille/regler-fonction.md). Branche : `feature/regler-fonction`.

## But

Changer `extrude 8` en `12` remplace l’expression. L’historique garde une seule extrusion. Annuler revient à 8.

## Périmètre

1. Verbe `regle <rang> <expression>` dans `Session`, annulable par la pile de `commande`.
2. Le champ de l’onglet Fonctions émet cette ligne par `storeShell.ligne` : journal, worker et pont MCP la reçoivent comme les autres.
3. Champ validé par Entrée ; une ligne refusée remet la valeur affichée.

Hors sprint : panneau latéral, édition d’une fonction qui n’est pas la dernière.

## Terminé quand

- `regler.test.ts` est vert (réglage, annulation, rejeu d’un script, refus).
- Le champ du ruban suit la dernière expression.
