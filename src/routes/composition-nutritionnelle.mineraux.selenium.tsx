import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ChevronRight, Info } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MineralTable } from "@/components/MineralTable";
import { alimentsSelenium, seleniumCategories, sourceSelenium } from "@/data/selenium";

export const Route = createFileRoute("/composition-nutritionnelle/mineraux/selenium")({
  head: () => ({
    meta: [
      { title: "Les aliments les plus riches en sélénium | NutriSanté" },
      { name: "description", content: "Tableau des aliments les plus riches en sélénium (µg/100 g), rôle du sélénium, variabilité et précautions." },
      { property: "og:title", content: "Les aliments les plus riches en sélénium" },
      { property: "og:description", content: "Teneurs indicatives en sélénium, sources vérifiables et repères pédagogiques." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SeleniumPage,
});

function SeleniumPage() {
  return (
    <AppShell>
      <nav aria-label="Fil d’Ariane" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/composition-nutritionnelle" className="hover:text-primary">Composition nutritionnelle des aliments</Link>
        <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
        <Link to="/composition-nutritionnelle/mineraux" className="hover:text-primary">Minéraux</Link>
        <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
        <span aria-current="page">Sélénium</span>
      </nav>

      <h1 className="text-2xl font-semibold">Les aliments les plus riches en sélénium</h1>
      <p className="mt-2 text-sm text-muted-foreground">Teneurs indicatives en microgrammes (µg) pour 100 g : elles varient fortement selon les sols, l’alimentation des animaux et l’origine des produits. L’état est précisé pour chaque ligne.</p>

      <section className="mt-6 rounded-2xl border border-border bg-tone-blue-soft p-4">
        <h2 className="flex items-center gap-2 font-semibold"><Info className="size-4 text-tone-blue" />À savoir sur le sélénium</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Il contribue aux <strong>défenses antioxydantes</strong>, au <strong>métabolisme thyroïdien</strong> et au <strong>fonctionnement immunitaire</strong>.</li>
          <li>La teneur pour 100 g n’est pas l’apport réel : une <strong>portion</strong> peut être bien plus petite (une noix ≈ 5 g) ou plus grande.</li>
          <li>Les <strong>noix du Brésil</strong> contiennent des quantités très élevées et très variables : éviter d’en consommer beaucoup ou chaque jour.</li>
          <li>Un <strong>excès</strong> est possible en cumulant des aliments très concentrés et des compléments alimentaires.</li>
        </ul>
      </section>

      <section className="mt-4 flex gap-3 rounded-2xl border border-border bg-tone-pink-soft p-4 text-sm">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-tone-pink" />
        <p><strong>Prudence :</strong> en cas d’insuffisance rénale, les conseils nutritionnels doivent être adaptés à la situation clinique ; pas de supplémentation systématique en sélénium sans indication médicale.</p>
      </section>

      <MineralTable rows={alimentsSelenium} categories={seleniumCategories} valeurLabel="Sélénium (µg/100 g)" />

      <p className="mt-3 text-xs text-muted-foreground">Source : {sourceSelenium}</p>
    </AppShell>
  );
}
