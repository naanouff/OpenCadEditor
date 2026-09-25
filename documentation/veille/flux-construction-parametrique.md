# Flux de construction paramétrique

Description du geste, à partir de l’esquisse. Le grand projet est de remodéliser la boîte et le bracelet d’une Rolex Milgauss, d’après les photos de référence : boîte ronde, lunette lisse, verre à chant vert, couronne cannelée à 3 h, cornes courtes, bracelet Oyster à trois rangs. Les cotes ci-dessous sont des ordres de grandeur pour suivre le flux. Ce ne sont pas des cotes d’usine. Le cadran, les aiguilles et les marquages restent hors du modèle. Aucun choix d’outil, de format ou d’architecture.

## 1. L’esquisse

Une esquisse est un dessin plat, posé sur un plan. Le plan peut être un plan de départ (face, dessus, droite) ou, plus tard, une face plane d’un solide déjà construit.

On y trace des courbes : segment, arc, cercle, rectangle. Ces courbes ne sont pas un volume. Elles décrivent un profil, et parfois un chemin.

Tant que rien ne les retient, les points bougent. Chaque point libre a des degrés de liberté. Une contrainte en retire :

- coïncidence : deux points, ou un point et une courbe, se touchent ;
- horizontal, vertical : un segment suit l’axe du plan ;
- tangence : un arc quitte une droite sans casser l’angle ;
- égalité : deux longueurs ou deux rayons sont les mêmes ;
- symétrie : deux éléments se répondent par rapport à un axe.

Une cote fixe une longueur, une distance ou un angle. Quand il ne reste plus aucun mouvement possible, l’esquisse est entièrement contrainte. C’est l’état utile : changer la cote change le profil, et rien d’autre ne flotte.

Un profil fermé (le contour se rejoint) peut devenir de la matière. Un profil ouvert sert de chemin ou de trajectoire, pas d’un solide plein.

## 2. La première fonction

L’esquisse s’arrête au profil. Une fonction la consomme et crée le solide.

- Extrusion : le profil fermé est poussé d’une distance, perpendiculairement au plan. La cote d’esquisse donne la section ; la distance d’extrusion donne l’épaisseur.
- Révolution : le profil fermé tourne autour d’un axe tracé dans l’esquisse. L’angle de rotation remplace la distance.
- Balayage : un profil suit une trajectoire. La trajectoire est souvent une seconde esquisse.
- Lissage : plusieurs profils, sur des plans différents, sont reliés.

Après cette fonction, il existe un solide : des faces, des arêtes, un volume. L’esquisse reste dans l’historique. Elle n’est pas jetée.

## 3. L’historique

Chaque fonction est une ligne, dans l’ordre de construction. La suivante voit le solide laissé par la précédente.

Modifier une cote ancienne reconstruit tout ce qui vient après. Si le diamètre extérieur de la carrure passe de 40 mm à 42 mm, les logements concentriques et les cornes suivent. C’est le sens de « paramétrique » : les cotes pilotent la reconstruction, l’utilisateur ne redessine pas le volume à la main.

L’ordre compte. Un congé appliqué avant un trou ne voit pas le trou. Le même congé appliqué après l’arrondit.

## 4. Les esquisses suivantes

La deuxième esquisse se pose presque toujours sur une face du solide déjà là. On dessine, on contraint, on cote, comme la première fois. La fonction qui suit enlève ou ajoute de la matière :

- enlèvement : le profil est extrudé ou tourné en creux (poche, perçage dessiné) ;
- ajout : le profil ajoute un bossage.

Un trou rond simple peut sauter l’esquisse visible : on désigne une face, un point, un diamètre et une profondeur. Derrière, c’est encore un profil circulaire et un enlèvement. Le geste est plus court, le résultat est le même type de fonction.

## 5. Les fonctions sans nouvelle esquisse

Certaines lignes de l’historique ne demandent pas un dessin. Elles prennent des arêtes ou des faces du solide courant :

- congé : arrondit une arête, avec un rayon ;
- chanfrein : coupe cette arête ;
- coque : creuse le solide en laissant une peau, après avoir retiré une face ;
- dépouille : incline une face pour le démoulage.

Elles dépendent du solide tel qu’il est à cette ligne. Si une arête disparaît parce qu’une cote plus haut a changé, le congé qui la citait échoue. C’est l’échec typique d’une reconstruction.

## 6. Les paramètres nommés

