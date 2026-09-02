import mediterraneenImg from "@/assets/fiche-mediterraneen.jpg";
import ketoImg from "@/assets/fiche-keto.jpg";
import intermittentImg from "@/assets/fiche-intermittent.jpg";

export type TonFiche = "vert" | "violet" | "rose";

export type FicheRegime = {
  slug: string;
  nom: string;
  emoji: string;
  ton: TonFiche;
  image: string;
  fichier: string;
  /** slug du menu 7 jours dans src/data/menus.ts */
  menuSlug: string;
  descriptif: string;
  principe: string;
  benefices: string[];
  precautions: string[];
  privilegier: string[];
  limiter: string[];
  eviter: string[];
  conseils: string[];
  reperesCalories: string;
};

export const fichesRegimes: FicheRegime[] = [
  {
    slug: "mediterraneen",
    nom: "Régime méditerranéen",
    emoji: "🫒",
    ton: "vert",
    image: mediterraneenImg,
    fichier: "fiche-regime-mediterraneen.pdf",
    menuSlug: "mediterraneen",
    descriptif:
      "Modèle alimentaire de référence, riche en végétaux, en huile d'olive et en poisson, associé à une meilleure santé cardiovasculaire.",
    principe:
      "L'alimentation méditerranéenne repose sur des végétaux à chaque repas (légumes, fruits, légumineuses, céréales complètes), l'huile d'olive comme matière grasse principale, du poisson deux à trois fois par semaine, des produits laitiers en quantité modérée et une consommation occasionnelle de viande rouge et de produits sucrés. Elle valorise aussi la convivialité des repas et l'activité physique quotidienne.",
    benefices: [
      "Réduction du risque cardiovasculaire et amélioration du profil lipidique",
      "Meilleur contrôle de la pression artérielle et de la glycémie",
      "Apports élevés en fibres, polyphénols et acides gras oméga-3",
      "Régime durable, facile à tenir dans le temps et en famille",
    ],
    precautions: [
      "Adapter les portions de légumineuses et de fruits secs en cas d'insuffisance rénale (potassium, phosphore)",
      "Surveiller les quantités d'huile d'olive si l'objectif est une perte de poids",
      "Attention aux poissons et fruits de mer en cas d'allergie ou de goutte (purines)",
    ],
    privilegier: [
      "Légumes crus et cuits à chaque repas",
      "Fruits frais de saison (2 à 3 par jour)",
      "Huile d'olive vierge extra (3 à 4 c. à soupe/jour)",
      "Légumineuses 3 à 4 fois par semaine",
      "Céréales complètes : pain complet, boulgour, riz complet, quinoa",
      "Poissons gras (sardine, maquereau, saumon) 1 à 2 fois par semaine",
      "Fruits à coque non salés (une petite poignée/jour)",
      "Herbes aromatiques, ail, citron à la place du sel",
    ],
    limiter: [
      "Viande rouge (1 fois par semaine maximum)",
      "Fromages et produits laitiers entiers",
      "Pain blanc, riz blanc et pâtes raffinées",
      "Vin : au maximum un verre par repas, jamais recommandé à initier",
    ],
    eviter: [
      "Charcuteries et viandes transformées",
      "Boissons sucrées et sodas",
      "Pâtisseries industrielles, biscuits et viennoiseries",
      "Plats préparés riches en sel et en graisses saturées",
    ],
    conseils: [
      "Courses : constituer un placard de base (huile d'olive, conserves de légumineuses, tomates concassées, thon/sardines, épices).",
      "Préparation : cuisiner une grande casserole de légumineuses ou de soupe le week-end pour la semaine.",
      "Assiette repère : ½ légumes, ¼ féculents complets, ¼ protéines, + huile d'olive crue.",
      "Durabilité : garder un repas plaisir par semaine, remplacer plutôt qu'interdire.",
    ],
    reperesCalories:
      "Le menu type se situe autour de 1 900 à 2 100 kcal/jour ; ajustez les portions de féculents et d'huile selon votre objectif calorique.",
  },
  {
    slug: "keto",
    nom: "Régime Keto (cétogène)",
    emoji: "🥑",
    ton: "violet",
    image: ketoImg,
    fichier: "fiche-regime-keto.pdf",
    menuSlug: "keto",
    descriptif:
      "Alimentation très pauvre en glucides et riche en lipides, qui met l'organisme en cétose. À conduire avec un accompagnement médical.",
    principe:
      "Le régime cétogène limite les glucides à 20–50 g par jour, apporte 70–75 % de l'énergie sous forme de lipides et maintient un apport protéique modéré (20–25 %). Privé de glucose, le foie produit des corps cétoniques utilisés comme carburant par le cerveau et les muscles. Cette adaptation prend 3 à 7 jours et peut s'accompagner d'une « grippe cétogène » transitoire.",
    benefices: [
      "Perte de poids rapide les premières semaines (dont perte d'eau)",
      "Réduction de l'appétit et stabilisation de la glycémie",
      "Indication médicale reconnue dans certaines épilepsies pharmacorésistantes",
      "Diminution des triglycérides chez de nombreux patients",
    ],
    precautions: [
      "Contre-indiqué en cas de grossesse, allaitement, troubles du comportement alimentaire",
      "Contre-indiqué en cas d'insuffisance hépatique, pancréatite, déficits enzymatiques de la bêta-oxydation",
      "Insuffisance rénale : avis médical obligatoire avant toute mise en route",
      "Diabète traité par insuline ou inhibiteurs SGLT2 : risque d'hypoglycémie et d'acidocétose — adaptation des doses par le médecin",
      "Surveiller l'hydratation, le sel, le potassium et le magnésium ; supplémenter en fibres si constipation",
    ],
    privilegier: [
      "Huiles (olive, colza, coco), beurre, crème entière",
      "Avocat, olives, fruits à coque (macadamia, noix, amandes)",
      "Poissons gras, viandes, volailles, œufs",
      "Fromages à pâte dure et fromages frais entiers",
      "Légumes pauvres en glucides : courgette, épinard, brocoli, chou-fleur, salade",
      "Eau, thé, café non sucrés, bouillon salé",
    ],
    limiter: [
      "Fruits : uniquement petits fruits rouges en petite quantité",
      "Produits laitiers sucrés et lait (lactose)",
      "Légumes racines : carotte, betterave, panais",
      "Chocolat noir ≥ 90 % (2 carrés maximum)",
    ],
    eviter: [
      "Pain, pâtes, riz, pommes de terre, semoule, légumineuses",
      "Sucre, miel, confitures, jus de fruits, sodas",
      "Pâtisseries, biscuits, céréales du petit-déjeuner",
      "Produits « allégés en graisses » enrichis en sucres",
    ],
    conseils: [
      "Courses : lire systématiquement les étiquettes (glucides pour 100 g) et éviter les sauces sucrées.",
      "Préparation : prévoir des en-cas prêts (œufs durs, fromage, oléagineux) pour éviter les écarts.",
      "Transition : diminuer les glucides progressivement sur 3 à 5 jours pour limiter la grippe cétogène.",
      "Durée : régime à conduire sur une période définie et réévaluée, avec bilan biologique de contrôle.",
    ],
    reperesCalories:
      "Le menu type se situe autour de 1 700 à 1 900 kcal/jour, avec ≤ 30 g de glucides nets ; la densité énergétique des lipides impose de peser les matières grasses.",
  },
  {
    slug: "intermittent",
    nom: "Régimes intermittents (jeûne)",
    emoji: "⏱️",
    ton: "rose",
    image: intermittentImg,
    fichier: "fiche-regime-intermittent.pdf",
    menuSlug: "jeune-intermittent",
    descriptif:
      "Plusieurs protocoles (16/8, 5:2, jeûne alterné) qui organisent les horaires des repas plutôt que leur contenu.",
    principe:
      "Le jeûne intermittent alterne des périodes de prise alimentaire et des périodes sans apport énergétique. Les protocoles les plus étudiés sont le 16/8 (fenêtre alimentaire de 8 h, par exemple 12 h – 20 h), le 5:2 (deux journées non consécutives à 500–600 kcal) et le jeûne alterné (un jour sur deux). La qualité nutritionnelle des repas reste déterminante : le jeûne n'autorise pas une alimentation déséquilibrée dans la fenêtre.",
    benefices: [
      "Réduction spontanée de l'apport calorique et perte de poids modérée",
      "Amélioration de la sensibilité à l'insuline chez certains patients",
      "Cadre simple, sans comptage de calories permanent",
      "Réduction du grignotage nocturne",
    ],
    precautions: [
      "Contre-indiqué en cas d'antécédent de trouble du comportement alimentaire",
      "Déconseillé pendant la grossesse et l'allaitement, chez l'enfant et l'adolescent",
      "Personnes âgées, dénutries ou en perte de poids involontaire : à éviter",
      "Diabète traité, traitements à horaires fixes (insuline, antihypertenseurs) : avis médical préalable",
      "Arrêter en cas de malaises, vertiges, palpitations ou fatigue intense",
    ],
    privilegier: [
      "Eau, thé, café non sucrés et bouillons pendant la fenêtre de jeûne",
      "Protéines de qualité à chaque repas (œufs, poisson, volaille, légumineuses)",
      "Légumes et fruits pour le volume et les fibres",
      "Céréales complètes pour la satiété",
      "Repas de rupture de jeûne léger et progressif",
    ],
    limiter: [
      "Café après 16 h (qualité du sommeil)",
      "Repas très gras à la rupture du jeûne",
      "Sport intense à jeun tant que l'adaptation n'est pas faite",
      "Alcool, qui majore l'hypoglycémie",
    ],
    eviter: [
      "Boissons sucrées et jus pendant la période de jeûne",
      "Compensation par des repas hypercaloriques dans la fenêtre",
      "Jeûnes prolongés (> 24 h) sans encadrement médical",
      "Cumul jeûne + régime très restrictif non supervisé",
    ],
    conseils: [
      "Démarrage : commencer par 12/12, puis 14/10, puis 16/8 sur deux à trois semaines.",
      "Hydratation : viser 1,5 à 2 L d'eau par jour, y compris pendant le jeûne.",
      "Organisation : caler la fenêtre alimentaire sur vos contraintes sociales et professionnelles.",
      "Durabilité : 5 jours sur 7 suffisent ; assouplir le protocole les jours de sortie ou d'effort.",
    ],
    reperesCalories:
      "Sur une journée 16/8, l'apport se répartit sur 2 à 3 repas, typiquement 1 600 à 2 000 kcal ; les journées 5:2 sont limitées à 500–600 kcal.",
  },
];

export const getFicheRegime = (slug: string) => fichesRegimes.find((f) => f.slug === slug);

export const tonClasses: Record<
  TonFiche,
  { bg: string; soft: string; text: string; border: string; label: string }
> = {
  vert: {
    bg: "bg-tone-green",
    soft: "bg-tone-green-soft",
    text: "text-tone-green",
    border: "border-tone-green/40",
    label: "Vert / bleu",
  },
  violet: {
    bg: "bg-tone-violet",
    soft: "bg-tone-violet-soft",
    text: "text-tone-violet",
    border: "border-tone-violet/40",
    label: "Violet",
  },
  rose: {
    bg: "bg-tone-pink",
    soft: "bg-tone-pink-soft",
    text: "text-tone-pink",
    border: "border-tone-pink/40",
    label: "Rose",
  },
};
