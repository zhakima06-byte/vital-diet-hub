import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { FermentationMethod } from "@/components/FermentationMethod";
import { recipeCategories, recipes, type RecipeCategory } from "@/data/recettes";
import { recipeImages, recipeTones } from "@/data/recipeVisuals";

export const Route = createFileRoute("/recettes/")({
  head: () => ({
    meta: [
      { title: "Recettes — bibliothèque culinaire et nutritionnelle | NutriSanté" },
      { name: "description", content: "Bibliothèque de recettes santé : légumes lacto-fermentés, ingrédients, préparation, conseils, bienfaits et précautions." },
      { property: "og:title", content: "Recettes — NutriSanté" },
      { property: "og:description", content: "Une bibliothèque de recettes avec fiches nutritionnelles détaillées." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RecettesPage,
});

function RecettesPage() {
  const [cat, setCat] = useState<RecipeCategory>("Toutes");
  const collections = [...new Set(recipes.map((r) => r.collection))];
  return (
    <AppShell>
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Recettes</h1>
        <p className="mt-2 text-muted-foreground">Bibliothèque culinaire et nutritionnelle : ouvrez une recette pour voir sa fiche complète.</p>
      </header>
      {collections.map((col) => {
        const list = recipes.filter((r) => r.collection === col && (cat === "Toutes" || r.category === cat));
        return (
          <section key={col} className="mb-10">
            <h2 className="mb-3 text-2xl font-semibold">{col}</h2>
            <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
              {recipeCategories.map((c) => (
                <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"}`}>{c}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((r) => { const t = recipeTones[r.tone]; return (
                <Link key={r.id} to="/recettes/$id" params={{ id: r.id }} className={`overflow-hidden rounded-2xl border-2 ${t.border} ${t.bg} shadow-soft transition-transform hover:-translate-y-0.5`}>
                  <img src={recipeImages[r.id]} alt={r.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <div className="p-4">
                    <span className={`text-xs font-semibold uppercase ${t.text}`}>{r.category}</span>
                    <h3 className="mt-1 text-lg font-semibold">{r.name}</h3>
                    <div className="mt-3 flex flex-wrap gap-x-4 text-sm"><span>⏱ {r.days}</span><span>🧂 {r.saltPercent} % de sel</span></div>
                  </div>
                </Link>); })}
            </div>
            {col === "Légumes lacto-fermentés" && <div className="mt-8"><FermentationMethod /></div>}
          </section>
        );
      })}
      <MedicalDisclaimer />
    </AppShell>
  );
}
