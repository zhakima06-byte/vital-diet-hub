/**
 * Moteur de calcul nutritionnel unique de NutriSanté.
 *
 * Toutes les pages (accueil/IMC, calculateur de calories, compteur) doivent
 * utiliser `calculateNutritionNeeds` afin d'éviter tout calcul parallèle.
 *
 * Chaîne de calcul :
 *   BMR (Mifflin-St Jeor) -> TDEE (BMR × facteur d'activité)
 *   -> calories cibles (TDEE + ajustement objectif borné)
 *   -> macronutriments (protéines g/kg selon profil, lipides en % , glucides = reste)
 */

export type SexeNutrition = "homme" | "femme";

export type ActiviteKey =
  | "sedentaire"
  | "leger"
  | "modere"
  | "intense"
  | "actif"
  | "tres-actif";

export type ObjectifKey = "perte" | "maintien" | "prise";

/** Profils cliniques : permettent d'adapter la cible protéique au contexte. */
export type ProfilNutritionnel =
  | "adulte"
  | "sportif"
  | "diabete"
  | "hypertension"
  | "goutte"
  | "renale";

export const ACTIVITY_FACTORS: Record<ActiviteKey, number> = {
  sedentaire: 1.2,
  leger: 1.375,
  modere: 1.55,
  intense: 1.725,
  actif: 1.725,
  "tres-actif": 1.9,
};

export const activiteLabels: Record<ActiviteKey, string> = {
  sedentaire: "Sédentaire",
  leger: "Léger (1-3 j/sem.)",
  modere: "Modéré (3-5 j/sem.)",
  intense: "Intense",
  actif: "Actif (6-7 j/sem.)",
  "tres-actif": "Très actif",
};

/** Ajustement de l'objectif, en pourcentage du TDEE, volontairement modéré. */
export const OBJECTIF_ADJUSTMENTS: Record<ObjectifKey, number> = {
  perte: -0.2,
  maintien: 0,
  prise: 0.15,
};

/**
 * Cible protéique en g/kg de poids corporel selon le profil clinique.
 * La maladie rénale chronique n'utilise jamais la valeur d'un adulte sain.
 */
export const PROTEIN_G_PER_KG: Record<ProfilNutritionnel, number> = {
  adulte: 1.0,
  sportif: 1.6,
  diabete: 1.2,
  hypertension: 1.0,
  goutte: 1.0,
  renale: 0.8,
};

/** Part de l'énergie apportée par les lipides selon le profil. */
export const FAT_ENERGY_SHARE: Record<ProfilNutritionnel, number> = {
  adulte: 0.35,
  sportif: 0.3,
  diabete: 0.35,
  hypertension: 0.33,
  goutte: 0.3,
  renale: 0.35,
};

/** Planchers de sécurité : aucun objectif calorique en dessous de ces valeurs. */
export const CALORIE_FLOOR: Record<SexeNutrition, number> = {
  femme: 1200,
  homme: 1500,
};

export type NutritionInput = {
  sexe?: SexeNutrition | null;
  age?: number | null;
  poids?: number | null;
  taille?: number | null;
  activite?: ActiviteKey | null;
  objectif?: ObjectifKey | null;
  profil?: ProfilNutritionnel;
  /** Surcharge clinique éventuelle de la cible protéique (g/kg). */
  proteinesParKg?: number | null;
};

export type MacroDetail = {
  grammes: number;
  kcal: number;
  /** Part de l'énergie totale, en %. */
  pourcentage: number;
};

export type NutritionResult = {
  valide: boolean;
  erreurs: string[];
  bmr: number;
  tdee: number;
  caloriesCibles: number;
  /** Écart appliqué par rapport au TDEE, en kcal (négatif = déficit). */
  ajustement: number;
  facteurActivite: number;
  profil: ProfilNutritionnel;
  proteinesParKg: number;
  macros: {
    proteines: MacroDetail;
    glucides: MacroDetail;
    lipides: MacroDetail;
  };
};

const isNum = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v);