Une cote peut porter un nom : `diametre_boite = 40 mm`, `epaisseur_paroi = 2,5 mm`. Le diamètre intérieur de l’anneau vaut `diametre_boite - 2 * epaisseur_paroi`. Changer `diametre_boite` reconstruit l’anneau, et toutes les esquisses qui s’alignent sur son centre.

Le paramètre ne remplace pas l’esquisse. Il relie des cotes qui, sinon, seraient des nombres isolés.

## 7. Où s’arrête la pièce

La pièce est terminée quand l’historique produit le solide voulu. L’assemblage commence après : plusieurs pièces, chacune avec son propre historique, placées les unes par rapport aux autres. Ce placement n’est pas une esquisse de pièce.

## Grand projet — boîte et bracelet

Chaque pièce a son historique. L’assemblage les place ensuite. L’ordre de construction suit ce qu’on voit sur les photos.

| Pièce | Ce que l’esquisse en fait |
|-------|---------------------------|
| Carrure | L’anneau, les portées, les cornes, le trou de barrette, le tube de couronne |
| Lunette | Un anneau posé sur la portée du dessus, chanfrein extérieur lisse |
| Verre | Un disque dans l’ouverture de la lunette ; le chant vert est une face de ce disque, pas une pièce de plus |
| Fond | Un disque sur la portée du dessous, avec une cannelure sur la tranche |
| Couronne | Un profil tourné : cylindre, puis une couronne de cannelures |
| Maillon de bout | La pièce qui épouse la corne et amorce le bracelet |
| Maillon extérieur | Le rang gauche et le rang droit, satinés |
| Maillon central | Le rang du milieu, poli, un peu plus bas que les rangs extérieurs |

La carrure se construit en premier. Le bracelet s’y accroche par l’entrecorne : si cette cote change, le maillon de bout change avec elle.

## Carrure

Paramètres de départ :

| Nom | Rôle | Exemple |
|-----|------|---------|
| `diametre_boite` | Diamètre extérieur de l’anneau | 40 mm |
| `epaisseur_paroi` | Matière entre l’extérieur et le passage | 2,5 mm |
| `hauteur_carrure` | Épaisseur de l’anneau | 8 mm |
| `diametre_lunette` | Portée du dessus, pour la lunette | 36 mm |
| `profondeur_lunette` | Profondeur de cette portée | 1,2 mm |
| `diametre_fond` | Portée du dessous, pour le fond | 34 mm |
| `profondeur_fond` | Profondeur de cette portée | 1 mm |
| `entrecorne` | Écart intérieur entre les deux cornes d’une paire | 20 mm |
| `longueur_corne` | Dépassement de la corne hors de l’anneau | 5 mm |
| `largeur_corne` | Largeur d’une corne | 4 mm |

Le diamètre du passage intérieur n’est pas une troisième cote libre. Il vaut `diametre_boite - 2 * epaisseur_paroi`.

### Anneau

1. Plan de dessus. Deux cercles de même centre. Diamètre extérieur `diametre_boite`. Diamètre intérieur `diametre_boite - 2 * epaisseur_paroi`. Contrainte de concentricité. La matière du profil est l’anneau entre les deux cercles, pas le disque plein.
2. Extrusion de `hauteur_carrure`. Le solide est un tube. L’esquisse reste dans l’historique.

### Portées

3. Esquisse sur la face du dessus. Un cercle, concentrique à l’anneau, diamètre `diametre_lunette`. Il est plus petit que l’extérieur et plus grand que le passage, sinon la portée ne mord pas la paroi.
4. Enlèvement de `profondeur_lunette`. La face du dessus a un épaulement.
5. Esquisse sur la face du dessous. Cercle concentrique, diamètre `diametre_fond`. Enlèvement de `profondeur_fond`.

Entre les deux épaulements, il reste une collerette. C’est elle qui arrête le mouvement. Sa hauteur vaut `hauteur_carrure - profondeur_lunette - profondeur_fond`. Si cette valeur devient nulle ou négative, la reconstruction n’a plus de sens : les deux poches se traversent.

### Cornes

Les cornes sont à 12 h et à 6 h. Chaque paire laisse entre ses faces intérieures l’espace du bracelet, l’entrecorne.

