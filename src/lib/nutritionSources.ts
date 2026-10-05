/**
 * Architecture multi-sources des données nutritionnelles.
 *
 * Chaque source fournit des `NutritionRecord` normalisés pour 100 g.
 * `mergeRecords` fusionne plusieurs enregistrements en retenant, champ par
 * champ, la valeur issue de la source la plus fiable disponible.
 *
 * Priorité : base locale validée > USDA FoodData Central (aliments bruts)
 * > Open Food Facts (produits emballés) > Edamam > Nutritionix.
 * Les sources nécessitant une clé (USDA, Edamam, Nutritionix) sont déclarées
 * mais inactives tant que la clé n'est pas configurée côté serveur.
 */
import { fibresPer100g, foods, type FoodItem } from "@/data/foods";

export type SourceId = "locale" | "usda" | "openfoodfacts" | "edamam" | "nutritionix";

export type Per100g = {
  kcal?: number;
  proteines?: number;
  glucides?: number;
  lipides?: number;
  fibres?: number;
  sodium?: number;
  potassium?: number;
  phosphore?: number;
};

export type NutritionRecord = {
  id: string;
  nom: string;
  source: SourceId;
  per100g: Per100g;
  barcode?: string;
};

export const SOURCE_PRIORITY: Record<SourceId, number> = {
  locale: 5,
  usda: 4,
  openfoodfacts: 3,
  edamam: 2,
  nutritionix: 1,
};

export const sourceLabels: Record<SourceId, string> = {
  locale: "Base NutriSanté (ordre de grandeur CIQUAL)",
  usda: "USDA FoodData Central",
  openfoodfacts: "Open Food Facts",
  edamam: "Edamam",
  nutritionix: "Nutritionix",
};

/** Fusion champ par champ selon la priorité des sources. */
export function mergeRecords(records: NutritionRecord[]): NutritionRecord | null {
  if (records.length === 0) return null;
  const sorted = [...records].sort((a, b) => SOURCE_PRIORITY[b.source] - SOURCE_PRIORITY[a.source]);
  const per100g: Per100g = {};
  (Object.keys({ kcal: 0, proteines: 0, glucides: 0, lipides: 0, fibres: 0, sodium: 0, potassium: 0, phosphore: 0 }) as (keyof Per100g)[]).forEach((k) => {
    const hit = sorted.find((r) => typeof r.per100g[k] === "number");
    if (hit) per100g[k] = hit.per100g[k];
  });
  return { ...sorted[0], per100g };
}

/** Adaptateur base locale. */
export function fromLocalFood(item: FoodItem): NutritionRecord {
  const v = item.values;
  return {
    id: item.id,
    nom: item.name,
    source: "locale",
    per100g: {
      proteines: v.proteines,
      glucides: v.glucides,
      lipides: v.lipides,
      kcal: Math.round(v.proteines * 4 + v.glucides * 4 + v.lipides * 9),
      fibres: fibresPer100g[item.id],
      sodium: v.sodium,
      potassium: v.potassium,
      phosphore: v.phosphore,
    },
  };
}

export const localRecords = (): NutritionRecord[] => foods.map(fromLocalFood);

/** Adaptateur Open Food Facts (public, sans clé) — recherche par code-barres. */
export async function fetchOpenFoodFacts(barcode: string): Promise<NutritionRecord | null> {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json?fields=product_name,nutriments`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    const n = data?.product?.nutriments;
    if (!n) return null;
    return {
      id: `off-${barcode}`,
      nom: data.product.product_name ?? barcode,
      source: "openfoodfacts",
      barcode,
      per100g: {
        kcal: n["energy-kcal_100g"],
        proteines: n.proteins_100g,
        glucides: n.carbohydrates_100g,
        lipides: n.fat_100g,
        fibres: n.fiber_100g,
        sodium: typeof n.sodium_100g === "number" ? n.sodium_100g * 1000 : undefined,
      },
    };
  } catch {
    return null;
  }
}
