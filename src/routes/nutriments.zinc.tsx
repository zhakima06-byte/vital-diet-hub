import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { ArrowUpDown, Download, Printer, Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { FicheZincSheet } from "@/components/FicheZincSheet";
import {
  absorptionZinc,
  alimentsZinc,
  ancZinc,
  chercherZinc,
  rolesZinc,
  zincCategories,
  zincImage,
  type ZincCategorie,
} from "@/data/zinc";
import { exportElementToPdf } from "@/lib/pdf";

export const Route = createFileRoute("/nutriments/zinc")({
  head: () => ({
    meta: [
      { title: "Le zinc : rôle, apports et aliments les plus riches | NutriSanté" },
      {
        name: "description",
        content:
          "Rôle du zinc, apports conseillés par profil, facteurs d'absorption et classement des aliments les plus riches en zinc, avec fiche imprimable en PDF.",
      },
      { property: "og:title", content: "Le zinc : rôle et aliments les plus riches" },
      {
        property: "og:description",
        content:
          "Tableau filtrable des aliments riches en zinc, recherche par aliment et fiche A4 téléchargeable.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ZincPage,
});

function ZincPage() {
  const [filtre, setFiltre] = useState<ZincCategorie | "toutes">("toutes");
  const [desc, setDesc] = useState(true);
  const [query, setQuery] = useState("");
  const [apercu, setApercu] = useState(false);
  const [busy, setBusy] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const liste = useMemo(() => {
    return alimentsZinc
      .filter((a) => filtre === "toutes" || a.categorie === filtre)
      .sort((a, b) => (desc ? b.zinc - a.zinc : a.zinc - b.zinc));
  }, [filtre, desc]);

  const resultats = useMemo(() => chercherZinc(query), [query]);

  const telecharger = async () => {
    if (!sheetRef.current) return;
    setBusy(true);
    try {
      await exportElementToPdf(sheetRef.current, "fiche-zinc.pdf");
    } finally {
      setBusy(false);
    }
  };

  const couleurDe = (key: ZincCategorie) => zincCategories.find((c) => c.key === key)!;

  return (
    <AppShell>
      <div className="no-print">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-tone-blue">
            Fiche nutriment
          </p>
          <h1 className="mt-1 text-2xl font-semibold">Le zinc</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Rôle, apports conseillés, absorption et aliments les plus riches. Teneurs indicatives
            pour 100 g, à valider avec une table officielle (ANSES-CIQUAL, USDA).
          </p>
          <img
            src={zincImage}
            alt="Aliments riches en zinc : huîtres, graines de courge, viande rouge, fromage"
            width={1280}
            height={720}
            className="mt-4 h-44 w-full rounded-2xl object-cover"
          />
        </header>

        <section className="card-soft mt-5 p-4">
          <h2 className="text-base font-semibold text-tone-blue">Rôle du zinc</h2>
          <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
            {rolesZinc.map((r) => (
              <li key={r} className="flex gap-2">
                <span aria-hidden className="text-tone-blue">
                  ✓
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-soft mt-4 overflow-hidden">
          <h2 className="px-4 pt-4 text-base font-semibold text-tone-blue">
            Apports nutritionnels conseillés
          </h2>
          <table className="mt-3 w-full text-sm">
            <tbody>
              {ancZinc.map((a) => (
                <tr key={a.profil} className="border-t border-border/60">
                  <td className="px-4 py-2.5 font-medium">{a.profil}</td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">{a.apport}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card-soft mt-4 p-4">
          <h2 className="text-base font-semibold text-tone-blue">Absorption du zinc</h2>
          <ul className="mt-2 space-y-1.5 text-sm">
            {absorptionZinc.map((x) => (
              <li key={x} className="flex gap-2">
                <span aria-hidden>•</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-soft mt-4 p-4">
          <h2 className="text-base font-semibold">Rechercher la teneur en zinc d'un aliment</h2>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex. huîtres, lentilles, amandes…"
              aria-label="Rechercher un aliment"
              className="w-full rounded-xl border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          {query.trim() && (
            <ul className="mt-3 space-y-2">
              {resultats.map((f) => (
                <li key={f.id}>
                  <Link
                    to="/aliments/$id"
                    params={{ id: f.id }}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2 text-sm hover:bg-accent"
                  >
                    <span>
                      <span className="block font-medium">{f.name}</span>
                      <span className="block text-xs text-muted-foreground">{f.category}</span>
                    </span>
                    <span className="font-semibold tabular-nums">{f.values.zinc} mg</span>
                  </Link>
                </li>
              ))}
              {resultats.length === 0 && (
                <li className="py-3 text-center text-sm text-muted-foreground">
                  Aucun aliment trouvé dans la base.
                </li>
              )}
            </ul>
          )}
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Aliments les plus riches en zinc</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setFiltre("toutes")}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                filtre === "toutes"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-accent"
              }`}
            >
              Toutes
            </button>
            {zincCategories.map((c) => (
              <button
                key={c.key}
                onClick={() => setFiltre(c.key)}
                className="rounded-full border px-3 py-1.5 text-xs font-medium"
                style={
                  filtre === c.key
                    ? { borderColor: c.couleur, background: c.couleur, color: "var(--primary-foreground)" }
                    : { borderColor: c.couleur, color: c.couleur, background: c.fond }
                }
              >
                {c.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setDesc((d) => !d)}
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent"
          >
            <ArrowUpDown className="size-3.5" />
            {desc ? "Du plus riche au plus faible" : "Du plus faible au plus riche"}
          </button>

          <ul className="mt-4 space-y-2">
            {liste.map((a) => {
              const cat = couleurDe(a.categorie);
              const contenu = (
                <span className="flex items-center justify-between gap-3">
                  <span>
                    <span className="block text-sm font-medium">{a.nom}</span>
                    <span className="block text-xs" style={{ color: cat.couleur }}>
                      {cat.label}
                    </span>
                  </span>
                  <span className="text-right text-sm font-semibold tabular-nums">{a.plage}</span>
                </span>
              );
              return (
                <li
                  key={a.nom}
                  className="rounded-xl border p-3"
                  style={{ borderColor: cat.couleur, background: cat.fond }}
                >
                  {a.foodId ? (
                    <Link to="/aliments/$id" params={{ id: a.foodId }} className="block">
                      {contenu}
                    </Link>
                  ) : (
                    contenu
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="card-soft mt-6 p-4">
          <h2 className="text-base font-semibold">Fiches liées</h2>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <Link
              to="/maladies/$slug"
              params={{ slug: "sopk" }}
              className="rounded-lg border border-border px-3 py-1.5 hover:bg-accent"
            >
              SOPK
            </Link>
            <Link
              to="/regimes/$slug"
              params={{ slug: "vegetarien" }}
              className="rounded-lg border border-border px-3 py-1.5 hover:bg-accent"
            >
              Régime végétarien / végan
            </Link>
            <Link to="/compteur" className="rounded-lg border border-border px-3 py-1.5 hover:bg-accent">
              Suivi des apports (dénutrition)
            </Link>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setApercu((v) => !v)}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent"
          >
            {apercu ? "Masquer la fiche imprimable" : "Voir la fiche imprimable"}
          </button>
          <button
            onClick={telecharger}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-tone-blue px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            <Download className="size-4" />
            {busy ? "Génération…" : "Télécharger en PDF"}
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent"
          >
            <Printer className="size-4" /> Imprimer
          </button>
        </div>
      </div>

      <div className={apercu ? "mt-6" : "pointer-events-none absolute -left-[9999px] top-0 w-[794px]"} aria-hidden={!apercu}>
        <FicheZincSheet ref={sheetRef} />
      </div>
    </AppShell>
  );
}
