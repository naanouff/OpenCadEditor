# Sprint 32 — fichier `.cadompart`

Code [fichier-cadompart.md](../veille/fichier-cadompart.md). Suite du sprint 31. Branche prévue : `feature/fichier-cadompart` depuis `develop`.

## But

Enregistrer l’historique d’une pièce dans un `.cadompart` protobuf v0.2, et rouvrir ce fichier dans une session qui reconstruit le même solide.

## Périmètre

Chaque numéro part d’un test rouge, dans `packages/format-opencad`.

1. **Paquet.** Copier `cadompart.proto` (OpenCAD `develop`, commit noté dans la veille), générer le module statique. `api-parametrique` ne gagne aucune dépendance.
2. **Document vide.** Écriture : `version_major = 0`, `version_minor = 2`, unité millimètres, aucune feature.
3. **Extrusion.** Paramètre évalué, cercle, `extrude` en `BLIND`. La session relue extrude la même cote. L’expression d’origine devient un littéral.
4. **Enlèvement.** `enlever` s’écrit `cut = true` et se relit en poche.
5. **Révolution.** `revolution` fait l’aller-retour.
6. **Rectangle.** Quatre lignes et une boucle ; la relecture reconstruit le profil.
7. **Feature éteinte.** `actif === false` reste dans le fichier (`suppressed`) et est sautée au rejeu.
8. **Mètres.** Un fichier dont l’unité est le mètre est relu en millimètres.
9. **Refus.** `pas`, feature inconnue, id dupliqué ou `body` vide : erreur, session inchangée.
10. **Shell.** `ouvrir(octets)` remplace la session et relance le worker. `enregistrer()` rend les octets du codec. Le panneau Document expose Ouvrir et Enregistrer ; le sélecteur de fichiers est injecté.

Hors sprint : `.cadom`, `.cadomesh`, `.cadombrep`, auteur et version semver dans le fichier, pointe d’arbre, Electron.

## Terminé quand

- [fichier-cadompart.md](../veille/fichier-cadompart.md) dit le codec branché.
- Un script extrusion (paramètre, esquisse, extrude) enregistré puis rouvert reconstruit la même cote.
- [analyse.md](../suivi/analyse.md) ne dit plus qu’aucun `.cadompart` n’est lu ni écrit.

## État

Codé sur `feature/fichier-cadompart`. La carrure enregistrée puis rouverte reconstruit le même maillage, avec les variables (`20*2`, `diametre_boite - 2 * epaisseur_paroi`, `hauteur_carrure`). `concentrique`, `arc` et `symetrie` font l’aller-retour. Le filet `pas` est au [sprint 33](sprint-33-pas-cadompart.md).
