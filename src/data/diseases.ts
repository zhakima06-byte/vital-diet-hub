export type DiseaseSheet = {
  slug: string;
  name: string;
  short: string;
  emoji: string;
  objectif: string;
  recommandes: string[];
  aLimiter: string[];
  aEviter: string[];
  journeeType: { repas: string; contenu: string }[];
  reperes?: string[];
};

export const diseases: DiseaseSheet[] = [
  {
    slug: "dash-hypertension",
    name: "Régime DASH — Hypertension artérielle",
    short: "Réduire le sodium, augmenter potassium, calcium et magnésium",
    emoji: "🫀",
    objectif:
      "Réduire l'apport en sodium et favoriser les apports en potassium, calcium et magnésium afin d'abaisser la pression artérielle.",
    recommandes: [
      "Fruits et légumes frais (au moins 5 portions par jour)",
      "Céréales complètes",
      "Produits laitiers pauvres en matières grasses",
      "Volaille et poisson",
      "Fruits à coque non salés et légumineuses",
    ],
    aLimiter: ["Sel de cuisson et salière à table", "Charcuteries", "Fromages salés", "Plats préparés industriels"],
    aEviter: [
      "Conserves salées, bouillons cubes, sauces industrielles",
      "Snacks salés, biscuits apéritifs",
      "Réglisse",
    ],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Pain complet sans sel ajouté, fromage blanc 0 %, banane" },
      { repas: "Déjeuner", contenu: "Grande part de légumes, blanc de volaille, riz complet, huile d'olive, fruit" },
      { repas: "Collation", contenu: "Yaourt nature + amandes non salées" },
      { repas: "Dîner", contenu: "Soupe maison sans sel, poisson vapeur, pommes de terre, salade" },
    ],
    reperes: ["Objectif usuel : moins de 5 à 6 g de sel par jour", "Remplacer le sel par herbes, épices, citron, ail"],
  },
  {
    slug: "goutte",
    name: "Goutte (hyperuricémie)",
    short: "Réduire les purines et prévenir les crises",
    emoji: "🦶",
    objectif:
      "Réduire les apports en purines afin de diminuer la production d'acide urique et prévenir la survenue de crises.",
    recommandes: [
      "Légumes et fruits",
      "Produits laitiers pauvres en graisses",
      "Céréales complètes",
      "Eau en quantité suffisante (2 L/jour ou plus)",
    ],
    aLimiter: ["Viandes rouges", "Fruits de mer", "Alcool, en particulier la bière", "Boissons sucrées au fructose"],
    aEviter: ["Abats (foie, rognons)", "Extraits de viande et bouillons de viande", "Gibier", "Anchois et sardines en grande quantité"],
    journeeType: [
      { repas: "Toute la journée", contenu: "Hydratation abondante répartie régulièrement" },
      { repas: "Petit-déjeuner", contenu: "Pain complet, laitage maigre, fruit" },
      { repas: "Déjeuner", contenu: "Légumes, lentilles, filet d'huile d'olive, yaourt" },
      { repas: "Dîner", contenu: "Soupe de légumes, pâtes complètes, fromage blanc" },
    ],
  },
  {
    slug: "insuffisance-renale",
    name: "Insuffisance rénale chronique (IRC)",
    short: "Adapter protéines, phosphore, potassium et sodium selon le stade",
    emoji: "🩺",
    objectif:
      "Adapter les apports en protéines, phosphore, potassium et sodium selon le stade de la maladie rénale, tout en préservant un état nutritionnel satisfaisant.",
    recommandes: [
      "Féculents peu riches en phosphore (riz, pâtes, pain blanc)",
      "Légumes et fruits choisis selon leur teneur en potassium",
      "Huiles végétales pour l'apport énergétique",
    ],
    aLimiter: [
      "Produits laitiers (phosphore)",
      "Fruits secs et oléagineux (potassium)",
      "Sel de cuisson",
      "Protéines animales en excès",
    ],
    aEviter: [
      "Sodas au cola et produits ultra-transformés riches en phosphates ajoutés",
      "Charcuteries et conserves salées",
      "Sels de régime à base de potassium",
    ],
    journeeType: [
      { repas: "Principe", contenu: "Menu construit avec un diététicien selon le stade de l'IRC" },
      { repas: "Petit-déjeuner", contenu: "Pain blanc, beurre, confiture, thé" },
      { repas: "Déjeuner", contenu: "Portion contrôlée de viande, riz, légumes préalablement bouillis" },
      { repas: "Dîner", contenu: "Pâtes, légumes, huile végétale, fruit à faible teneur en potassium" },
    ],
    reperes: ["Adaptation continue selon le bilan biologique (kaliémie, phosphorémie, albuminémie)"],
  },
  {
    slug: "calculs-renaux",
    name: "Calculs rénaux (lithiase urinaire)",
    short: "Hydratation abondante et adaptation selon le type de calcul",
    emoji: "💧",
    objectif:
      "Prévenir la récidive de calculs selon leur nature (uriques, oxalocalciques, phospho-calciques) en adaptant l'hydratation et les apports spécifiques.",
    recommandes: [
      "Eau en abondance : 1,5 à 2,5 L par jour",
      "Agrumes riches en citrate (citron, orange)",
      "Légumes variés",
      "Apport calcique alimentaire normal — non restreint",
    ],
    aLimiter: [
      "Oxalates (épinards, blettes, cacao, thé fort) en cas de lithiase oxalique",
      "Purines en cas de lithiase urique",
      "Sel et protéines animales en excès",
    ],
    aEviter: ["Compléments de vitamine C à forte dose", "Excès de sel ajouté", "Sodas"],
    journeeType: [
      { repas: "Toute la journée", contenu: "Hydratation répartie, y compris la nuit si réveil" },
      { repas: "Matin", contenu: "Jus de citron dilué dans de l'eau" },
      { repas: "Déjeuner / Dîner", contenu: "Repas normosodés et normoprotéinés, apport calcique conservé" },
    ],
    reperes: ["Objectif : diurèse supérieure à 2 L par 24 h", "L'analyse du calcul oriente les conseils diététiques"],
  },
  {
    slug: "sopk",
    name: "Syndrome des ovaires polykystiques (SOPK)",
    short: "Index glycémique bas et réduction de l'inflammation",
    emoji: "🌸",
    objectif:
      "Améliorer la sensibilité à l'insuline et limiter l'inflammation par une alimentation à index glycémique bas.",
    recommandes: ["Céréales complètes", "Légumineuses", "Légumes riches en fibres", "Poissons gras", "Huile d'olive"],
    aLimiter: ["Sucres rapides", "Produits raffinés", "Féculents à index glycémique élevé"],
    aEviter: ["Boissons sucrées", "Pâtisseries industrielles", "Fritures"],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Flocons d'avoine, yaourt, fruits rouges, graines — riche en fibres et protéines" },
      { repas: "Déjeuner", contenu: "Quinoa, poisson gras, légumes verts, huile d'olive" },
      { repas: "Collation", contenu: "Fruit + oléagineux" },
      { repas: "Dîner", contenu: "Lentilles, légumes rôtis, yaourt nature" },
    ],
    reperes: ["Activité physique régulière : levier majeur sur l'insulinorésistance"],
  },
  {
    slug: "cancer",
    name: "Nutrition du patient cancéreux",
    short: "Prévenir la dénutrition et préserver la masse musculaire",
    emoji: "🎗️",
    objectif:
      "Prévenir la dénutrition, maintenir la masse musculaire et adapter l'alimentation aux effets secondaires des traitements (nausées, troubles du goût, perte d'appétit).",
    recommandes: [
      "Aliments à forte densité énergétique et protéique",
      "Repas fractionnés en 5 à 6 prises",
      "Textures adaptées en cas de mucite ou de troubles de la déglutition",
      "Enrichissement des plats (œuf, fromage, poudre de lait, huile)",
    ],
    aLimiter: ["Aliments difficiles à digérer selon la tolérance individuelle", "Odeurs fortes en cas de nausées"],
    aEviter: ["Aliments crus à risque infectieux en période d'immunodépression", "Alcool"],
    journeeType: [
      { repas: "Principe", contenu: "Fractionnement en 5 à 6 prises, à individualiser avec l'équipe soignante" },
      { repas: "Petit-déjeuner", contenu: "Lait entier enrichi, pain, beurre, compote" },
      { repas: "Collations", contenu: "Crème dessert enrichie, fromage, biscuits" },
      { repas: "Repas principaux", contenu: "Petites portions enrichies en protéines et matières grasses de qualité" },
    ],
    reperes: ["Surveiller le poids : toute perte > 5 % doit alerter l'équipe soignante"],
  },
  {
    slug: "maladies-inflammatoires",
    name: "Maladies inflammatoires (MICI, rhumatismes)",
    short: "Réduire l'inflammation chronique et soulager les symptômes",
    emoji: "🔥",
    objectif: "Réduire l'inflammation chronique et soulager les symptômes digestifs ou articulaires.",
    recommandes: [
      "Oméga-3 (poissons gras : sardine, maquereau, saumon)",
      "Fruits et légumes riches en antioxydants",
      "Épices anti-inflammatoires (curcuma, gingembre)",
      "Huiles de colza et de noix",
    ],
    aLimiter: [
      "Graisses saturées",
      "Produits ultra-transformés",
      "En poussée : fibres irritantes selon la tolérance",
    ],
    aEviter: ["Alcool", "Tabac (facteur aggravant majeur dans la maladie de Crohn)", "Excès de sucres raffinés"],
    journeeType: [
      { repas: "Principe", contenu: "Adaptation selon la phase : poussée ou rémission" },
      { repas: "Poussée", contenu: "Alimentation pauvre en résidus, fractionnée, hydratation renforcée" },
      { repas: "Rémission", contenu: "Réintroduction progressive des fibres, alimentation variée type méditerranéenne" },
    ],
  },
  {
    slug: "microbiote",
    name: "Microbiote intestinal — comment le nourrir",
    short: "Fibres, prébiotiques et aliments fermentés",
    emoji: "🦠",
    objectif:
      "Favoriser la diversité et l'équilibre du microbiote intestinal par les fibres, les prébiotiques et les probiotiques alimentaires.",
    recommandes: [
      "Fibres variées : légumes, fruits, légumineuses, céréales complètes",
      "Aliments fermentés : yaourt, kéfir, choucroute crue",
      "Prébiotiques : ail, oignon, poireau, banane peu mûre",
      "Polyphénols : fruits rouges, thé vert, huile d'olive",
    ],
    aLimiter: ["Édulcorants artificiels", "Aliments ultra-transformés", "Excès de graisses saturées"],
    aEviter: ["Antibiotiques non justifiés", "Alcool en excès"],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Fruits frais, céréales complètes, yaourt ou kéfir" },
      { repas: "Déjeuner", contenu: "Assiette riche en légumes variés + légumineuses" },
      { repas: "Dîner", contenu: "Soupe de légumes, pain au levain, un aliment fermenté" },
    ],
    reperes: ["Objectif : 30 végétaux différents par semaine", "Augmenter les fibres progressivement"],
  },
];

export const getDisease = (slug: string) => diseases.find((d) => d.slug === slug);

export const pathologyOptions = diseases.map((d) => ({ slug: d.slug, label: d.name }));