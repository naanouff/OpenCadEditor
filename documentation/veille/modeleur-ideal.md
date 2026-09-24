# Fonctions du modeleur idéal

Ce catalogue reprend, pour chaque logiciel de la veille, les gestes que les utilisateurs ne veulent pas perdre. Ce ne sont pas des mesures d’usage : ce sont les fonctions pour lesquelles ces outils sont choisis, telles qu’elles apparaissent dans [fonctionnalites.md](fonctionnalites.md) et [existant.md](existant.md). La liste du modeleur idéal est leur réunion, sans doublon.

Elle ne tranche pas le MVP. Plusieurs fonctions s’excluent si on les promet toutes dans un seul premier incrément de l’éditeur. Les formats, eux, sont déjà distincts : `.cadom` pour l’assemblage, `.cadompart` pour l’intention. Voir le [journal](../suivi/journal.md).

## Ce que les utilisateurs gardent

### Creo

- Une cote changée reconstruit la pièce et les pièces qui en dépendent.
- La conception descendante : un squelette d’assemblage pilote les pièces.
- Les mécanismes bougent avec les contraintes, pas seulement avec une matrice figée.

### Onshape

- Ouvrir le modèle dans un navigateur, sans installation.
- Plusieurs personnes sur le même document, avec un historique de versions et de branches.
- Ne plus perdre l’arbre de fonctions dans un fichier corrompu ou un « save as » mal rangé.

### Windchill

- Savoir quelle version de quelle pièce est la bonne.
- Retrouver où une pièce est utilisée avant de la modifier.

### CATIA

- Des surfaces de qualité, pas seulement des prismes extrudés.
- Des assemblages très grands qui restent manipulables.
- Des règles métier (formules, copies pilotées) qui empêchent une cote interdite.

### SOLIDWORKS

- Une esquisse qu’on comprend en quelques heures : glisser un sommet, poser une cote, voir le solveur fermer le profil.
- Des contraintes d’assemblage visuelles (coaxial, appui, distance).
- Les configurations : une même pièce, plusieurs jeux de cotes, sans recopier le fichier.

### 3DEXPERIENCE

- Le modèle, la nomenclature et les échanges au même endroit que l’outil qui édite.
- Reprendre le travail d’un collègue sans s’envoyer un zip.

### Inventor

- iLogic : des règles lisibles qui cochonnent ou débloquent une cote selon un usage.
- Le générateur de châssis et les bibliothèques de composants standards, pour ne pas redessiner un profilé ou une vis.

### AutoCAD

- La ligne de commande et les blocs : un geste court, répété des milliers de fois, sur un DWG que tout le monde ouvre.
- Les références externes : un plan composé de fichiers liés, pas d’un seul dessin géant.

### Fusion 360

- Une seule timeline, de l’esquisse jusqu’à l’usinage, sans changer de logiciel.
- Le mode Forme (surfaces lisses) à côté du solide paramétrique.
- Des paramètres nommés visibles, modifiables sans ouvrir chaque fonction.

### NX

- La synchronous technology : pousser une face sur un STEP importé qui n’a plus d’arbre.
- Le PMI dans le 3D, pour ne plus dépendre uniquement de la mise en plan.
- Les liens entre pièces (wave link) qui propagent une face ou une cote.

### Solid Edge

- Le même double geste que NX, dans un outil plus proche du quotidien mécanique : historique quand on construit, édition directe quand on reprend un fichier fournisseur.
- Passer d’un mode à l’autre sans recommencer la pièce.

### Teamcenter

- Le JT léger pour voir l’assemblage sans ouvrir le modeleur.
- Le processus de diffusion : une pièce n’est « bonne » qu’une fois relâchée.

### FreeCAD

- Pas de licence pour ouvrir, modifier et réexporter un STEP.
- Tout est accessible en Python, ateliers compris.

### SolveSpace

- Un solveur de contraintes rapide sur un modèle petit, sans usine à gaz.
- Le fichier s’ouvre tout de suite.

### OpenSCAD

- Le modèle est du texte : on le diff, on le versionne, on le régénère.
- Une variable en tête de fichier change toute la pièce (le Customizer).

### CadQuery

- Désigner une face en langage clair (« la face du haut », « les arêtes circulaires ») au lieu de cliquer un index fragile.
- Obtenir un STEP exact à partir d’un script Python lisible.

### Chili3D

- Un modeleur de solides dans la page, sans compte chez un éditeur.
- Le noyau exact (Open CASCADE) tourne chez l’utilisateur, pas seulement un maillage.

### Viewer STEP w3dts

- Ouvrir un STEP, tourner autour, sélectionner une face, lire une PMI, mesurer, sans installer de CAO.
- Le rendu WebGPU et les unités ramenées au mètre, Y-up.

### Formats OpenCAD

