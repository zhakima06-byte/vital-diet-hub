export type NutrientKey =
  | "phosphore"
  | "proteines"
  | "glucides"
  | "lipides"
  | "calcium"
  | "potassium"
  | "sodium"
  | "citrate"
  | "zinc";

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
  { key: "zinc", label: "Zinc", unit: "mg", thresholds: [1, 3] },
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
  v: [number, number, number, number, number, number, number, number, number],
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
    zinc: v[8],
  },
});

// Valeurs indicatives pour 100 g, d'ordre de grandeur type CIQUAL (ANSES).
// À remplacer par la table de référence fournie par le porteur de projet.
export const foods: FoodItem[] = [
  f("banane", "Banane", "Fruits", [26, 1.1, 20, 0.3, 6, 358, 1, 150, 0.15]),
  f("orange", "Orange", "Fruits", [21, 0.9, 9, 0.2, 40, 181, 1, 600, 0.07]),
  f("citron", "Citron (jus)", "Fruits", [10, 0.4, 2.5, 0.2, 8, 103, 2, 4700, 0.05]),
  f("pomme", "Pomme", "Fruits", [11, 0.3, 12, 0.2, 6, 107, 1, 30, 0.04]),
  f("fraise", "Fraise", "Fruits", [24, 0.7, 6, 0.3, 16, 153, 1, 900, 0.14]),
  f("abricot-sec", "Abricot sec", "Fruits secs", [71, 3.4, 53, 0.5, 55, 1160, 10, 200, 0.4]),
  f("epinard", "Épinard cuit", "Légumes", [46, 3, 1.4, 0.4, 130, 470, 70, 30, 0.8]),
  f("brocoli", "Brocoli cuit", "Légumes", [60, 2.8, 4, 0.4, 47, 290, 20, 25, 0.45]),
  f("carotte", "Carotte crue", "Légumes", [35, 0.8, 6.7, 0.2, 33, 320, 60, 20, 0.24]),
  f("pomme-de-terre", "Pomme de terre cuite", "Légumes", [50, 2, 17, 0.1, 8, 380, 5, 400, 0.3]),
  f("tomate", "Tomate", "Légumes", [24, 0.8, 2.9, 0.2, 9, 240, 5, 300, 0.17]),
  f("lentilles", "Lentilles cuites", "Légumineuses", [130, 9, 17, 0.5, 20, 320, 3, 15, 1.3]),
  f("pois-chiches", "Pois chiches cuits", "Légumineuses", [120, 8.5, 20, 2.6, 45, 290, 6, 15, 1.5]),
  f("haricot-rouge", "Haricots rouges cuits", "Légumineuses", [140, 8.7, 20, 0.5, 35, 400, 2, 12, 1.1]),
  f("riz-blanc", "Riz blanc cuit", "Féculents", [35, 2.6, 28, 0.4, 8, 30, 1, 2, 0.5]),
  f("pates", "Pâtes cuites", "Féculents", [55, 5, 30, 0.9, 10, 45, 3, 2, 0.6]),
  f("pain-complet", "Pain complet", "Féculents", [200, 9, 42, 2, 40, 250, 480, 3, 1.8]),
  f("pain-blanc", "Pain blanc", "Féculents", [90, 8, 50, 1.5, 25, 120, 520, 2, 0.7]),
  f("flocons-avoine", "Flocons d'avoine", "Féculents", [420, 13, 59, 7, 52, 350, 5, 3, 3.0]),
  f("lait-demi-ecreme", "Lait demi-écrémé", "Produits laitiers", [95, 3.3, 4.8, 1.6, 115, 150, 45, 200, 0.4]),
  f("yaourt-nature", "Yaourt nature", "Produits laitiers", [110, 4, 4.5, 1.2, 140, 180, 55, 180, 0.5]),
  f("fromage-blanc", "Fromage blanc 0 %", "Produits laitiers", [110, 7.5, 4.3, 0.2, 110, 150, 45, 150, 0.5]),
  f("emmental", "Emmental", "Produits laitiers", [700, 28, 0.5, 30, 980, 100, 320, 20, 4.4]),
  f("poulet", "Blanc de poulet cuit", "Viandes", [220, 30, 0, 3, 10, 340, 70, 2, 1.0]),
  f("boeuf", "Bœuf steak cuit", "Viandes", [200, 27, 0, 8, 8, 330, 60, 2, 4.8]),
  f("foie-veau", "Foie de veau", "Abats", [350, 21, 3, 5, 8, 320, 80, 2, 5.3]),
  f("jambon", "Jambon blanc", "Charcuterie", [220, 20, 1, 4, 8, 320, 900, 2, 2.0]),
  f("saumon", "Saumon cuit", "Poissons", [250, 23, 0, 12, 15, 380, 60, 2, 0.5]),
  f("sardine", "Sardine à l'huile", "Poissons", [430, 24, 0, 14, 380, 400, 500, 2, 1.4]),
  f("crevette", "Crevette cuite", "Fruits de mer", [230, 21, 0, 1, 90, 200, 400, 2, 1.6]),
  f("oeuf", "Œuf entier cuit", "Œufs", [190, 12.6, 0.6, 10, 55, 130, 130, 2, 1.3]),
  f("amande", "Amandes", "Oléagineux", [480, 21, 8, 50, 250, 730, 2, 5, 3.3]),
  f("noix", "Noix", "Oléagineux", [350, 15, 7, 62, 90, 440, 2, 5, 3.0]),
  f("huile-olive", "Huile d'olive", "Matières grasses", [1, 0, 0, 100, 1, 1, 1, 0, 0]),
  f("beurre", "Beurre", "Matières grasses", [22, 0.8, 0.6, 82, 15, 25, 500, 0, 0.1]),
  f("chocolat-noir", "Chocolat noir 70 %", "Sucreries", [310, 8, 33, 42, 60, 700, 15, 5, 3.3]),
  f("cola", "Soda au cola", "Boissons", [15, 0, 10.6, 0, 3, 2, 8, 100, 0]),
  f("eau-minerale", "Eau minérale calcique", "Boissons", [0, 0, 0, 0, 47, 3, 8, 0, 0]),
  f("tofu", "Tofu nature", "Végétal protéiné", [120, 12, 2, 7, 200, 150, 8, 3, 1.6]),
  f("quinoa", "Quinoa cuit", "Féculents", [150, 4.4, 21, 1.9, 17, 170, 5, 3, 1.1]),
  f("huitre", "Huîtres crues", "Fruits de mer", [135, 9, 4.5, 2, 80, 190, 500, 2, 45]),
  f("crabe", "Crabe cuit", "Fruits de mer", [220, 19, 0, 1.5, 90, 260, 450, 2, 5.5]),
  f("homard", "Homard cuit", "Fruits de mer", [200, 19, 0, 1, 60, 300, 420, 2, 3]),
  f("moule", "Moules cuites", "Fruits de mer", [240, 24, 7, 4, 50, 270, 370, 2, 2.7]),
  f("agneau", "Agneau cuit", "Viandes", [190, 25, 0, 12, 12, 310, 70, 2, 4]),
  f("porc", "Porc cuit", "Viandes", [210, 26, 0, 9, 10, 340, 65, 2, 2.5]),
  f("dinde", "Dinde cuite", "Viandes", [215, 29, 0, 2, 12, 330, 65, 2, 2]),
  f("graines-courge", "Graines de courge", "Oléagineux", [1200, 30, 11, 49, 46, 810, 7, 5, 8]),
  f("sesame", "Graines de sésame / tahini", "Oléagineux", [630, 18, 12, 54, 960, 470, 11, 5, 6]),
  f("noix-cajou", "Noix de cajou", "Oléagineux", [590, 18, 27, 44, 37, 660, 12, 5, 5.5]),
  f("cacahuete", "Cacahuètes", "Oléagineux", [380, 26, 12, 49, 55, 700, 6, 5, 3]),
  f("parmesan", "Parmesan", "Produits laitiers", [700, 36, 0.5, 29, 1180, 100, 1500, 20, 3.5]),
  f("champignon", "Champignons de Paris", "Légumes", [86, 3, 1, 0.3, 6, 320, 6, 10, 0.5]),
];

export const getFood = (id: string) => foods.find((x) => x.id === id);
/** Estimation énergétique à partir des macronutriments (Atwater), pour 100 g. */
export const kcalPer100g = (item: FoodItem) =>
  Math.round(item.values.proteines * 4 + item.values.glucides * 4 + item.values.lipides * 9);
