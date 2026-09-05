# Health Compass

CAHIER DES CHARGES

Application de nutrition & nutrithérapie

Développement sur la plateforme Lovable — inspirée de l'application Yazio

1. Présentation du projet

1.1 Contexte

Ce document constitue le cahier des charges fonctionnel d'une application mobile/web de nutrition et de nutrithérapie, destinée à être développée sur la plateforme Lovable. L'application s'inspire du fonctionnement et de l'ergonomie de Yazio (suivi nutritionnel grand public), tout en y ajoutant un volet médical/thérapeutique orienté vers les patients atteints de pathologies chroniques nécessitant une adaptation alimentaire stricte.

1.2 Objectif général

Proposer un outil unique combinant :

●	un module de calcul et de suivi de l'Indice de Masse Corporelle (IMC) ;

●	un module de recommandation de régimes alimentaires généraux (méditerranéen, kéto, végétarien, jeûne intermittent...) ;

●	un module de fiches pratiques de régimes thérapeutiques par pathologie (hypertension, goutte, insuffisance rénale, calculs rénaux, SOPK, cancer, maladies inflammatoires, microbiote) ;

●	un module de fiches de teneurs alimentaires en nutriments clés (phosphore, protéines, glucides, lipides, calcium, potassium, sodium, citrate).

1.3 Public cible

●	Grand public souhaitant suivre son poids et améliorer son alimentation.

●	Patients suivis pour une pathologie chronique nécessitant un régime adapté (rénal, cardiovasculaire, métabolique, oncologique, inflammatoire).

●	Professionnels de santé (médecins, diététiciens, nutritionnistes) souhaitant orienter leurs patients vers des fiches pratiques fiables.

2. Analyse de référence : Yazio

L'application Yazio sert de modèle d'ergonomie et de structure fonctionnelle. Les éléments suivants sont à reprendre comme socle, puis enrichis du volet thérapeutique :

Fonctionnalité Yazio	Reprise dans le projet

Calcul IMC / besoins caloriques à l'inscription	Oui — module 1

Journal alimentaire quotidien	Oui — module 5

Suivi du poids avec courbe d'évolution	Oui — module 5

Base de données d'aliments avec valeurs nutritionnelles	Oui, enrichie des teneurs spécifiques (module 4)

Suivi de l'hydratation	Oui — module 5

Plans alimentaires / recettes suggérées	Oui — adapté aux régimes et pathologies (modules 2 et 3)

Notifications et rappels	Oui — module 5

Profil personnalisé (objectif, allergies, préférences)	Oui, complété par un profil médical (pathologies)

3. Architecture fonctionnelle — Vue d'ensemble des modules

Module	Contenu

Module 1	Calculateur IMC et profil utilisateur

Module 2	Bibliothèque de régimes alimentaires généraux

Module 3	Fiches pratiques de régimes thérapeutiques par pathologie

Module 4	Fiches de teneurs alimentaires (nutriments)

Module 5	Journal alimentaire et suivi (poids, IMC, hydratation)

Module 6	Compte utilisateur et profil médical

4. Module 1 — Calculateur d'IMC et profil utilisateur

4.1 Données saisies par l'utilisateur

●	Poids (kg), taille (cm), âge, sexe.

●	Niveau d'activité physique (sédentaire, léger, modéré, intense).

●	Objectif (perte de poids, maintien, prise de poids).

●	Pathologies déclarées (optionnel, pour orienter vers les fiches du module 3).

4.2 Calculs et classification

Calcul de l'IMC = poids (kg) / taille² (m²), avec classification selon les seuils de l'OMS :

IMC	Classification

< 18,5	Maigreur

18,5 – 24,9	Corpulence normale

25 – 29,9	Surpoids

30 – 34,9	Obésité modérée (classe I)

35 – 39,9	Obésité sévère (classe II)

≥ 40	Obésité massive (classe III)

