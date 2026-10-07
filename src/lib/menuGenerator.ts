/**
 * Générateur de menus personnalisés NutriSanté.
 *
 * N'effectue AUCUN calcul de besoins : les cibles (kcal, protéines, glucides,
 * lipides) proviennent exclusivement de `calculateNutritionNeeds`.
 * Ce module : choisit des modèles de repas (rotation sur 7 jours), applique
 * les préférences/contexte, puis calcule les quantités (en g) qui
 * approchent simultanément les cibles caloriques ET de macronutriments.
 */
import { getFood, type FoodItem } from "@/data/foods";
import { fromLocalFood } from "@/lib/nutritionSources";
import type { NutritionResult, ProfilNutritionnel } from "@/lib/nutrition";

export type MealKey = "petit-dejeuner" | "dejeuner" | "collation" | "diner";
export type Role = "proteine" | "glucide" | "legume" | "fruit" | "lipide" | "laitier";

export const mealMeta: Record<MealKey, { label: string; emoji: string }> = {
  "petit-dejeuner": { label: "Petit-déjeuner", emoji: "🥣" },
  dejeuner: { label: "Déjeuner", emoji: "🍽️" },
  collation: { label: "Collation", emoji: "🍎" },
  diner: { label: "Dîner", emoji: "🍲" },
};
export const mealOrder: MealKey[] = ["petit-dejeuner", "dejeuner", "collation", "diner"];

/** Répartition par défaut (configurable par l'utilisateur), en % des calories. */
export const DEFAULT_SHARES: Record<MealKey, number> = {
  "petit-dejeuner": 22,
  dejeuner: 33,
  collation: 13,
  diner: 32,
};

export type Preferences = {
  vegetarien: boolean;
  sansPoisson: boolean;
  sansLactose: boolean;
  sansGluten: boolean;
  sansOeufs?: boolean;
};

export type MenuItem = {
  uid: string;
  foodId: string;
  role: Role;
  grammes: number;
  min: number;
  max: number;
  verrouille?: boolean;
};

export type Meal = { key: MealKey; titre: string; items: MenuItem[] };
export type DayMenu = { jour: string; meals: Meal[] };

export type Totaux = {
  kcal: number;
  proteines: number;
  glucides: number;
  lipides: number;
  fibres: number;
  sodium: number;
  potassium: number;
  phosphore: number;
};

/* ---------------- Bornes de portions par rôle (g) ---------------- */
const BOUNDS: Record<Role, [number, number]> = {
  proteine: [40, 220],
  glucide: [30, 300],
  legume: [100, 350],
  fruit: [80, 250],
  lipide: [3, 30],
  laitier: [60, 300],
};
const START: Record<Role, number> = {
  proteine: 120,
  glucide: 120,
  legume: 200,
  fruit: 130,
  lipide: 10,
  laitier: 125,
};
const OVERRIDE: Record<string, [number, number]> = {
  oeuf: [50, 150],
  "huile-olive": [3, 25],
  amande: [10, 40],
  noix: [10, 35],
  dattes: [20, 60],
  "flocons-avoine": [20, 100],
  "pain-complet": [30, 150],
  "pain-blanc": [30, 150],
  "lait-demi-ecreme": [100, 300],
  avocat: [30, 100],
};

type Template = { titre: string; items: [string, Role][] };

