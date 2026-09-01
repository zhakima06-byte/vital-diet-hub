export type JourMenu = {
  jour: string;
  petitDejeuner: string;
  dejeuner: string;
  collation: string;
  diner: string;
};

export type Menu7j = {
  slug: string;
  titre: string;
  emoji: string;
  descriptif: string;
  reperes: string[];
  jours: JourMenu[];
};

const j = (
  jour: string,
  petitDejeuner: string,
  dejeuner: string,
  collation: string,
  diner: string,
): JourMenu => ({ jour, petitDejeuner, dejeuner, collation, diner });

export const menus7j: Menu7j[] = [
  {
    slug: "mediterraneen",
    titre: "Menu méditerranéen — 7 jours",
    emoji: "🫒",
    descriptif:
      "Sept journées équilibrées autour des végétaux, de l'huile d'olive, des légumineuses et du poisson. Base d'environ 1 900 à 2 100 kcal/jour, à ajuster selon vos besoins.",
    reperes: [
      "3 à 4 cuillères à soupe d'huile d'olive par jour",
      "2 à 3 portions de poisson par semaine dont 1 poisson gras",
      "Légumineuses 3 à 4 fois par semaine",
      "Viande rouge 1 fois par semaine maximum",
    ],
    jours: [
      j("Lundi", "Pain complet, huile d'olive, fromage frais, orange, thé", "Salade de lentilles, tomates, feta, poisson blanc grillé, pain complet", "Yaourt nature + amandes", "Soupe de légumes, boulgour, courgettes rôties"),
      j("Mardi", "Flocons d'avoine, lait, figues sèches, noix", "Pois chiches rôtis, riz complet, ratatouille, huile d'olive", "Pomme + 2 noix", "Omelette aux herbes, salade verte, pain complet"),
      j("Mercredi", "Yaourt grec, miel, fruits rouges, pain complet", "Sardines grillées, semoule complète, légumes vapeur", "Poignée de noisettes", "Velouté de potiron, salade de haricots blancs"),
      j("Jeudi", "Pain complet, purée d'amande, kiwi, café", "Salade grecque, thon, pommes de terre, huile d'olive", "Yaourt nature + raisins", "Soupe de lentilles corail, pain complet, fromage frais"),
      j("Vendredi", "Fromage blanc, muesli sans sucre, poire", "Saumon au four, quinoa, brocolis à l'huile d'olive", "Orange + amandes", "Tarte fine aux légumes, salade de roquette"),
      j("Samedi", "Pain au levain, tomate, huile d'olive, œuf mollet", "Poulet aux olives et citron, riz complet, épinards", "Yaourt + dattes", "Soupe minestrone, pain complet, fromage"),
      j("Dimanche", "Crêpe de blé complet, compote sans sucre, thé", "Poisson en papillote, pommes de terre, salade composée", "Fruit de saison", "Houmous, crudités, pain complet, fruit"),
    ],
  },
  {
    slug: "keto",
    titre: "Menu cétogène — 7 jours",
    emoji: "🥑",
    descriptif:
      "Menus très pauvres en glucides (20 à 30 g/jour), riches en lipides et modérés en protéines. À conduire avec un suivi médical, surtout en cas de traitement antidiabétique.",
    reperes: [
      "≤ 20–30 g de glucides nets par jour",
      "70–75 % lipides · 20–25 % protéines · 5 % glucides",
      "Hydratation renforcée + apports en sel, potassium et magnésium",
      "Légumes pauvres en glucides à chaque repas",
    ],
    jours: [
      j("Lundi", "Œufs brouillés au beurre, avocat, café crème", "Saumon, épinards à la crème, huile d'olive", "Fromage à pâte dure", "Poulet grillé, courgettes sautées, beurre"),
      j("Mardi", "Omelette au fromage, tranches d'avocat", "Steak haché, brocolis, sauce beurre-citron", "Poignée de noix de macadamia", "Poisson blanc, chou-fleur rôti à l'huile"),
      j("Mercredi", "Yaourt grec entier, graines de chia, noix", "Salade César sans croûtons, poulet, parmesan", "Œuf dur + olives", "Travers de porc, haricots verts au beurre"),
      j("Jeudi", "Café MCT, œufs au plat, bacon", "Sardines, salade d'avocat et concombre", "Fromage frais + amandes", "Curry de crevettes au lait de coco, chou-fleur"),
      j("Vendredi", "Pancakes à la farine d'amande, beurre", "Bœuf sauté, poivrons, huile d'olive", "Rillettes de thon, céleri branche", "Omelette aux champignons, salade verte"),
      j("Samedi", "Œufs pochés, épinards, avocat", "Magret de canard, poêlée d'asperges", "Chocolat noir 90 % (2 carrés)", "Soupe de courgettes à la crème, fromage"),
      j("Dimanche", "Fromage blanc entier, graines de lin, noisettes", "Rôti de porc, gratin de chou-fleur", "Olives + fromage", "Saumon fumé, salade de roquette à l'huile"),
    ],
  },
  {
    slug: "jeune-intermittent",
    titre: "Menu jeûne intermittent — 7 jours",
    emoji: "⏱️",
    descriptif:
      "Protocole 16/8 (fenêtre alimentaire 12 h – 20 h) avec deux journées type 5:2 en option. Les repas restent équilibrés : le jeûne organise les horaires, pas la qualité nutritionnelle.",
    reperes: [
      "16/8 : jeûne de 20 h à 12 h, 2 à 3 repas dans la fenêtre",
      "5:2 : 2 journées à 500–600 kcal non consécutives",
      "Eau, thé et café non sucrés autorisés pendant le jeûne",
      "Contre-indiqué en cas de grossesse, TCA, diabète traité par insuline sans avis médical",
    ],
    jours: [
      j("Lundi (16/8)", "Jeûne — eau, thé, café noir", "12 h : bol de quinoa, poulet, légumes rôtis, huile d'olive", "16 h : yaourt nature + fruit + amandes", "19 h 30 : soupe de légumes, omelette, pain complet"),
      j("Mardi (16/8)", "Jeûne", "12 h : salade de lentilles, œuf dur, crudités", "16 h : fromage blanc + noix", "19 h 30 : poisson vapeur, riz complet, légumes verts"),
      j("Mercredi (5:2 léger)", "Jeûne", "12 h : bouillon de légumes + blanc de dinde (≈ 250 kcal)", "—", "19 h : soupe de légumes + yaourt nature (≈ 300 kcal)"),
      j("Jeudi (16/8)", "Jeûne", "12 h : pois chiches rôtis, semoule complète, ratatouille", "16 h : fruit + carré de chocolat noir", "19 h 30 : poulet, purée de patate douce, salade"),
      j("Vendredi (16/8)", "Jeûne", "12 h : saumon, pommes de terre, brocolis", "16 h : yaourt grec + fruits rouges", "19 h 30 : soupe, tartine de pain complet, fromage"),
      j("Samedi (5:2 léger)", "Jeûne", "13 h : salade verte, thon nature, tomates (≈ 250 kcal)", "—", "19 h : velouté de courgettes, fromage blanc (≈ 300 kcal)"),
      j("Dimanche (16/8)", "Jeûne", "12 h 30 : repas familial équilibré, légumes en entrée", "16 h : fruit de saison", "19 h 30 : soupe + tartine d'avocat et œuf"),
    ],
  },
  {
    slug: "vegetarien",
    titre: "Menu végétarien — 7 jours",
    emoji: "🥗",
    descriptif:
      "Menus sans chair animale, construits pour couvrir protéines, fer, zinc et vitamine B12 grâce à l'association céréales + légumineuses et aux produits laitiers ou œufs.",
    reperes: [
      "Une source protéique végétale à chaque repas",
      "Céréale + légumineuse dans la même journée",
      "Vitamine C au même repas pour l'absorption du fer",
      "Supplémentation en B12 à discuter avec le médecin",
    ],
    jours: [
      j("Lundi", "Porridge d'avoine, lait, banane, graines de courge", "Chili sin carne (haricots rouges), riz complet, avocat", "Yaourt + noix", "Soupe de pois cassés, pain complet, fromage"),
      j("Mardi", "Pain complet, purée de cacahuète, orange", "Buddha bowl : quinoa, pois chiches, crudités, tahini", "Fruit + amandes", "Gratin de courgettes aux œufs, salade"),
      j("Mercredi", "Fromage blanc, muesli, fruits rouges", "Curry de lentilles corail, riz basmati, épinards", "Compote + noisettes", "Omelette aux champignons, salade, pain"),
      j("Jeudi", "Tartines d'avocat, œuf poché, jus d'orange", "Galettes de sarrasin aux légumes, fromage, salade", "Yaourt nature", "Soupe de légumes, houmous, pain complet"),
      j("Vendredi", "Smoothie lait-banane-graines de chia", "Tofu mariné sauté, nouilles complètes, brocolis", "Fruit + carré de chocolat noir", "Salade de haricots blancs, tomates, feta"),
      j("Samedi", "Pain au levain, fromage frais, kiwi", "Lasagnes végétariennes (ricotta, épinards), salade", "Yaourt + graines", "Velouté de potiron, œuf dur, pain complet"),
      j("Dimanche", "Pancakes, compote sans sucre, thé", "Tajine de légumes et pois chiches, semoule complète", "Fruit de saison", "Soupe de lentilles, tartine de fromage"),
    ],
  },
  {
    slug: "dash",
    titre: "Menu DASH (pauvre en sel) — 7 jours",
    emoji: "🫀",
    descriptif:
      "Menus destinés au contrôle de la pression artérielle : moins de 5 à 6 g de sel par jour, apports renforcés en potassium, calcium et magnésium.",
    reperes: [
      "≤ 5–6 g de sel par jour (≈ 2 000–2 400 mg de sodium)",
      "≥ 5 portions de fruits et légumes par jour",
      "2 à 3 produits laitiers pauvres en matières grasses",
      "Herbes, épices, citron et ail à la place du sel",
    ],
    jours: [
      j("Lundi", "Pain sans sel ajouté, fromage blanc 0 %, banane", "Volaille aux herbes, riz complet, haricots verts, fruit", "Yaourt nature + amandes non salées", "Soupe maison sans sel, poisson vapeur, pommes de terre"),
      j("Mardi", "Flocons d'avoine, lait demi-écrémé, kiwi", "Salade de lentilles, tomates, huile de colza, pain complet", "Fruit de saison", "Omelette aux fines herbes, épinards, riz"),
      j("Mercredi", "Pain complet, fromage frais non salé, orange", "Poisson blanc citronné, semoule, courgettes", "Yaourt + abricots secs", "Velouté de légumes maison, œuf dur, pain sans sel"),
      j("Jeudi", "Yaourt nature, muesli sans sucre, fraises", "Poulet paprika, patate douce, brocolis", "Poignée de noix non salées", "Soupe de haricots blancs, salade, fruit"),
      j("Vendredi", "Pain complet, purée d'amande, pomme", "Sardines fraîches grillées, riz complet, ratatouille", "Fromage blanc + banane", "Potage de poireaux, pâtes complètes, salade"),
      j("Samedi", "Porridge, lait, fruits rouges", "Bœuf maigre (portion modérée), boulgour, carottes", "Yaourt nature", "Soupe de courgettes, tartine de fromage frais"),
      j("Dimanche", "Pain complet, œuf mollet, jus d'orange pressé", "Poisson en papillote aux herbes, pommes de terre, salade", "Fruit + amandes", "Velouté de légumes, riz au lait maison peu sucré"),
    ],
  },
  {
    slug: "sans-gluten",
    titre: "Menu sans gluten — 7 jours",
    emoji: "🌾",
    descriptif:
      "Menus strictement sans blé, seigle, orge ni avoine non certifiée, adaptés à la maladie cœliaque. Attention aux contaminations croisées (grille-pain, planches, sauces).",
    reperes: [
      "Céréales sûres : riz, maïs, sarrasin, quinoa, millet",
      "Vérifier la mention « sans gluten » sur tous les produits transformés",
      "Ustensiles et surfaces dédiés pour éviter les traces",
      "Surveiller fer, calcium et vitamine D",
    ],
    jours: [
      j("Lundi", "Riz soufflé, lait, banane, amandes", "Riz, poulet grillé, légumes vapeur, huile d'olive", "Yaourt nature + fruit", "Galette de sarrasin (100 % sarrasin), œuf, salade"),
      j("Mardi", "Pain sans gluten, fromage frais, kiwi", "Quinoa, pois chiches, crudités, vinaigrette maison", "Compote + noisettes", "Poisson vapeur, purée de pommes de terre, épinards"),
      j("Mercredi", "Porridge de millet, lait, fruits rouges", "Salade de riz, thon nature, tomates, maïs", "Fruit de saison", "Soupe de légumes, omelette, pain sans gluten"),
      j("Jeudi", "Yaourt, flocons de sarrasin, poire", "Pâtes de riz, sauce tomate maison, viande hachée", "Fromage blanc + amandes", "Velouté de potiron, œufs durs, salade"),
      j("Vendredi", "Pain sans gluten, purée d'amande, orange", "Saumon, polenta, brocolis", "Yaourt + fruit", "Riz aux légumes, tofu nature, huile d'olive"),
      j("Samedi", "Crêpe de sarrasin sucrée, compote", "Poulet rôti, pommes de terre, haricots verts", "Fruit + chocolat noir", "Soupe de lentilles, fromage, pain sans gluten"),
      j("Dimanche", "Riz au lait maison, fruits frais", "Papillote de poisson, quinoa, courgettes", "Yaourt nature", "Salade composée (riz, œuf, crudités), fruit"),
    ],
  },
];