Calcul des besoins caloriques journaliers (métabolisme de base via formule de Mifflin-St Jeor, ajusté par le niveau d'activité) puis répartition en macronutriments selon le régime choisi.

4.3 Résultat affiché à l'utilisateur

●	Valeur de l'IMC et catégorie correspondante, avec repère visuel (jauge colorée).

●	Besoin calorique journalier estimé.

●	Suggestion automatique d'un ou plusieurs régimes adaptés (module 2) et, si pathologie déclarée, redirection vers la fiche correspondante (module 3).

5. Module 2 — Bibliothèque de régimes alimentaires généraux

Chaque régime dispose d'une fiche structurée de façon identique : principe général, aliments à privilégier, aliments à limiter, exemple de journée type, bénéfices attendus, précautions/contre-indications.

5.1 Régime méditerranéen

Fiche par défaut proposée après le calcul de l'IMC. Basé sur les fruits et légumes, les céréales complètes, l'huile d'olive, le poisson, les légumineuses, et une consommation limitée de viande rouge.

5.2 Régime cétogène (kéto)

Très faible en glucides, riche en lipides, apport modéré en protéines. Fiche incluant les précautions d'usage (suivi médical recommandé, contre-indications rénales et hépatiques).

5.3 Régime végétarien / végan

Fiche déclinée en deux variantes (végétarien avec produits laitiers/œufs, végan strict), avec attention particulière aux apports en fer, B12, calcium et protéines végétales.

5.4 Jeûne intermittent

Présentation des principaux protocoles (16/8, 5:2, jeûne alterné) avec repères pratiques et contre-indications (grossesse, diabète, troubles du comportement alimentaire).

5.5 Extensions possibles

●	Régime sans gluten, régime pauvre en FODMAP, régime hyperprotéiné, autres régimes à ajouter selon les besoins.

6. Module 3 — Fiches pratiques de régimes thérapeutiques par pathologie

Ce module constitue le cœur médical de l'application. Chaque fiche pathologie suit un gabarit commun : objectif nutritionnel, aliments recommandés, aliments à limiter, aliments à éviter, exemple de journée type. Le contenu médical détaillé de chaque fiche devra être rédigé ou validé par un professionnel de santé (médecin, diététicien-nutritionniste) ; le présent document ne fournit qu'un cadre indicatif de structuration.

6.1 Régime DASH — Hypertension artérielle

Objectif nutritionnel : Réduire l'apport en sodium et favoriser les apports en potassium, calcium et magnésium pour abaisser la pression artérielle.

Aliments recommandés : fruits et légumes frais, céréales complètes, produits laitiers pauvres en matières grasses, volaille, poisson, fruits à coque, légumineuses.

Aliments à limiter : sel de cuisson, charcuteries, fromages salés, plats préparés industriels.

Aliments à éviter : aliments très riches en sodium (conserves salées, bouillons cubes, sauces industrielles), réglisse.

Exemple de journée type : petit-déjeuner sans sel ajouté, déjeuner à base de légumes et protéines maigres, dîner léger avec féculents complets.

6.2 Régime pour la goutte (hyperuricémie)

Objectif nutritionnel : Réduire les apports en purines afin de diminuer la production d'acide urique et prévenir les crises.

Aliments recommandés : légumes, fruits, produits laitiers pauvres en graisses, céréales complètes, eau en quantité suffisante.

Aliments à limiter : viandes rouges, fruits de mer, alcool (en particulier la bière), boissons sucrées au fructose.

Aliments à éviter : abats (foie, rognons), extraits de viande, gibier, anchois, sardines en grande quantité.

Exemple de journée type : hydratation abondante répartie sur la journée, repas pauvres en protéines animales, privilégier les protéines végétales.

6.3 Insuffisance rénale chronique (IRC)

Objectif nutritionnel : Adapter les apports en protéines, phosphore, potassium et sodium selon le stade de la maladie rénale, en préservant un état nutritionnel satisfaisant.

Aliments recommandés : féculents peu riches en phosphore, légumes et fruits selon teneur en potassium (à personnaliser selon le stade), huiles végétales.

Aliments à limiter : produits laitiers (phosphore), fruits secs et oléagineux (potassium), sel de cuisson.

Aliments à éviter : sodas au cola et produits ultra-transformés riches en phosphates ajoutés, charcuteries, sel.

Exemple de journée type : menu construit avec l'aide d'un diététicien selon le stade de l'IRC ; adaptation continue selon le bilan biologique.

6.4 Calculs rénaux (lithiase urinaire)

Objectif nutritionnel : Prévenir la récidive de calculs selon leur nature (uriques, oxalocalciques, phospho-calciques) en adaptant hydratation et apports spécifiques.

Aliments recommandés : eau en abondance (1,5 à 2,5 L/jour), agrumes riches en citrate, légumes variés, apport calcique alimentaire normal (non restreint).

Aliments à limiter : oxalates (épinards, blettes, cacao, thé fort) pour la lithiase oxalique ; purines pour la lithiase urique ; sel et protéines animales en excès.

Aliments à éviter : excès de vitamine C en compléments, excès de sel ajouté, sodas.

Exemple de journée type : hydratation répartie toute la journée, jus de citron dilué, repas normosodés et normoprotéinés.

6.5 Syndrome des ovaires polykystiques (SOPK)

Objectif nutritionnel : Améliorer la sensibilité à l'insuline et limiter l'inflammation par une alimentation à index glycémique bas.

Aliments recommandés : céréales complètes, légumineuses, légumes riches en fibres, poissons gras, huile d'olive.

Aliments à limiter : sucres rapides, produits raffinés, féculents à index glycémique élevé.

Aliments à éviter : boissons sucrées, pâtisseries industrielles, fritures.

Exemple de journée type : petit-déjeuner riche en fibres et protéines, repas à index glycémique modéré répartis régulièrement dans la journée.

6.6 Nutrition du patient cancéreux

Objectif nutritionnel : Prévenir la dénutrition, maintenir la masse musculaire et adapter l'alimentation aux effets secondaires des traitements (nausées, troubles du goût, perte d'appétit).

