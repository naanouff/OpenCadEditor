# Document et repère de référence

Premier palier du modèle de données. La session tient déjà les pièces, l’historique et l’esquisse. Elle ne tient pas encore de document. Le sprint qui le code est [sprint 21](../sprints/sprint-21-document-repere.md).

Le socle décrit dans [api-architecture.md](api-architecture.md) annonçait un document de plusieurs pièces. Ce palier n’en pose que l’enveloppe : l’unité et le repère dans lequel tout le reste s’exprime. Les pièces restent sur la session.

## Document

Un document porte une unité et un repère.

```ts
type Document = {
  unite: string
  repere: Repere
}
```

L’unité est le millimètre. Sans commande, elle vaut `mm`. Après `piece`, `unite` l’écrit sur le document, et `Session.unite()` la lit. Le champ `Piece.unite` sort : il n’y a qu’une unité.

`Session.document()` rend une copie. Les pièces, l’historique, les noms et l’esquisse ne sont pas des champs du document.

`documentCad`, dans le shell, reste le paquet d’affichage : fil de fer, grille, cotes, maillage. Ce n’est pas ce document. Le noyau calcule en millimètres ; le viewer convertit en mètres.

## Repère de référence

Le repère est fixe. Il est posé à la construction de la session. Aucune commande ne le déplace. Il est orthonormé et direct.

```ts
type Repere = {
  origine: readonly [number, number, number]
  x: readonly [number, number, number]
  y: readonly [number, number, number]
  z: readonly [number, number, number]
}
```

La constante `REPERE_REFERENCE` vaut :

| Axe | Vecteur | Sens |
|-----|---------|------|
| origine | `[0, 0, 0]` | centre de la boîte |
| `x` | `[1, 0, 0]` | vers 3 h |
| `y` | `[0, 1, 0]` | verticale, axe de la boîte |
| `z` | `[0, 0, 1]` | vers 12 h |

C’est déjà le sens des plans du shell : `plan.3h` regarde +X, `plan.12h` regarde +Z, `plan.dessus` est le plan horizontal. Ces plans nommés ne deviennent pas encore des repères du document.

## Hors de ce palier

Les pièces dans le document, les plans d’esquisse comme repères nommés, le format `.cadompart`, et le déplacement du repère. On les construit ensuite.