const TEMPLATES: Record<MealKey, Template[]> = {
  "petit-dejeuner": [
    { titre: "Tartines complètes, œufs et tomate", items: [["pain-complet", "glucide"], ["oeuf", "proteine"], ["tomate", "legume"], ["huile-olive", "lipide"], ["orange", "fruit"]] },
    { titre: "Porridge avoine, lait et banane", items: [["flocons-avoine", "glucide"], ["lait-demi-ecreme", "laitier"], ["banane", "fruit"], ["amande", "lipide"]] },
    { titre: "Fromage blanc, pain complet et dattes", items: [["fromage-blanc", "laitier"], ["pain-complet", "glucide"], ["dattes", "fruit"], ["noix", "lipide"]] },
    { titre: "Yaourt, avoine et fraises", items: [["yaourt-nature", "laitier"], ["flocons-avoine", "glucide"], ["fraise", "fruit"], ["noix", "lipide"]] },
    { titre: "Pain, œuf et huile d'olive", items: [["pain-blanc", "glucide"], ["oeuf", "proteine"], ["huile-olive", "lipide"], ["pomme", "fruit"]] },
  ],
  dejeuner: [
    { titre: "Poulet, riz et brocoli", items: [["poulet", "proteine"], ["riz-blanc", "glucide"], ["brocoli", "legume"], ["huile-olive", "lipide"], ["orange", "fruit"]] },
    { titre: "Sardines, pommes de terre et salade", items: [["sardine", "proteine"], ["pomme-de-terre", "glucide"], ["salade-verte", "legume"], ["huile-olive", "lipide"], ["pomme", "fruit"]] },
    { titre: "Couscous aux légumes et pois chiches", items: [["couscous", "glucide"], ["pois-chiches", "proteine"], ["courgette", "legume"], ["carotte", "legume"], ["huile-olive", "lipide"], ["dinde", "proteine"]] },
    { titre: "Lentilles, riz et carottes", items: [["lentilles", "proteine"], ["riz-blanc", "glucide"], ["carotte", "legume"], ["huile-olive", "lipide"], ["yaourt-nature", "laitier"]] },
    { titre: "Bœuf, pâtes et haricots verts", items: [["boeuf", "proteine"], ["pates", "glucide"], ["haricots-verts", "legume"], ["huile-olive", "lipide"], ["banane", "fruit"]] },
    { titre: "Saumon, quinoa et épinards", items: [["saumon", "proteine"], ["quinoa", "glucide"], ["epinard", "legume"], ["huile-olive", "lipide"], ["fraise", "fruit"]] },
    { titre: "Haricots rouges, riz et tomates", items: [["haricot-rouge", "proteine"], ["riz-blanc", "glucide"], ["tomate", "legume"], ["huile-olive", "lipide"], ["oeuf", "proteine"]] },
  ],
  collation: [
    { titre: "Yaourt et amandes", items: [["yaourt-nature", "laitier"], ["amande", "lipide"]] },
    { titre: "Pomme et noix", items: [["pomme", "fruit"], ["noix", "lipide"]] },
    { titre: "Fromage blanc et banane", items: [["fromage-blanc", "laitier"], ["banane", "fruit"]] },
    { titre: "Dattes et lait", items: [["dattes", "fruit"], ["lait-demi-ecreme", "laitier"]] },
  ],
  diner: [
    { titre: "Omelette, pommes de terre et courgettes", items: [["oeuf", "proteine"], ["pomme-de-terre", "glucide"], ["courgette", "legume"], ["huile-olive", "lipide"]] },
    { titre: "Poisson blanc, riz et carottes", items: [["poisson-blanc", "proteine"], ["riz-blanc", "glucide"], ["carotte", "legume"], ["huile-olive", "lipide"]] },
    { titre: "Soupe de lentilles (chorba) et pain", items: [["lentilles", "proteine"], ["tomate", "legume"], ["carotte", "legume"], ["huile-olive", "lipide"], ["pain-complet", "glucide"]] },
    { titre: "Dinde, semoule et haricots verts", items: [["dinde", "proteine"], ["couscous", "glucide"], ["haricots-verts", "legume"], ["huile-olive", "lipide"], ["yaourt-nature", "laitier"]] },
    { titre: "Pois chiches, courgettes et pain complet", items: [["pois-chiches", "proteine"], ["courgette", "legume"], ["pain-complet", "glucide"], ["huile-olive", "lipide"], ["fromage-blanc", "laitier"]] },
    { titre: "Poulet, pâtes et salade d'avocat", items: [["poulet", "proteine"], ["pates", "glucide"], ["salade-verte", "legume"], ["avocat", "lipide"]] },
  ],
};

export const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

/* ---------------- Exclusions (préférences + contexte de santé) ---------------- */
const VIANDE = ["poulet", "dinde", "boeuf", "agneau", "porc", "jambon", "foie-veau"];
const POISSON = ["sardine", "saumon", "poisson-blanc", "crevette", "huitre", "crabe", "homard", "moule"];
const LACTOSE = ["lait-demi-ecreme", "yaourt-nature", "fromage-blanc", "emmental", "parmesan"];
const GLUTEN = ["pain-complet", "pain-blanc", "pates", "couscous", "flocons-avoine"];

const CONTEXT_EXCLUSIONS: Partial<Record<ProfilNutritionnel, string[]>> = {
  hypertension: ["jambon", "sardine", "parmesan", "emmental", "pain-blanc"],
  goutte: ["sardine", "foie-veau", "crevette", "moule", "boeuf", "agneau"],
  renale: ["dattes", "avocat", "abricot-sec", "sardine", "parmesan", "emmental"],
  diabete: ["dattes", "pain-blanc"],
};

