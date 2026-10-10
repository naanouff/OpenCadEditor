# Sprint 33 — filet `pas` dans le `.cadompart`

Code [pas-cadompart.md](../veille/pas-cadompart.md). Suite du sprint 32. Branche prévue : `feature/pas-cadompart` depuis `feature/fichier-cadompart` (le codec n’est pas encore sur `develop`).

## But

La vis enregistrée puis rouverte reconstruit le même filet. La commande `pas` est un marqueur `helix` nommé `pas`. Le proto OpenCAD ne change pas.

## Périmètre

Chaque numéro part d’un test rouge.

1. **Marqueur.** Dans `packages/format-opencad`, `pas` est une opération connue. L’écriture pose une feature `helix`, `name` = `pas`, `pitch` évalué, `profile_sketch_id` de la révolution précédente. L’esquisse ouverte n’est pas fermée par `pas`.
2. **Lecture.** Cette feature réémet la ligne `pas` après `revolution`. `suppressed` suit `actif === false`. Une hélice d’un autre nom lève `hélice non lue`, session inchangée.
3. **Vis.** `SCRIPT_VIS` enregistré puis relu : `maillagePipelineOcct` a la même taille de maillage que la vis d’origine. Le test du codec, lui, relit sans mailler (`geometrie: false`).

Hors sprint : hélice géométrique, `ThreadFeature`, proto OpenCAD, `.cadom`.

## Terminé quand

- [pas-cadompart.md](../veille/pas-cadompart.md) dit le filet enregistré.
- [fichier-cadompart.md](../veille/fichier-cadompart.md) ne dit plus que `pas` refuse l’enregistrement.
- La vis rouverte a le même nombre de triangles que la vis d’origine.

## État

Codé sur `feature/pas-cadompart`. La vis enregistrée puis rouverte a le même maillage. Une hélice d’un autre nom est refusée.
