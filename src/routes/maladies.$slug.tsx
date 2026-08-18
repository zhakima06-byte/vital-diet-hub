import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { getDisease } from "@/data/diseases";

export const Route = createFileRoute("/maladies/$slug")({
  loader: ({ params }) => {
    const sheet = getDisease(params.slug);
    if (!sheet) throw notFound();
    return { sheet };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Fiche introuvable — NutriSanté" }, { name: "robots", content: "noindex" }] };
    }
    const { sheet } = loaderData;
    return {
      meta: [
        { title: `${sheet.name} — NutriSanté` },
        { name: "description", content: sheet.objectif.slice(0, 155) },
        { property: "og:title", content: `${sheet.name} — NutriSanté` },
        { property: "og:description", content: sheet.short },
      ],
    };
  },
  component: DiseasePage,
  errorComponent: ({ error }) => (
    <AppShell>
      <p role="alert">{error.message}</p>
    </AppShell>
  ),
  notFoundComponent: () => (
    <AppShell>
      <p>Cette fiche pathologie n'existe pas.</p>
    </AppShell>
  ),
});

function ListCard({ title, items, tone }: { title: string; items: string[]; tone: "low" | "mid" | "high" }) {
  const tones = {
    low: "border-level-low/40 bg-level-low-soft",
    mid: "border-level-mid/40 bg-level-mid-soft",
    high: "border-level-high/40 bg-level-high-soft",
  } as const;
  return (
    <section className={`rounded-2xl border p-5 ${tones[tone]}`}>
      <h2 className="text-base font-semibold">{title}</h2>
      <ul className="mt-3 space-y-1.5 text-sm">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden>•</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DiseasePage() {
  const { sheet } = Route.useLoaderData();

  return (
    <AppShell>
      <Link to="/maladies" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Toutes les pathologies
      </Link>

      <header className="mt-3">
        <span className="text-3xl">{sheet.emoji}</span>
        <h1 className="mt-1 text-2xl font-semibold">{sheet.name}</h1>
      </header>

      <div className="mt-4">
        <MedicalDisclaimer strong />
      </div>

      <section className="card-soft mt-4 p-5">
        <h2 className="text-base font-semibold">Objectif nutritionnel</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sheet.objectif}</p>
      </section>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ListCard title="Aliments recommandés" items={sheet.recommandes} tone="low" />
        <ListCard title="Aliments à limiter" items={sheet.aLimiter} tone="mid" />
      </div>

      <div className="mt-4">
        <ListCard title="Aliments à éviter" items={sheet.aEviter} tone="high" />
      </div>

      <section className="card-soft mt-4 p-5">
        <h2 className="text-base font-semibold">Exemple de journée type</h2>
        <ul className="mt-3 space-y-3">
          {sheet.journeeType.map((r) => (
            <li key={r.repas} className="border-l-2 border-primary/40 pl-3">
              <p className="text-sm font-medium">{r.repas}</p>
              <p className="text-sm text-muted-foreground">{r.contenu}</p>
            </li>
          ))}
        </ul>
      </section>

      {sheet.reperes && sheet.reperes.length > 0 && (
        <section className="card-soft mt-4 p-5">
          <h2 className="text-base font-semibold">Repères pratiques</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {sheet.reperes.map((r) => (
              <li key={r}>• {r}</li>
            ))}
          </ul>
        </section>
      )}
    </AppShell>
  );
}