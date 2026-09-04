import { forwardRef } from "react";
import type { FicheRegime } from "@/data/fichesRegimes";
import type { Menu7j } from "@/data/menus";

const toneVar: Record<FicheRegime["ton"], string> = {
  vert: "var(--tone-green)",
  violet: "var(--tone-violet)",
  rose: "var(--tone-pink)",
};

const toneSoft: Record<FicheRegime["ton"], string> = {
  vert: "var(--tone-green-soft)",
  violet: "var(--tone-violet-soft)",
  rose: "var(--tone-pink-soft)",
};

function Liste({
  titre,
  items,
  couleur,
  fond,
}: {
  titre: string;
  items: string[];
  couleur: string;
  fond: string;
}) {
  return (
    <section
      className="avoid-break rounded-xl border p-4"
      style={{ borderColor: couleur, background: fond }}
    >
      <h3 className="text-sm font-semibold" style={{ color: couleur }}>
        {titre}
      </h3>
      <ul className="mt-2 space-y-1 text-[12px] leading-snug">
        {items.map((i) => (
          <li key={i} className="flex gap-1.5">
            <span aria-hidden>•</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

type Props = { fiche: FicheRegime; menu?: Menu7j | undefined };

/** Rendu A4 de la fiche : utilisé pour l'aperçu écran, l'impression et l'export PDF. */
export const FicheRegimeSheet = forwardRef<HTMLDivElement, Props>(function FicheRegimeSheet(
  { fiche, menu },
  ref,
) {
  const c = toneVar[fiche.ton];
  const soft = toneSoft[fiche.ton];

  return (
    <div
      ref={ref}
      className="print-sheet mx-auto w-full max-w-[794px] bg-card p-8 text-foreground"
      style={{ borderTop: `6px solid ${c}` }}
    >
      <header className="avoid-break">
        <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: c }}>
          Fiche pratique · NutriSanté
        </p>
        <h1 className="mt-1 text-2xl font-semibold">
          {fiche.emoji} {fiche.nom}
        </h1>
        <p className="mt-1 text-[13px] text-muted-foreground">{fiche.descriptif}</p>
        <img
          src={fiche.image}
          alt={`Illustration du ${fiche.nom.toLowerCase()}`}
          width={1280}
          height={720}
          loading="lazy"
          className="mt-4 h-44 w-full rounded-xl object-cover"
        />
        <p className="mt-1 text-[10px] text-muted-foreground">Image d'illustration, à titre indicatif.</p>
      </header>

      <section className="avoid-break mt-5">
        <h2 className="text-base font-semibold" style={{ color: c }}>
          Principe
        </h2>
        <p className="mt-1 text-[13px] leading-relaxed">{fiche.principe}</p>
      </section>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Liste titre="Bénéfices attendus" items={fiche.benefices} couleur={c} fond={soft} />
        <Liste
          titre="Précautions et contre-indications"
          items={fiche.precautions}
          couleur="var(--level-high)"
          fond="var(--level-high-soft)"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Liste
          titre="À privilégier"
          items={fiche.privilegier}
          couleur="var(--level-low)"
          fond="var(--level-low-soft)"
        />
        <Liste
          titre="À limiter"
          items={fiche.limiter}
          couleur="var(--level-mid)"
          fond="var(--level-mid-soft)"
        />
        <Liste
          titre="À éviter"
          items={fiche.eviter}
          couleur="var(--level-high)"
          fond="var(--level-high-soft)"
        />
      </div>

      {menu ? (
        <section className="print-break mt-6">
          <h2 className="text-base font-semibold" style={{ color: c }}>
            Menu type sur 7 jours
          </h2>
          <p className="mt-1 text-[12px] text-muted-foreground">{fiche.reperesCalories}</p>
          <table className="mt-3 w-full border-collapse text-[11px] leading-snug">
            <thead>
              <tr style={{ background: soft }}>
                <th className="border p-1.5 text-left font-semibold">Jour</th>
                <th className="border p-1.5 text-left font-semibold">Petit-déjeuner</th>
                <th className="border p-1.5 text-left font-semibold">Déjeuner</th>
                <th className="border p-1.5 text-left font-semibold">Collation</th>
                <th className="border p-1.5 text-left font-semibold">Dîner</th>
              </tr>
            </thead>
            <tbody>
              {menu.jours.map((j) => (
                <tr key={j.jour} className="avoid-break align-top">
                  <td className="border p-1.5 font-medium">{j.jour}</td>
                  <td className="border p-1.5">{j.petitDejeuner}</td>
                  <td className="border p-1.5">{j.dejeuner}</td>
                  <td className="border p-1.5">{j.collation}</td>
                  <td className="border p-1.5">{j.diner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      <section className="avoid-break mt-5">
        <h2 className="text-base font-semibold" style={{ color: c }}>
          Conseils pratiques
        </h2>
        <ul className="mt-2 space-y-1.5 text-[13px]">
          {fiche.conseils.map((x) => (
            <li key={x} className="flex gap-2">
              <span aria-hidden style={{ color: c }}>
                ✓
              </span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="avoid-break mt-6 rounded-xl border border-border bg-muted p-3 text-[11px] text-muted-foreground">
        <strong className="font-semibold">Avertissement.</strong> Cette fiche est un support
        d'information générale. Elle ne remplace pas un avis médical ni un suivi diététique
        individualisé, en particulier en cas de pathologie chronique, de grossesse ou de traitement
        en cours. NutriSanté — {new Date().getFullYear()}.
      </footer>
    </div>
  );
});