/** Substituts par rôle, dans l'ordre de préférence. */
const SUBSTITUTS: Record<Role, string[]> = {
  proteine: ["poulet", "poisson-blanc", "oeuf", "lentilles", "pois-chiches", "tofu", "haricot-rouge", "dinde"],
  glucide: ["riz-blanc", "pomme-de-terre", "quinoa", "couscous", "pain-complet"],
  legume: ["courgette", "haricots-verts", "carotte", "brocoli", "salade-verte", "tomate"],
  fruit: ["pomme", "orange", "fraise", "banane"],
  lipide: ["huile-olive", "amande", "noix"],
  laitier: ["yaourt-nature", "fromage-blanc", "lait-demi-ecreme", "tofu", "oeuf", "amande"],
};

export function exclusions(prefs: Preferences, profil: ProfilNutritionnel): Set<string> {
  const s = new Set<string>(["porc", "jambon"]);
  if (prefs.vegetarien) [...VIANDE, ...POISSON].forEach((x) => s.add(x));
  if (prefs.sansPoisson) POISSON.forEach((x) => s.add(x));
  if (prefs.sansLactose) LACTOSE.forEach((x) => s.add(x));
  if (prefs.sansGluten) GLUTEN.forEach((x) => s.add(x));
  if (prefs.sansOeufs) s.add("oeuf");
  (CONTEXT_EXCLUSIONS[profil] ?? []).forEach((x) => s.add(x));
  return s;
}

/* ---------------- Calculs nutritionnels ---------------- */
const per100 = (id: string) => {
  const f = getFood(id);
  return f ? fromLocalFood(f).per100g : {};
};

export function itemTotaux(foodId: string, grammes: number): Totaux {
  const p = per100(foodId);
  const k = grammes / 100;
  const prot = (p.proteines ?? 0) * k;
  const gluc = (p.glucides ?? 0) * k;
  const lip = (p.lipides ?? 0) * k;
  return {
    proteines: prot,
    glucides: gluc,
    lipides: lip,
    kcal: prot * 4 + gluc * 4 + lip * 9,
    fibres: (p.fibres ?? 0) * k,
    sodium: (p.sodium ?? 0) * k,
    potassium: (p.potassium ?? 0) * k,
    phosphore: (p.phosphore ?? 0) * k,
  };
}

export const zero = (): Totaux => ({ kcal: 0, proteines: 0, glucides: 0, lipides: 0, fibres: 0, sodium: 0, potassium: 0, phosphore: 0 });

export function somme(items: MenuItem[]): Totaux {
  return items.reduce((acc, it) => {
    const t = itemTotaux(it.foodId, it.grammes);
    (Object.keys(acc) as (keyof Totaux)[]).forEach((k) => (acc[k] += t[k]));
    return acc;
  }, zero());
}

export const totalJour = (d: DayMenu) => somme(d.meals.flatMap((m) => m.items));

type Cible = { proteines: number; glucides: number; lipides: number };

/**
 * Ajuste les quantités (descente par coordonnées, bornée) pour approcher
 * simultanément protéines, glucides et lipides — donc les calories.
 * Les aliments verrouillés gardent leur quantité.
 */
export function ajusterPortions(items: MenuItem[], cible: Cible): MenuItem[] {
  const out = items.map((i) => ({ ...i }));
  const T = [Math.max(cible.proteines, 1), Math.max(cible.glucides, 1), Math.max(cible.lipides, 1)];
  const W = [1.2, 1, 1.2];
  const A = out.map((it) => {
    const p = per100(it.foodId);
    return [(p.proteines ?? 0) / 100, (p.glucides ?? 0) / 100, (p.lipides ?? 0) / 100];
  });
  const LAMBDA = 0.02;
  const tot = () =>
    [0, 1, 2].map((k) => out.reduce((s, it, i) => s + A[i]![k]! * it.grammes, 0));

  for (let iter = 0; iter < 80; iter++) {
    out.forEach((it, i) => {
      if (it.verrouille) return;
      const cur = tot();
      const s = START[it.role];
      let num = LAMBDA / s;
      let den = LAMBDA / (s * s);
      for (let k = 0; k < 3; k++) {
        const r = cur[k]! - T[k]!;
        num += (W[k]! * A[i]![k]! * (A[i]![k]! * it.grammes - r)) / (T[k]! * T[k]!);
        den += (W[k]! * A[i]![k]! * A[i]![k]!) / (T[k]! * T[k]!);
      }
      it.grammes = Math.min(it.max, Math.max(it.min, num / den));
    });
  }
  out.forEach((it) => {
    if (it.verrouille) return;
    const step = it.foodId === "huile-olive" ? 1 : 5;
    it.grammes = Math.min(it.max, Math.max(it.min, Math.round(it.grammes / step) * step));
  });
  return out;
}

