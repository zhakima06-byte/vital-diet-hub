export type MenuType = {
  petit_dejeuner: string;
  dejeuner: string;
  diner: string;
  collations: string[];
};

export type AlimentGroupe = {
  categorie: string;
  items: string[];
};

export type Encadre = {
  titre: string;
  texte: string;
};

export type Tableau = {
  titre: string;
  colonnes: string[];
  lignes: string[][];
};

export type Pathologie = {
  id: string;
  nom: string;
  emoji: string;
  categorie: string;
  resume: string;
  comprendre: string;
  objectifs: string[];
  aliments_favorables: AlimentGroupe[];
  aliments_a_limiter: string[];
  aliments_a_eviter: { aliment: string; raison: string }[];
  menu_type: MenuType;
  volets?: { titre: string; texte: string; points: string[] }[];
  tableaux?: Tableau[];
  encadres?: Encadre[];
  conseils: string[];
  signaux_alerte: string[];
  sources: string[];
  liens?: { label: string; to: string }[];
  date_maj: string;
  motsCles: string[];
};

export const pathologies: Pathologie[] = [
  {
    id: "goutte",
    nom: "La goutte",
    emoji: "🦶",
    categorie: "Maladie métabolique",
    resume: "Régime pauvre en purines pour limiter l'hyperuricémie et prévenir les crises.",
    comprendre:
      "La goutte résulte d'un excès d'acide urique dans le sang (hyperuricémie). L'acide urique provient de la dégradation des purines, présentes naturellement dans certains aliments et produites par l'organisme. Lorsque sa concentration est trop élevée, il cristallise dans les articulations et provoque des crises inflammatoires très douloureuses. L'alimentation ne remplace pas le traitement hypo-uricémiant mais réduit la fréquence des crises et l'intensité de l'hyperuricémie.",
    objectifs: [
      "Réduire l'apport alimentaire en purines",
      "Abaisser et stabiliser l'uricémie (cible usuelle < 60 mg/L)",
      "Espacer et prévenir les crises",
      "Maintenir un poids sain sans perte de poids brutale",
      "Assurer une hydratation abondante pour favoriser l'élimination urinaire",
    ],
    aliments_favorables: [
      { categorie: "Boissons", items: ["Eau plate ou bicarbonatée (2 à 3 L/jour)", "Café (neutre à protecteur)", "Tisanes non sucrées"] },
      { categorie: "Produits laitiers", items: ["Lait demi-écrémé ou écrémé", "Yaourt nature", "Fromage blanc 0 à 3 %"] },
      { categorie: "Fruits", items: ["Cerises et griottes (effet favorable documenté)", "Agrumes, pommes, poires", "Fruits rouges"] },
      { categorie: "Légumes et féculents", items: ["Tous les légumes, y compris asperges et épinards", "Pommes de terre, riz, pâtes, pain", "Légumineuses en quantité usuelle"] },
      { categorie: "Protéines", items: ["Œufs", "Volaille sans peau en portion modérée", "Tofu"] },
    ],
    aliments_a_limiter: [
      "Viandes rouges : maximum 1 à 2 portions de 100 à 120 g par semaine",
      "Poissons gras (sardine, hareng, maquereau) : 1 portion par semaine",
      "Fruits de mer et crustacés : occasionnels",
      "Fructose ajouté : jus de fruits, sirops, confiseries",
      "Vin : maximum 1 verre par jour, jamais quotidien pendant une crise",
    ],
    aliments_a_eviter: [
      { aliment: "Abats (foie, rognons, ris, cervelle)", raison: "Teneur en purines très élevée, montée rapide de l'uricémie" },
      { aliment: "Bière, y compris sans alcool", raison: "Riche en guanosine et bloque l'élimination rénale de l'acide urique" },
      { aliment: "Alcools forts", raison: "Augmentent la production d'acide urique et la déshydratation" },
      { aliment: "Sodas et boissons sucrées au sirop de fructose", raison: "Le fructose accroît directement la synthèse d'acide urique" },
      { aliment: "Extraits de viande, bouillons de viande, gibier", raison: "Concentration importante en purines" },
    ],
    menu_type: {
      petit_dejeuner: "Café ou thé sans sucre, pain complet, fromage blanc 0 %, une orange, un grand verre d'eau",
      dejeuner: "Salade de crudités à l'huile d'olive, pommes de terre vapeur, œufs, yaourt nature, cerises",
      diner: "Soupe de légumes maison, pâtes complètes aux légumes, un peu d'emmental, poire",
      collations: ["Un fruit frais + un yaourt nature", "Un verre de lait écrémé", "Eau à répartir toute la journée"],
    },
    conseils: [
      "Boire régulièrement dans la journée, jusqu'à obtenir des urines claires",
      "Éviter les jeûnes prolongés et les régimes très restrictifs, qui déclenchent des crises",
      "Perdre du poids progressivement (0,5 kg par semaine maximum)",
      "Privilégier les cuissons vapeur ou au four plutôt que les bouillons de viande",
      "Poursuivre le traitement prescrit même en l'absence de crise",
    ],
    signaux_alerte: [
      "Articulation brutalement rouge, chaude, très douloureuse (crise aiguë)",
      "Fièvre associée à une articulation gonflée : éliminer une arthrite infectieuse en urgence",
      "Douleurs lombaires ou sang dans les urines : possible calcul urique",
      "Crises de plus en plus fréquentes malgré le traitement",
    ],
    sources: [
      "EULAR — Recommandations pour la prise en charge de la goutte",
      "HAS — Fiche Bon usage : hyperuricémie et goutte",
      "ANSES — Table de composition nutritionnelle CIQUAL",
    ],
    liens: [{ label: "Fiche calculs rénaux (lithiase urique)", to: "/maladies/calculs-renaux" }],
    date_maj: "2026-08-22",
    motsCles: ["goutte", "acide urique", "purines", "articulation", "hyperuricémie"],
  },
  {
    id: "diabete",
    nom: "Le diabète (type 1 et type 2)",
    emoji: "🩸",
    categorie: "Maladie métabolique",
    resume: "Contrôler la glycémie par la qualité et la répartition des glucides.",
    comprendre:
      "Le diabète correspond à une élévation chronique du glucose sanguin, par défaut de sécrétion d'insuline (type 1) ou par résistance à son action associée à un défaut de sécrétion (type 2). L'alimentation agit sur deux leviers : la quantité de glucides consommée à chaque repas et leur vitesse d'absorption, mesurée par l'index glycémique (IG) et la charge glycémique (CG = IG × grammes de glucides / 100).",
    objectifs: [
      "Stabiliser la glycémie et l'HbA1c",
      "Répartir les glucides régulièrement sur la journée",
      "Privilégier les aliments à index glycémique bas",
      "Prévenir les hypoglycémies chez les patients traités par insuline ou sulfamides",
      "Réduire le risque cardiovasculaire (lipides, sel, poids)",
    ],
    aliments_favorables: [
      { categorie: "Féculents à IG bas", items: ["Légumineuses (lentilles, pois chiches, haricots)", "Pâtes complètes al dente", "Riz basmati, quinoa, boulgour", "Pain complet ou au levain"] },
      { categorie: "Légumes", items: ["Tous les légumes verts et colorés, à chaque repas", "Crudités en entrée pour ralentir l'absorption"] },
      { categorie: "Protéines", items: ["Poissons, dont poissons gras 2 fois par semaine", "Volaille, œufs", "Tofu et protéines végétales"] },
      { categorie: "Matières grasses", items: ["Huile d'olive, huile de colza", "Oléagineux non salés (une petite poignée)", "Avocat"] },
      { categorie: "Fruits", items: ["2 à 3 fruits entiers par jour, répartis", "Pomme, poire, agrumes, fruits rouges"] },
    ],
    aliments_a_limiter: [
      "Pain blanc, baguette, biscottes : préférer les versions complètes",
      "Pommes de terre en purée ou frites : IG élevé, à limiter à 1 à 2 fois par semaine",
      "Fruits très mûrs ou séchés : petites portions (30 g de fruits secs)",
      "Alcool : 1 verre par jour maximum, jamais à jeun (risque d'hypoglycémie)",
      "Produits « sans sucre » industriels : souvent riches en graisses",
    ],
    aliments_a_eviter: [
      { aliment: "Sodas et jus de fruits sucrés", raison: "Élévation glycémique très rapide, sans satiété" },
      { aliment: "Confiseries, viennoiseries, pâtisseries industrielles", raison: "Sucres rapides associés à des graisses saturées" },
      { aliment: "Céréales de petit-déjeuner sucrées", raison: "IG élevé dès le matin, favorise l'hypoglycémie réactionnelle" },
      { aliment: "Plats ultra-transformés riches en sucres cachés", raison: "Charge glycémique élevée et apport sodé important" },
    ],
    tableaux: [
      {
        titre: "Comparatif index glycémique",
        colonnes: ["IG bas (< 55) — à privilégier", "IG modéré (55-69)", "IG élevé (≥ 70) — à limiter"],
        lignes: [
          ["Lentilles, pois chiches", "Riz basmati", "Pain blanc, baguette"],
          ["Pâtes complètes al dente", "Semoule complète", "Purée de pommes de terre"],
          ["Pomme, poire, orange", "Banane mûre", "Dattes, jus de fruits"],
          ["Pain au levain complet", "Pain de seigle", "Corn flakes, riz soufflé"],
          ["Yaourt nature, lait", "Crème glacée", "Sodas, sucre de table"],
        ],
      },
    ],
    encadres: [
      {
        titre: "Diabète gestationnel",
        texte:
          "Objectif : glycémie à jeun < 0,95 g/L et < 1,20 g/L deux heures après le repas. Fractionner en 3 repas et 2 à 3 collations, ne jamais sauter le petit-déjeuner, limiter les glucides du matin (moment de moindre tolérance), maintenir un apport calcique et protéique suffisant pour la grossesse. Surveillance glycémique capillaire pluriquotidienne et suivi obstétrical rapproché indispensables.",
      },
      {
        titre: "Collations et activité physique",
        texte:
          "Une collation glucidique n'est utile que si l'activité dépasse 45 à 60 minutes ou si la glycémie avant l'effort est basse. Pour les patients sous insuline : contrôler la glycémie avant, éventuellement pendant, et après l'effort ; garder toujours 15 g de sucre rapide sur soi (3 morceaux de sucre, une petite briquette de jus).",
      },
    ],
    menu_type: {
      petit_dejeuner: "Pain complet ou au levain, beurre fin, œuf ou fromage blanc, café/thé sans sucre, une pomme",
      dejeuner: "Crudités à l'huile de colza, poisson, lentilles + légumes verts, yaourt nature, un fruit",
      diner: "Soupe de légumes, quinoa aux légumes, blanc de volaille, fromage blanc",
      collations: ["Un fruit + quelques amandes", "Un yaourt nature", "Adapter selon le traitement et l'activité"],
    },
    conseils: [
      "Commencer le repas par les légumes : cela abaisse le pic glycémique",
      "Cuire les féculents al dente et les consommer refroidis quand c'est possible (amidon résistant)",
      "Ne jamais supprimer totalement les glucides : viser une régularité d'un repas à l'autre",
      "Lire les étiquettes : repérer les sucres ajoutés (sirop de glucose, dextrose, maltodextrine)",
      "Associer 30 minutes d'activité physique par jour et une marche après les repas",
    ],
    signaux_alerte: [
      "Hypoglycémie : sueurs, tremblements, confusion — resucrage immédiat",
      "Soif intense, urines abondantes, amaigrissement rapide",
      "Cétose : haleine fruitée, nausées, douleurs abdominales — urgence chez le diabétique de type 1",
      "Plaie du pied qui ne cicatrise pas",
    ],
    sources: [
      "HAS — Guide parcours de soins : diabète de type 2",
      "SFD — Recommandations nutritionnelles de la Société Francophone du Diabète",
      "OMS / ADA Standards of Medical Care in Diabetes",
    ],
    liens: [{ label: "Calculateur de calories et macronutriments", to: "/calculateurs/calories" }],
    date_maj: "2026-08-22",
    motsCles: ["diabète", "glycémie", "index glycémique", "insuline", "sucre"],
  },
  {
    id: "insuffisance-renale",
    nom: "Insuffisance rénale chronique (IRC)",
    emoji: "🩺",
    categorie: "Maladie rénale",
    resume: "Adapter protéines, potassium, phosphore et sodium selon le stade de la maladie.",
    comprendre:
      "L'insuffisance rénale chronique correspond à une diminution progressive et durable de la fonction de filtration des reins, évaluée par le débit de filtration glomérulaire (DFG). À mesure que le DFG baisse, l'organisme accumule des déchets azotés, du phosphore et du potassium. L'objectif diététique est de réduire cette charge sans provoquer de dénutrition, ce qui exige un suivi diététique individualisé et régulier.",
    objectifs: [
      "Adapter l'apport protéique au stade de la maladie",
      "Contrôler le potassium et le phosphore selon le bilan biologique",
      "Limiter le sodium pour maîtriser la pression artérielle et les œdèmes",
      "Couvrir les besoins énergétiques pour éviter la dénutrition",
      "Adapter les apports hydriques selon la diurèse et le stade",
    ],
    aliments_favorables: [
      { categorie: "Féculents pauvres en phosphore", items: ["Riz blanc, pâtes, semoule", "Pain blanc", "Pommes de terre bouillies à grande eau"] },
      { categorie: "Légumes", items: ["Légumes cuits à l'eau, eau de cuisson jetée (réduit le potassium)", "Courgette, haricots verts, carotte, concombre"] },
      { categorie: "Fruits pauvres en potassium", items: ["Pomme, poire, myrtille, ananas", "Fruits au sirop égouttés"] },
      { categorie: "Énergie", items: ["Huiles végétales (olive, colza)", "Beurre doux en quantité mesurée", "Sucres simples si absence de diabète"] },
    ],
    aliments_a_limiter: [
      "Protéines animales : 0,8 g/kg/jour aux stades G3-G4 sauf avis contraire",
      "Produits laitiers : 1 à 2 portions par jour maximum (phosphore)",
      "Fruits et légumes riches en potassium : banane, abricot sec, épinard, avocat",
      "Sel : moins de 6 g/jour, soit 2,3 g de sodium",
      "Chocolat, fruits à coque, légumineuses (potassium et phosphore)",
    ],
    aliments_a_eviter: [
      { aliment: "Sodas au cola et produits contenant des phosphates ajoutés (E338 à E452)", raison: "Phosphore inorganique absorbé à près de 100 %" },
      { aliment: "Sels de régime à base de chlorure de potassium", raison: "Risque d'hyperkaliémie grave" },
      { aliment: "Charcuteries, conserves salées, bouillons cubes", raison: "Charge sodée et phosphorée majeure" },
      { aliment: "Compléments alimentaires non prescrits, phytothérapie", raison: "Risque de néphrotoxicité et de surcharge minérale" },
    ],
    tableaux: [
      {
        titre: "Repères par stade de DFG",
        colonnes: ["Stade", "DFG (mL/min/1,73m²)", "Protéines", "Points de vigilance"],
        lignes: [
          ["G1", "≥ 90", "0,8 à 1 g/kg/j", "Sel < 6 g/j, contrôle du poids et de la tension"],
          ["G2", "60 – 89", "0,8 à 1 g/kg/j", "Idem G1, surveillance biologique annuelle"],
          ["G3a", "45 – 59", "0,8 g/kg/j", "Surveiller potassium et phosphore"],
          ["G3b", "30 – 44", "0,8 g/kg/j", "Restriction potassique fréquente, vitamine D"],
          ["G4", "15 – 29", "0,6 à 0,8 g/kg/j encadré", "Chélateurs du phosphore, préparation à la suppléance"],
          ["G5 pré-dialyse", "< 15", "0,6 g/kg/j encadré", "Risque de dénutrition élevé, suivi rapproché"],
          ["G5 en dialyse", "< 15", "1,2 g/kg/j", "Apports protéiques augmentés, restriction hydrique stricte"],
        ],
      },
    ],
    menu_type: {
      petit_dejeuner: "Pain blanc, beurre, confiture, thé léger",
      dejeuner: "Salade de concombre, 100 g de viande blanche, riz, haricots verts bouillis, compote de pomme",
      diner: "Pâtes à l'huile d'olive, courgettes bouillies, un peu de poisson, poire au sirop",
      collations: ["Biscuits secs", "Compote sans sucre ajouté", "Apports hydriques selon la prescription"],
    },
    conseils: [
      "Faire bouillir les légumes dans un grand volume d'eau et jeter l'eau : jusqu'à 50 % de potassium en moins",
      "Cuisiner sans sel et relever avec herbes, épices, jus de citron, ail",
      "Lire les étiquettes pour repérer les additifs phosphatés en « PHOS »",
      "Ne jamais entreprendre seul une restriction protéique : risque de dénutrition",
      "Se peser régulièrement : une prise de poids rapide signe une rétention hydrique",
    ],
    signaux_alerte: [
      "Œdèmes des jambes ou du visage, prise de poids rapide",
      "Essoufflement au repos ou en position allongée",
      "Crampes, faiblesse musculaire, palpitations : suspicion d'hyperkaliémie",
      "Baisse importante de la quantité d'urines, nausées et vomissements persistants",
    ],
    sources: [
      "KDIGO 2024 — Clinical Practice Guideline for the Evaluation and Management of CKD",
      "HAS — Guide du parcours de soins : maladie rénale chronique de l'adulte",
      "Société Francophone de Néphrologie, Dialyse et Transplantation",
    ],
    liens: [{ label: "Calculateur de DFG (CKD-EPI, MDRD, Cockcroft)", to: "/calculateurs/dfg" }],
    date_maj: "2026-08-22",
    motsCles: ["rein", "irc", "dfg", "potassium", "phosphore", "dialyse", "néphrologie"],
  },
  {
    id: "maladies-inflammatoires",
    nom: "Maladies inflammatoires rhumatismales et auto-immunes",
    emoji: "🔥",
    categorie: "Maladie inflammatoire",
    resume: "Alimentation anti-inflammatoire de type méditerranéen pour soulager les articulations.",
    comprendre:
      "Dans la polyarthrite rhumatoïde, la spondylarthrite ou le lupus, le système immunitaire entretient une inflammation chronique. L'alimentation ne guérit pas la maladie mais module le terrain inflammatoire : les oméga-3, les polyphénols et les fibres réduisent la production de médiateurs pro-inflammatoires, tandis que l'excès de sucres raffinés, de graisses saturées et de produits ultra-transformés l'augmente.",
    objectifs: [
      "Augmenter les apports en oméga-3 à longue chaîne",
      "Enrichir l'alimentation en antioxydants et polyphénols",
      "Réduire les aliments pro-inflammatoires",
      "Maintenir un poids sain pour soulager les articulations portantes",
      "Prévenir l'ostéoporose induite par la corticothérapie",
    ],
    aliments_favorables: [
      { categorie: "Oméga-3", items: ["Poissons gras 2 à 3 fois par semaine : sardine, maquereau, saumon, hareng", "Huile de colza et de noix pour l'assaisonnement", "Graines de lin et de chia moulues"] },
      { categorie: "Fruits et légumes colorés", items: ["Fruits rouges, agrumes, grenade", "Brocoli, chou, épinard, poivron", "Objectif : 5 portions par jour minimum"] },
      { categorie: "Épices et aromates", items: ["Curcuma associé au poivre noir", "Gingembre, cannelle", "Ail, oignon, herbes fraîches"] },
      { categorie: "Autres", items: ["Huile d'olive vierge extra", "Thé vert", "Légumineuses et céréales complètes"] },
      { categorie: "Os et muscle", items: ["Produits laitiers ou boissons enrichies en calcium", "Eaux minérales calciques", "Vitamine D selon prescription"] },
    ],
    aliments_a_limiter: [
      "Viandes rouges : maximum 500 g par semaine",
      "Beurre, crème, fromages gras : usage modéré",
      "Sucres raffinés et pâtisseries",
      "Sel, notamment sous corticothérapie",
      "Alcool : incompatible avec certains traitements de fond (méthotrexate)",
    ],
    aliments_a_eviter: [
      { aliment: "Produits ultra-transformés et fritures", raison: "Riches en acides gras trans et en produits de glycation avancée, pro-inflammatoires" },
      { aliment: "Charcuteries", raison: "Graisses saturées, sel et nitrites" },
      { aliment: "Sodas et boissons sucrées", raison: "Favorisent l'inflammation de bas grade et la prise de poids" },
      { aliment: "Régimes d'exclusion non encadrés (sans gluten, sans laitage systématique)", raison: "Bénéfice non démontré et risque de carences" },
    ],
    encadres: [
      {
        titre: "Polyarthrite rhumatoïde",
        texte:
          "Le régime méditerranéen enrichi en oméga-3 est celui pour lequel les données sont les plus solides : réduction modérée de la douleur et de la raideur matinale. Sous méthotrexate, une supplémentation en acide folique est prescrite par le médecin ; l'alcool doit être évité pour protéger le foie.",
      },
      {
        titre: "Spondylarthrite",
        texte:
          "L'attention porte sur le maintien d'un poids adapté, la prévention de l'ostéoporose (calcium, vitamine D, activité physique) et la santé du microbiote intestinal, souvent altéré dans cette pathologie.",
      },
    ],
    menu_type: {
      petit_dejeuner: "Flocons d'avoine, fruits rouges, graines de lin moulues, yaourt nature, thé vert",
      dejeuner: "Salade de crudités à l'huile de colza, filet de maquereau, boulgour, légumes rôtis au curcuma, orange",
      diner: "Soupe de potiron au gingembre, lentilles aux légumes, pain complet, fromage blanc",
      collations: ["Une poignée de noix", "Un fruit frais"],
    },
    conseils: [
      "Cuisiner à basse température : vapeur, mijoté, papillote plutôt que friture et grillades noircies",
      "Utiliser l'huile de colza crue et réserver l'huile d'olive pour la cuisson douce",
      "Bouger chaque jour, même en poussée : activité douce, adaptée à la douleur",
      "Surveiller le poids en cas de corticothérapie prolongée",
      "Signaler tout complément alimentaire au rhumatologue (interactions possibles)",
    ],
    signaux_alerte: [
      "Poussée inflammatoire avec fièvre persistante",
      "Perte de poids involontaire",
      "Douleurs articulaires nouvelles ou déformations rapides",
      "Effets indésirables digestifs sous traitement de fond",
    ],
    sources: [
      "EULAR — Recommandations sur le mode de vie dans les rhumatismes inflammatoires",
      "INSERM — Dossier polyarthrite rhumatoïde",
      "Revues systématiques sur régime méditerranéen et arthrite (Cochrane)",
    ],
    date_maj: "2026-08-22",
    motsCles: ["inflammation", "polyarthrite", "spondylarthrite", "rhumatisme", "auto-immune", "oméga-3"],
  },
  {
    id: "maladie-coeliaque",
    nom: "La maladie cœliaque",
    emoji: "🌾",
    categorie: "Maladie digestive auto-immune",
    resume: "Éviction totale et définitive du gluten : blé, orge, seigle.",
    comprendre:
      "La maladie cœliaque est une maladie auto-immune déclenchée par le gluten, protéine du blé, de l'orge et du seigle. Chez les personnes prédisposées, son ingestion provoque une destruction des villosités de l'intestin grêle, responsable de malabsorption, de carences et de troubles digestifs. Le seul traitement est l'exclusion stricte et à vie du gluten : même de très petites quantités entretiennent les lésions.",
    objectifs: [
      "Supprimer totalement le gluten de l'alimentation, à vie",
      "Éviter les contaminations croisées, y compris minimes",
      "Corriger les carences fréquentes : fer, folates, vitamine D, calcium, B12",
      "Restaurer la muqueuse intestinale et la croissance chez l'enfant",
      "Maintenir une alimentation variée et plaisante malgré l'éviction",
    ],
    aliments_favorables: [
      { categorie: "Céréales et féculents naturellement sans gluten", items: ["Riz, maïs, sarrasin pur, quinoa, millet", "Pommes de terre, patate douce", "Farines de châtaigne, pois chiche, riz"] },
      { categorie: "Protéines", items: ["Viandes et poissons frais non préparés", "Œufs", "Légumineuses natures"] },
      { categorie: "Fruits et légumes", items: ["Tous, frais ou surgelés natures"] },
      { categorie: "Produits laitiers", items: ["Lait, yaourts natures, fromages non aromatisés"] },
      { categorie: "Produits certifiés", items: ["Produits portant le logo « épi de blé barré »", "Mentions « sans gluten » (< 20 mg/kg)"] },
    ],
    aliments_a_limiter: [
      "Avoine : uniquement si certifiée sans gluten et bien tolérée",
      "Produits industriels sans gluten très transformés : souvent gras et sucrés",
      "Sauces et bouillons du commerce : vérifier chaque étiquette",
      "Charcuteries et plats préparés, même sans céréale apparente",
    ],
    aliments_a_eviter: [
      { aliment: "Blé (dont épeautre, kamut, boulgour, semoule), orge, seigle, triticale", raison: "Contiennent le gluten responsable de la réaction auto-immune" },
      { aliment: "Pain, pâtes, biscuits, viennoiseries ordinaires", raison: "Base de farine de blé" },
      { aliment: "Bière classique, malt d'orge", raison: "Issus de l'orge" },
      { aliment: "Panures, sauces liées à la farine, seitan", raison: "Gluten ajouté ou concentré" },
      { aliment: "Produits en vrac ou frits dans une huile partagée", raison: "Risque élevé de contamination croisée" },
    ],
    conseils: [
      "À la maison : grille-pain, planche, passoire et beurre dédiés sans gluten",
      "Cuisiner les aliments sans gluten en premier, sur un plan de travail nettoyé",
      "Vérifier l'étiquette à chaque achat : les recettes changent sans préavis",
      "Restauration collective : demander un projet d'accueil individualisé (PAI) pour l'enfant scolarisé",
      "Au restaurant : prévenir du caractère médical de l'éviction, éviter fritures et plats panés",
      "Vérifier également l'absence de gluten dans certains médicaments et compléments",
    ],
    menu_type: {
      petit_dejeuner: "Pain sans gluten certifié, beurre, confiture, yaourt nature, jus d'orange pressé",
      dejeuner: "Salade de quinoa aux légumes, poulet rôti maison, fromage, pomme",
      diner: "Soupe de légumes maison, riz, poisson vapeur, compote",
      collations: ["Fruits frais", "Galette de riz + purée d'amande", "Yaourt nature"],
    },
    signaux_alerte: [
      "Diarrhée chronique, ballonnements, douleurs abdominales persistantes malgré le régime",
      "Amaigrissement, fatigue intense, anémie",
      "Retard de croissance ou de puberté chez l'enfant",
      "Aphtes récidivants, éruption cutanée à type de dermatite herpétiforme",
    ],
    sources: [
      "ESsCD — European Society for the Study of Coeliac Disease guidelines",
      "AFDIAG — Association Française Des Intolérants Au Gluten",
      "Règlement européen (UE) n° 828/2014 sur la mention « sans gluten »",
    ],
    date_maj: "2026-08-22",
    motsCles: ["gluten", "cœliaque", "coeliaque", "blé", "intestin", "sans gluten"],
  },
  {
    id: "mici",
    nom: "MICI — maladie de Crohn et rectocolite hémorragique",
    emoji: "🧬",
    categorie: "Maladie digestive inflammatoire",
    resume: "Deux alimentations distinctes : pauvre en résidus en poussée, variée en rémission.",
    comprendre:
      "Les maladies inflammatoires chroniques de l'intestin évoluent par poussées entrecoupées de périodes de rémission. La maladie de Crohn peut toucher tout le tube digestif, la rectocolite hémorragique se limite au côlon et au rectum. L'alimentation n'est pas la cause de la maladie, mais elle module les symptômes : en poussée, il s'agit de mettre l'intestin au repos ; en rémission, l'enjeu est de retrouver une alimentation la plus variée possible et de prévenir les carences.",
    objectifs: [
      "Réduire les symptômes digestifs pendant la poussée",
      "Prévenir la dénutrition et les carences (fer, B12, vitamine D, zinc)",
      "Élargir progressivement l'alimentation en rémission",
      "Maintenir un poids et une masse musculaire stables",
      "Éviter les régimes d'exclusion prolongés non justifiés",
    ],
    volets: [
      {
        titre: "Phase de poussée — alimentation pauvre en résidus",
        texte:
          "Objectif : réduire le volume et l'irritation du bol fécal tout en couvrant les besoins énergétiques. Cette phase doit rester courte et encadrée.",
        points: [
          "Féculents raffinés : riz blanc, pâtes blanches, semoule, pain blanc grillé",
          "Viandes maigres, poissons, œufs, jambon blanc",
          "Légumes cuits mixés et bien tolérés, sans peau ni pépin (carotte, courgette pelée)",
          "Fruits cuits ou en compote, banane bien mûre",
          "Laitages selon la tolérance (fromages à pâte cuite souvent mieux tolérés)",
          "Hydratation renforcée : eau, bouillons, solutions de réhydratation en cas de diarrhée",
          "À écarter temporairement : céréales complètes, légumineuses, crudités, fruits à coque, épices fortes",
        ],
      },
      {
        titre: "Phase de rémission — réintroduction progressive",
        texte:
          "Objectif : revenir à une alimentation variée de type méditerranéen, seule capable d'assurer les apports en fibres, en antioxydants et de préserver le microbiote.",
        points: [
          "Réintroduire un aliment nouveau tous les 2 à 3 jours, en petite quantité",
          "Commencer par les légumes cuits, puis les crudités finement râpées",
          "Puis les céréales semi-complètes, enfin les légumineuses mixées",
          "Tenir un journal alimentaire pour identifier les aliments réellement mal tolérés",
          "Maintenir 2 à 3 portions de poissons gras par semaine (oméga-3)",
          "Ne pas exclure durablement un groupe alimentaire sans avis diététique",
        ],
      },
    ],
    aliments_favorables: [
      { categorie: "En poussée", items: ["Riz blanc, pâtes, pain grillé", "Volaille, poisson vapeur, œufs", "Compotes, bananes mûres", "Bouillons et eaux minérales"] },
      { categorie: "En rémission", items: ["Légumes cuits variés puis crus", "Poissons gras, huile d'olive et de colza", "Céréales semi-complètes", "Yaourts et aliments fermentés selon tolérance"] },
    ],
    aliments_a_limiter: [
      "Fibres insolubles (son, céréales complètes) pendant et juste après la poussée",
      "Lactose en cas d'intolérance transitoire, fréquente dans la maladie de Crohn",
      "Graisses cuites et fritures",
      "Édulcorants type sorbitol et polyols (effet laxatif)",
      "Caféine et boissons gazeuses en période symptomatique",
    ],
    aliments_a_eviter: [
      { aliment: "Alcool", raison: "Irritant muqueux et interactions avec les traitements" },
      { aliment: "Tabac (facteur aggravant majeur du Crohn)", raison: "Multiplie le risque de poussée et de récidive post-opératoire" },
      { aliment: "Produits ultra-transformés, émulsifiants (E433, E466)", raison: "Données évoquant une altération de la barrière intestinale" },
      { aliment: "Aliments épicés et très gras pendant la poussée", raison: "Aggravent douleurs et diarrhée" },
    ],
    encadres: [
      {
        titre: "Crohn vs RCH",
        texte:
          "Crohn : atteinte possible de tout le tube digestif, risque de sténose imposant parfois une alimentation pauvre en fibres durable, malabsorption de la vitamine B12 en cas d'atteinte ou de résection iléale. RCH : atteinte colorectale, pertes sanguines chroniques exposant à l'anémie ferriprive, tolérance aux fibres généralement meilleure en rémission.",
      },
    ],
    menu_type: {
      petit_dejeuner: "Pain blanc grillé, beurre, compote, thé léger (poussée) — pain semi-complet et fruit frais en rémission",
      dejeuner: "Riz blanc, blanc de volaille, carottes cuites mixées, yaourt nature, banane",
      diner: "Bouillon de légumes filtré, pâtes, jambon blanc, compote de pomme",
      collations: ["Compote", "Yaourt", "Biscuits secs", "Boissons à répartir entre les repas"],
    },
    conseils: [
      "Manger lentement, en petites quantités fractionnées (4 à 6 prises)",
      "Boire entre les repas plutôt que pendant",
      "Tenir un journal alimentaire et symptômes pour objectiver les intolérances",
      "Surveiller le poids : toute perte supérieure à 5 % doit être signalée",
      "Faire contrôler régulièrement fer, ferritine, vitamine B12 et vitamine D",
    ],
    signaux_alerte: [
      "Diarrhée glairo-sanglante, plus de 6 selles par jour",
      "Fièvre, douleurs abdominales intenses, arrêt des gaz (occlusion)",
      "Perte de poids rapide, fatigue majeure",
      "Manifestations extra-digestives : articulaires, cutanées, oculaires",
    ],
    sources: [
      "ECCO — European Crohn's and Colitis Organisation guidelines",
      "ESPEN — Practical guideline: Clinical nutrition in inflammatory bowel disease",
      "AFA Crohn RCH France",
    ],
    date_maj: "2026-08-22",
    motsCles: ["mici", "crohn", "rch", "rectocolite", "intestin", "poussée", "résidus"],
  },
  {
    id: "cancer",
    nom: "Le patient cancéreux",
    emoji: "🎗️",
    categorie: "Oncologie",
    resume: "Prévenir la dénutrition et adapter l'alimentation aux effets des traitements.",
    comprendre:
      "Le cancer et ses traitements augmentent les besoins énergétiques et protéiques tout en réduisant les apports (perte d'appétit, nausées, troubles du goût, mucite). La dénutrition concerne jusqu'à 40 % des patients : elle diminue la tolérance aux traitements, augmente les complications et altère la qualité de vie. La priorité n'est donc pas de restreindre, mais d'enrichir et d'adapter.",
    objectifs: [
      "Prévenir et corriger la dénutrition",
      "Couvrir des besoins élevés : 30 à 35 kcal/kg/jour et 1,2 à 1,5 g de protéines/kg/jour",
      "Préserver la masse musculaire",
      "Adapter textures et saveurs aux effets secondaires",
      "Respecter des règles d'hygiène strictes en période d'immunodépression",
    ],
    aliments_favorables: [
      { categorie: "Densité énergétique et protéique", items: ["Œufs, fromage râpé, poudre de lait ajoutés aux préparations", "Crèmes desserts, entremets au lait entier", "Huiles végétales et beurre ajoutés aux plats", "Compléments nutritionnels oraux si prescrits"] },
      { categorie: "Protéines bien tolérées", items: ["Viandes hachées, poisson, jambon blanc", "Œufs sous toutes formes", "Laitages entiers, fromages à pâte cuite"] },
      { categorie: "Textures adaptées", items: ["Purées, veloutés enrichis", "Aliments froids ou tièdes en cas de nausées", "Boissons fraîches, glaces en cas de mucite"] },
    ],
    aliments_a_limiter: [
      "Aliments à odeur forte pendant les phases de nausée",
      "Aliments acides ou épicés en cas de mucite",
      "Boissons gazeuses et aliments très fibreux en cas de diarrhée",
      "Repas volumineux : préférer 5 à 6 petites prises",
    ],
    aliments_a_eviter: [
      { aliment: "Alcool", raison: "Irritant, interactions avec les traitements, majore la mucite" },
      { aliment: "Viandes et poissons crus, œufs crus, coquillages (en neutropénie)", raison: "Risque infectieux majeur en immunodépression" },
      { aliment: "Fromages au lait cru, croûtes fleuries, charcuteries à la coupe", raison: "Risque de listériose" },
      { aliment: "Fruits et légumes crus non pelés, graines germées (en neutropénie)", raison: "Contamination bactérienne possible" },
      { aliment: "Régimes restrictifs « anti-cancer » non validés (jeûne, cétogène strict)", raison: "Aggravent la dénutrition sans bénéfice démontré" },
    ],
    tableaux: [
      {
        titre: "Adapter selon l'effet secondaire",
        colonnes: ["Symptôme", "Conduite alimentaire"],
        lignes: [
          ["Nausées / vomissements", "Repas froids ou tièdes, peu odorants, fractionnés ; boire entre les repas ; gingembre"],
          ["Altération du goût", "Marinades, herbes aromatiques, jus de citron ; couverts en plastique si goût métallique"],
          ["Mucite / aphtes", "Textures lisses et froides, éviter acide, épicé, croustillant ; boire à la paille"],
          ["Perte d'appétit", "Petites assiettes enrichies, collations régulières, convivialité du repas"],
          ["Diarrhée", "Riz, carotte cuite, banane, réhydratation ; éviter fibres et lactose transitoirement"],
          ["Constipation (opioïdes)", "Hydratation, fibres douces, activité physique légère, avis médical"],
        ],
      },
    ],
    menu_type: {
      petit_dejeuner: "Lait entier enrichi en poudre de lait, pain, beurre, miel, compote",
      dejeuner: "Velouté enrichi à la crème et au fromage, viande hachée moelleuse, purée à l'huile d'olive, crème dessert",
      diner: "Œufs brouillés, semoule au beurre, légumes fondants, fromage blanc entier au sucre",
      collations: ["Milk-shake ou smoothie au lait entier", "Fromage + biscuits", "Complément nutritionnel oral si prescrit"],
    },
    conseils: [
      "Enrichir sans augmenter le volume : ajouter œuf, fromage, crème, huile aux plats habituels",
      "Se peser une fois par semaine dans les mêmes conditions",
      "Manger quand l'appétit est présent, souvent le matin",
      "Hygiène stricte en neutropénie : lavage des mains, cuisson à cœur, respect des dates limites",
      "Signaler toute perte de poids à l'équipe soignante : une prise en charge nutritionnelle précoce est possible",
    ],
    signaux_alerte: [
      "Perte de poids supérieure à 5 % en un mois ou 10 % en six mois",
      "Impossibilité de s'alimenter plus de 48 heures",
      "Fièvre supérieure à 38 °C en période d'aplasie : urgence absolue",
      "Vomissements ou diarrhées persistants, signes de déshydratation",
    ],
    sources: [
      "ESPEN — Practical guidelines: Clinical nutrition in cancer",
      "INCa — Institut National du Cancer, nutrition et cancer",
      "HAS — Diagnostic de la dénutrition de l'adulte (2021)",
    ],
    liens: [{ label: "Calculateur de besoins caloriques", to: "/calculateurs/calories" }],
    date_maj: "2026-08-22",
    motsCles: ["cancer", "dénutrition", "chimiothérapie", "oncologie", "nausées", "protéines"],
  },
];

export const getPathologie = (id: string) => pathologies.find((p) => p.id === id);
