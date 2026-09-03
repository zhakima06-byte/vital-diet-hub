import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { FicheRegimeSheet } from "@/components/FicheRegimeSheet";
import { getFicheRegime, tonClasses } from "@/data/fichesRegimes";
import { menus7j } from "@/data/menus";
import { exportElementToPdf } from "@/lib/pdf";

export const Route = createFileRoute("/fiches-regimes/$slug")({
  loader: ({ params }) => {
    const fiche = getFicheRegime(params.slug);
    if (!fiche) throw notFound();
    return { fiche };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Fiche introuvable — NutriSanté" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { fiche } = loaderData;
    return {
      meta: [
        { title: `${fiche.nom} — fiche PDF à télécharger | NutriSanté` },
        { name: "description", content: fiche.descriptif.slice(0, 155) },
        { property: "og:title", content: `${fiche.nom} — fiche pratique NutriSanté` },
        { property: "og:description", content: fiche.descriptif.slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: FichePage,
  notFoundComponent: () => (
    <AppShell>
      <p>Cette fiche régime n'existe pas.</p>
    </AppShell>
  ),
});

function FichePage() {
  const { fiche } = Route.useLoaderData();
  const menu = menus7j.find((m) => m.slug === fiche.menuSlug);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const t = tonClasses[fiche.ton];

  const telecharger = async () => {
    if (!sheetRef.current) return;
    setBusy(true);
    try {
      await exportElementToPdf(sheetRef.current, fiche.fichier);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell>
      <div className="no-print">
        <Link
          to="/fiches-regimes"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Toutes les fiches
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={telecharger}
            disabled={busy}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60 ${t.bg}`}
          >
            <Download className="size-4" />
            {busy ? "Génération du PDF…" : "Télécharger en PDF"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium"
          >
            <Printer className="size-4" /> Imprimer
          </button>
          <span className="text-xs text-muted-foreground">
            Format A4 · fichier « {fiche.fichier} »
          </span>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Aperçu de la fiche telle qu'elle sera téléchargée ou imprimée.
        </p>
      </div>

      <div className="card-soft mt-4 overflow-hidden">
        <FicheRegimeSheet ref={sheetRef} fiche={fiche} menu={menu} />
      </div>

      <div className="no-print mt-4">
        <Link
          to="/compteur"
          className="block rounded-2xl border border-tone-blue/40 bg-tone-blue-soft px-4 py-3 text-sm font-medium text-tone-blue"
        >
          Comparer mes apports réels au menu de ce régime dans le compteur de calories →
        </Link>
      </div>
    </AppShell>
  );
}
