export type NutrientKey =
  | "phosphore"
  | "proteines"
  | "glucides"
  | "lipides"
  | "calcium"
  | "potassium"
  | "sodium"
  | "citrate";

export type FoodItem = {
  id: string;
  name: string;
  category: string;
  values: Record<NutrientKey, number>;
};

export const nutrients: {
  key: NutrientKey;
  label: string;
  unit: string;
  /** seuils indicatifs pour 100 g : [faible <, modéré <] */
  thresholds: [number, number];
}[] = [
  { key: "phosphore", label: "Phosphore", unit: "mg", thresholds: [60, 180] },
  { key: "proteines", label: "Protéines", unit: "g", thresholds: [3, 10] },
  { key: "glucides", label: "Glucides", unit: "g", thresholds: [5, 20] },
  { key: "lipides", label: "Lipides", unit: "g", thresholds: [3, 15] },
  { key: "calcium", label: "Calcium", unit: "mg", thresholds: [40, 120] },
  { key: "potassium", label: "Potassium", unit: "mg", thresholds: [150, 350] },
  { key: "sodium", label: "Sodium", unit: "mg", thresholds: [50, 300] },
  { key: "citrate", label: "Citrate", unit: "mg", thresholds: [20, 200] },
];

export type Level = "faible" | "modere" | "eleve";

export function levelOf(key: NutrientKey, value: number): Level {
  const n = nutrients.find((x) => x.key === key)!;
  if (value < n.thresholds[0]) return "faible";
  if (value < n.thresholds[1]) return "modere";
  return "eleve";
}

export const levelLabel: Record<Level, string> = {
  faible: "Faible",
  modere: "Modéré",
  eleve: "Élevé",
};

const f = (
  id: string,
  name: string,
  category: string,
  v: [number, number, number, number, number, number, number, number],
): FoodItem => ({
  id,
  name,
  category,
  values: {
    phosphore: v[0],
    proteines: v[1],
    glucides: v[2],
    lipides: v[3],
    calcium: v[4],
    potassium: v[5],
    sodium: v[6],
    citrate: v[7],
  },
});

// Valeurs indicatives pour 100 g, d'ordre de grandeur type CIQUAL (ANSES).
// À remplacer par la table de référence fournie par le porteur de projet.
export const foods: FoodItem[] = [
  f("banane", "Banane", "Fruits", [26, 1.1, 20, 0.3, 6, 358, 1, 150]),
  f("orange", "Orange", "Fruits", [21, 0.9, 9, 0.2, 40, 181, 1, 600]),
  f("citron", "Citron (jus)", "Fruits", [10, 0.4, 2.5, 0.2, 8, 103, 2, 4700]),
  f("pomme", "Pomme", "Fruits", [11, 0.3, 12, 0.2, 6, 107, 1, 30]),
  f("fraise", "Fraise", "Fruits", [24, 0.7, 6, 0.3, 16, 153, 1, 900]),
  f("abricot-sec", "Abricot sec", "Fruits secs", [71, 3.4, 53, 0.5, 55, 1160, 10, 200]),
  f("epinard", "Épinard cuit", "Légumes", [46, 3, 1.4, 0.4, 130, 470, 70, 30]),
  f("brocoli", "Brocoli cuit", "Légumes", [60, 2.8, 4, 0.4, 47, 290, 20, 25]),
  f("carotte", "Carotte crue", "Légumes", [35, 0.8, 6.7, 0.2, 33, 320, 60, 20]),
  f("pomme-de-terre", "Pomme de terre cuite", "Légumes", [50, 2, 17, 0.1, 8, 380, 5, 400]),
  f("tomate", "Tomate", "Légumes", [24, 0.8, 2.9, 0.2, 9, 240, 5, 300]),
  f("lentilles", "Lentilles cuites", "Légumineuses", [130, 9, 17, 0.5, 20, 320, 3, 15]),
  f("pois-chiches", "Pois chiches cuits", "Légumineuses", [120, 8.5, 20, 2.6, 45, 290, 6, 15]),
  f("haricot-rouge", "Haricots rouges cuits", "Légumineuses", [140, 8.7, 20, 0.5, 35, 400, 2, 12]),
  f("riz-blanc", "Riz blanc cuit", "Féculents", [35, 2.6, 28, 0.4, 8, 30, 1, 2]),
  f("pates", "Pâtes cuites", "Féculents", [55, 5, 30, 0.9, 10, 45, 3, 2]),
  f("pain-complet", "Pain complet", "Féculents", [200, 9, 42, 2, 40, 250, 480, 3]),
  f("pain-blanc", "Pain blanc", "Féculents", [90, 8, 50, 1.5, 25, 120, 520, 2]),
  f("flocons-avoine", "Flocons d'avoine", "Féculents", [420, 13, 59, 7, 52, 350, 5, 3]),
  f("lait-demi-ecreme", "Lait demi-écrémé", "Produits laitiers", [95, 3.3, 4.8, 1.6, 115, 150, 45, 200]),
  f("yaourt-nature", "Yaourt nature", "Produits laitiers", [110, 4, 4.5, 1.2, 140, 180, 55, 180]),
  f("fromage-blanc", "Fromage blanc 0 %", "Produits laitiers", [110, 7.5, 4.3, 0.2, 110, 150, 45, 150]),
  f("emmental", "Emmental", "Produits laitiers", [700, 28, 0.5, 30, 980, 100, 320, 20]),
  f("poulet", "Blanc de poulet cuit", "Viandes", [220, 30, 0, 3, 10, 340, 70, 2]),
  f("boeuf", "Bœuf steak cuit", "Viandes", [200, 27, 0, 8, 8, 330, 60, 2]),
  f("foie-veau", "Foie de veau", "Abats", [350, 21, 3, 5, 8, 320, 80, 2]),
  f("jambon", "Jambon blanc", "Charcuterie", [220, 20, 1, 4, 8, 320, 900, 2]),
  f("saumon", "Saumon cuit", "Poissons", [250, 23, 0, 12, 15, 380, 60, 2]),
  f("sardine", "Sardine à l'huile", "Poissons", [430, 24, 0, 14, 380, 400, 500, 2]),
  f("crevette", "Crevette cuite", "Fruits de mer", [230, 21, 0, 1, 90, 200, 400, 2]),
  f("oeuf", "Œuf entier cuit", "Œufs", [190, 12.6, 0.6, 10, 55, 130, 130, 2]),
  f("amande", "Amandes", "Oléagineux", [480, 21, 8, 50, 250, 730, 2, 5]),
  f("noix", "Noix", "Oléagineux", [350, 15, 7, 62, 90, 440, 2, 5]),
  f("huile-olive", "Huile d'olive", "Matières grasses", [1, 0, 0, 100, 1, 1, 1, 0]),
  f("beurre", "Beurre", "Matières grasses", [22, 0.8, 0.6, 82, 15, 25, 500, 0]),
  f("chocolat-noir", "Chocolat noir 70 %", "Sucreries", [310, 8, 33, 42, 60, 700, 15, 5]),
  f("cola", "Soda au cola", "Boissons", [15, 0, 10.6, 0, 3, 2, 8, 100]),
  f("eau-minerale", "Eau minérale calcique", "Boissons", [0, 0, 0, 0, 47, 3, 8, 0]),
  f("tofu", "Tofu nature", "Végétal protéiné", [120, 12, 2, 7, 200, 150, 8, 3]),
  f("quinoa", "Quinoa cuit", "Féculents", [150, 4.4, 21, 1.9, 17, 170, 5, 3]),
];

export const getFood = (id: string) => foods.find((x) => x.id === id);