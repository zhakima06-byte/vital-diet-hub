import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Info } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { alimentsFer, ferCategories, sourceFer } from "@/data/fer";
import { MineralTable } from "@/components/MineralTable";

export const Route = createFileRoute("/composition-nutritionnelle/mineraux/fer")({
  head: () => ({
    meta: [
      { title: "Les aliments les plus riches en fer | NutriSanté" },
      { name: "description", content: "Tableau des aliments les plus riches en fer (mg/100 g), état de l'aliment, fer héminique ou non héminique et conseils d'absorption." },
      { property: "og:title", content: "Les aliments les plus riches en fer" },
      { property: "og:description", content: "Teneurs indicatives en fer, sources vérifiables et conseils pour mieux absorber le fer." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FerPage,
});

function FerPage() {
  return (
    <AppShell>
      <nav aria-label="Fil d’Ariane" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/composition-nutritionnelle" className="hover:text-primary">Composition nutritionnelle des aliments</Link>
        <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
        <Link to="/composition-nutritionnelle/mineraux" className="hover:text-primary">Minéraux</Link>
        <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
        <span aria-current="page">Fer</span>
      </nav>

      <h1 className="text-2xl font-semibold">Les aliments les plus riches en fer</h1>
      <p className="mt-2 text-sm text-muted-foreground">Teneurs indicatives pour 100 g : elles varient selon le produit et sa préparation. L’état (cru, cuit, séché, égoutté) est précisé pour chaque ligne.</p>

      <section className="mt-6 rounded-2xl border border-border bg-tone-blue-soft p-4">
        <h2 className="flex items-center gap-2 font-semibold"><Info className="size-4 text-tone-blue" />Bien absorber le fer</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Le <strong>fer héminique</strong>, présent surtout dans les aliments d’origine animale, est généralement mieux absorbé.</li>
          <li>Le <strong>fer non héminique</strong>, présent notamment dans les végétaux, est moins facilement absorbé.</li>
          <li>La <strong>vitamine C</strong> prise au cours du même repas (agrumes, poivron, persil…) favorise l’absorption du fer non héminique.</li>
          <li>Le <strong>thé et le café</strong> pris au moment du repas peuvent réduire cette absorption : mieux vaut les décaler.</li>
        </ul>
      </section>

      <MineralTable rows={alimentsFer.map((a) => ({ nom: a.nom, categorie: a.categorie, valeur: a.fer, etat: a.etat, extra: a.type }))} categories={ferCategories} valeurLabel="Fer (mg/100 g)" extraLabel="Type de fer" />
      <p className="mt-3 text-xs text-muted-foreground">Source : {sourceFer}</p>
    </AppShell>
  );
}