Ce ne sont pas des éditeurs. D’après la doctrine sur [develop](https://github.com/naanouff/OpenCAD/tree/develop) :

- `.cadom` décrit l’assemblage à part des pièces : positions, surcharges, sans réécrire la source.
- `.cadompart` garde l’intention paramétrique, recalculée par le noyau.
- `.cadomesh` permet de voir sans noyau. `.cadombrep` fige le solide exact.
- Le STEP n’est pas le document de travail.

## Liste réunie

Chaque ligne est une fonction du modeleur idéal. La colonne « vient de » cite l’outil où les utilisateurs la réclament. La colonne « exige » dit si elle tient dans un document d’assemblage ou s’il faut un noyau de pièce.

| Fonction | Vient de | Exige |
|----------|----------|-------|
| Esquisse qu’on ferme en posant des cotes et des contraintes | SOLIDWORKS, FreeCAD, SolveSpace | Noyau + solveur 2D |
| Une cote modifiée reconstruit tout ce qui en dépend | Creo, SOLIDWORKS, Fusion, Onshape | Historique paramétrique |
| Paramètres nommés, visibles, partagés entre pièces | Fusion, Creo, Inventor | Historique paramétrique |
| Configurations ou familles : plusieurs jeux de cotes, un seul modèle | SOLIDWORKS, Inventor | Historique paramétrique |
| Règles métier qui bloquent une combinaison de cotes | CATIA, Inventor (iLogic) | Historique paramétrique |
| Squelette d’assemblage qui pilote les pièces | Creo | Historique + assemblage |
| Contraintes d’assemblage visuelles (coaxial, appui, distance) | SOLIDWORKS, Onshape | Solveur d’assemblage |
| Mécanismes qui bougent selon ces contraintes | Creo | Solveur d’assemblage |
| Liens vivants entre pièces (une face source, des copies) | NX | Historique paramétrique |
| Édition directe d’un solide importé sans arbre | NX, Solid Edge | Noyau, mode synchrone |
| Surfaces complexes, pas seulement des extrusions | CATIA, NX | Noyau de surfaces |
| Formes lisses à côté du solide coté | Fusion | Noyau ou représentation dédiée |
| PMI dans le 3D, pas seulement sur le plan | NX, viewer STEP w3dts | Lecture dès maintenant ; écriture avec un noyau |
| Mise en plan liée au 3D | SOLIDWORKS, Inventor, Fusion | Historique + habillage |
| Bibliothèque de composants standards | Inventor | Données + placement |
| Châssis et profilés générés | Inventor | Historique paramétrique |
| De l’esquisse à l’usinage dans le même flux | Fusion | Fabrication, hors CAO pure |
| Ouvrir un STEP, sélectionner, mesurer, sans CAO installée | Viewer STEP w3dts | Viewer |
| Assemblage décrit à part de la pièce | `.cadom`, AutoCAD (xrefs) | Format d’assemblage |
| Surcharge (visibilité, matière d’affichage) sans réécrire la source | `.cadom` | Format d’assemblage |
| Vue légère d’un grand assemblage | Teamcenter (JT), w3dts | Viewer |
| Modèle dans le navigateur, sans installation | Onshape, Chili3D, AutoCAD Web | Shell web |
| Plusieurs personnes et des branches sur le même modèle | Onshape, 3DEXPERIENCE | Collaboration |
| Savoir quelle version est la bonne, et où la pièce est utilisée | Windchill, Teamcenter | PLM |
| Fichier texte diffable, une variable régénère la pièce | OpenSCAD, CadQuery | Script |
| Désigner une face par une requête plutôt que par un clic fragile | CadQuery | Script + noyau |
| Noyau exact ouvert, chez l’utilisateur | FreeCAD, Chili3D, CadQuery | Noyau B-Rep |
| Python ou API pour automatiser sans refaire l’interface | FreeCAD, SOLIDWORKS, Creo | API |
| Geste court et répétable (ligne de commande, raccourci) | AutoCAD | Interface |
| Outil petit qui s’ouvre tout de suite sur un modèle petit | SolveSpace | Périmètre tenu |

## Ce que cette liste ne peut pas être en une fois

Trois familles se contredisent si on les met dans le même premier produit :

- **Reconstruire une cote** (Creo, SOLIDWORKS, Onshape, Fusion) demande un arbre et un noyau. OpenCAD le prévoit dans `.cadompart` et le noyau, pas dans `.cadom`.
- **Pousser une face sur un solide importé sans arbre** (NX, Solid Edge) demande un noyau synchrone. Ce n’est pas le Required actuel (esquisse, extrusion, révolution, trou, booléen).
- **Placer des occurrences et les afficher sans recalcul** tient dans `.cadom` et `.cadomesh`. C’est une exploitation du format, pas un éditeur nommé CADOM.

L’éditeur idéal, pour le premier incrément, exploite le graphe et le maillage, puis l’intention quand le noyau est là. Cet ordre n’est pas décidé ici.