Aliments recommandés : aliments à forte densité énergétique et protéique, repas fractionnés, textures adaptées si besoin.

Aliments à limiter : aliments difficiles à digérer en période de traitement selon tolérance individuelle.

Aliments à éviter : aliments crus à risque infectieux en période d'immunodépression, alcool.

Exemple de journée type : fractionnement en 5 à 6 prises, enrichissement des plats (protéines, matières grasses de qualité), à individualiser avec l'équipe soignante.

6.7 Maladies inflammatoires (MICI, pathologies rhumatismales)

Objectif nutritionnel : Réduire l'inflammation chronique et soulager les symptômes digestifs ou articulaires.

Aliments recommandés : oméga-3 (poissons gras), fruits et légumes riches en antioxydants, épices anti-inflammatoires (curcuma, gingembre).

Aliments à limiter : graisses saturées, produits ultra-transformés, en poussée : fibres irritantes selon tolérance.

Aliments à éviter : alcool, tabac (facteur aggravant), sucres raffinés en excès.

Exemple de journée type : adaptation selon phase (poussée ou rémission pour les MICI), fractionnement des repas, hydratation suffisante.

6.8 Microbiote intestinal — comment le nourrir

Objectif nutritionnel : Favoriser la diversité et l'équilibre du microbiote intestinal par les fibres, prébiotiques et probiotiques.

Aliments recommandés : fibres variées (légumes, fruits, légumineuses, céréales complètes), aliments fermentés (yaourt, kéfir, choucroute), prébiotiques (ail, oignon, poireau, banane peu mûre).

Aliments à limiter : édulcorants artificiels, aliments ultra-transformés, excès de graisses saturées.

Aliments à éviter : antibiotiques non justifiés (facteur de déséquilibre), alcool en excès.

Exemple de journée type : petit-déjeuner avec fruits et céréales complètes, repas riches en légumes variés et légumineuses, un aliment fermenté par jour.

7. Module 4 — Fiches de teneurs alimentaires (nutriments)

Ce module propose une base de données consultable d'aliments avec leur teneur pour chacun des nutriments suivants : phosphore, protéines, glucides, lipides (gras), calcium, potassium, sodium et citrate. Il permet à l'utilisateur de rechercher un aliment et de consulter ses teneurs, ou de rechercher, pour un nutriment donné, la liste des aliments classés du plus faible au plus riche.

7.1 Fonctionnalités attendues

●	Barre de recherche par nom d'aliment.

●	Filtre par nutriment (phosphore, protéines, glucides, lipides, calcium, potassium, sodium, citrate).

●	Classement des aliments par teneur croissante ou décroissante pour un nutriment choisi.

●	Code couleur visuel (par exemple vert/orange/rouge) selon le niveau de teneur (faible / modéré / élevé), avec seuils à définir avec le professionnel de santé référent.

●	Fiche détaillée par aliment affichant l'ensemble des teneurs pour 100 g.

7.2 Exemple de structure de fiche aliment

Nutriment	Valeur (pour 100 g)	Niveau

Phosphore	à renseigner	faible / modéré / élevé

Protéines	à renseigner	faible / modéré / élevé

Glucides	à renseigner	faible / modéré / élevé

