import zincImg from "@/assets/fiche-zinc.jpg";
import { foods } from "@/data/foods";

export const zincImage = zincImg;

export type ZincCategorie = "fruits-de-mer" | "viandes" | "vegetaux" | "oleagineux" | "autres";

export const zincCategories: {
  key: ZincCategorie;
  label: string;
  couleur: string;
  fond: string;
}[] = [
  {
    key: "fruits-de-mer",
    label: "Fruits de mer et poissons",
    couleur: "var(--tone-blue)",
    fond: "var(--tone-blue-soft)",
  },
  {
    key: "viandes",
    label: "Viandes et abats",
    couleur: "var(--tone-pink)",
    fond: "var(--tone-pink-soft)",
  },
  {
    key: "vegetaux",
    label: "Légumineuses et céréales complètes",
    couleur: "var(--tone-green)",
    fond: "var(--tone-green-soft)",
  },
  {
    key: "oleagineux",
    label: "Oléagineux et graines",
    couleur: "var(--tone-violet)",
    fond: "var(--tone-violet-soft)",
  },
  {
    key: "autres",
    label: "Produits laitiers, œufs et autres sources",
    couleur: "var(--tone-blue)",
    fond: "var(--muted)",
  },
];

export type AlimentZinc = {
  /** id dans la base nutritionnelle (src/data/foods.ts) quand il existe */
  foodId?: string;
  nom: string;
  categorie: ZincCategorie;
  /** ordre de grandeur pour le tri (mg / 100 g) */
  zinc: number;
  /** fourchette affichée */
  plage: string;
};

export const alimentsZinc: AlimentZinc[] = [
  { foodId: "huitre", nom: "Huîtres", categorie: "fruits-de-mer", zinc: 45, plage: "très élevé — plusieurs dizaines de mg" },
  { foodId: "crabe", nom: "Crabe", categorie: "fruits-de-mer", zinc: 5.5, plage: "4 – 7 mg" },
  { foodId: "homard", nom: "Homard / langouste", categorie: "fruits-de-mer", zinc: 3, plage: "2 – 4 mg" },
  { foodId: "moule", nom: "Moules", categorie: "fruits-de-mer", zinc: 2.7, plage: "2 – 3 mg" },
  { foodId: "sardine", nom: "Sardines / anchois", categorie: "fruits-de-mer", zinc: 1.5, plage: "1 – 2 mg" },

  { foodId: "boeuf", nom: "Bœuf (viande rouge)", categorie: "viandes", zinc: 5, plage: "4 – 6 mg" },
  { foodId: "foie-veau", nom: "Foie (veau, agneau)", categorie: "viandes", zinc: 5, plage: "4 – 6 mg" },
  { foodId: "agneau", nom: "Agneau", categorie: "viandes", zinc: 4, plage: "3 – 5 mg" },
  { foodId: "porc", nom: "Porc", categorie: "viandes", zinc: 2.5, plage: "2 – 3 mg" },
  { foodId: "dinde", nom: "Volaille (poulet, dinde)", categorie: "viandes", zinc: 2, plage: "1,5 – 2,5 mg" },

  { foodId: "flocons-avoine", nom: "Céréales complètes (avoine, blé complet)", categorie: "vegetaux", zinc: 2.5, plage: "2 – 3 mg" },
  { foodId: "pois-chiches", nom: "Pois chiches cuits", categorie: "vegetaux", zinc: 2, plage: "1,5 – 2,5 mg" },
  { foodId: "lentilles", nom: "Lentilles cuites", categorie: "vegetaux", zinc: 1.6, plage: "1,2 – 2 mg" },
  { foodId: "haricot-rouge", nom: "Haricots rouges cuits", categorie: "vegetaux", zinc: 1.4, plage: "1 – 1,8 mg" },
  { foodId: "quinoa", nom: "Quinoa cuit", categorie: "vegetaux", zinc: 1.2, plage: "1 – 1,5 mg" },

  { foodId: "graines-courge", nom: "Graines de courge", categorie: "oleagineux", zinc: 8.5, plage: "7 – 10 mg" },
  { foodId: "sesame", nom: "Graines de sésame / tahini", categorie: "oleagineux", zinc: 6, plage: "5 – 7 mg" },
  { foodId: "noix-cajou", nom: "Noix de cajou", categorie: "oleagineux", zinc: 5.5, plage: "5 – 6 mg" },
  { foodId: "amande", nom: "Amandes", categorie: "oleagineux", zinc: 3.5, plage: "3 – 4 mg" },
  { foodId: "cacahuete", nom: "Cacahuètes", categorie: "oleagineux", zinc: 3, plage: "≈ 3 mg" },

  { foodId: "emmental", nom: "Emmental / comté", categorie: "autres", zinc: 4, plage: "3 – 4,5 mg" },
  { foodId: "parmesan", nom: "Parmesan", categorie: "autres", zinc: 3.5, plage: "3 – 4 mg" },
  { foodId: "chocolat-noir", nom: "Chocolat noir (riche en cacao)", categorie: "autres", zinc: 3.3, plage: "source notable" },
  { foodId: "oeuf", nom: "Œuf entier", categorie: "autres", zinc: 1.3, plage: "1 – 1,5 mg" },
  { foodId: "champignon", nom: "Champignons", categorie: "autres", zinc: 0.5, plage: "apport modéré" },
  { foodId: "yaourt-nature", nom: "Yaourt / lait", categorie: "autres", zinc: 0.5, plage: "0,4 – 0,6 mg" },
  { nom: "Céréales du petit-déjeuner enrichies", categorie: "autres", zinc: 2, plage: "selon étiquetage" },
];

export const rolesZinc = [
  "Fonctionnement du système immunitaire",
  "Cicatrisation des plaies et santé de la peau",
  "Synthèse des protéines et de l'ADN, croissance et développement",
  "Perception du goût et de l'odorat",
  "Fonction reproductive (fertilité masculine et féminine)",
];

export const ancZinc = [
  { profil: "Femme adulte", apport: "≈ 8 – 10 mg/jour" },
  { profil: "Homme adulte", apport: "≈ 11 – 14 mg/jour" },
  { profil: "Femme enceinte", apport: "≈ 11 – 12 mg/jour" },
  { profil: "Femme allaitante", apport: "≈ 12 – 13 mg/jour" },
  { profil: "Enfant (selon l'âge)", apport: "≈ 3 – 8 mg/jour" },
  {
    profil: "Personne âgée, végétarien ou végan",
    apport: "besoins souvent majorés (absorption réduite, zinc végétal moins biodisponible)",
  },
];

export const absorptionZinc = [
  "Le zinc d'origine animale (viande, fruits de mer) est mieux absorbé que le zinc d'origine végétale.",
  "Les phytates des céréales complètes et des légumineuses réduisent l'absorption : le trempage, la fermentation ou la germination l'améliorent.",
  "Un excès de fer ou de calcium en supplémentation peut réduire l'absorption du zinc.",
  "Les besoins augmentent en cas de régime végétarien/végan strict, de grossesse, d'allaitement ou de pathologie digestive.",
];

/** Recherche d'un aliment de la base nutritionnelle et de sa teneur en zinc. */
export function chercherZinc(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return foods
    .filter((f) => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))
    .sort((a, b) => b.values.zinc - a.values.zinc)
    .slice(0, 8);
}
