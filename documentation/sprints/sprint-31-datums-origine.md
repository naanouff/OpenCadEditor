# Sprint 31 — datums d’origine et palier 3

Code [datums-origine.md](../veille/datums-origine.md) et les paliers 3–4 de [arbre-fonctions.md](../veille/arbre-fonctions.md). Suite du sprint 30. Branche prévue : `feature/datums-origine` depuis `develop`.

## But

Plans d’origine = datums du document ; chaque fonction solide ne porte que son esquisse résolue (wires OCCT), sans enrichir `profil()` / `decrire`.

## Périmètre

Chaque numéro part d’un test rouge.

1. **Datums.** Table unique depuis `document.repere` ; brancher esquisse, polylines, `dessin.repere`, arbre Origine.
2. **Palier 3.** Isoler ou retirer le chemin motif pour les historiques compatibles OCCT ; pas de nouveaux `Ajout` typés.
3. **Composition.** Second `extrude` latéral = seconde fonction, même pipeline.
4. **Preuve.** Tests mapping + composition ; carrure/vis restent sur OCCT.

Hors sprint : réordonnancement, suppression, esquisse partagée FreeCAD.

## Terminé quand

- [datums-origine.md](../veille/datums-origine.md) et [arbre-fonctions.md](../veille/arbre-fonctions.md) disent les paliers 3–4 branchés.
- [direction-modeleur.md](../veille/direction-modeleur.md) items 3–6 et feuille de route topo→carrure à jour.

## État

Codé sur `feature/datums-origine` : table unique, mapping UV/GCS testé, composition 2ᵉ extrude = 2ᵉ fonction.
