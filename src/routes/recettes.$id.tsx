import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock, HeartPulse, Lightbulb, ShieldAlert, Timer } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { FermentationMethod } from "@/components/FermentationMethod";
import { collectionInfo, FERMENTED, getRecipe } from "@/data/recettes";
import { recipeImages, recipeTones } from "@/data/recipeVisuals";

export const Route = createFileRoute("/recettes/$id")({
  loader: ({ params }) => { const recipe = getRecipe(params.id); if (!recipe) throw notFound(); return { recipe }; },
  head: ({ loaderData }) => {
    const r = loaderData?.recipe;
    const title = r ? `${r.name} — recette | NutriSanté` : "Recette indisponible | NutriSanté";
    const desc = r ? `${r.name} : ingrédients, préparation, temps, conseils, bienfaits et précautions.` : "Recette introuvable.";
    return { meta: [
      { title }, { name: "description", content: desc },
      { property: "og:title", content: title }, { property: "og:description", content: desc },
      { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" },
      ...(r ? [] : [{ name: "robots", content: "noindex" }]),
    ] };
  },
  notFoundComponent: () => <AppShell><p>Recette introuvable. <Link to="/recettes" className="underline">Retour aux recettes</Link></p></AppShell>,
  component: RecipePage,
});

function Block({ icon: Icon, title, items, tone }: { icon: typeof Clock; title: string; items: string[]; tone: string }) {
  if (!items.length) return null;
  return (
    <section className={`rounded-2xl border p-5 ${tone}`}>
      <h2 className="flex items-center gap-2 text-lg font-semibold"><Icon className="size-5" />{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">{items.map((i) => <li key={i} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 opacity-70" />{i}</li>)}</ul>
    </section>
  );
}

function RecipePage() {
  const { recipe: r } = Route.useLoaderData();
  const t = recipeTones[r.tone];
  const shared = collectionInfo[r.collection];
  return (
    <AppShell>
      <Link to="/recettes" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Recettes</Link>
      <article className="space-y-6">
        <div className={`overflow-hidden rounded-3xl border-2 ${t.border} ${t.bg} md:grid md:grid-cols-2`}>
          <img src={recipeImages[r.id]} alt={r.name} className="aspect-[4/3] h-full w-full object-cover" />
          <div className="p-5 sm:p-7">
            <span className={`text-xs font-semibold uppercase ${t.text}`}>{r.collection} · {r.category}</span>
            <h1 className="mt-1 text-3xl font-semibold">{r.name}</h1>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-card p-3"><dt className="flex items-center gap-1 text-muted-foreground"><Timer className="size-4" />Préparation</dt><dd className="font-semibold">{r.prepTime}</dd></div>
              <div className="rounded-xl bg-card p-3"><dt className="flex items-center gap-1 text-muted-foreground"><Clock className="size-4" />{r.collection === FERMENTED ? "Fermentation" : "Cuisson"}</dt><dd className="font-semibold">{r.days}</dd></div>
              <div className="col-span-2 rounded-xl bg-card p-3"><dt className="text-muted-foreground">🧂 Sel</dt><dd className="font-semibold">{r.saltPercent} % du poids des {r.saltBasis}</dd></div>
            </dl>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <section className="card-soft p-5"><h2 className="text-lg font-semibold">Ingrédients et quantités</h2>
            <ul className="mt-3 space-y-2 text-sm">{r.ingredients.map((i) => <li key={i} className="flex gap-2"><CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${t.text}`} />{i}</li>)}</ul></section>
          <section className="card-soft p-5"><h2 className="text-lg font-semibold">Préparation</h2><p className="mt-3 text-sm">{r.preparation}</p></section>
        </div>
        {r.collection === FERMENTED && <FermentationMethod />}
        <div className="grid gap-6 md:grid-cols-2">
          <Block icon={Lightbulb} title="Conseils nutritionnels" items={[...(r.nutritionTips ?? []), ...(shared?.nutritionTips ?? [])]} tone="border-tone-blue/40 bg-tone-blue-soft" />
          <Block icon={HeartPulse} title="Bienfaits nutritionnels" items={[...(r.benefits ?? []), ...(shared?.benefits ?? [])]} tone="border-tone-green/40 bg-tone-green-soft" />
        </div>
        <Block icon={ShieldAlert} title="Précautions et contre-indications" items={[...(r.precautions ?? []), ...(shared?.precautions ?? [])]} tone="border-level-high/40 bg-level-high-soft" />
        <MedicalDisclaimer />
      </article>
    </AppShell>
  );
}
