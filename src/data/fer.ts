/** Teneurs indicatives en fer (mg/100 g), USDA FoodData Central (SR Legacy). Valeurs variables selon produit et préparation. */
export type FerCategorie = "abats" | "viandes" | "poissons" | "fruits-mer" | "legumineuses" | "graines" | "fruits-secs" | "cereales";
export type FerType = "Héminique" | "Non héminique" | "Héminique et non héminique";

export const ferCategories: { key: FerCategorie; label: string }[] = [
  { key: "abats", label: "Abats / charcuterie" },
  { key: "viandes", label: "Viandes" },
  { key: "poissons", label: "Poissons" },
  { key: "fruits-mer", label: "Fruits de mer" },
  { key: "legumineuses", label: "Légumineuses / soja" },
  { key: "graines", label: "Graines" },
  { key: "fruits-secs", label: "Noix et fruits secs" },
  { key: "cereales", label: "Céréales" },
];

export interface AlimentFer { nom: string; categorie: FerCategorie; fer: number | null; etat: string; type: FerType }

const H: FerType = "Héminique et non héminique";
const N: FerType = "Non héminique";

export const alimentsFer: AlimentFer[] = [
  { nom: "Soja, graines", categorie: "legumineuses", fer: 15.7, etat: "Sec", type: N },
  { nom: "Graines de sésame", categorie: "graines", fer: 14.6, etat: "Séché", type: N },
  { nom: "Foie de volaille", categorie: "abats", fer: 9.0, etat: "Cru", type: H },
  { nom: "Graines de courge", categorie: "graines", fer: 8.8, etat: "Séché", type: N },
  { nom: "Foie d’agneau", categorie: "abats", fer: 7.4, etat: "Cru", type: H },
  { nom: "Moules", categorie: "fruits-mer", fer: 6.7, etat: "Cuit", type: H },
  { nom: "Noix de cajou", categorie: "fruits-secs", fer: 6.7, etat: "Cru", type: N },
  { nom: "Lentilles", categorie: "legumineuses", fer: 6.5, etat: "Sec", type: N },
  { nom: "Boudin noir", categorie: "abats", fer: 6.4, etat: "Cuit", type: H },
  { nom: "Foie de bœuf", categorie: "abats", fer: 4.9, etat: "Cru", type: H },
  { nom: "Amandes", categorie: "fruits-secs", fer: 3.7, etat: "Cru", type: N },
  { nom: "Lentilles", categorie: "legumineuses", fer: 3.3, etat: "Cuit", type: N },
  { nom: "Haricots rouges", categorie: "legumineuses", fer: 2.9, etat: "Cuit", type: N },
  { nom: "Sardines à l’huile", categorie: "poissons", fer: 2.9, etat: "Égoutté", type: H },
  { nom: "Noix", categorie: "fruits-secs", fer: 2.9, etat: "Cru", type: N },
  { nom: "Pois chiches", categorie: "legumineuses", fer: 2.9, etat: "Cuit", type: N },
  { nom: "Abricots secs", categorie: "fruits-secs", fer: 2.7, etat: "Séché", type: N },
  { nom: "Tofu ferme", categorie: "legumineuses", fer: 2.7, etat: "Cru", type: N },
  { nom: "Bœuf (steak)", categorie: "viandes", fer: 2.6, etat: "Cuit", type: H },
  { nom: "Céréales du petit-déjeuner enrichies en fer", categorie: "cereales", fer: null, etat: "Prêt à consommer", type: N },
];

export const sourceFer = "USDA FoodData Central (SR Legacy). Valeurs indicatives arrondies, à confronter à la table CIQUAL (ANSES).";