export const getMenu7j = (slug: string) => menus7j.find((m) => m.slug === slug);

/* ---------- Menus recommandés selon le statut pondéral (IMC) ---------- */

export type StatutIMC = "sous-poids" | "normal" | "surpoids" | "obesite";

export type MenuIMC = {
  statut: StatutIMC;
  label: string;
  couleur: "bleu" | "vert" | "rose" | "violet";
  message: string;
  orientation: string;
  repas: { repas: string; contenu: string }[];
  conseils: string[];
  menu7j: string;
};

export const menusIMC: Record<StatutIMC, MenuIMC> = {
  "sous-poids": {
    statut: "sous-poids",
    label: "Sous-poids",
    couleur: "bleu",
    message:
      "Votre IMC est inférieur à 18,5. L'objectif est de reprendre du poids sereinement, avec des repas denses en énergie et fractionnés — sans forcer sur les aliments ultra-transformés.",
    orientation: "Menu hypercalorique équilibré, riche en bonnes graisses, protéines et féculents, fractionné en 5 prises.",
    repas: [
      { repas: "Petit-déjeuner", contenu: "Porridge au lait entier, purée d'amande, banane, miel, œuf" },
      { repas: "Collation du matin", contenu: "Yaourt grec entier + fruits secs + noix" },
      { repas: "Déjeuner", contenu: "Féculent complet généreux, viande ou poisson, légumes à l'huile d'olive, fromage, pain" },
      { repas: "Collation", contenu: "Pain complet + fromage + smoothie lait-fruit" },
      { repas: "Dîner", contenu: "Soupe enrichie (crème, fromage râpé), gratin de pâtes, dessert lacté" },
    ],
    conseils: [
      "Enrichir plutôt qu'augmenter les volumes : huile, poudre de lait, fromage râpé, œuf",
      "5 prises alimentaires par jour, à horaires réguliers",
      "Consulter en cas de perte de poids involontaire ou rapide",
    ],
    menu7j: "mediterraneen",
  },
  normal: {
    statut: "normal",
    label: "Poids normal",
    couleur: "vert",
    message:
      "Votre IMC se situe dans la zone de référence (18,5 – 24,9). L'objectif est le maintien, avec une alimentation variée de type méditerranéen.",
    orientation: "Menu d'équilibre alimentaire type méditerranéen, pour maintien du poids.",
    repas: [
      { repas: "Petit-déjeuner", contenu: "Pain complet, huile d'olive ou beurre, fromage frais, fruit, boisson non sucrée" },
      { repas: "Déjeuner", contenu: "Crudités, poisson ou légumineuses, céréales complètes, légumes cuits, fruit" },
      { repas: "Collation", contenu: "Yaourt nature + poignée d'amandes" },
      { repas: "Dîner", contenu: "Soupe de légumes, boulgour ou pommes de terre, légumes rôtis, fromage" },
    ],
    conseils: [
      "5 portions de fruits et légumes par jour",
      "Poisson 2 à 3 fois par semaine, légumineuses 3 à 4 fois",
      "30 minutes d'activité physique quotidienne",
    ],
    menu7j: "mediterraneen",
  },
  surpoids: {
    statut: "surpoids",
    label: "Surpoids",
    couleur: "rose",
    message:
      "Votre IMC se situe entre 25 et 29,9. Une perte de 5 à 10 % du poids suffit souvent à améliorer nettement la tension, la glycémie et le profil lipidique.",
    orientation: "Menu hypocalorique modéré, riche en fibres et légumes, portions contrôlées.",
    repas: [
      { repas: "Petit-déjeuner", contenu: "Fromage blanc 0 %, flocons d'avoine, fruit frais, thé ou café sans sucre" },
      { repas: "Déjeuner", contenu: "Assiette : ½ légumes, ¼ protéines maigres, ¼ féculents complets, 1 c. à s. d'huile" },
      { repas: "Collation", contenu: "Fruit + yaourt nature (si faim réelle)" },
      { repas: "Dîner", contenu: "Grande soupe de légumes, œufs ou poisson, petite portion de féculents" },
    ],
    conseils: [
      "Commencer chaque repas par des légumes ou une soupe",
      "Supprimer les boissons sucrées et l'alcool régulier",
      "Manger lentement, sans écran, et respecter la satiété",
    ],
    menu7j: "mediterraneen",
  },
  obesite: {
    statut: "obesite",
    label: "Obésité",
    couleur: "violet",
    message:
      "Votre IMC est supérieur ou égal à 30. Un accompagnement médical et diététique personnalisé est vivement recommandé : les régimes très restrictifs isolés favorisent la reprise de poids.",
    orientation: "Menu hypocalorique structuré avec suivi renforcé et accompagnement médical.",
    repas: [
      { repas: "Petit-déjeuner", contenu: "Fromage blanc 0 %, 2 tranches de pain complet, fruit, boisson non sucrée" },
      { repas: "Déjeuner", contenu: "Crudités vinaigrette légère, 120 g de protéines maigres, légumes à volonté, 4 c. à s. de féculents" },
      { repas: "Collation", contenu: "1 fruit ou 1 yaourt nature" },
      { repas: "Dîner", contenu: "Soupe de légumes maison, poisson vapeur, légumes, 1 produit laitier" },
    ],
    conseils: [
      "Objectif réaliste : 5 à 10 % de perte de poids en 6 mois",
      "Consultation diététique et bilan médical (tension, glycémie, lipides)",
      "Activité physique adaptée, progressive, y compris en renforcement musculaire",
    ],
    menu7j: "dash",
  },
};

export const statutFromIMC = (imc: number): StatutIMC =>
  imc < 18.5 ? "sous-poids" : imc < 25 ? "normal" : imc < 30 ? "surpoids" : "obesite";
