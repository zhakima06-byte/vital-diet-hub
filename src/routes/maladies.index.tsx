import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator, Heart, Search } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { pathologies } from "@/data/pathologies";
import { diseases } from "@/data/diseases";
import { useFavoris } from "@/lib/favoris";

export const Route = createFileRoute("/maladies/")({
  head: () => ({
    meta: [
      { title: "Fiches diététiques par pathologie — NutriSanté" },
      {
        name: "description",
        content:
          "Fiches diététiques détaillées : goutte, diabète, insuffisance rénale, maladies inflammatoires, maladie cœliaque, MICI, cancer. Avec calculateurs médicaux.",
      },
      { property: "og:title", content: "Fiches diététiques par pathologie — NutriSanté" },
      {
        property: "og:description",
        content: "Comprendre la maladie, aliments à privilégier, à limiter, à éviter, menu type, conseils et signaux d'alerte.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PathologiesPage,
});

function PathologiesPage() {
  const [query, setQuery] = useState("");
  const [seulementFavoris, setSeulementFavoris] = useState(false);
  const { favoris, toggle, isFavori } = useFavoris();

  const principales = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pathologies.filter((p) => {
      if (seulementFavoris && !favoris.includes(p.id)) return false;
      if (!q) return true;
      return (
        p.nom.toLowerCase().includes(q) ||
        p.resume.toLowerCase().includes(q) ||
        p.categorie.toLowerCase().includes(q) ||
        p.motsCles.some((m) => m.includes(q))
      );
    });
  }, [query, seulementFavoris, favoris]);

  const complementaires = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (seulementFavoris) return [];
    return diseases.filter((d) => !q || d.name.toLowerCase().includes(q) || d.short.toLowerCase().includes(q));
  }, [query, seulementFavoris]);

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">Fiches diététiques par pathologie</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Repères nutritionnels structurés pour les pathologies chroniques nécessitant une adaptation
        alimentaire.
      </p>

      <Link
        to="/calculateurs"
        className="card-soft mt-5 flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground">
          <Calculator className="size-6" />
        </span>
        <span>
          <span className="block text-lg font-semibold">Calculateurs médicaux</span>
          <span className="block text-sm text-muted-foreground">
            Débit de filtration glomérulaire (CKD-EPI, MDRD, Cockcroft-Gault) et besoins caloriques.
          </span>
        </span>
      </Link>

      <div className="mt-5">
        <MedicalDisclaimer strong />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher : rein, gluten, diabète…"
            aria-label="Rechercher une pathologie"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="button"
          onClick={() => setSeulementFavoris((v) => !v)}
          aria-pressed={seulementFavoris}
          className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
            seulementFavoris ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
          }`}
        >
          <Heart className="size-4" /> Favoris {favoris.length > 0 && `(${favoris.length})`}
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {principales.map((p) => (
          <div key={p.id} className="card-soft relative p-5 transition-transform hover:-translate-y-0.5">
            <button
              type="button"
              onClick={() => toggle(p.id)}
              aria-label={isFavori(p.id) ? `Retirer ${p.nom} des favoris` : `Ajouter ${p.nom} aux favoris`}
              aria-pressed={isFavori(p.id)}
              className="absolute right-4 top-4 rounded-full border border-border p-1.5 text-muted-foreground hover:text-foreground"
            >
              <Heart className={`size-4 ${isFavori(p.id) ? "fill-primary text-primary" : ""}`} />
            </button>
            <Link to="/maladies/$slug" params={{ slug: p.id }} className="block">
              <span className="text-2xl">{p.emoji}</span>
              <span className="mt-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {p.categorie}
              </span>
              <h2 className="mt-1 text-lg font-semibold">{p.nom}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.resume}</p>
            </Link>
          </div>
        ))}
        {principales.length === 0 && (
          <p className="text-sm text-muted-foreground">Aucune fiche ne correspond à cette recherche.</p>
        )}
      </div>

      {complementaires.length > 0 && (
        <>
          <h2 className="mt-8 text-lg font-semibold">Autres fiches nutritionnelles</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {complementaires.map((d) => (
              <Link
                key={d.slug}
                to="/maladies/$slug"
                params={{ slug: d.slug }}
                className="card-soft block p-5 transition-transform hover:-translate-y-0.5"
              >
                <span className="text-2xl">{d.emoji}</span>
                <h3 className="mt-2 text-base font-semibold">{d.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.short}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </AppShell>
  );
}
