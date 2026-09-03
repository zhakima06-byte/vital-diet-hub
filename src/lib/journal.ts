import { useCallback, useEffect, useState } from "react";

export type Repas = "petit-dejeuner" | "dejeuner" | "collation" | "diner";

export const repasList: { key: Repas; label: string }[] = [
  { key: "petit-dejeuner", label: "Petit-déjeuner" },
  { key: "dejeuner", label: "Déjeuner" },
  { key: "collation", label: "Collation" },
  { key: "diner", label: "Dîner" },
];

export type Entree = {
  id: string;
  foodId: string;
  nom: string;
  grammes: number;
  kcal: number;
  repas: Repas;
};

export type Journal = Record<string, Entree[]>;

const KEY = "nutrisante:journal";

export const dateKey = (d = new Date()) => d.toISOString().slice(0, 10);

export function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

/** Les 7 derniers jours, du plus ancien au plus récent. */
export function derniers7Jours(base = new Date()): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base);
    d.setDate(d.getDate() - (6 - i));
    return dateKey(d);
  });
}

function read(): Journal {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Journal) : {};
  } catch {
    return {};
  }
}

export function useJournal() {
  const [journal, setJournal] = useState<Journal>({});
  const [pret, setPret] = useState(false);

  useEffect(() => {
    setJournal(read());
    setPret(true);
  }, []);

  const persist = (next: Journal) => {
    setJournal(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* stockage indisponible */
    }
  };

  const ajouter = useCallback((jour: string, entree: Entree) => {
    setJournal((prev) => {
      const next = { ...prev, [jour]: [...(prev[jour] ?? []), entree] };
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const supprimer = useCallback((jour: string, id: string) => {
    setJournal((prev) => {
      const next = { ...prev, [jour]: (prev[jour] ?? []).filter((e) => e.id !== id) };
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const viderJour = useCallback((jour: string) => {
    setJournal((prev) => {
      const next = { ...prev, [jour]: [] };
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { journal, pret, ajouter, supprimer, viderJour, persist };
}

export const totalKcal = (entrees: Entree[] = []) =>
  Math.round(entrees.reduce((s, e) => s + e.kcal, 0));
