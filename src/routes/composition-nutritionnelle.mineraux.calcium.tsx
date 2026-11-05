import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ChevronRight, Info } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MineralTable } from "@/components/MineralTable";
import { alimentsCalcium, eauxCalcium, calciumCategories, sourceCalcium } from "@/data/calcium";

export const Route = createFileRoute("/composition-nutritionnelle/mineraux/calcium")({
  head: () => ({
    meta: [
      { title: "Les aliments les plus riches en calcium | NutriSanté" },
      { name: "description", content: "Tableau des aliments les plus riches en calcium (mg/100 g), eaux minérales en mg/L, biodisponibilité et précautions." },
      { property: "og:title", content: "Les aliments les plus riches en calcium" },
      { property: "og:description", content: "Teneurs indicatives en calcium, sources vérifiables et repères pédagogiques." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CalciumPage,
});

function CalciumPage() {
  return (
    <AppShell>
      <nav aria-label="Fil d’Ariane" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/composition-nutritionnelle" className="hover:text-primary">Composition nutritionnelle des aliments</Link>
        <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
        <Link to="/composition-nutritionnelle/mineraux" className="hover:text-primary">Minéraux</Link>
        <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
        <span aria-current="page">Calcium</span>
      </nav>

      <h1 className="text-2xl font-semibold">Les aliments les plus riches en calcium</h1>
      <p className="mt-2 text-sm text-muted-foreground">Teneurs indicatives pour 100 g : elles varient selon le produit et sa préparation. L’état (cru, cuit, égoutté, séché, préparé) est précisé pour chaque ligne.</p>

      <section className="mt-6 rounded-2xl border border-border bg-tone-blue-soft p-4">
        <h2 className="flex items-center gap-2 font-semibold"><Info className="size-4 text-tone-blue" />À savoir sur le calcium</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Il est essentiel à la <strong>santé osseuse</strong>, à la <strong>contraction musculaire</strong> et à la <strong>transmission nerveuse</strong>.</li>
          <li>La <strong>teneur</strong> d’un aliment n’est pas la quantité <strong>réellement absorbée</strong> : tout dépend de la biodisponibilité.</li>
          <li>Certains végétaux riches en <strong>oxalates</strong>, comme les épinards, fournissent un calcium bien moins absorbé que ne le laisse penser leur teneur.</li>
          <li>Certaines <strong>eaux minérales</strong> calciques sont une source intéressante de calcium.</li>
        </ul>
      </section>

      <section className="mt-4 flex gap-3 rounded-2xl border border-border bg-tone-pink-soft p-4 text-sm">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-tone-pink" />
        <p><strong>Prudence :</strong> en cas de maladie rénale chronique, les apports en calcium doivent être adaptés au contexte clinique (calcémie, phosphatémie, PTH, stade de la maladie). Pas de supplémentation systématique.</p>
      </section>

      <MineralTable rows={alimentsCalcium} categories={calciumCategories} valeurLabel="Calcium (mg/100 g)" />

      <h2 className="mt-8 text-lg font-semibold">Eaux minérales riches en calcium</h2>
      <p className="mt-1 text-sm text-muted-foreground">Teneur exprimée en mg par litre, non comparable directement aux aliments.</p>
      <MineralTable rows={eauxCalcium} categories={[]} valeurLabel="Calcium (mg/L)" />

      <p className="mt-3 text-xs text-muted-foreground">Source : {sourceCalcium}</p>
    </AppShell>
  );
}
