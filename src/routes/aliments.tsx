import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { foods, nutrients, levelOf, levelLabel, type NutrientKey } from "@/data/foods";

export const Route = createFileRoute("/aliments")({
  head: () => ({
    meta: [
      { title: "Teneurs alimentaires en nutriments — NutriSanté" },
      {
        name: "description",
        content:
          "Recherchez un aliment et consultez ses teneurs pour 100 g : phosphore, protéines, glucides, lipides, calcium, potassium, sodium, citrate.",
      },
      { property: "og:title", content: "Base de teneurs alimentaires — NutriSanté" },
      {
        property: "og:description",
        content: "Filtrez par nutriment, classez par teneur et repérez les niveaux faible, modéré ou élevé.",
      },
    ],
  }),
  component: FoodsPage,
});

const levelClass = {
  faible: "bg-level-low-soft text-level-low border-level-low/40",
  modere: "bg-level-mid-soft text-level-mid border-level-mid/40",
  eleve: "bg-level-high-soft text-level-high border-level-high/40",
} as const;

function FoodsPage() {
  const [query, setQuery] = useState("");
  const [nutrient, setNutrient] = useState<NutrientKey>("phosphore");
  const [desc, setDesc] = useState(true);

  const current = nutrients.find((n) => n.key === nutrient)!;

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return foods
      .filter((f) => !q || f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))
      .sort((a, b) =>
        desc
          ? b.values[nutrient] - a.values[nutrient]
          : a.values[nutrient] - b.values[nutrient],
      );
  }, [query, nutrient, desc]);

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">Teneurs alimentaires</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Valeurs indicatives pour 100 g. Les seuils faible / modéré / élevé sont à valider par un
        professionnel de santé.
      </p>

      <div className="card-soft mt-5 space-y-4 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un aliment…"
            aria-label="Rechercher un aliment"
            className="w-full rounded-xl border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {nutrients.map((n) => (
            <button
              key={n.key}
              onClick={() => setNutrient(n.key)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                n.key === nutrient
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-accent"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setDesc((d) => !d)}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent"
        >
          <ArrowUpDown className="size-3.5" />
          {desc ? "Du plus riche au plus faible" : "Du plus faible au plus riche"}
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {list.map((food) => {
          const value = food.values[nutrient];
          const lvl = levelOf(nutrient, value);
          return (
            <li key={food.id}>
              <Link
                to="/aliments/$id"
                params={{ id: food.id }}
                className="card-soft flex items-center justify-between gap-3 p-4"
              >
                <span>
                  <span className="block text-sm font-medium">{food.name}</span>
                  <span className="block text-xs text-muted-foreground">{food.category}</span>
                </span>
                <span className="flex items-center gap-3 text-right">
                  <span className="text-sm font-semibold tabular-nums">
                    {value} {current.unit}
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${levelClass[lvl]}`}>
                    {levelLabel[lvl]}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
        {list.length === 0 && (
          <li className="py-8 text-center text-sm text-muted-foreground">Aucun aliment trouvé.</li>
        )}
      </ul>
    </AppShell>
  );
}