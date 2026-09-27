# Sprint 23 — maillage de la vis

Code les quatre corrections décrites dans [vis-maillage.md](../veille/vis-maillage.md). Le booléen et les normales sont dans `packages/api-parametrique`. Le fil de fer, le lot et le worker sont dans `packages/shell`. La frontière de la carrure ne change pas.

## But

La vis est un solide fermé. Le cône de tête est lisse, les arêtes de face sont tracées, et la construction ne rejoue plus la géométrie à chaque ligne.

## Périmètre

Chaque numéro part d’un test rouge.

1. **Fermeture.** `maillerFilet` se ferme par un disque au rayon de fût. Test : `pas` seul n’a aucune arête impaire. L’union du corps et de la tête a le volume de la somme. Le script vis a, à l’épaulement, des triangles de rayon entre l’âme et le nominal dont la normale pointe vers −Y. Le test de lèvre au Ø nominal est réécrit : cette lèvre vient de la tête.
2. **Mesure.** Un script hors dépôt chronomètre le script vis, l’union, la différence Pozi et `normalesLisses`. Les chiffres sont écrits dans le journal avant la suite.
3. **Un seul recalcul.** `Session.lot` n’appelle `reconstruire()` qu’à la sortie du lot. L’annulation retire toujours une ligne. `Hote.executer` enveloppe le script, et le viewport de test ne reçoit que le maillage final.
4. **Normales.** `Maillage` porte `normales?` et `faces?`. `csg.ts` interpole la normale à la découpe et l’inverse au retournement. `revolution`, `pas` et `enleve` lissent avant le booléen. Test : sur le cône de tête, chaque sommet est à moins de 3° de la normale analytique. Un cube moins un cylindre garde des normales unitaires, radiales sur le cylindre. `ombre.ts` n’est pas modifié.
5. **Fil de fer.** Étiquettes de face dans `tourner`, `maillerFilet` et `boite`. `aretesBrep` trace les frontières de faces, y compris les jonctions en T du BSP, et écarte les arêtes en T intérieures à une face. `documentCad` l’utilise quand la frontière est vide et qu’un volume est affiché. `aretesVives` et `filDeFer` restent. Test : un cylindre tourné donne deux cercles. La vis trace la crête, le cercle de tête, le cercle d’épaulement et le contour de l’empreinte.
6. **Booléen local.** `union` et `difference` gardent tels quels les triangles hors de la boîte de l’autre solide. Le plan d’un nœud est pris au milieu de la liste. Test : deux cubes disjoints donnent 24 triangles. Deux cubes en contact par une face gardent le volume exact. Le script vis produit moins de 1,5 fois les triangles du filet plus ceux de la tête.
7. **Replay sans géométrie.** `Contexte.geometrie` à faux saute le maillage de `revolution`, `pas` et `enleve`. `esquisseDepuis` rejoue ainsi. La vue d’esquisse ne reconstruit pas le solide.
8. **Worker.** `Moteur` a `moteurSynchrone` (tests Node, `maillagesRecus` inchangé) et `moteurWorker` (tableaux transférés, numéro de séquence, réponse périmée ignorée). La session du fil d’interface tourne avec `geometrie` à faux. Le viewport affiche le maillage reçu et un indicateur « Construction… ».

Hors sprint : paliers 2 à 4 de l’arbre de fonctions, filet cosmétique, commande `vis`, booléen BSP sur GPU.

## Terminé quand

- `packages/api-parametrique` et `packages/shell` restent verts, dont `csg.test.ts`, `revolution.test.ts` et `scriptVis.test.ts`.
- La vis est fermée sous la tête, le cône de tête est lisse, et le fil de fer montre les arêtes de face.
- Le journal porte les durées avant et après, et dit que le rendu était déjà sur le GPU.
- [editor-ui.md](../shell/editor-ui.md) dit que le fil de fer d’un solide maillé vient des faces, et que la construction affiche un indicateur.
