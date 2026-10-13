import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { nutrientSections } from "@/data/nutrientSections";

export const Route = createFileRoute("/composition-nutritionnelle/")({
  head: () => ({ meta: [
    { title: "Composition nutritionnelle des aliments — NutriSanté" },
    { name: "description", content: "Explorez la composition nutritionnelle des aliments : minéraux et fiche zinc, apports conseillés, absorption et aliments les plus riches." },
    { property: "og:title", content: "Composition nutritionnelle des aliments — NutriSanté" },
    { property: "og:description", content: "Les minéraux dans l’alimentation, avec une première fiche complète consacrée au zinc." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: CompositionPage,
});

function CompositionPage() {
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">Composition nutritionnelle des aliments</h1>
      <div className="mt-6 divide-y divide-border border-y border-border">
        {nutrientSections.filter((section) => section.entries.length > 0).map((section) => (
          <Link key={section.key} to="/composition-nutritionnelle/mineraux" className="flex items-center justify-between gap-4 py-5 text-lg font-semibold hover:text-primary">
            {section.label}<ArrowRight className="size-5 shrink-0" />
          </Link>
        ))}
      </div>
    </AppShell>
  );
}