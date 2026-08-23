import { useCallback, useEffect, useState } from "react";

const KEY = "nutrisante:favoris";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useFavoris() {
  const [favoris, setFavoris] = useState<string[]>([]);

  useEffect(() => {
    setFavoris(read());
  }, []);

  const toggle = useCallback((id: string) => {
    setFavoris((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* stockage indisponible */
      }
      return next;
    });
  }, []);

  return { favoris, toggle, isFavori: (id: string) => favoris.includes(id) };
}

/** Historique générique (calculs DFG, repas) conservé localement. */
export function useHistorique<T>(key: string, max = 20) {
  const storageKey = `nutrisante:${key}`;
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setItems(JSON.parse(raw) as T[]);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  const add = useCallback(
    (entry: T) => {
      setItems((prev) => {
        const next = [entry, ...prev].slice(0, max);
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [storageKey, max],
  );

  const clear = useCallback(() => {
    setItems([]);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  return { items, add, clear };
}
