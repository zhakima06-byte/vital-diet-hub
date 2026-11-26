export const recipeCategories = ["Toutes", "Légumes râpés", "Légumes entiers", "Mélanges"] as const;
export type RecipeCategory = typeof recipeCategories[number];
export type RecipeTone = "cabbage" | "carrot" | "beet" | "cucumber" | "onion" | "mixed";
export type FermentationRecipe = {
  id: string;
  name: string;
  category: Exclude<RecipeCategory, "Toutes">;
  tone: RecipeTone;
  days: string;
  saltPercent: number;
  saltBasis: "légumes" | "légumes + eau";
  ingredients: string[];
  preparation: string;
  /** Collection de la bibliothèque (ex. « Légumes lacto-fermentés ») */
  collection: string;
  prepTime: string;
  benefits?: string[];
  nutritionTips?: string[];
  precautions?: string[];
};

export const FERMENTED = "Légumes lacto-fermentés";

/** Contenus communs à une collection, affichés sur chaque fiche de la collection. */
export const collectionInfo: Record<string, { benefits: string[]; nutritionTips: string[]; precautions: string[] }> = {
  [FERMENTED]: {
    benefits: [
      "La fermentation lactique produit des bactéries lactiques vivantes, tant que le produit n’est ni chauffé ni pasteurisé.",
      "Les légumes restent riches en fibres, qui nourrissent le microbiote intestinal.",
      "Acidité et texture croquante : un condiment savoureux qui aide à varier l’assiette de légumes.",
    ],
    nutritionTips: [
      "Consommez en petite quantité comme condiment (1 à 2 cuillères à soupe par repas), en commençant progressivement.",
      "Ajoutez-les à froid, en fin de préparation, pour préserver les bactéries vivantes.",
      "Le jus de fermentation est salé : ne le buvez pas en grande quantité.",
    ],
    precautions: [
      "Produits salés : à limiter en cas d’hypertension, d’insuffisance cardiaque ou de maladie rénale chronique ; demandez l’avis de votre médecin ou diététicien.",
      "Maladie rénale chronique : certains légumes (betterave notamment) apportent du potassium, à intégrer dans les apports autorisés.",
      "Intolérance à l’histamine : les aliments fermentés peuvent déclencher des symptômes.",
      "Immunodépression sévère (chimiothérapie, greffe) : demandez l’avis de l’équipe soignante avant de consommer des aliments fermentés non pasteurisés.",
      "Moisissures colorées, odeur putride ou texture visqueuse : jetez le bocal sans goûter.",
    ],
  },
};
export const getRecipe = (id: string) => recipes.find((r) => r.id === id);

export const basicMethod = {
  saltPercent: 2,
  massageMinutes: [5, 10],
  headspaceCm: [3, 5],
  temperatureC: [18, 22],
  weeks: [1, 4],
};

export const recipes: FermentationRecipe[] = [
  { id: "chou", name: "Chou blanc lacto-fermenté", category: "Légumes râpés", tone: "cabbage", days: "3 à 4 semaines", saltPercent: 2, saltBasis: "légumes", collection: FERMENTED, prepTime: "20 à 30 min", ingredients: ["1 kg de chou blanc", "20 g de sel non iodé", "Graines de carvi (facultatif)"], preparation: "Retirez les feuilles abîmées et le cœur. Émincez le chou finement, puis suivez la méthode de base. Malaxez jusqu’à obtenir assez de jus pour le recouvrir." },
  { id: "carottes", name: "Carottes lacto-fermentées", category: "Légumes râpés", tone: "carrot", days: "1 à 3 semaines", saltPercent: 2, saltBasis: "légumes", collection: FERMENTED, prepTime: "20 à 30 min", ingredients: ["500 g de carottes râpées", "10 g de sel non iodé", "Gingembre frais (facultatif, à inclure dans le poids)"], preparation: "Lavez les carottes, épluchez-les si nécessaire et râpez-les. Salez, malaxez et tassez selon la méthode de base. Vérifiez que le jus couvre entièrement les légumes." },
  { id: "betteraves", name: "Betteraves lacto-fermentées", category: "Légumes râpés", tone: "beet", days: "2 à 4 semaines", saltPercent: 2, saltBasis: "légumes", collection: FERMENTED, prepTime: "20 à 30 min", ingredients: ["500 g de betteraves crues râpées", "10 g de sel non iodé"], preparation: "Lavez et épluchez les betteraves, puis râpez-les. Salez et malaxez selon la méthode de base. Utilisez un poids alimentaire : les légumes doivent rester sous le jus." },
  { id: "concombres", name: "Concombres lacto-fermentés", category: "Légumes entiers", tone: "cucumber", days: "2 à 4 semaines", saltPercent: 3, saltBasis: "légumes + eau", collection: FERMENTED, prepTime: "15 à 20 min", ingredients: ["Petits concombres fermes", "Eau potable non chlorée", "Sel non iodé : repère de 3 % du poids légumes + eau", "Aneth (facultatif)"], preparation: "Lavez les concombres et retirez l’extrémité florale. Les légumes entiers se préparent en saumure, sans malaxage. Ce repère n’est pas une recette validée : utilisez une recette éprouvée de concombres fermentés pour les quantités, le sel et la durée, sans en réduire le sel." },
  { id: "oignons", name: "Oignons lacto-fermentés", category: "Légumes entiers", tone: "onion", days: "2 à 4 semaines", saltPercent: 3, saltBasis: "légumes + eau", collection: FERMENTED, prepTime: "15 à 20 min", ingredients: ["Petits oignons épluchés", "Eau potable non chlorée", "Sel non iodé : repère de 3 % du poids légumes + eau"], preparation: "Épluchez et rincez les petits oignons. Maintenez-les sous une saumure avec un poids alimentaire, sans malaxage. Ce repère est indicatif : suivez une recette validée spécifique aux oignons avant de préparer ce bocal." },
  { id: "melange", name: "Mélange chou & carottes", category: "Mélanges", tone: "mixed", days: "2 à 4 semaines", saltPercent: 2, saltBasis: "légumes", collection: FERMENTED, prepTime: "20 à 30 min", ingredients: ["700 g de chou blanc émincé", "300 g de carottes râpées", "20 g de sel non iodé"], preparation: "Mélangez le chou et les carottes. Pesez l’ensemble, ajoutez le sel et suivez la méthode de base. Tassez soigneusement pour que le mélange reste sous son jus." },
];