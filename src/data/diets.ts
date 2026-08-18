export type Diet = {
  slug: string;
  name: string;
  tagline: string;
  emoji: string;
  principe: string;
  privilegier: string[];
  limiter: string[];
  journeeType: { repas: string; contenu: string }[];
  benefices: string[];
  precautions: string[];
};

export const diets: Diet[] = [
  {
    slug: "mediterraneen",
    name: "Régime méditerranéen",
    tagline: "La référence santé, proposée par défaut",
    emoji: "🫒",
    principe:
      "Alimentation traditionnelle du bassin méditerranéen, riche en végétaux, en huile d'olive et en poisson, pauvre en viande rouge et en produits ultra-transformés. C'est le régime le mieux documenté en prévention cardiovasculaire et métabolique.",
    privilegier: [
      "Fruits et légumes de saison (5 portions/jour)",
      "Huile d'olive vierge extra comme matière grasse principale",
      "Céréales complètes (pain complet, boulgour, riz brun)",
      "Légumineuses (lentilles, pois chiches, haricots)",
      "Poisson, notamment gras, 2 à 3 fois par semaine",
      "Fruits à coque non salés, herbes et épices",
    ],
    limiter: [
      "Viande rouge (1 à 2 fois par semaine maximum)",
      "Charcuteries et fromages gras",
      "Sucres ajoutés et pâtisseries",
      "Beurre et crème",
    ],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Pain complet, huile d'olive, fromage frais, fruit de saison, thé" },
      { repas: "Déjeuner", contenu: "Salade de lentilles aux légumes, poisson grillé, fruit" },
      { repas: "Collation", contenu: "Poignée d'amandes + yaourt nature" },
      { repas: "Dîner", contenu: "Soupe de légumes, boulgour, légumes rôtis à l'huile d'olive" },
    ],
    benefices: [
      "Réduction du risque cardiovasculaire",
      "Amélioration du profil lipidique et glycémique",
      "Effet anti-inflammatoire et bénéfique sur le microbiote",
    ],
    precautions: [
      "Attention à la densité calorique de l'huile d'olive et des oléagineux en cas d'objectif de perte de poids",
    ],
  },
  {
    slug: "keto",
    name: "Régime cétogène (kéto)",
    tagline: "Très pauvre en glucides, riche en lipides",
    emoji: "🥑",
    principe:
      "Apport glucidique très réduit (généralement < 50 g/jour), lipides élevés et protéines modérées, afin d'induire un état de cétose où l'organisme utilise les corps cétoniques comme carburant principal.",
    privilegier: [
      "Huiles végétales, avocat, beurre de qualité",
      "Poissons gras, œufs, viandes non transformées",
      "Légumes verts pauvres en glucides",
      "Fruits à coque, graines",
    ],
    limiter: ["Fruits sucrés", "Légumineuses", "Produits laitiers sucrés"],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Œufs brouillés à l'huile d'olive, avocat" },
      { repas: "Déjeuner", contenu: "Saumon, courgettes sautées, salade verte" },
      { repas: "Dîner", contenu: "Poulet, brocolis, fromage" },
    ],
    benefices: ["Perte de poids rapide à court terme", "Contrôle de l'appétit", "Indications neurologiques spécifiques (épilepsie réfractaire)"],
    precautions: [
      "Suivi médical fortement recommandé",
      "Contre-indiqué en cas d'insuffisance rénale ou hépatique",
      "Contre-indiqué pendant la grossesse et l'allaitement",
      "Risque de carences en fibres, vitamines et minéraux",
    ],
  },
  {
    slug: "vegetarien",
    name: "Régime végétarien / végan",
    tagline: "Deux variantes, une vigilance sur les apports",
    emoji: "🥦",
    principe:
      "Le régime végétarien exclut la chair animale mais conserve œufs et produits laitiers (ovo-lacto-végétarien). Le régime végan exclut tout produit d'origine animale. Les deux nécessitent une construction attentive des apports.",
    privilegier: [
      "Légumineuses associées aux céréales complètes (protéines complémentaires)",
      "Tofu, tempeh, seitan",
      "Fruits à coque et graines (calcium, oméga-3)",
      "Légumes verts, agrumes (fer non héminique + vitamine C)",
      "Boissons végétales enrichies en calcium et B12",
    ],
    limiter: ["Produits végétaux ultra-transformés", "Excès de sucres raffinés"],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Porridge d'avoine, boisson végétale enrichie, fruits rouges, graines de chia" },
      { repas: "Déjeuner", contenu: "Riz complet + pois chiches, légumes rôtis, tahini" },
      { repas: "Dîner", contenu: "Soupe de lentilles corail, pain complet, salade d'oranges" },
    ],
    benefices: ["Apport élevé en fibres et antioxydants", "Bénéfice cardiovasculaire", "Impact environnemental réduit"],
    precautions: [
      "Supplémentation en vitamine B12 indispensable en végan strict",
      "Surveiller fer, zinc, calcium, iode et oméga-3 (EPA/DHA)",
      "Accompagnement diététique conseillé chez l'enfant, la femme enceinte et la personne âgée",
    ],
  },
  {
    slug: "jeune-intermittent",
    name: "Jeûne intermittent",
    tagline: "16/8, 5:2, jeûne alterné",
    emoji: "⏳",
    principe:
      "Alternance de périodes de prise alimentaire et de jeûne. Le protocole 16/8 limite la prise alimentaire à une fenêtre de 8 h ; le 5:2 associe 5 jours normaux et 2 jours à apport très réduit ; le jeûne alterné alterne un jour sur deux.",
    privilegier: [
      "Repas complets et rassasiants dans la fenêtre alimentaire",
      "Protéines de qualité à chaque repas",
      "Eau, thé et café non sucrés pendant le jeûne",
    ],
    limiter: ["Repas très gras ou très sucrés en fin de fenêtre", "Grignotage compensatoire"],
    journeeType: [
      { repas: "12 h — Premier repas", contenu: "Assiette complète : protéines, légumes, féculents complets" },
      { repas: "16 h — Collation", contenu: "Fruit + oléagineux" },
      { repas: "19 h 30 — Dernier repas", contenu: "Poisson, légumes, huile d'olive" },
      { repas: "20 h → 12 h", contenu: "Jeûne : eau, tisanes, café sans sucre" },
    ],
    benefices: ["Simplification de la gestion des apports", "Amélioration possible de la sensibilité à l'insuline"],
    precautions: [
      "Contre-indiqué en cas de grossesse ou d'allaitement",
      "Contre-indiqué en cas de troubles du comportement alimentaire",
      "Adaptation médicale obligatoire en cas de diabète traité",
      "Déconseillé chez l'enfant, l'adolescent et la personne dénutrie",
    ],
  },
  {
    slug: "sans-gluten",
    name: "Régime sans gluten",
    tagline: "Indispensable en maladie cœliaque",
    emoji: "🌾",
    principe:
      "Éviction totale du gluten (blé, orge, seigle) en cas de maladie cœliaque confirmée, ou éviction partielle en cas d'hypersensibilité documentée.",
    privilegier: ["Riz, sarrasin, quinoa, maïs, millet", "Légumineuses, pommes de terre", "Produits certifiés sans gluten"],
    limiter: ["Produits industriels à risque de contamination croisée"],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Galette de sarrasin, œuf, fruit" },
      { repas: "Déjeuner", contenu: "Quinoa, poulet, légumes" },
      { repas: "Dîner", contenu: "Soupe, riz complet, poisson" },
    ],
    benefices: ["Disparition des symptômes et réparation de la muqueuse en maladie cœliaque"],
    precautions: ["Ne pas débuter avant le diagnostic biologique", "Risque de carences en fibres et vitamines B"],
  },
  {
    slug: "fodmap",
    name: "Régime pauvre en FODMAP",
    tagline: "Syndrome de l'intestin irritable",
    emoji: "🫗",
    principe:
      "Réduction temporaire des glucides fermentescibles (FODMAP) pendant 4 à 6 semaines, suivie d'une réintroduction progressive et personnalisée.",
    privilegier: ["Riz, avoine, carotte, courgette, épinard", "Fruits pauvres en FODMAP (kiwi, orange, fraise)", "Produits sans lactose"],
    limiter: ["Oignon, ail, blé, légumineuses, pommes, poires, édulcorants en -ol"],
    journeeType: [
      { repas: "Petit-déjeuner", contenu: "Flocons d'avoine + lait sans lactose + kiwi" },
      { repas: "Déjeuner", contenu: "Riz, poulet, carottes et courgettes" },
      { repas: "Dîner", contenu: "Omelette, salade, pain au levain" },
    ],
    benefices: ["Réduction des ballonnements et douleurs abdominales"],
    precautions: ["Phase d'éviction limitée dans le temps", "Accompagnement diététique nécessaire pour la réintroduction"],
  },
];

export const getDiet = (slug: string) => diets.find((d) => d.slug === slug);