/** Validation défensive : données manquantes ou physiologiquement impossibles. */
export function validerDonnees(input: NutritionInput): string[] {
  const erreurs: string[] = [];
  if (!isNum(input.poids) || input.poids <= 0) erreurs.push("Poids manquant ou invalide.");
  else if (input.poids < 25 || input.poids > 300) erreurs.push("Poids hors des valeurs plausibles (25 à 300 kg).");

  if (!isNum(input.taille) || input.taille <= 0) erreurs.push("Taille manquante ou invalide.");
  else if (input.taille < 100 || input.taille > 250) erreurs.push("Taille hors des valeurs plausibles (100 à 250 cm).");

  if (!isNum(input.age) || input.age <= 0) erreurs.push("Âge manquant ou invalide.");
  else if (input.age < 15 || input.age > 110) erreurs.push("Âge hors des valeurs plausibles (15 à 110 ans).");

  if (input.sexe !== "homme" && input.sexe !== "femme") erreurs.push("Sexe non renseigné.");
  return erreurs;
}

const emptyMacro = (): MacroDetail => ({ grammes: 0, kcal: 0, pourcentage: 0 });

/** Fonction centrale unique de calcul des besoins nutritionnels. */
export function calculateNutritionNeeds(input: NutritionInput): NutritionResult {
  const profil: ProfilNutritionnel = input.profil ?? "adulte";
  const erreurs = validerDonnees(input);

  if (erreurs.length > 0) {
    return {
      valide: false,
      erreurs,
      bmr: 0,
      tdee: 0,
      caloriesCibles: 0,
      ajustement: 0,
      facteurActivite: ACTIVITY_FACTORS[input.activite ?? "sedentaire"] ?? 1.2,
      profil,
      proteinesParKg: input.proteinesParKg ?? PROTEIN_G_PER_KG[profil],
      macros: { proteines: emptyMacro(), glucides: emptyMacro(), lipides: emptyMacro() },
    };
  }

  const poids = input.poids as number;
  const taille = input.taille as number;
  const age = input.age as number;
  const sexe = input.sexe as SexeNutrition;

  const facteurActivite = ACTIVITY_FACTORS[input.activite ?? "sedentaire"] ?? 1.2;
  const objectif: ObjectifKey = input.objectif ?? "maintien";

  // 1. Métabolisme de base — Mifflin-St Jeor
  const bmr = Math.round(
    10 * poids + 6.25 * taille - 5 * age + (sexe === "homme" ? 5 : -161),
  );

  // 2. Dépense énergétique totale estimée
  const tdee = Math.round(bmr * facteurActivite);

  // 3. Objectif calorique, ajustement modéré et plancher de sécurité
  const brut = Math.round(tdee * (1 + OBJECTIF_ADJUSTMENTS[objectif]));
  const caloriesCibles = Math.max(CALORIE_FLOOR[sexe], brut);
  const ajustement = caloriesCibles - tdee;

  // 4. Macronutriments — protéines g/kg, lipides en part d'énergie, glucides = reste
  const proteinesParKg = input.proteinesParKg ?? PROTEIN_G_PER_KG[profil];
  let protG = Math.round(poids * proteinesParKg);
  let protKcal = protG * 4;

  let lipG = Math.round((caloriesCibles * FAT_ENERGY_SHARE[profil]) / 9);
  let lipKcal = lipG * 9;

  // Garde-fou : protéines + lipides ne peuvent pas dépasser la cible.
  if (protKcal + lipKcal > caloriesCibles * 0.9) {
    const ratio = (caloriesCibles * 0.9) / (protKcal + lipKcal);
    protG = Math.round(protG * ratio);
    lipG = Math.round(lipG * ratio);
    protKcal = protG * 4;
    lipKcal = lipG * 9;
  }

  const glucKcal = Math.max(0, caloriesCibles - protKcal - lipKcal);
  const glucG = Math.round(glucKcal / 4);

  const totalKcal = protKcal + glucG * 4 + lipKcal || 1;
  const pct = (kcal: number) => Math.round((kcal / totalKcal) * 100);

  return {
    valide: true,
    erreurs: [],
    bmr,
    tdee,
    caloriesCibles,
    ajustement,
    facteurActivite,
    profil,
    proteinesParKg,
    macros: {
      proteines: { grammes: protG, kcal: protKcal, pourcentage: pct(protKcal) },
      glucides: { grammes: glucG, kcal: glucG * 4, pourcentage: pct(glucG * 4) },
      lipides: { grammes: lipG, kcal: lipKcal, pourcentage: pct(lipKcal) },
    },
  };
}
