# Sprint 54 — octets `.cadomesh` boîte

Suite sprint 53. Branche : `feature/assemblage-cadomesh-octets`.
Dépendance OpenCAD : [PR #96](https://github.com/naanouff/OpenCAD/pull/96) (writer navigateur).

## But

`octetsCadomeshBoite()` : rebuild OCCT des cinq pièces → octets `.cadomesh` via `ecrireCadomesh`. Debug peut les télécharger. Round-trip `lireCadomesh` en test.

## Hors scope

Zip multi-fichiers, affichage viewport depuis mesh sans rebuild, Exact `.cadombrep`, mates.
