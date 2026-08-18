import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { diets } from "@/data/diets";

export const Route = createFileRoute("/regimes")({
  head: () => ({
    meta: [
      { title: "Régimes alimentaires — NutriSanté" },
      {
        name: "description",
        content:
          "Bibliothèque de régimes alimentaires : méditerranéen, cétogène, végétarien, jeûne intermittent, sans gluten, FODMAP.",
      },
      { property: "og:title", content: "Bibliothèque de régimes alimentaires — NutriSanté" },
      {
        property: "og:description",
        content: "Principe, aliments à privilégier, journée type et précautions pour chaque régime.",
      },
    ],
  }),
  component: RegimesPage,
});

function RegimesPage() {
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">Bibliothèque de régimes</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Chaque fiche suit le même gabarit : principe, aliments à privilégier et à limiter, journée
        type, bénéfices et précautions.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {diets.map((d) => (
          <Link
            key={d.slug}
            to="/regimes/$slug"
            params={{ slug: d.slug }}
            className="card-soft block p-5 transition-transform hover:-translate-y-0.5"
          >
            <span className="text-2xl">{d.emoji}</span>
            <h2 className="mt-2 text-lg font-semibold">{d.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{d.tagline}</p>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}