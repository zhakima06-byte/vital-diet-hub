import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronRight, Info } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { alimentsFer, ferCategories, sourceFer, type FerCategorie } from "@/data/fer";

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
  const [filtre, setFiltre] = useState<FerCategorie | "toutes">("toutes");
  const [desc, setDesc] = useState(true);
  const label = (k: FerCategorie) => ferCategories.find((c) => c.key === k)?.label ?? k;

  const liste = useMemo(
    () =>
      alimentsFer
        .filter((a) => filtre === "toutes" || a.categorie === filtre)
        .sort((a, b) => {
          if (a.fer === null) return 1;
          if (b.fer === null) return -1;
          return desc ? b.fer - a.fer : a.fer - b.fer;
        }),
    [filtre, desc],
  );

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

      <div className="mt-6 flex flex-wrap gap-2">
        {[{ key: "toutes" as const, label: "Toutes" }, ...ferCategories].map((c) => (
          <button key={c.key} type="button" onClick={() => setFiltre(c.key)}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${filtre === c.key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-muted text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3">Aliment</th>
              <th className="p-3">Catégorie</th>
              <th className="p-3">
                <button type="button" onClick={() => setDesc(!desc)} className="inline-flex items-center gap-1 uppercase hover:text-primary">
                  Fer (mg/100 g)<ArrowUpDown className="size-3" />
                </button>
              </th>
              <th className="p-3">État</th>
              <th className="p-3">Type de fer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {liste.map((a) => (
              <tr key={a.nom + a.etat}>
                <td className="p-3 font-medium">{a.nom}</td>
                <td className="p-3 text-muted-foreground">{label(a.categorie)}</td>
                <td className="p-3 font-semibold tabular-nums">{a.fer === null ? <span className="font-normal text-muted-foreground">Variable — voir l’étiquette</span> : a.fer.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}</td>
                <td className="p-3">{a.etat}</td>
                <td className="p-3">{a.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Source : {sourceFer}</p>
    </AppShell>
  );
}
