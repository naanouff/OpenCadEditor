# Sprint 09 — cotes en texte dans le plan

Produit l’affichage décrit dans [cotes-texte.md](../veille/cotes-texte.md). Tout est dans `packages/shell`.

## But

Le nombre d’un diamètre coté est un glyphe dans le plan de l’esquisse. Il reste collé au trait quand la caméra tourne.

## Périmètre

1. Test rouge : pour un cercle de rayon 20 sur `plan.dessus`, l’origine est hors du cercle, la normale est vers le haut, le texte est `Ø 40`.
2. À chaque esquisse, un maillage Open Sans par cote, taille d’environ 3 mm, centré sur l’ancre, teinte orange, visible des deux côtés. La police est servie par le shell. L’alias Vite pointe `@naanouff/w3dts-text-mesh` vers sa source.
3. Le calque HTML des cotes sort de la page. Sur l’esquisse du dessus, `Ø 40` et `Ø 35` restent aux bouts du trait après une orbite. Après `extrude`, ils disparaissent.

Hors sprint : flèches, cotes de rectangle, cotes du solide, vue isométrique.

## Terminé quand

- Les tests du shell passent.
- Sur la page, une orbite en esquisse laisse `Ø 40` et `Ø 35` sur le trait.
- Le journal dit que le nombre est un glyphe dans le plan.
