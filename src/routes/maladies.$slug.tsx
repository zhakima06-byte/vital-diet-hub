import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell, MedicalDisclaimer } from "@/components/AppShell";
import { getDisease, type DiseaseSheet } from "@/data/diseases";
import { getPathologie, type Pathologie } from "@/data/pathologies";

export const Route = createFileRoute("/maladies/$slug")({
  loader: ({ params }) => {
    const fiche = getPathologie(params.slug);
    if (fiche) return { fiche, legacy: null as DiseaseSheet | null };
    const legacy = getDisease(params.slug);
    if (legacy) return { fiche: null as Pathologie | null, legacy };
    throw notFound();
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Fiche indisponible — NutriSanté" }, { name: "robots", content: "noindex" }] };
    }
    const nom = loaderData.fiche?.nom ?? loaderData.legacy!.name;
    const resume = loaderData.fiche?.resume ?? loaderData.legacy!.short;
    return {
      meta: [
        { title: `${nom} — fiche diététique — NutriSanté` },
        { name: "description", content: resume.slice(0, 155) },
        { property: "og:title", content: `${nom} — NutriSanté` },
        { property: "og:description", content: resume.slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: FichePage,
  errorComponent: ({ error }) => (
    <AppShell>
      <p role="alert">{error.message}</p>
    </AppShell>
  ),
  notFoundComponent: () => (
    <AppShell>
      <p>Cette fiche pathologie n'existe pas.</p>
    </AppShell>
  ),
});

const tones = {
  low: "border-level-low/40 bg-level-low-soft",
  mid: "border-level-mid/40 bg-level-mid-soft",
  high: "border-level-high/40 bg-level-high-soft",
} as const;

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="card-soft mt-4 scroll-mt-24 p-5">
      <h2 className="text-base font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-1.5 text-sm">
      {items.map((i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden>•</span>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function Retour() {
  return (
    <Link to="/maladies" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft className="size-4" /> Toutes les fiches
    </Link>
  );
}

function FichePage() {
  const { fiche, legacy } = Route.useLoaderData();
  if (!fiche) return <LegacyFiche sheet={legacy!} />;

  const ancres = [
    { id: "comprendre", label: "Comprendre" },
    { id: "aliments", label: "Aliments" },
    { id: "menu", label: "Menu" },
    { id: "conseils", label: "Conseils" },
  ];

  return (
    <AppShell>
      <Retour />

      <header className="mt-3">
        <span className="text-3xl">{fiche.emoji}</span>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{fiche.categorie}</p>
        <h1 className="mt-1 text-2xl font-semibold">{fiche.nom}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{fiche.resume}</p>
      </header>

      <nav aria-label="Sections de la fiche" className="mt-4 flex flex-wrap gap-2">
        {ancres.map((a) => (
          <a
            key={a.id}
            href={`#${a.id}`}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-accent"
          >
            {a.label}
          </a>
        ))}
      </nav>

      <div className="mt-4">
        <MedicalDisclaimer strong />
      </div>

      <Section id="comprendre" title="Comprendre la maladie">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fiche.comprendre}</p>
      </Section>

      <Section id="objectifs" title="Objectifs diététiques">
        <Bullets items={fiche.objectifs} />
      </Section>

      {fiche.volets?.map((v) => (
        <Section key={v.titre} id={`volet-${v.titre.length}`} title={v.titre}>
          <p className="mt-2 text-sm text-muted-foreground">{v.texte}</p>
          <Bullets items={v.points} />
        </Section>
      ))}

      <section id="aliments" className="mt-4 scroll-mt-24">
        <div className={`rounded-2xl border p-5 ${tones.low}`}>
          <h2 className="text-base font-semibold">Aliments à privilégier</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {fiche.aliments_favorables.map((g) => (
              <div key={g.categorie}>
                <p className="text-sm font-medium">{g.categorie}</p>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  {g.items.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-4 rounded-2xl border p-5 ${tones.mid}`}>
          <h2 className="text-base font-semibold">Aliments à limiter</h2>
          <Bullets items={fiche.aliments_a_limiter} />
        </div>

        <div className={`mt-4 rounded-2xl border p-5 ${tones.high}`}>
          <h2 className="text-base font-semibold">Aliments à éviter</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {fiche.aliments_a_eviter.map((a) => (
              <li key={a.aliment}>
                <span className="font-medium">{a.aliment}</span>
                <span className="block text-muted-foreground">{a.raison}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {fiche.tableaux?.map((t) => (
        <Section key={t.titre} id={`tableau-${t.titre.length}`} title={t.titre}>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  {t.colonnes.map((c) => (
                    <th key={c} scope="col" className="py-2 pr-3 font-semibold">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.lignes.map((l) => (
                  <tr key={l.join("|")} className="border-b border-border/60">
                    {l.map((cell) => (
                      <td key={cell} className="py-2 pr-3 align-top text-muted-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      ))}

      {fiche.encadres?.map((e) => (
        <section key={e.titre} className="mt-4 rounded-2xl border border-primary/40 bg-primary/5 p-5">
          <h2 className="text-base font-semibold">{e.titre}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.texte}</p>
        </section>
      ))}

      <Section id="menu" title="Exemple de menu type">
        <ul className="mt-3 space-y-3 text-sm">
          <li className="border-l-2 border-primary/40 pl-3">
            <p className="font-medium">Petit-déjeuner</p>
            <p className="text-muted-foreground">{fiche.menu_type.petit_dejeuner}</p>
          </li>
          <li className="border-l-2 border-primary/40 pl-3">
            <p className="font-medium">Déjeuner</p>
            <p className="text-muted-foreground">{fiche.menu_type.dejeuner}</p>
          </li>
          <li className="border-l-2 border-primary/40 pl-3">
            <p className="font-medium">Dîner</p>
            <p className="text-muted-foreground">{fiche.menu_type.diner}</p>
          </li>
          <li className="border-l-2 border-primary/40 pl-3">
            <p className="font-medium">Collations</p>
            <ul className="text-muted-foreground">
              {fiche.menu_type.collations.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </li>
        </ul>
      </Section>

      <Section id="conseils" title="Conseils pratiques">
        <Bullets items={fiche.conseils} />
      </Section>

      <section className={`mt-4 rounded-2xl border p-5 ${tones.high}`}>
        <h2 className="text-base font-semibold">Signaux d'alerte — consulter</h2>
        <Bullets items={fiche.signaux_alerte} />
      </section>

      {((fiche.liens?.length ?? 0) > 0 || (fiche.liens_fiches?.length ?? 0) > 0) && (
        <Section id="liens" title="Aller plus loin">
          <div className="mt-3 flex flex-wrap gap-2">
            {fiche.liens?.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                {l.label}
              </Link>
            ))}
            {fiche.liens_fiches?.map((l) => (
              <Link
                key={l.slug}
                to="/maladies/$slug"
                params={{ slug: l.slug }}
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section id="sources" title="Sources">
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {fiche.sources.map((s) => (
            <li key={s}>• {s}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Dernière révision médicale du contenu : {fiche.date_maj}
        </p>
      </Section>
    </AppShell>
  );
}

function LegacyFiche({ sheet }: { sheet: DiseaseSheet }) {
  return (
    <AppShell>
      <Retour />
      <header className="mt-3">
        <span className="text-3xl">{sheet.emoji}</span>
        <h1 className="mt-1 text-2xl font-semibold">{sheet.name}</h1>
      </header>

      <div className="mt-4">
        <MedicalDisclaimer strong />
      </div>

      <Section id="objectif" title="Objectif nutritionnel">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sheet.objectif}</p>
      </Section>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className={`rounded-2xl border p-5 ${tones.low}`}>
          <h2 className="text-base font-semibold">Aliments recommandés</h2>
          <Bullets items={sheet.recommandes} />
        </div>
        <div className={`rounded-2xl border p-5 ${tones.mid}`}>
          <h2 className="text-base font-semibold">Aliments à limiter</h2>
          <Bullets items={sheet.aLimiter} />
        </div>
      </div>

      <div className={`mt-4 rounded-2xl border p-5 ${tones.high}`}>
        <h2 className="text-base font-semibold">Aliments à éviter</h2>
        <Bullets items={sheet.aEviter} />
      </div>

      <Section id="menu" title="Exemple de journée type">
        <ul className="mt-3 space-y-3">
          {sheet.journeeType.map((r) => (
            <li key={r.repas} className="border-l-2 border-primary/40 pl-3">
              <p className="text-sm font-medium">{r.repas}</p>
              <p className="text-sm text-muted-foreground">{r.contenu}</p>
            </li>
          ))}
        </ul>
      </Section>

      {sheet.reperes && sheet.reperes.length > 0 && (
        <Section id="reperes" title="Repères pratiques">
          <Bullets items={sheet.reperes} />
        </Section>
      )}
    </AppShell>
  );
}
