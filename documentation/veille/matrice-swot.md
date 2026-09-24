# Matrice de comparaison

Les listes détaillées sont dans [fonctionnalites.md](fonctionnalites.md). Ici, les modeleurs sont sur les mêmes lignes. `oui` : capacité centrale. `partiel` : présente mais étroite ou dans un autre geste. `non` : hors du produit.

Windchill, 3DEXPERIENCE et Teamcenter ne figurent pas dans les tableaux : ce sont des PLM. Ils versionnent et diffusent les fichiers, ils ne modélisent pas.

## CAO industrielle

| Capacité | Creo | Onshape | CATIA | SOLIDWORKS | Inventor | AutoCAD | Fusion | NX | Solid Edge |
|----------|------|---------|-------|------------|----------|---------|--------|----|------------|
| Esquisse contrainte | oui | oui | oui | oui | oui | non | oui | oui | oui |
| Historique reconstruit | oui | oui | oui | oui | oui | non | oui | oui | oui |
| Édition directe | partiel | non | partiel | partiel | partiel | partiel | partiel | oui | oui |
| Paramètres nommés | oui | oui | oui | oui | oui | non | oui | oui | oui |
| Assemblage contraint | oui | oui | oui | oui | oui | non | oui | oui | oui |
| Mise en plan | oui | oui | oui | oui | oui | oui | oui | oui | oui |
| B-Rep et STEP | oui | oui | oui | oui | oui | non | oui | oui | oui |
| Surfaces complexes | oui | partiel | oui | partiel | partiel | non | partiel | oui | partiel |
| PMI / MBD | oui | partiel | oui | partiel | partiel | non | partiel | oui | partiel |
| Script / API | oui | oui | oui | oui | oui | oui | oui | oui | oui |
| Édition dans le navigateur | non | oui | non | non | non | oui (DWG) | partiel | non | non |

AutoCAD est dans le tableau pour ne pas le confondre avec Inventor : son navigateur édite un dessin DWG, pas une pièce paramétrique. NX et Solid Edge sont les seuls de cette liste dont l’édition directe (synchronous) est un second mode de travail, pas un correctif.

## Outils ouverts, code, navigateur, et le cadrage OpenCadEditor

| Capacité | FreeCAD | SolveSpace | OpenSCAD | CadQuery | Chili3D | Viewer STEP w3dts | Formats OpenCAD |
|----------|---------|------------|----------|----------|---------|-------------------|-------|
| Esquisse contrainte | oui | oui | non | partiel (dans le script) | partiel | non | oui (`.cadompart`, Required) |
| Historique reconstruit | oui | oui | non | non (le script est relu) | partiel | non | oui (`.cadompart` + noyau) |
| Édition directe | partiel | non | non | non | partiel | non | non |
| Paramètres nommés | oui | partiel | oui (variables) | oui (code) | partiel | non | non |
| Assemblage contraint | partiel | oui | non | non | partiel | non | non |
| Mise en plan | oui | partiel | non | non | non | non | non |
| B-Rep et STEP | oui | oui | non | oui | oui | lecture | B-Rep via noyau et `.cadombrep` ; STEP hors vérité |
| Surfaces complexes | partiel | non | non | partiel | partiel | lecture incomplète | non |
| PMI / MBD | partiel | non | non | non | non | lecture AP242 | non |
| Script / API | oui | non | oui | oui | partiel | non | non |
| Édition dans le navigateur | non | non | non | non | oui | non (consultation) | non : ce sont des fichiers, l’éditeur est à part |

La colonne « Formats OpenCAD » décrit `.cadom`, `.cadompart`, `.cadombrep` et `.cadomesh`, pas un logiciel. `.cadom` stocke des transforms, pas un solveur de contraintes. Le viewer STEP w3dts lit un STEP ; ce STEP n’est pas la géométrie normative OpenCAD.

## SWOT comparé

Lecture des deux tableaux pour OpenCadEditor. Ce n’est pas un choix d’MVP : les deux voies restent ouvertes, comme dans [swot.md](swot.md).

| | Forces du champ | Faiblesses du champ | Opportunité si l’on s’en écarte | Risque si l’on les copie |
|--|-----------------|---------------------|----------------------------------|---------------------------|
| CAO industrielle (Creo, CATIA, SOLIDWORKS, Inventor, NX, Solid Edge) | Esquisse, historique, assemblage contraint, plan, STEP, souvent PMI. NX et Solid Edge ajoutent l’édition directe. | Document propriétaire. Le STEP qui sort n’a plus l’arbre. Clients bureau lourds. | Un document ouvert qui ne prétend pas remplacer l’arbre, et qui référence le STEP tel quel. | Reconstruire Creo dans le navigateur : noyau, solveur, mises en plan, PMI. |
| Onshape, Fusion (web) | Preuve que l’édition paramétrique tient dans un navigateur, avec versions. | Le document et le noyau restent chez l’éditeur. Une page tierce ne reçoit que l’export. | Consultation et placement de géométries déjà produites, sans héberger un noyau. | Croire qu’un shell web suffit à égaler Onshape. |
| AutoCAD | DWG universel, édition web du dessin. | Pas un modeleur de pièce mécanique. | Aucune pour les formats OpenCAD : le besoin n’est pas le plan 2D. | Importer le métier du DWG dans l’éditeur. |
| PLM (Windchill, 3DEXPERIENCE, Teamcenter) | Versions, droits, nomenclature, à côté du modeleur. | N’aident pas à créer la géométrie. | Plus tard, versionner les fichiers OpenCAD. Hors veille actuelle. | Commencer par un PLM avant d’exploiter `.cadom` et `.cadompart`. |
| FreeCAD, SolveSpace | Esquisse, historique, STEP, sans licence éditeur. | Bureau, assemblage ou mise en plan moins complets que SOLIDWORKS. | Réutiliser l’idée « noyau ouvert » seulement si la voie paramétrique est choisie. | Embarquer FreeCAD entier comme première version d’OpenCadEditor. |
| OpenSCAD, CadQuery | L’intention tient dans un texte, le STEP ou le maillage n’est qu’un résultat. | Pas d’esquisse interactive ni de plan. | L’intention OpenCAD est déjà un fichier (`.cadompart`), pas un script à mélanger au graphe. | Mettre le script dans `.cadom`. |
| Chili3D | Seul précédent proche d’un modeleur B-Rep dans la page (OCCT/WASM). | Pas de plan, pas de PMI, assemblage limité, poids du WASM. | Référence d’implémentation du noyau dans la page. L’intention, elle, est dans `.cadompart`. | Traiter Chili3D comme le format, alors que le format est déjà spécifié sur `develop`. |
| Viewer STEP w3dts | Lecture STEP, mesure, PMI en lecture, shell déjà là. | Pas de reconstruction, NURBS incomplètes, WebGPU obligatoire. Le STEP n’est pas la vérité OpenCAD. | S’en servir pour l’import et la consultation, pas comme document de travail. | Afficher des poignées de cote qui ne modifient que le maillage. |
