import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ChevronRight, Info } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MineralTable } from "@/components/MineralTable";
import { alimentsMagnesium, eauxMagnesium, magnesiumCategories, sourceMagnesium } from "@/data/magnesium";

export const Route = createFileRoute("/composition-nutritionnelle/mineraux/magnesium")({
  head: () => ({
    meta: [
      { title: "Les aliments les plus riches en magnésium | NutriSanté" },
      { name: "description", content: "Tableau des aliments les plus riches en magnésium (mg/100 g), eaux minérales en mg/L, rôle du magnésium et précautions." },
      { property: "og:title", content: "Les aliments les plus riches en magnésium" },
      { property: "og:description", content: "Teneurs indicatives en magnésium, sources vérifiables et repères pédagogiques." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MagnesiumPage,
});

function MagnesiumPage() {
  return (
    <AppShell>
      <nav aria-label="Fil d’Ariane" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/composition-nutritionnelle" className="hover:text-primary">Composition nutritionnelle des aliments</Link>
        <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
        <Link to="/composition-nutritionnelle/mineraux" className="hover:text-primary">Minéraux</Link>
        <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
        <span aria-current="page">Magnésium</span>
      </nav>

      <h1 className="text-2xl font-semibold">Les aliments les plus riches en magnésium</h1>
      <p className="mt-2 text-sm text-muted-foreground">Teneurs indicatives pour 100 g : elles varient selon le produit et sa préparation. L’état (cru, cuit, séché) est précisé pour chaque ligne.</p>

      <section className="mt-6 rounded-2xl border border-border bg-tone-blue-soft p-4">
        <h2 className="flex items-center gap-2 font-semibold"><Info className="size-4 text-tone-blue" />À savoir sur le magnésium</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Il participe au <strong>fonctionnement des nerfs et des muscles</strong> et au <strong>métabolisme énergétique</strong>.</li>
          <li>Principales sources : graines, fruits à coque, cacao, céréales complètes, légumineuses, légumes verts et certaines eaux minérales.</li>
          <li>Une <strong>alimentation variée</strong> permet en général de couvrir les besoins.</li>
          <li>La <strong>teneur</strong> d’un aliment n’est pas la quantité <strong>réellement absorbée</strong> : seule une partie passe dans l’organisme, selon l’aliment et le repas.</li>
        </ul>
      </section>

      <section className="mt-4 flex gap-3 rounded-2xl border border-border bg-tone-pink-soft p-4 text-sm">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-tone-pink" />
        <p><strong>Prudence :</strong> en cas d’insuffisance rénale avancée, le choix des aliments riches en magnésium et l’usage de compléments doivent être adaptés à la fonction rénale et à la magnésémie, avec l’avis du médecin.</p>
      </section>

      <MineralTable rows={alimentsMagnesium} categories={magnesiumCategories.filter((c) => c.key !== "eaux")} valeurLabel="Magnésium (mg/100 g)" />

      <h2 className="mt-8 text-lg font-semibold">Eaux minérales riches en magnésium</h2>
      <p className="mt-1 text-sm text-muted-foreground">Teneur exprimée en mg par litre, non comparable directement aux aliments.</p>
      <MineralTable rows={eauxMagnesium} categories={[]} valeurLabel="Magnésium (mg/L)" />

      <p className="mt-3 text-xs text-muted-foreground">Source : {sourceMagnesium}</p>
    </AppShell>
  );
}
