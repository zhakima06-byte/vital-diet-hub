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
};

export const basicMethod = {
  saltPercent: 2,
  massageMinutes: [5, 10],
  headspaceCm: [3, 5],
  temperatureC: [18, 22],
  weeks: [1, 4],
};

export const recipes: FermentationRecipe[] = [
  { id: "chou", name: "Chou blanc lacto-fermenté", category: "Légumes râpés", tone: "cabbage", days: "3 à 4 semaines", saltPercent: 2, saltBasis: "légumes", ingredients: ["1 kg de chou blanc", "20 g de sel non iodé", "Graines de carvi (facultatif)"], preparation: "Retirez les feuilles abîmées et le cœur. Émincez le chou finement, puis suivez la méthode de base. Malaxez jusqu’à obtenir assez de jus pour le recouvrir." },
  { id: "carottes", name: "Carottes lacto-fermentées", category: "Légumes râpés", tone: "carrot", days: "1 à 3 semaines", saltPercent: 2, saltBasis: "légumes", ingredients: ["500 g de carottes râpées", "10 g de sel non iodé", "Gingembre frais (facultatif, à inclure dans le poids)"], preparation: "Lavez les carottes, épluchez-les si nécessaire et râpez-les. Salez, malaxez et tassez selon la méthode de base. Vérifiez que le jus couvre entièrement les légumes." },
  { id: "betteraves", name: "Betteraves lacto-fermentées", category: "Légumes râpés", tone: "beet", days: "2 à 4 semaines", saltPercent: 2, saltBasis: "légumes", ingredients: ["500 g de betteraves crues râpées", "10 g de sel non iodé"], preparation: "Lavez et épluchez les betteraves, puis râpez-les. Salez et malaxez selon la méthode de base. Utilisez un poids alimentaire : les légumes doivent rester sous le jus." },
  { id: "concombres", name: "Concombres lacto-fermentés", category: "Légumes entiers", tone: "cucumber", days: "2 à 4 semaines", saltPercent: 3, saltBasis: "légumes + eau", ingredients: ["Petits concombres fermes", "Eau potable non chlorée", "Sel non iodé : repère de 3 % du poids légumes + eau", "Aneth (facultatif)"], preparation: "Lavez les concombres et retirez l’extrémité florale. Les légumes entiers se préparent en saumure, sans malaxage. Ce repère n’est pas une recette validée : utilisez une recette éprouvée de concombres fermentés pour les quantités, le sel et la durée, sans en réduire le sel." },
  { id: "oignons", name: "Oignons lacto-fermentés", category: "Légumes entiers", tone: "onion", days: "2 à 4 semaines", saltPercent: 3, saltBasis: "légumes + eau", ingredients: ["Petits oignons épluchés", "Eau potable non chlorée", "Sel non iodé : repère de 3 % du poids légumes + eau"], preparation: "Épluchez et rincez les petits oignons. Maintenez-les sous une saumure avec un poids alimentaire, sans malaxage. Ce repère est indicatif : suivez une recette validée spécifique aux oignons avant de préparer ce bocal." },
  { id: "melange", name: "Mélange chou & carottes", category: "Mélanges", tone: "mixed", days: "2 à 4 semaines", saltPercent: 2, saltBasis: "légumes", ingredients: ["700 g de chou blanc émincé", "300 g de carottes râpées", "20 g de sel non iodé"], preparation: "Mélangez le chou et les carottes. Pesez l’ensemble, ajoutez le sel et suivez la méthode de base. Tassez soigneusement pour que le mélange reste sous son jus." },
];