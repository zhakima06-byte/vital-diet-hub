import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { diseases } from "@/data/diseases";

export const Route = createFileRoute("/maladies")({
  head: () => ({
    meta: [
      { title: "Fiches de régimes thérapeutiques — NutriSanté" },
      {
        name: "description",
        content:
          "Fiches nutritionnelles par pathologie : hypertension (DASH), goutte, insuffisance rénale, calculs rénaux, SOPK, cancer, MICI, microbiote.",
      },
      { property: "og:title", content: "Régimes thérapeutiques par pathologie — NutriSanté" },
      {
        property: "og:description",
        content: "Objectif nutritionnel, aliments recommandés, à limiter, à éviter et journée type.",
      },
    ],
  }),
  component: DiseasesPage,
});

function DiseasesPage() {
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">Fiches par pathologie</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Repères nutritionnels pratiques pour les pathologies chroniques nécessitant une adaptation
        alimentaire.
      </p>

      <div className="mt-5">
        <MedicalDisclaimer strong />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {diseases.map((d) => (
          <Link
            key={d.slug}
            to="/maladies/$slug"
            params={{ slug: d.slug }}
            className="card-soft block p-5 transition-transform hover:-translate-y-0.5"
          >
            <span className="text-2xl">{d.emoji}</span>
            <h2 className="mt-2 text-lg font-semibold">{d.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{d.short}</p>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}