let uidSeq = 0;
export function makeItem(foodId: string, role: Role, grammes?: number): MenuItem {
  const [min, max] = OVERRIDE[foodId] ?? BOUNDS[role];
  return {
    uid: `${foodId}-${++uidSeq}-${Math.random().toString(36).slice(2, 6)}`,
    foodId,
    role,
    grammes: grammes ?? START[role],
    min,
    max,
  };
}

export const roleFromFood = (f: FoodItem): Role => {
  if (["Huile d'olive", "Beurre"].includes(f.name) || f.category === "Oléagineux" || f.category === "Matières grasses") return "lipide";
  if (f.category === "Légumes") return "legume";
  if (f.category === "Fruits" || f.category === "Fruits secs") return "fruit";
  if (f.category === "Féculents") return "glucide";
  if (f.category === "Produits laitiers") return "laitier";
  return "proteine";
};

export type ReglagesMenu = {
  besoins: NutritionResult;
  shares: Record<MealKey, number>;
  prefs: Preferences;
  profil: ProfilNutritionnel;
};

export function cibleRepas(besoins: NutritionResult, shares: Record<MealKey, number>, key: MealKey): Cible & { kcal: number } {
  const total = mealOrder.reduce((s, k) => s + shares[k], 0) || 100;
  const r = shares[key] / total;
  return {
    kcal: besoins.caloriesCibles * r,
    proteines: besoins.macros.proteines.grammes * r,
    glucides: besoins.macros.glucides.grammes * r,
    lipides: besoins.macros.lipides.grammes * r,
  };
}

/** Modèles végétariens (aucune viande, poisson ni fruit de mer) — 7 déjeuners, 7 dîners. */
const VEG_TEMPLATES: Partial<Record<MealKey, Template[]>> = {
  dejeuner: [
    { titre: "Couscous aux sept légumes et pois chiches", items: [["couscous", "glucide"], ["pois-chiches", "proteine"], ["courgette", "legume"], ["carotte", "legume"], ["huile-olive", "lipide"], ["yaourt-nature", "laitier"]] },
    { titre: "Lentilles mijotées, riz et salade", items: [["lentilles", "proteine"], ["riz-blanc", "glucide"], ["salade-verte", "legume"], ["huile-olive", "lipide"], ["orange", "fruit"]] },
    { titre: "Loubia (haricots rouges), pain complet", items: [["haricot-rouge", "proteine"], ["pain-complet", "glucide"], ["tomate", "legume"], ["huile-olive", "lipide"], ["pomme", "fruit"]] },
    { titre: "Tofu sauté, quinoa et brocoli", items: [["tofu", "proteine"], ["quinoa", "glucide"], ["brocoli", "legume"], ["huile-olive", "lipide"], ["fraise", "fruit"]] },
    { titre: "Pâtes aux pois chiches et épinards", items: [["pates", "glucide"], ["pois-chiches", "proteine"], ["epinard", "legume"], ["huile-olive", "lipide"], ["parmesan", "laitier"]] },
    { titre: "Tajine de pommes de terre aux œufs", items: [["pomme-de-terre", "glucide"], ["oeuf", "proteine"], ["haricots-verts", "legume"], ["huile-olive", "lipide"], ["banane", "fruit"]] },
    { titre: "Semoule, lentilles et légumes rôtis", items: [["couscous", "glucide"], ["lentilles", "proteine"], ["courgette", "legume"], ["huile-olive", "lipide"], ["fromage-blanc", "laitier"]] },
  ],
  diner: [
    { titre: "Chorba de lentilles et pain", items: [["lentilles", "proteine"], ["tomate", "legume"], ["carotte", "legume"], ["huile-olive", "lipide"], ["pain-complet", "glucide"]] },
    { titre: "Omelette aux courgettes et pommes de terre", items: [["oeuf", "proteine"], ["pomme-de-terre", "glucide"], ["courgette", "legume"], ["huile-olive", "lipide"]] },
    { titre: "Houmous, crudités et pain", items: [["pois-chiches", "proteine"], ["carotte", "legume"], ["tomate", "legume"], ["huile-olive", "lipide"], ["pain-blanc", "glucide"]] },
    { titre: "Riz aux haricots rouges et salade", items: [["haricot-rouge", "proteine"], ["riz-blanc", "glucide"], ["salade-verte", "legume"], ["avocat", "lipide"]] },
    { titre: "Gratin de légumes, fromage et quinoa", items: [["emmental", "laitier"], ["quinoa", "glucide"], ["brocoli", "legume"], ["huile-olive", "lipide"], ["yaourt-nature", "laitier"]] },
    { titre: "Tofu, semoule et haricots verts", items: [["tofu", "proteine"], ["couscous", "glucide"], ["haricots-verts", "legume"], ["huile-olive", "lipide"]] },
    { titre: "Soupe de pois chiches et champignons", items: [["pois-chiches", "proteine"], ["champignon", "legume"], ["pain-complet", "glucide"], ["huile-olive", "lipide"], ["fromage-blanc", "laitier"]] },
  ],
};

