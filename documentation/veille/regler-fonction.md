# Régler l’expression d’une fonction

Sprint : [sprint-61-regler-fonction.md](../sprints/sprint-61-regler-fonction.md). Phase **P4**. Axe : **modeleur générique**. Suite de [ruban.md](ruban.md) : le ruban lance avec une cote fixe, ce champ la change ensuite. Contrat : [pilotage-lignes.md](pilotage-lignes.md).

## But

La dernière fonction qui porte une expression (extrusion, enlèvement, congé, pas) se règle sans ajouter une seconde fonction. Annuler rend l’expression précédente.

Le réglage est une ligne : `regle <rang> <expression>`, le rang compté comme pour `pointe` (1 = première fonction). `regle 1 12` fait passer `extrude 8` à 12. Terminal, MCP et ruban l’émettent de la même façon. Le journal la garde, le worker et le MCP la rejouent, l’annulation du terminal la défait.

L’onglet Fonctions montre le champ. Entrée émet la ligne. Un rang hors fonction et une expression vide sont refusés ; l’historique reste intact.

## Hors périmètre

Panneau à droite, révolution sans expression, plusieurs fonctions éditables en même temps, cote d’esquisse, réécriture en place de la ligne `extrude 8` du journal.
