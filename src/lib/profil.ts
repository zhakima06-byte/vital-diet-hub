import { useCallback, useEffect, useState } from "react";

export type Sexe = "femme" | "homme";
export type Activite = "sedentaire" | "leger" | "modere" | "intense";
export type Objectif = "perte" | "maintien" | "prise";
export type Statut = "sous-poids" | "normal" | "surpoids" | "obesite";

export type Profil = {
  poids: number;
  taille: number;
  age: number;
  sexe: Sexe;
  activite: Activite;
  objectif: Objectif;
  imc: number;
  statut: Statut;
  majAt: string;
};

const KEY = "nutrisante:profil";

export const activites: { key: Activite; label: string; factor: number }[] = [
  { key: "sedentaire", label: "Sédentaire", factor: 1.2 },
  { key: "leger", label: "Léger", factor: 1.375 },
  { key: "modere", label: "Modéré", factor: 1.55 },
  { key: "intense", label: "Intense", factor: 1.725 },
];

export const objectifs: { key: Objectif; label: string; delta: number }[] = [
  { key: "perte", label: "Perte de poids", delta: -400 },
  { key: "maintien", label: "Maintien", delta: 0 },
  { key: "prise", label: "Prise de poids", delta: 400 },
];

export const statutLabel: Record<Statut, string> = {
  "sous-poids": "Sous-poids",
  normal: "Poids normal",
  surpoids: "Surpoids",
  obesite: "Obésité",
};

export function statutFromImc(imc: number): Statut {
  if (imc < 18.5) return "sous-poids";
  if (imc < 25) return "normal";
  if (imc < 30) return "surpoids";
  return "obesite";
}

/** Objectif calorique conseillé selon le statut pondéral issu de l'IMC. */
export function objectifFromStatut(statut: Statut): Objectif {
  if (statut === "sous-poids") return "prise";
  if (statut === "normal") return "maintien";
  return "perte";
}

/** Métabolisme de base (Mifflin-St Jeor) puis besoins journaliers ajustés. */
export function besoins(p: Profil) {
  const mb = 10 * p.poids + 6.25 * p.taille - 5 * p.age + (p.sexe === "homme" ? 5 : -161);
  const factor = activites.find((a) => a.key === p.activite)!.factor;
  const delta = objectifs.find((o) => o.key === p.objectif)!.delta;
  const maintien = Math.round(mb * factor);
  const cible = Math.max(1200, Math.round(mb * factor + delta));
  return {
    mb: Math.round(mb),
    maintien,
    cible,
    macros: {
      proteines: Math.round((cible * 0.2) / 4),
      glucides: Math.round((cible * 0.45) / 4),
      lipides: Math.round((cible * 0.35) / 9),
    },
  };
}

export function readProfil(): Profil | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Profil) : null;
  } catch {
    return null;
  }
}

export function saveProfil(p: Profil) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* stockage indisponible */
  }
}

export function useProfil() {
  const [profil, setProfil] = useState<Profil | null>(null);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    setProfil(readProfil());
    setPret(true);
  }, []);

  const update = useCallback((patch: Partial<Profil>) => {
    setProfil((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch, majAt: new Date().toISOString() };
      saveProfil(next);
      return next;
    });
  }, []);

  return { profil, pret, update };
}
