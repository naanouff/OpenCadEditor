# Sprint 47 — fetch assets `.cadom`

Code [cadom-fetch-assets.md](../veille/cadom-fetch-assets.md). Suite 44–46. Branche : `feature/cadom-fetch-assets`.

## But

Charger les URI du plan (injectable), garder les octets, afficher ok / erreur / en attente dans Document.

## Périmètre

1. **Chargeur.** `definirChargeur` / défaut `fetch`.
2. **Store.** `chargerAssets`, `statutAsset(id)`, reset à l’ouverture.
3. **UI.** Bouton « Charger assets » ; lignes Assets avec statut.
4. **Tests.** Mock chargeur pour fixture A (2 mesh ok) ; URI inconnue → erreur sans perdre les autres.

Hors sprint : decode glb/cadomesh, viewport, pièces Milgauss, Complete.

## Terminé quand

P3 graphe (44–47) fait sur la feuille ; fetch mockable vert.
