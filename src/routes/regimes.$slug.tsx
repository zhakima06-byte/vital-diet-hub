import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { getDiet } from "@/data/diets";

export const Route = createFileRoute("/regimes/$slug")({
  loader: ({ params }) => {
    const diet = getDiet(params.slug);
    if (!diet) throw notFound();
    return { diet };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Régime introuvable — NutriSanté" }, { name: "robots", content: "noindex" }] };
    }
    const { diet } = loaderData;
    return {
      meta: [
        { title: `${diet.name} — NutriSanté` },
        { name: "description", content: diet.principe.slice(0, 155) },
        { property: "og:title", content: `${diet.name} — NutriSanté` },
        { property: "og:description", content: diet.tagline },
      ],
    };
  },
  component: DietPage,
  errorComponent: ({ error }) => (
    <AppShell>
      <p role="alert">{error.message}</p>
    </AppShell>
  ),
  notFoundComponent: () => (
    <AppShell>
      <p>Cette fiche régime n'existe pas.</p>
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

function DietPage() {
  const { diet } = Route.useLoaderData();

  return (
    <AppShell>
      <Link to="/regimes" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Tous les régimes
      </Link>

      <header className="mt-3">
        <span className="text-3xl">{diet.emoji}</span>
        <h1 className="mt-1 text-2xl font-semibold">{diet.name}</h1>
        <p className="text-sm text-muted-foreground">{diet.tagline}</p>
      </header>

      <section className="card-soft mt-5 p-5">
        <h2 className="text-base font-semibold">Principe général</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{diet.principe}</p>
      </section>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ListCard title="Aliments à privilégier" items={diet.privilegier} tone="low" />
        <ListCard title="Aliments à limiter" items={diet.limiter} tone="mid" />
      </div>

      <section className="card-soft mt-4 p-5">
        <h2 className="text-base font-semibold">Exemple de journée type</h2>
        <ul className="mt-3 space-y-3">
          {diet.journeeType.map((r) => (
            <li key={r.repas} className="border-l-2 border-primary/40 pl-3">
              <p className="text-sm font-medium">{r.repas}</p>
              <p className="text-sm text-muted-foreground">{r.contenu}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ListCard title="Bénéfices attendus" items={diet.benefices} tone="low" />
        <ListCard title="Précautions et contre-indications" items={diet.precautions} tone="high" />
      </div>

      <div className="mt-6">
        <MedicalDisclaimer />
      </div>
    </AppShell>
  );
}