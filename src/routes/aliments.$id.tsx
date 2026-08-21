import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { getFood, nutrients, levelOf, levelLabel } from "@/data/foods";

export const Route = createFileRoute("/aliments/$id")({
  loader: ({ params }) => {
    const food = getFood(params.id);
    if (!food) throw notFound();
    return { food };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Aliment introuvable — NutriSanté" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { food } = loaderData;
    const description = `Teneurs pour 100 g de ${food.name} : phosphore, protéines, glucides, lipides, calcium, potassium, sodium et citrate.`;
    return {
      meta: [
        { title: `${food.name} — teneurs pour 100 g | NutriSanté` },
        { name: "description", content: description },
        { property: "og:title", content: `${food.name} — teneurs nutritionnelles` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: FoodPage,
  errorComponent: ({ error }) => (
    <AppShell>
      <p role="alert">{error.message}</p>
    </AppShell>
  ),
  notFoundComponent: () => (
    <AppShell>
      <p>Cet aliment n'existe pas dans la base.</p>
    </AppShell>
  ),
});

const levelClass = {
  faible: "bg-level-low-soft text-level-low border-level-low/40",
  modere: "bg-level-mid-soft text-level-mid border-level-mid/40",
  eleve: "bg-level-high-soft text-level-high border-level-high/40",
} as const;

function FoodPage() {
  const { food } = Route.useLoaderData();

  return (
    <AppShell>
      <Link
        to="/aliments"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Base aliments
      </Link>

      <header className="mt-3">
        <h1 className="text-2xl font-semibold">{food.name}</h1>
        <p className="text-sm text-muted-foreground">
          {food.category} · valeurs pour 100 g
        </p>
      </header>

      <section className="card-soft mt-5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/60 text-left">
              <th className="px-4 py-3 font-medium">Nutriment</th>
              <th className="px-4 py-3 text-right font-medium">Pour 100 g</th>
              <th className="px-4 py-3 text-right font-medium">Niveau</th>
            </tr>
          </thead>
          <tbody>
            {nutrients.map((n) => {
              const value = food.values[n.key];
              const lvl = levelOf(n.key, value);
              return (
                <tr key={n.key} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3">{n.label}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {value} {n.unit}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${levelClass[lvl]}`}
                    >
                      {levelLabel[lvl]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <p className="mt-4 text-xs text-muted-foreground">
        Valeurs indicatives d'ordre de grandeur (type table CIQUAL — ANSES). Les seuils faible /
        modéré / élevé doivent être validés par un professionnel de santé référent.
      </p>
    </AppShell>
  );
}
