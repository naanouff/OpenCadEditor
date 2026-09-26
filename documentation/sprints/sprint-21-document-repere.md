# Sprint 21 — document et repère

Code le premier palier décrit dans [modele-document.md](../veille/modele-document.md). Le paquet est `packages/api-parametrique`. Pas de viewport.

## But

La session tient un document. Il porte l’unité, en millimètres, et le repère de référence : origine au centre, X vers 3 h, Y vertical, Z vers 12 h.

## Périmètre

1. Test rouge : une session neuve a un document d’unité `mm`, d’origine nulle, d’axe Y `[0, 1, 0]`. Le trièdre est direct : `x · (y × z) = 1`.
2. Types `Vecteur`, `Repere`, `Document` et constante `REPERE_REFERENCE` dans `types.ts`, exportés par `index.ts`. La session crée ce document à la construction. `document()` en rend une copie.
3. `Session.unite()` lit `document.unite`. La commande `unite` l’écrit sur le document. Le champ `Piece.unite` sort.
4. Le test de `unite` dans `carrure.test.ts` reste vert.

Hors sprint : pièces dans le document, plans d’esquisse comme repères nommés, format `.cadompart`, déplacement du repère, viewport.

## Terminé quand

- `packages/api-parametrique` reste vert, dont le test du document.
- `document()` d’une session neuve est le repère identité, en millimètres.
- Le journal dit que le document porte l’unité et le repère, et que les pièces restent sur la session.
