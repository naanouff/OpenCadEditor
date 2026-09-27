# Sprint 22 — arbre de fonctions

Code le palier 1 décrit dans [arbre-fonctions.md](../veille/arbre-fonctions.md). Le paquet est `packages/shell`. La frontière de la carrure ne change pas.

## But

L’arbre de construction montre des fonctions dans l’ordre de création. L’esquisse est l’enfant de la fonction qui la consomme. L’origine porte les trois plans. Les paramètres restent dans leur panneau.

## Périmètre

1. Test rouge dans `packages/shell/tests/arbre.test.ts`. Après deux cercles, une extrusion et un enlèvement, l’arbre est la pièce, puis Origine, puis Extrusion, puis Enlèvement. L’extrusion n’est plus une ligne sous l’esquisse. Les `param` n’y figurent pas.
2. `fonctions(historique)` regroupe les opérations. Origine liste `plan.dessus`, `plan.12h`, `plan.3h`. Chaque `extrude` ou `enlever` devient une fonction. Son enfant est l’esquisse : le support, les entités et les cotes depuis le `esquisse` ouvrant.
3. `arbreConstruction` et `ArbreConstructionVue` affichent ce résultat. Les libellés portent l’expression : `Extrusion 8`, `Enlèvement profondeur_lunette`.
4. Les tests déjà verts de `packages/api-parametrique` et de `scriptCarrure` restent verts. Aucun appel de `decrire` ne change.

Hors sprint : pointe de reconstruction, profil porté par la fonction, plans d’origine comme repères, solveur 2D, réordonnancement, suppression, congé comme fonction, dialogue d’édition, `filDeFer`.

## Terminé quand

- `packages/shell` reste vert, dont le test de l’arbre.
- Une carrure affiche Origine, puis une fonction par extrusion et par enlèvement, l’esquisse sous chacune.
- Le panneau Paramètres liste encore les `param`.
- `frontiere()` après `SCRIPT_CARRURE` est inchangée.
- Le journal dit que l’arbre montre des fonctions, et que la pointe reste après.