Lipides (gras)	à renseigner	faible / modéré / élevé

Calcium	à renseigner	faible / modéré / élevé

Potassium	à renseigner	faible / modéré / élevé

Sodium	à renseigner	faible / modéré / élevé

Citrate	à renseigner	faible / modéré / élevé

Les valeurs nutritionnelles devront être issues d'une source de référence fiable (par exemple la table de composition nutritionnelle CIQUAL de l'ANSES) et fournies par le client ou son partenaire scientifique.

8. Module 5 — Journal alimentaire et suivi

●	Journal alimentaire quotidien : ajout des repas et calcul automatique des apports en calories et nutriments clés.

●	Courbe d'évolution du poids et de l'IMC dans le temps.

●	Suivi de l'hydratation journalière.

●	Rappels et notifications (repas, hydratation, prise de mesures).

●	Tableau de bord synthétique (résumé quotidien/hebdomadaire).

9. Module 6 — Compte utilisateur

●	Inscription et connexion (email/mot de passe, éventuellement connexion via Google/Apple).

●	Profil personnel : données anthropométriques, objectifs, pathologies déclarées, allergies/intolérances.

●	Historique des mesures et des journaux alimentaires.

●	Paramètres de confidentialité des données de santé.

10. Spécifications techniques indicatives (développement sur Lovable)

10.1 Architecture technique

●	Frontend généré via Lovable (React), design responsive mobile-first.

●	Backend / base de données : Supabase (authentification, base de données PostgreSQL, stockage).

●	Base de données aliments/nutriments structurée en table dédiée, interrogeable par recherche et filtres.

10.2 Principales entités de la base de données

Entité	Description

users	Comptes utilisateurs, données de profil, pathologies déclarées

measurements	Historique poids/IMC/mesures

diets	Fiches régimes généraux (méditerranéen, kéto, végétarien, jeûne intermittent...)

disease_sheets	Fiches pathologies (DASH, goutte, IRC, calculs rénaux, SOPK, cancer, MICI, microbiote)

food_items	Aliments et teneurs en nutriments (phosphore, protéines, glucides, lipides, calcium, potassium, sodium, citrate)

diary_entries	Journal alimentaire quotidien de l'utilisateur

10.3 Navigation proposée (arborescence)

●	Accueil / Tableau de bord

●	Mon profil (IMC, objectifs, pathologies)

●	Régimes (bibliothèque module 2)

●	Fiches maladies (module 3)

●	Base aliments / Teneurs (module 4)

●	Journal alimentaire (module 5)

●	Paramètres du compte

11. Exigences non fonctionnelles

●	Ergonomie simple et épurée, inspirée de Yazio (icônes, couleurs associées à la santé, jauges visuelles).

●	Application disponible en français (langue principale) ; possibilité d'ajouter l'arabe en version ultérieure.

●	Fiabilité et traçabilité des données nutritionnelles et médicales affichées.

●	Confidentialité et sécurité des données de santé des utilisateurs.

●	Temps de chargement rapide pour la recherche dans la base d'aliments.

12. Contenu à fournir par le porteur de projet

●	Liste complète des aliments avec leurs valeurs nutritionnelles (phosphore, protéines, glucides, lipides, calcium, potassium, sodium, citrate).

●	Contenu médical validé de chaque fiche pathologie (objectifs, listes d'aliments, exemples de menus).

●	Seuils de classification (faible/modéré/élevé) pour chaque nutriment, validés par un professionnel de santé.

●	Mentions légales et avertissement médical.

13. Proposition de phasage

Phase	Contenu

Phase 1 — MVP	Calculateur IMC, fiches régimes généraux statiques, fiches pathologies statiques, base de teneurs alimentaires consultable

Phase 2	Compte utilisateur, journal alimentaire, suivi du poids et de l'IMC, notifications

Phase 3	Personnalisation avancée selon profil médical, export PDF des fiches, recommandations automatiques

14. Avertissement médical

L'application a une vocation informative et éducative. Elle ne remplace en aucun cas une consultation médicale, un avis diététique individualisé ou un suivi par un professionnel de santé, en particulier pour les pathologies chroniques (insuffisance rénale, cancer, maladies inflammatoires, SOPK). Cette mention devra apparaître de façon visible dans l'application, notamment sur les fiches du module 3.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://vital-diet-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/80f5e3c2-3940-45dd-99be-ba4aa47fc919).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
