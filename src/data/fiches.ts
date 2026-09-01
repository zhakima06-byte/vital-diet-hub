export type FichePratique = {
  slug: string;
  titre: string;
  emoji: string;
  couleur: "bleu" | "rose" | "vert" | "violet";
  resume: string;
  objectif: string;
  privilegier: string[];
  limiter: string[];
  eviter: string[];
  journeeType: { repas: string; contenu: string }[];
  conseils: string[];
};

export const fiches: FichePratique[] = [
  {
    slug: "perimenopause",
    titre: "Alimentation en périménopause",
    emoji: "🌷",
    couleur: "rose",
    resume: "Symptômes hormonaux, capital osseux et contrôle du poids",
    objectif:
      "Limiter les symptômes liés à la baisse des œstrogènes (bouffées de chaleur, troubles du sommeil), préserver le capital osseux et musculaire et prévenir la prise de poids abdominale.",
    privilegier: [
      "Calcium : produits laitiers, eaux calciques, amandes, sardines avec arêtes",
      "Phytoestrogènes : soja fermenté, tofu, graines de lin moulues, légumineuses",
      "Protéines à chaque repas (20 à 25 g) pour préserver la masse musculaire",
      "Oméga-3 : poissons gras 2 fois par semaine, huile de colza ou de noix",
      "Fibres et végétaux colorés, céréales complètes",
      "Vitamine D (exposition raisonnée, poissons gras, supplémentation sur avis médical)",
    ],
    limiter: [
      "Café, thé fort et alcool — déclencheurs de bouffées de chaleur",
      "Plats épicés le soir",
      "Sucres rapides et grignotages",
      "Sel ajouté (perte calcique urinaire, tension)",
    ],
    eviter: ["Tabac", "Alcool quotidien", "Régimes très restrictifs qui accélèrent la fonte musculaire et osseuse"],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Yaourt ou boisson de soja enrichie en calcium, flocons d'avoine, graines de lin moulues, fruits rouges" },
      { repas: "Déjeuner", contenu: "Crudités à l'huile de colza, poisson gras, quinoa, légumes verts, fromage" },
      { repas: "Collation", contenu: "Amandes non salées + 1 fruit" },
      { repas: "Dîner", contenu: "Soupe de légumes, tofu ou œufs, patate douce, salade, laitage" },
    ],
    conseils: [
      "Activité physique en charge (marche rapide, renforcement) 3 fois par semaine pour l'os",
      "Dîner léger et précoce pour améliorer le sommeil et les bouffées nocturnes",
      "Hydratation régulière : 1,5 L d'eau par jour",
      "Bilan médical : densitométrie osseuse, vitamine D, tension, bilan lipidique",
    ],
  },
  {
    slug: "osteoporose",
    titre: "Alimentation et ostéoporose",
    emoji: "🦴",
    couleur: "violet",
    resume: "Calcium, vitamine D et protéines pour préserver l'os",
    objectif:
      "Couvrir les besoins en calcium, vitamine D et protéines afin de ralentir la perte osseuse et réduire le risque de fracture.",
    privilegier: [
      "3 à 4 produits laitiers par jour (lait, yaourt, fromage)",
      "Eaux minérales riches en calcium (> 300 mg/L)",
      "Poissons gras avec arêtes : sardines, maquereaux",
      "Protéines : 1 à 1,2 g/kg/jour, réparties sur les repas",
      "Légumes verts (chou, brocoli), amandes, figues sèches",
      "Vitamine K : légumes verts feuillus",
    ],
    limiter: [
      "Sel : au-delà de 6 g/jour, il augmente les pertes urinaires de calcium",
      "Caféine : maximum 3 tasses par jour",
      "Sodas au cola (phosphore)",
      "Excès de fibres brutes de son consommées avec les laitages",
    ],
    eviter: ["Alcool au-delà de 2 verres par jour", "Tabac", "Régimes amaigrissants sévères et dénutrition"],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Lait ou yaourt, pain complet, beurre, fruit, eau calcique" },
      { repas: "Déjeuner", contenu: "Sardines ou viande maigre, gratin de brocolis, pommes de terre, fromage" },
      { repas: "Collation", contenu: "Fromage blanc + amandes + figues sèches" },
      { repas: "Dîner", contenu: "Soupe de légumes verts, œufs, riz complet, yaourt" },
    ],
    conseils: [
      "Exposition solaire courte et quotidienne (bras et visage) hors heures chaudes",
      "Supplémentation en vitamine D souvent nécessaire — sur prescription",
      "Exercices en charge et travail de l'équilibre pour prévenir les chutes",
      "Sécuriser le domicile : tapis, éclairage, chaussage",
    ],
  },
  {
    slug: "sopk",
    titre: "Alimentation des patientes SOPK",
    emoji: "🌸",
    couleur: "rose",
    resume: "Index glycémique bas et insulinorésistance",
    objectif:
      "Améliorer la sensibilité à l'insuline, stabiliser la glycémie et réduire l'inflammation de bas grade, ce qui améliore les cycles et les symptômes cutanés.",
    privilegier: [
      "Glucides à index glycémique bas : légumineuses, céréales complètes, patate douce",
      "Légumes à chaque repas (fibres, satiété)",
      "Protéines de qualité : œufs, poisson, volaille, tofu",
      "Poissons gras et huiles riches en oméga-3",
      "Aliments riches en magnésium : oléagineux, chocolat noir, légumes verts",
    ],
    limiter: [
      "Produits raffinés : pain blanc, riz blanc, pâtes très cuites",
      "Produits laitiers très sucrés",
      "Grignotages sucrés entre les repas",
    ],
    eviter: ["Boissons sucrées et jus industriels", "Pâtisseries et viennoiseries industrielles", "Fritures et plats ultra-transformés"],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Œufs ou fromage blanc, flocons d'avoine, fruits rouges, graines de chia" },
      { repas: "Déjeuner", contenu: "Quinoa, poisson gras, légumes verts, huile d'olive" },
      { repas: "Collation", contenu: "Fruit entier + oléagineux" },
      { repas: "Dîner", contenu: "Lentilles, légumes rôtis, yaourt nature" },
    ],
    conseils: [
      "Toujours associer un glucide à une protéine ou une matière grasse",
      "Activité physique 150 min/semaine : levier majeur sur l'insulinorésistance",
      "Une perte de 5 % du poids peut suffire à restaurer l'ovulation en cas de surpoids",
      "Surveiller glycémie à jeun, HbA1c et bilan lipidique",
    ],
  },
  {
    slug: "cancer",
    titre: "Alimentation des malades cancéreux",
    emoji: "🎗️",
    couleur: "violet",
    resume: "Prévenir la dénutrition et gérer les effets secondaires",
    objectif:
      "Maintenir le poids et la masse musculaire pendant les traitements, couvrir les besoins protéino-énergétiques et adapter l'alimentation aux effets secondaires.",
    privilegier: [
      "Protéines à chaque prise : œufs, viande, poisson, fromage, légumineuses (1,2 à 1,5 g/kg/jour)",
      "Repas enrichis : huile, crème, poudre de lait, fromage râpé, jaune d'œuf",
      "Petites portions fractionnées, 5 à 6 par jour",
      "Aliments froids ou tièdes en cas de nausées (odeurs moins fortes)",
      "Textures adaptées en cas de mucite : mixé, moulu, lisse",
    ],
    limiter: [
      "Aliments acides, épicés ou très chauds en cas d'aphtes ou de mucite",
      "Fibres irritantes en cas de diarrhée sous traitement",
      "Alcool",
    ],
    eviter: [
      "Aliments crus à risque en cas d'aplasie (fromages au lait cru, viandes crues, œufs crus)",
      "Jeûne et régimes restrictifs non encadrés pendant les traitements",
      "Compléments alimentaires sans validation de l'oncologue (interactions possibles)",
    ],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Lait enrichi en poudre de lait, pain, beurre, œuf, compote" },
      { repas: "Collation", contenu: "Crème dessert ou smoothie lacté enrichi" },
      { repas: "Déjeuner", contenu: "Petite portion de viande ou poisson, purée enrichie, légumes fondants, fromage" },
      { repas: "Collation", contenu: "Yaourt grec + miel + biscuit" },
      { repas: "Dîner", contenu: "Velouté enrichi (crème, fromage), œufs, dessert lacté" },
    ],
    conseils: [
      "Se peser une fois par semaine : signaler toute perte > 5 % en 1 mois",
      "Boire entre les repas plutôt que pendant, pour ne pas couper l'appétit",
      "Bouche sèche : eau citronnée, aliments en sauce, chewing-gum sans sucre",
      "Demander un avis diététique dès le début des traitements",
    ],
  },
  {
    slug: "hypertension",
    titre: "Alimentation du malade hypertendu",
    emoji: "🫀",
    couleur: "bleu",
    resume: "Régime pauvre en sel de type DASH",
    objectif:
      "Réduire la pression artérielle par la baisse du sodium, l'augmentation du potassium, du calcium et du magnésium et la maîtrise du poids.",
    privilegier: [
      "Fruits et légumes frais : au moins 5 portions par jour",
      "Céréales complètes et légumineuses",
      "Produits laitiers pauvres en matières grasses",
      "Volaille, poisson, fruits à coque non salés",
      "Herbes, épices, citron, ail et vinaigre à la place du sel",
    ],
    limiter: [
      "Sel de cuisson et salière à table",
      "Fromages salés, pain en grande quantité",
      "Café en excès et alcool (≤ 2 verres/jour, jours sans alcool)",
      "Viandes rouges et sucres ajoutés",
    ],
    eviter: [
      "Charcuteries, conserves salées, bouillons cubes, sauces industrielles",
      "Snacks salés et biscuits apéritifs",
      "Réglisse (augmente la pression artérielle)",
      "Plats préparés industriels",
    ],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Pain sans sel ajouté, fromage blanc 0 %, banane, thé" },
      { repas: "Déjeuner", contenu: "Grande part de légumes, blanc de volaille aux herbes, riz complet, huile d'olive, fruit" },
      { repas: "Collation", contenu: "Yaourt nature + amandes non salées" },
      { repas: "Dîner", contenu: "Soupe maison sans sel, poisson vapeur, pommes de terre, salade" },
    ],
    conseils: [
      "Objectif : moins de 5 à 6 g de sel par jour",
      "Lire les étiquettes : sodium × 2,5 = sel en grammes",
      "Activité d'endurance 30 min, 5 fois par semaine",
      "Automesure tensionnelle et suivi du poids",
    ],
  },
  {
    slug: "insuffisance-renale",
    titre: "Alimentation en insuffisance rénale chronique",
    emoji: "🩺",
    couleur: "bleu",
    resume: "Protéines, potassium, phosphore et sodium selon le stade",
    objectif:
      "Ralentir la progression de la maladie rénale et prévenir les complications métaboliques en adaptant protéines, potassium, phosphore et sodium au stade de la maladie.",
    privilegier: [
      "Protéines contrôlées et de bonne valeur biologique (œuf, poisson, volaille)",
      "Légumes cuits à grande eau (double cuisson) pour réduire le potassium",
      "Pain et féculents en quantité définie avec le diététicien",
      "Huiles végétales pour couvrir les besoins énergétiques",
      "Herbes et épices pour remplacer le sel",
    ],
    limiter: [
      "Protéines : environ 0,8 g/kg/jour aux stades 3 à 5 (sur prescription)",
      "Potassium : bananes, abricots secs, chocolat, pommes de terre non trempées",
      "Phosphore : fromages fondus, sodas au cola, produits transformés (additifs en -phos)",
      "Liquides si œdèmes ou consigne médicale",
    ],
    eviter: [
      "Sel ajouté et produits salés industriels",
      "Sels de régime à base de potassium",
      "Anti-inflammatoires non stéroïdiens et automédication",
      "Compléments alimentaires non validés par le néphrologue",
    ],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Pain sans sel, beurre, confiture, café léger" },
      { repas: "Déjeuner", contenu: "Portion mesurée de poisson, pâtes, légumes bouillis à grande eau, huile d'olive, fruit autorisé" },
      { repas: "Collation", contenu: "Compote ou fruit à faible teneur en potassium" },
      { repas: "Dîner", contenu: "Potage de légumes égouttés, œuf, riz, pain sans sel" },
    ],
    conseils: [
      "Double cuisson des légumes et pommes de terre : couper, tremper, cuire à grande eau",
      "Suivre le DFG, le potassium et le phosphore sanguins régulièrement",
      "Ne jamais restreindre les protéines sans encadrement (risque de dénutrition)",
      "Consultation diététique dédiée dès le stade 3",
    ],
  },
];

export const getFiche = (slug: string) => fiches.find((f) => f.slug === slug);
