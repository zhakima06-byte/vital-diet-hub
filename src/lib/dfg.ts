export type Sexe = "H" | "F";
export type Formule = "ckd-epi" | "mdrd" | "cockcroft";
export type UniteCreat = "umol" | "mgdl";

export const formules: { key: Formule; label: string; note: string }[] = [
  { key: "ckd-epi", label: "CKD-EPI (2021)", note: "Formule de référence actuelle, sans facteur ethnique." },
  { key: "mdrd", label: "MDRD", note: "Formule historique, moins fiable au-dessus de 60 mL/min." },
  { key: "cockcroft", label: "Cockcroft-Gault", note: "Clairance estimée en mL/min, utile pour l'adaptation posologique." },
];

/** Convertit une créatinine en mg/dL. */
export const toMgDl = (valeur: number, unite: UniteCreat) =>
  unite === "mgdl" ? valeur : valeur / 88.4;

export type Stade = { code: string; libelle: string; description: string; tone: "low" | "mid" | "high" };

export const stades: (Stade & { min: number })[] = [
  { min: 90, code: "G1", libelle: "Fonction rénale normale", description: "DFG ≥ 90 mL/min/1,73m². Une maladie rénale n'est retenue qu'en présence d'anomalies associées (albuminurie, imagerie).", tone: "low" },
  { min: 60, code: "G2", libelle: "Baisse légère du DFG", description: "DFG 60 à 89. Surveillance annuelle, contrôle de la tension artérielle et des apports en sel.", tone: "low" },
  { min: 45, code: "G3a", libelle: "Baisse légère à modérée", description: "DFG 45 à 59. Adaptation des apports protéiques, surveillance du potassium et du phosphore.", tone: "mid" },
  { min: 30, code: "G3b", libelle: "Baisse modérée à sévère", description: "DFG 30 à 44. Suivi néphrologique, restriction potassique fréquente, vitamine D.", tone: "mid" },
  { min: 15, code: "G4", libelle: "Baisse sévère", description: "DFG 15 à 29. Préparation à la suppléance, chélateurs du phosphore, suivi diététique rapproché.", tone: "high" },
  { min: 0, code: "G5", libelle: "Insuffisance rénale terminale", description: "DFG < 15. Dialyse ou transplantation à envisager ; les besoins protéiques augmentent en dialyse.", tone: "high" },
];

export const stadeDe = (dfg: number): Stade => stades.find((s) => dfg >= s.min)!;

export type Entree = {
  age: number;
  sexe: Sexe;
  creatinine: number;
  unite: UniteCreat;
  poids?: number;
};

export function calculDfg(formule: Formule, e: Entree): number | null {
  const scr = toMgDl(e.creatinine, e.unite);
  if (!(scr > 0) || !(e.age > 0)) return null;
  const femme = e.sexe === "F";

  if (formule === "ckd-epi") {
    const kappa = femme ? 0.7 : 0.9;
    const alpha = femme ? -0.241 : -0.302;
    const ratio = scr / kappa;
    const value =
      142 *
      Math.pow(Math.min(ratio, 1), alpha) *
      Math.pow(Math.max(ratio, 1), -1.2) *
      Math.pow(0.9938, e.age) *
      (femme ? 1.012 : 1);
    return Math.round(value);
  }

  if (formule === "mdrd") {
    const value = 175 * Math.pow(scr, -1.154) * Math.pow(e.age, -0.203) * (femme ? 0.742 : 1);
    return Math.round(value);
  }

  if (!e.poids || e.poids <= 0) return null;
  const value = (((140 - e.age) * e.poids) / (72 * scr)) * (femme ? 0.85 : 1);
  return Math.round(value);
}
