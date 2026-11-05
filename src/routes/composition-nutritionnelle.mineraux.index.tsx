import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { nutrientSections } from "@/data/nutrientSections";

export const Route = createFileRoute("/composition-nutritionnelle/mineraux/")({
  head: () => ({ meta: [
    { title: "Minéraux — Composition nutritionnelle | NutriSanté" },
    { name: "description", content: "Teneur en minéraux : calcium, magnésium, fer, zinc, iode, potassium et autres minéraux. Tableaux, recherche, repères et précautions." },
    { property: "og:title", content: "Minéraux alimentaires — NutriSanté" },
    { property: "og:description", content: "Comparez les sources alimentaires des minéraux et leurs repères nutritionnels." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: MineralsPage,
});

function MineralsPage() {
  const minerals = nutrientSections.find((section) => section.key === "mineraux");
  return (
    <AppShell>
      <Link to="/composition-nutritionnelle" className="inline-flex items-start gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="mt-0.5 size-4 shrink-0" />Composition nutritionnelle des aliments</Link>
      <h1 className="mt-4 text-2xl font-semibold">Minéraux</h1>
      <h2 className="mt-2 text-lg text-muted-foreground">Teneur en minéraux</h2>
      <div className="mt-6 divide-y divide-border border-y border-border">
        {minerals?.entries.map((entry) => (
          <Link key={entry.key} to={entry.to} className="flex items-center justify-between gap-4 py-5 font-semibold hover:text-primary">
            {entry.label}<ArrowRight className="size-5 shrink-0" />
          </Link>
        ))}
      </div>
    </AppShell>
  );
}