6. Esquisse sur le plan de dessus. Quatre profils fermés, hors du cercle extérieur. Ceux de 12 h sont symétriques par rapport à l’axe vertical. La paire de 6 h reprend la paire de 12 h par symétrie par rapport à l’axe horizontal. L’écart entre les deux profils d’une paire est `entrecorne`. Chaque profil dépasse le cercle de `longueur_corne` et a pour largeur `largeur_corne`.
7. Extrusion d’ajout, même distance que `hauteur_carrure`, à partir du même plan. Les cornes affleurent l’anneau.

### Trou de barrette

L’axe de la barrette est parallèle à 3 h–9 h. Il traverse les deux cornes d’une paire. Le plan d’esquisse est celui qui regarde cet axe de face : le plan qui contient 12 h–6 h et la verticale.

8. Sur ce plan, un cercle dont le centre est dans la corne, à une distance fixée du bord extérieur. Diamètre de la barrette, par exemple 1,5 mm. Enlèvement qui traverse `largeur_corne`. La symétrie déjà posée sur les cornes reporte le trou sur l’autre corne, puis sur la paire de 6 h.

### Tube de couronne

9. Plan tangent à l’anneau du côté 3 h, ou plan vertical passant par 3 h–9 h. Cercle concentrique au milieu de la hauteur, diamètre extérieur du tube. Extrusion d’ajout vers l’extérieur, courte.
10. Même plan, cercle plus petit, concentrique. Enlèvement qui traverse le tube et débouche dans le passage intérieur. C’est le trou de tige.

### Ce que change une cote

`diametre_boite` passe de 40 mm à 42 mm. L’anneau grossit. Le passage intérieur suit, parce qu’il est calculé avec l’épaisseur de paroi. Les cercles de lunette et de fond, s’ils sont concentriques et cotés par leur propre diamètre, ne changent pas de taille : la portée devient plus étroite. Les cornes, si leur dépassement est mesuré depuis le cercle extérieur, s’écartent avec lui. L’entrecorne ne bouge pas.

`entrecorne` passe de 20 mm à 22 mm. Seul l’écart entre les cornes change. L’anneau ne bouge pas. Le maillon de bout, qui reprend cette cote, s’élargit avec elle.

## Lunette, verre, fond, couronne

Ce sont d’autres pièces, placées sur les portées de la carrure.

11. Lunette. Plan de dessus. Deux cercles concentriques : l’extérieur affleure `diametre_boite`, l’intérieur laisse voir le verre. Extrusion d’une faible hauteur. Une esquisse de profil, sur le plan vertical 3 h–9 h, donne le chanfrein lisse visible sur la tranche. Révolution ou enlèvement de ce profil.
12. Verre. Disque du diamètre intérieur de la lunette, épaisseur faible, posé dans l’ouverture. Le chant vert des photos est la tranche de ce disque.
13. Fond. Disque sur la portée du dessous. Esquisse de profil pour la cannelure de la tranche, répétée autour de l’axe de la boîte.
14. Couronne. Esquisse de demi-profil sur le plan 3 h–9 h : un rectangle pour le tube, un rectangle plus large pour la tête. Révolution autour de l’axe 3 h. Les cannelures sont un petit profil enlevé, répété autour de cette tête.

## Bracelet

Le bracelet des photos a trois rangs. Les rangs extérieurs sont plus hauts et satinés. Le rang central est plus étroit, poli, légèrement en retrait. Le premier maillon épouse la corne.

15. Maillon de bout. Esquisse sur le plan de dessus : un fer à cheval qui entre dans l’entrecorne et couvre `largeur_corne` de chaque côté. La largeur utile vaut `entrecorne + 2 * largeur_corne`. Extrusion de l’épaisseur du maillon. Un cercle, même axe que la barrette, enlève le passage de l’axe.
16. Maillon extérieur. Rectangle coté, extrudé, aux deux bouts un demi-cercle ou un trou d’axe. Deux occurrences, à gauche et à droite.
17. Maillon central. Même longueur d’axe, largeur plus faible, épaisseur plus faible. Il se loge entre les deux maillons extérieurs.
18. L’axe est un cylindre : esquisse cercle, extrusion de la largeur totale du bracelet. Il traverse le maillon de bout, puis chaque triplet de maillons.

Répéter le triplet allonge le bracelet. Changer `entrecorne` ne change que le maillon de bout et la carrure. Changer la largeur d’un maillon extérieur décale le rang central.

Le fermoir n’est pas dans ce premier fil. La boîte et la chaîne de maillons suffisent à lier les esquisses entre elles.

Aucune de ces étapes ne choisit un logiciel ni un format.
