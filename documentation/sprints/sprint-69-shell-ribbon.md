# Sprint 69 — ruban Lucide (P4b)

Code [plan-integration-shell.md](../maquette/plan-integration-shell.md) phase 3. Branche : `feature/shell-ribbon`.

Prérequis : [sprint 68](sprint-68-shell-chrome.md). Logique : [ruban.ts](../../packages/shell/src/ruban.ts) + [sprint 60](sprint-60-ruban.md).

## But

Le ruban a le look Whittle (icônes Lucide, groupes, onglets) tout en émettant les mêmes lignes via `boutonsRuban` / `executer`.

## Périmètre

1. Remplacer le rendu de `RubanVue` par une grille type maquette (onglets SOLIDE / ESQUISSE, groupes, icônes).
2. Activer uniquement les outils présents dans `boutonsRuban` ; les autres du même groupe sont grisés avec une raison.
3. Conserver le champ d’expression (`reglageFonction`) sur SOLIDE.
4. Pas d’espaces CAM / CTRL / Render ; pas de nouvel onglet Assemblage.

Hors sprint : layout Dockview v6, nouveaux verbes Session, Finish sketch si aucune ligne dédiée.

## Terminé quand

- [x] Look Lucide aligné maquette Design ; actions = `ruban.ts`.
- [x] Outils absents de `boutonsRuban` grisés avec raison.
- [x] `ruban.test.ts` vert ; aucune mutation hors `executer` / `ligne`.
