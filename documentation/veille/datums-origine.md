# Datums d’origine (arbre palier 4)

Plan du palier 4 réinterprété de [arbre-fonctions.md](arbre-fonctions.md). Sprint : [sprint-31-datums-origine.md](../sprints/sprint-31-datums-origine.md). Suit [carrure-pipeline.md](carrure-pipeline.md) et [modele-document.md](modele-document.md).

## But

Les trois plans `plan.dessus`, `plan.12h`, `plan.3h` dérivent d’**une** table de datums ancrée sur `Session.document().repere`, partagée par validation d’esquisse, polylines OCCT, viewport et arbre Origine.

## Modèle

| Consommateur | Aujourd’hui | Cible |
|--------------|-------------|--------|
| `domaines/esquisse.ts` | Set `PLANS` | Datums document |
| `esquissePolylines.ts` | Cas spéciaux d’axes | Transform UV→monde du datum |
| `dessin.ts` `repere` | Table locale | Même table |
| `arbreConstruction` | `PLANS_ORIGINE` | Libellés inchangés, source = datums |

Les faces de solide (`face.*`) restent des supports valides (registre topo, sprint 28).

## Critères

1. Plus de constantes de plans dupliquées hors des datums.
2. Mapping UV→monde testé ; libellés Origine inchangés.
3. Palier 3 : historiques compatibles OCCT sans typage `Ajout` motif ; composition (2ᵉ extrude latéral = 2ᵉ fonction).

## État

Branché (sprint 31) : `datums.ts` depuis `document.repere` ; consommateurs esquisse, polylines (`gcsVersMonde`), `dessin.repere`, arbre Origine.

## Hors périmètre

Réordonnancement, suppression, esquisse réutilisable FreeCAD, congé comme fonction.