/** Remplace un aliment par une alternative du même rôle (compatible avec les exclusions) et réajuste le repas. */
export function remplacerAliment(d: DayMenu, meal: MealKey, uid: string, r: ReglagesMenu): DayMenu {
  const excl = exclusions(r.prefs, r.profil);
  return {
    ...d,
    meals: d.meals.map((m) => {
      if (m.key !== meal) return m;
      const it = m.items.find((x) => x.uid === uid);
      if (!it) return m;
      const used = new Set(m.items.map((x) => x.foodId));
      const pool = SUBSTITUTS[it.role];
      const start = Math.max(0, pool.indexOf(it.foodId));
      const alt = [...pool.slice(start + 1), ...pool.slice(0, start)].find((x) => !excl.has(x) && !used.has(x) && getFood(x));
      if (!alt) return m;
      const items = m.items.map((x) => (x.uid === uid ? makeItem(alt, it.role) : x));
      return { ...m, items: ajusterPortions(items, cibleRepas(r.besoins, r.shares, meal)) };
    }),
  };
}

/** Génère une journée (rotation selon l'index du jour pour varier les aliments). */
export function genererJour(dayIndex: number, r: ReglagesMenu): DayMenu {
  const excl = exclusions(r.prefs, r.profil);
  const meals: Meal[] = mealOrder.map((key, mi) => {
    const tpls = r.prefs.vegetarien ? VEG_TEMPLATES[key] ?? TEMPLATES[key] : TEMPLATES[key];
    const tpl = tpls[(dayIndex + mi * 2) % tpls.length]!;
    const used = new Set<string>();
    const items: MenuItem[] = [];
    tpl.items.forEach(([foodId, role]) => {
      let id = foodId;
      if (excl.has(id) || used.has(id)) {
        const alt = SUBSTITUTS[role].find((x) => !excl.has(x) && !used.has(x) && getFood(x));
        if (!alt) return;
        id = alt;
      }
      used.add(id);
      items.push(makeItem(id, role));
    });
    return { key, titre: tpl.titre, items: ajusterPortions(items, cibleRepas(r.besoins, r.shares, key)) };
  });
  return { jour: JOURS[dayIndex % 7]!, meals };
}

/** Correction automatique d'une journée modifiée : réajuste chaque repas vers sa cible. */
export function corrigerJour(d: DayMenu, r: ReglagesMenu): { jour: DayMenu; messages: string[] } {
  const avant = totalJour(d);
  const jour: DayMenu = {
    ...d,
    meals: d.meals.map((m) => ({ ...m, items: ajusterPortions(m.items, cibleRepas(r.besoins, r.shares, m.key)) })),
  };
  const apres = totalJour(jour);
  const b = r.besoins.macros;
  const messages: string[] = [];
  const diag = (label: string, av: number, ap: number, cible: number, baisse: string, hausse: string) => {
    if (av > cible * 1.1 && ap < av) messages.push(`${label} trop élevés (${Math.round(av)} g) → ${baisse}.`);
    else if (av < cible * 0.9 && ap > av) messages.push(`${label} insuffisants (${Math.round(av)} g) → ${hausse}.`);
  };
  diag("Lipides", avant.lipides, apres.lipides, b.lipides.grammes, "huile, noix et fromages réduits", "matières grasses de qualité augmentées");
  diag("Protéines", avant.proteines, apres.proteines, b.proteines.grammes, "portions protéiques réduites", "source protéique augmentée");
  diag("Glucides", avant.glucides, apres.glucides, b.glucides.grammes, "féculents réduits", "riz, pain, pommes de terre, légumineuses ou fruits ajustés");
  if (messages.length === 0) messages.push("Portions réajustées pour coller au plus près des objectifs.");
  return { jour, messages };
}

/** Statut d'atteinte d'un objectif : ±10 % = atteint. */
export function statutObjectif(val: number, cible: number): "ok" | "bas" | "haut" {
  if (!cible) return "ok";
  const r = val / cible;
  return r < 0.9 ? "bas" : r > 1.1 ? "haut" : "ok";
}
