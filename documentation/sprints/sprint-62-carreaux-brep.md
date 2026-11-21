# Sprint 62 — carreaux BRep (P5)

Code [affichage-topologique.md](../veille/affichage-topologique.md). Branche : `feature/carreaux-brep`.

## But

Le viewport montre et sélectionne les **carreaux** du maillage OCCT (`Maillage.faces[]`) : pick triangle, surbrillance, nom `face.<n>` (alias `dessus` / `dessous` conservés).

## Périmètre

1. Hit rayon × triangles (réutiliser le rayon ortho NDC) → id carreau.
2. Registre / supports : `face.<n>` avec origine + normale du carreau ; alias Y extrémaux.
3. État sélection dans `storeShell` + HUD + surbrillance dans w3dts.
4. Clic court : sélection ; si le support ouvre une esquisse → `esquisse <id>` comme P4.
5. Tests TDD sur le hit et le nommage (boîte extrudée : dessus / dessous + au moins un carreau latéral).

Hors sprint : pick arêtes (63), datums 3D (64), matériaux, GPU picking, assemblage.

## Terminé quand

- Les tests de pick triangle / nommage sont verts.
- Une boîte extrudée : clic sur le dessus ouvre encore l’esquisse ; un carreau latéral se surligne et affiche son nom.
- La feuille de route marque P5 en cours (62).
