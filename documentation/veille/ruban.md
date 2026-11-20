# Ruban

Sprint : [sprint-60-ruban.md](../sprints/sprint-60-ruban.md). Phase **P4**. Axe : **modeleur générique**. Suite de [naming-aretes.md](naming-aretes.md). Le cadre vient de [plan-layout.md](../maquette/plan-layout.md) : le ruban lance, il ne règle pas la fonction.

## But

Deux onglets au-dessus du dock envoient les lignes que le terminal connaît déjà.

| Onglet | Quand | Bouton | Lignes |
|--------|--------|--------|--------|
| Esquisse | pas de pièce | Plan dessus | `piece piece` puis `esquisse plan.dessus` |
| Esquisse | pièce, pas d’esquisse | Plan dessus | `esquisse plan.dessus` |
| Esquisse | plan, profil vide | Rectangle | `rectangle`, largeur 10, longueur 20, écart 0 |
| Esquisse | `face.*`, profil vide | Cercle | `cercle`, diamètre 10 |
| Fonctions | rectangle coté | Extruder | `extrude 8` |
| Fonctions | cercle sur `face.*` | Enlever | `enleve 2` |
| Fonctions | arête choisie, esquisse fermée | Congé | `fillet 1` et le nom (`arete.haut`, …) |

Un assemblage chargé ne montre aucun bouton : le graphe n’est pas une esquisse.

## Hors périmètre

Onglet Assemblage, révolution, cote au ruban, recherche de commande, panneau qui règle la fonction après le lancement.
