# Sprint 28 — références topologiques (faces v1)

Code [topo-faces.md](../veille/topo-faces.md). Suite du sprint 27 (pointe). Branche prévue : `feature/topo-faces` depuis `develop`.

## But

`face.dessus` / `face.dessous` sont des supports de sketch stables après une extrusion générique ; une poche OCCT s’y appuie.

## Périmètre

Chaque numéro part d’un test rouge.

1. **Registre.** Au compile OCCT, après extrude +Y depuis `plan.dessus`, enregistrer dessus (max Y) et dessous (min Y) avec origin + normal.
2. **Polylines.** `esquissePolylines` résout `face.*` via le registre (`yPlan` / UV).
3. **Coupe.** `pipelineOcct` `enlever` coupe selon le support, plus seulement `yMax - profondeur`.
4. **Validation.** `ouvrir face.dessus` réussit quand le registre (ou `aFace`) le connaît.
5. **Preuve.** Script boîte → extrude → poche sur face dessus ; rebuild après changement de hauteur.

Hors sprint : arêtes, `nommer`, carrure OCCT, GCS enrichi, paliers arbre 3–4.

## Terminé quand

- Les tests shell du scénario poche sont verts.
- Debug **Build boite** (ou script équivalent) : esquisse sur `face.dessus` + enlèvement visible.
- [topo-faces.md](../veille/topo-faces.md) dit « branché ».
- [direction-modeleur.md](../veille/direction-modeleur.md) marque l’item 5 en cours ou fait.
