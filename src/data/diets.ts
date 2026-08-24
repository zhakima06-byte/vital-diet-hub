export type EvalQuestion = {
  id: string;
  question: string;
  /** "stop" = contre-indication, "vigilance" = prudence / suivi renforcé */
  drapeau: "stop" | "vigilance";
  explication: string;
};

export type Repere = { label: string; valeur: string };

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
  /** Repères chiffrés du régime (macros, fenêtres, portions…) */
  reperes?: Repere[];
  /** Sections d'approfondissement affichées en accordéon */
  approfondissement?: { titre: string; contenu: string }[];
  /** Signaux indiquant que le régime est mal conduit ou mal toléré */
  anomalies?: string[];
  /** Auto-questionnaire « ce régime est-il fait pour moi ? » */
  evaluation?: EvalQuestion[];
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
      "Adapter les portions de poisson en cas de grossesse (limiter les gros poissons prédateurs)",
      "Surveiller les apports en potassium en cas d'insuffisance rénale avancée",
    ],
    reperes: [
      { label: "Répartition indicative", valeur: "45–50 % glucides · 30–40 % lipides · 15–20 % protéines" },
      { label: "Huile d'olive", valeur: "3 à 4 cuillères à soupe par jour" },
      { label: "Poisson", valeur: "2 à 3 portions/semaine dont 1 poisson gras" },
      { label: "Légumineuses", valeur: "3 à 4 portions/semaine" },
      { label: "Viande rouge", valeur: "≤ 1 à 2 portions/semaine" },
      { label: "Sel", valeur: "≤ 5 g/jour (herbes et épices en remplacement)" },
    ],
    approfondissement: [
      {
        titre: "Pourquoi ce régime est la référence",
        contenu:
          "Le régime méditerranéen est le modèle alimentaire le plus étudié : essais d'intervention et cohortes convergent vers une réduction des événements cardiovasculaires, un meilleur contrôle glycémique et une mortalité globale plus basse. Son intérêt tient à l'ensemble du modèle (aliments peu transformés, fibres, acides gras mono-insaturés, polyphénols) plus qu'à un aliment isolé.",
      },
      {
        titre: "Mise en pratique semaine par semaine",
        contenu:
          "Semaine 1 : remplacer beurre et huiles raffinées par de l'huile d'olive vierge extra. Semaine 2 : introduire deux repas de légumineuses. Semaine 3 : passer aux céréales complètes et ajouter un fruit à chaque repas. Semaine 4 : réduire la viande rouge et la charcuterie à une fois par semaine, ajouter deux repas de poisson.",
      },
      {
        titre: "Au-delà de l'assiette",
        contenu:
          "Le modèle inclut l'activité physique quotidienne, la convivialité des repas, la cuisine maison, le respect de la saisonnalité et un temps de repas suffisant. Ces éléments font partie intégrante des bénéfices observés.",
      },
    ],
    anomalies: [
      "Prise de poids malgré le régime : portions d'huile, de fromage et d'oléagineux probablement trop généreuses",
      "Ballonnements persistants à l'introduction des légumineuses : augmenter les quantités très progressivement",
      "Sensation de faim permanente : apport en protéines ou en féculents complets insuffisant",
      "Aucun changement des bilans lipidiques après 3 mois : vérifier la part réelle de produits ultra-transformés",
    ],
    evaluation: [
      {
        id: "med-renal",
        question: "Avez-vous une insuffisance rénale avec restriction en potassium ou en protéines ?",
        drapeau: "vigilance",
        explication:
          "Le régime est riche en fruits, légumes et légumineuses, donc en potassium. Il doit être adapté par un diététicien en cas d'insuffisance rénale avancée.",
      },
      {
        id: "med-poids",
        question: "Cherchez-vous une perte de poids rapide et importante ?",
        drapeau: "vigilance",
        explication:
          "Le régime méditerranéen agit progressivement. Un cadrage des portions caloriques (huile, oléagineux, fromages) est nécessaire pour obtenir une perte de poids.",
      },
      {
        id: "med-allergie",
        question: "Êtes-vous allergique aux fruits à coque ou au poisson ?",
        drapeau: "vigilance",
        explication:
          "Ces aliments sont centraux : des substitutions (graines, huile de colza, légumineuses) doivent être prévues pour couvrir les oméga-3.",
      },
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
      "Perte hydrosodée initiale : risque de déshydratation et d'hypotension",
      "Interactions avec les traitements antidiabétiques et antihypertenseurs (risque d'hypoglycémie)",
    ],
    reperes: [
      { label: "Glucides", valeur: "20 à 50 g/jour (≈ 5–10 % de l'apport)" },
      { label: "Lipides", valeur: "70 à 75 % de l'apport énergétique" },
      { label: "Protéines", valeur: "1,2 à 1,5 g/kg/jour (modérées, non élevées)" },
      { label: "Cétonémie cible", valeur: "0,5 à 3 mmol/L de bêta-hydroxybutyrate" },
      { label: "Eau", valeur: "2 à 2,5 L/jour + sel, potassium et magnésium" },
      { label: "Durée conseillée", valeur: "phase stricte de 8 à 12 semaines, sous suivi" },
    ],
    approfondissement: [
      {
        titre: "Comment s'installe la cétose",
        contenu:
          "Après 2 à 4 jours d'apport glucidique très bas, les réserves de glycogène s'épuisent et le foie produit des corps cétoniques à partir des acides gras. La cétose nutritionnelle (0,5–3 mmol/L) n'a rien à voir avec l'acidocétose diabétique (> 15 mmol/L avec hyperglycémie), qui est une urgence médicale.",
      },
      {
        titre: "La « grippe cétogène »",
        contenu:
          "Entre le 2ᵉ et le 7ᵉ jour : fatigue, maux de tête, crampes, irritabilité, troubles du sommeil. Elle traduit surtout des pertes d'eau et d'électrolytes. Elle se corrige en augmentant l'eau, le sel (3–5 g/jour), le potassium (légumes verts, avocat) et le magnésium.",
      },
      {
        titre: "Sortie du régime",
        contenu:
          "La reprise des glucides doit être progressive (+ 20 à 30 g par semaine, en privilégiant légumineuses, fruits et céréales complètes) pour éviter un rebond de poids et des troubles digestifs.",
      },
    ],
    anomalies: [
      "Cétose absente malgré le protocole : glucides cachés (sauces, laitages, « produits kéto ») ou excès de protéines",
      "Fatigue, crampes, palpitations qui durent au-delà de 10 jours : déficit en eau et en électrolytes, ou apport calorique trop bas",
      "Constipation ou transit très ralenti : manque de fibres et d'eau",
      "Cholestérol LDL en forte hausse à 3 mois : trop de graisses saturées, à rééquilibrer vers huile d'olive, avocat, poissons gras",
      "Haleine acétonique, soif intense et polyurie avec glycémie élevée : arrêter et consulter en urgence (suspicion d'acidocétose)",
      "Troubles des règles, chute de cheveux, épisodes de compulsions alimentaires : régime trop restrictif, à réévaluer",
    ],
    evaluation: [
      {
        id: "keto-grossesse",
        question: "Êtes-vous enceinte, allaitante, ou avez-vous moins de 18 ans ?",
        drapeau: "stop",
        explication:
          "Le régime cétogène est contre-indiqué dans ces situations en dehors d'une indication médicale spécifique (épilepsie réfractaire encadrée à l'hôpital).",
      },
      {
        id: "keto-rein-foie",
        question: "Avez-vous une insuffisance rénale, une maladie du foie, une pancréatite ou une maladie de la vésicule biliaire ?",
        drapeau: "stop",
        explication:
          "Ces pathologies contre-indiquent le régime cétogène : la charge en lipides et en protéines n'est pas métabolisable en sécurité.",
      },
      {
        id: "keto-metabolique",
        question: "Avez-vous un déficit connu du métabolisme des graisses (déficit en carnitine, en pyruvate carboxylase, porphyrie) ?",
        drapeau: "stop",
        explication: "Contre-indication absolue : la cétose peut déclencher une décompensation métabolique grave.",
      },
      {
        id: "keto-diabete",
        question: "Êtes-vous traité par insuline, sulfamides hypoglycémiants ou inhibiteurs SGLT2 ?",
        drapeau: "stop",
        explication:
          "Risque d'hypoglycémie sévère et, sous SGLT2, d'acidocétose euglycémique. Le régime n'est envisageable qu'avec adaptation médicale préalable des doses.",
      },
      {
        id: "keto-tca",
        question: "Avez-vous ou avez-vous eu un trouble du comportement alimentaire ?",
        drapeau: "stop",
        explication: "Les régimes très restrictifs réactivent les conduites de restriction et de compulsion.",
      },
      {
        id: "keto-tension",
        question: "Prenez-vous un traitement pour la tension artérielle ou des diurétiques ?",
        drapeau: "vigilance",
        explication:
          "La perte hydrosodée initiale majore le risque d'hypotension : surveillance de la tension et réévaluation des doses par le médecin.",
      },
      {
        id: "keto-lipides",
        question: "Avez-vous une hypercholestérolémie familiale ou un LDL élevé ?",
        drapeau: "vigilance",
        explication:
          "Un contrôle du bilan lipidique à 6–12 semaines est indispensable, avec des lipides majoritairement insaturés.",
      },
      {
        id: "keto-sport",
        question: "Pratiquez-vous un sport d'intensité élevée en compétition ?",
        drapeau: "vigilance",
        explication: "Les performances en efforts intenses et courts baissent souvent durant les premières semaines d'adaptation.",
      },
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
      "Attention aux traitements à prendre au cours d'un repas",
    ],
    reperes: [
      { label: "16/8", valeur: "fenêtre alimentaire de 8 h, jeûne de 16 h (protocole le plus étudié)" },
      { label: "14/10", valeur: "version d'entrée, bien tolérée, idéale les premières semaines" },
      { label: "5:2", valeur: "5 jours habituels + 2 jours non consécutifs à 500–600 kcal" },
      { label: "Jeûne alterné", valeur: "1 jour sur 2 à très faible apport — réservé à un suivi encadré" },
      { label: "Protéines", valeur: "1,2 g/kg/jour réparties sur 2 à 3 repas pour préserver la masse musculaire" },
      { label: "Hydratation", valeur: "1,5 à 2 L d'eau, thé ou tisane pendant la phase de jeûne" },
    ],
    approfondissement: [
      {
        titre: "Ce qui agit réellement",
        contenu:
          "À apport calorique égal, le jeûne intermittent ne fait pas perdre plus de poids qu'une restriction classique. Son intérêt est pratique : il simplifie les choix, supprime le grignotage du soir et convient aux personnes qui préfèrent des règles horaires à un comptage. L'alignement de la fenêtre alimentaire sur la journée (repas plus tôt) semble plus favorable au métabolisme.",
      },
      {
        titre: "Démarrage progressif",
        contenu:
          "Semaines 1–2 : fenêtre de 12 h. Semaines 3–4 : 14 h de jeûne. Ensuite seulement 16 h, 5 jours sur 7. Conserver deux repas structurés minimum et éviter d'associer d'emblée jeûne et déficit calorique important.",
      },
      {
        titre: "Sport et jeûne",
        contenu:
          "Les séances d'endurance modérée se pratiquent bien à jeun. Les séances intenses ou de renforcement musculaire gagnent à être placées en fin de jeûne, suivies d'un repas riche en protéines dans les deux heures.",
      },
    ],
    anomalies: [
      "Compensation par une hyperphagie à l'ouverture de la fenêtre : le protocole est trop long, revenir à 14/10",
      "Vertiges, malaises, sueurs ou tremblements pendant le jeûne : arrêter la séance de jeûne et consulter, surtout si un traitement antidiabétique est en cours",
      "Perte de poids rapide accompagnée d'une fonte musculaire : apport protéique insuffisant",
      "Obsession des horaires, culpabilité à la moindre entorse, isolement social autour des repas : signes d'une dérive de type trouble alimentaire, arrêter le protocole",
      "Troubles du sommeil, irritabilité, aménorrhée : signal d'un stress énergétique excessif",
      "Aucun effet après 3 mois : les apports totaux sur la fenêtre restent probablement inchangés",
    ],
    evaluation: [
      {
        id: "ji-grossesse",
        question: "Êtes-vous enceinte ou allaitante ?",
        drapeau: "stop",
        explication: "Les besoins énergétiques continus rendent le jeûne inadapté et potentiellement risqué pour l'enfant.",
      },
      {
        id: "ji-tca",
        question: "Avez-vous ou avez-vous eu un trouble du comportement alimentaire (anorexie, boulimie, hyperphagie) ?",
        drapeau: "stop",
        explication: "Le jeûne renforce le cycle restriction / compulsion et est formellement déconseillé.",
      },
      {
        id: "ji-age",
        question: "Avez-vous moins de 18 ans, plus de 75 ans, ou un IMC inférieur à 18,5 ?",
        drapeau: "stop",
        explication: "Croissance, dénutrition et sarcopénie sont incompatibles avec des périodes de jeûne prolongées.",
      },
      {
        id: "ji-insuline",
        question: "Êtes-vous traité par insuline ou sulfamides hypoglycémiants ?",
        drapeau: "stop",
        explication:
          "Risque d'hypoglycémie sévère pendant les phases de jeûne. Un protocole n'est envisageable qu'après adaptation des doses par le médecin.",
      },
      {
        id: "ji-traitement",
        question: "Prenez-vous des médicaments à horaires fixes ou à prendre pendant les repas ?",
        drapeau: "vigilance",
        explication: "La fenêtre alimentaire doit être construite autour des prises médicamenteuses, avec l'avis du pharmacien ou du médecin.",
      },
      {
        id: "ji-reflux",
        question: "Souffrez-vous de reflux gastro-œsophagien, de gastrite ou de migraines fréquentes ?",
        drapeau: "vigilance",
        explication: "Les repas volumineux après un jeûne long et l'hypoglycémie relative peuvent aggraver ces symptômes.",
      },
      {
        id: "ji-travail",
        question: "Travaillez-vous de nuit ou en horaires décalés ?",
        drapeau: "vigilance",
        explication:
          "La fenêtre alimentaire doit rester alignée sur votre rythme d'éveil ; un jeûne mal calé aggrave la fatigue et le contrôle glycémique.",
      },
      {
        id: "ji-sport",
        question: "Pratiquez-vous un sport intensif plus de 5 h par semaine ?",
        drapeau: "vigilance",
        explication: "Le risque de déficit énergétique relatif (perte musculaire, troubles hormonaux) impose un suivi et un apport protéique renforcé.",
      },
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