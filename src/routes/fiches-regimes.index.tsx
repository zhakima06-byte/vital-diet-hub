import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { fichesRegimes, tonClasses } from "@/data/fichesRegimes";

export const Route = createFileRoute("/fiches-regimes/")({
  head: () => ({
    meta: [
      { title: "Fiches régimes à télécharger — NutriSanté" },
      {
        name: "description",
        content:
          "Fiches pratiques téléchargeables en PDF A4 : régime méditerranéen, régime Keto et régimes intermittents, avec menu 7 jours et conseils.",
      },
      { property: "og:title", content: "Fiches régimes téléchargeables — NutriSanté" },
      {
        property: "og:description",
        content: "Trois fiches pratiques PDF : méditerranéen, Keto, jeûne intermittent.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FichesIndex,
});

function FichesIndex() {
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">Fiches régimes à télécharger</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Trois fiches pratiques prêtes à consulter, imprimer ou télécharger en PDF (format A4) :
        principe, menu type sur 7 jours, aliments à privilégier ou éviter et conseils de mise en
        œuvre.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {fichesRegimes.map((f) => {
          const t = tonClasses[f.ton];
          return (
            <Link
              key={f.slug}
              to="/fiches-regimes/$slug"
              params={{ slug: f.slug }}
              className={`card-soft block overflow-hidden transition-transform hover:-translate-y-0.5 ${t.border}`}
            >
              <img
                src={f.image}
                alt={`Illustration du ${f.nom.toLowerCase()}`}
                width={1280}
                height={720}
                loading="lazy"
                className="h-32 w-full object-cover"
              />
              <div className="p-5">
                <span className="text-2xl">{f.emoji}</span>
                <h2 className={`mt-2 text-base font-semibold ${t.text}`}>{f.nom}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{f.descriptif}</p>
                <span className={`mt-3 inline-flex items-center gap-1.5 text-sm font-medium ${t.text}`}>
                  <Download className="size-4" /> Aperçu et PDF
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <Link
        to="/compteur"
        className="mt-6 flex items-center gap-3 rounded-2xl border border-tone-blue/40 bg-tone-blue-soft px-4 py-3 text-sm font-medium text-tone-blue"
      >
        <FileText className="size-5" />
        Suivre mes calories au quotidien avec le compteur →
      </Link>

      <div className="mt-6">
        <MedicalDisclaimer />
      </div>
    </AppShell>
  );
}
