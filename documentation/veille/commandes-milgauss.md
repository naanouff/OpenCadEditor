# Commandes du fil Milgauss

Le geste est dans [flux-construction-parametrique.md](flux-construction-parametrique.md). Cette note le traduit en commandes rejouables, puis en fonctions d’API. Les cotes sont des ordres de grandeur. Le cadran, les aiguilles, les marquages et le fermoir restent hors du fil.

L’architecture qui porte ces fonctions est dans [api-architecture.md](api-architecture.md). Le sprint qui code le socle est [sprint 03](../sprints/sprint-03-api-carrure.md).

## Vocabulaire de la carrure

- `piece <nom>` — ouvre l’historique d’une pièce.
- `param <nom> <expression>` — cote nommée, en millimètres. Une expression peut citer d’autres paramètres (`diametre_boite - 2 * epaisseur_paroi`).
- `esquisse <support>` — ouvre une esquisse. Supports : `plan.dessus`, `face.dessus`, `face.dessous`, `plan.12h` (vertical 12 h–6 h), `plan.3h` (vertical 3 h–9 h).
- `cercle` — cercle dont le centre et le diamètre sont fixés ensuite par des contraintes et des cotes.
- `concentrique <cible>` — même centre qu’un cercle déjà nommé, ou que l’axe de l’anneau.
- `rectangle` — profil fermé des cornes. Placé par des cotes, pas à main levée.
- `symetrie <axe>` — reporte l’esquisse ou la dernière fonction. Axes : `vertical` (12 h reprend son miroir), `horizontal` (6 h reprend 12 h), puis le trou de barrette suit les cornes.
- `cote <cible> <expression>` — fixe un diamètre, une longueur, un écart ou une profondeur.
- `extrude <expression>` — ajoute la matière du profil fermé, perpendiculairement au plan d’esquisse.
- `enleve <expression>` — creuse. `enleve travers <expression>` traverse (barrette, trou de tige).

`extrude` et `enleve` refusent un profil ouvert ou une esquisse encore mobile. L’anneau est la matière entre les deux cercles, pas le disque intérieur.

Règle de reconstruction, pas une commande : `hauteur_carrure - profondeur_lunette - profondeur_fond` doit rester strictement positif. Sinon les deux portées se traversent et l’historique s’arrête.

## Script de la carrure

```
piece carrure
param diametre_boite 40
param epaisseur_paroi 2.5
param hauteur_carrure 8
param diametre_lunette 36
param profondeur_lunette 1.2
param diametre_fond 34
param profondeur_fond 1
param entrecorne 20
param longueur_corne 5
param largeur_corne 4
param diametre_barrette 1.5
param diametre_tube 4
param longueur_tube 2
param diametre_tige 1.2

esquisse plan.dessus
cercle
cote diametre diametre_boite
cercle
concentrique cercle.exterieur
cote diametre diametre_boite - 2 * epaisseur_paroi
extrude hauteur_carrure

esquisse face.dessus
cercle
concentrique anneau
cote diametre diametre_lunette
enleve profondeur_lunette

esquisse face.dessous
cercle
concentrique anneau
cote diametre diametre_fond
enleve profondeur_fond

esquisse plan.dessus
rectangle
cote ecart entrecorne
cote debord longueur_corne
cote largeur largeur_corne
symetrie vertical
symetrie horizontal
extrude hauteur_carrure

esquisse plan.12h
cercle
cote diametre diametre_barrette
enleve travers largeur_corne
symetrie horizontal

esquisse plan.3h
cercle
cote diametre diametre_tube
extrude longueur_tube
cercle
concentrique tube
cote diametre diametre_tige
enleve travers longueur_tube
```

`diametre_boite` agrandit l’anneau et le passage, et écarte les cornes si leur débord est mesuré depuis le cercle extérieur. `entrecorne` n’écarte que les cornes.

## Suite du fil

La lunette, le verre, le fond, la couronne et les maillons réutilisent les commandes de la carrure. Trois commandes s’ajoutent plus tard : `arc`, `revolution <expression> <axe>`, `repete <nombre> <axe>`. L’assemblage n’est pas dans cette liste.

## Fonctions appelées par le script

Le terminal envoie ces appels. Il n’est pas l’API.

- `creerPiece(nom)` — `piece`.
- `definirParametre(nom, expression)` — `param`.
- `evaluer(expression)` — nombre en millimètres, ou erreur si un nom est inconnu. Pas une commande.
- `ouvrirEsquisse(support)` — `esquisse`. Les plans d’origine existent tout de suite. `face.dessus` et `face.dessous` n’existent qu’après un solide.
- `ajouterCercle()` — `cercle`.
- `ajouterRectangle()` — `rectangle`.
- `contraindreConcentrique(cible)` — `concentrique`.
- `contraindreSymetrie(axe)` — `symetrie` pendant une esquisse.
- `coter(cible, expression)` — `cote`.
- `nommer(entite, nom)` — rend citables `cercle.exterieur`, `anneau`, `tube`.
- `etatEsquisse()` — profil fermé et entièrement contraint. Pas une commande.
- `extruder(expression)` — `extrude`. Garde l’esquisse dans l’historique.
- `enlever(expression, traverse)` — `enleve` et `enleve travers`.
- `symetriserFonction(axe)` — `symetrie` après une fonction.
- `reconstruire()` — rejoue l’historique. Pas une commande.
- `controlerCollerette()` — refuse la reconstruction si la collerette n’est pas strictement positive. Pas une commande.
- `solideCourant()` — faces adressables pour l’esquisse suivante. Pas une commande.

`ajouterArc`, `revolutionner` et `repeter` attendent la suite du fil. Elles s’enregistreront sans modifier la boucle de reconstruction.
