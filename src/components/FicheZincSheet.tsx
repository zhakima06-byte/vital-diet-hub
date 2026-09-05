import { forwardRef } from "react";
import {
  absorptionZinc,
  alimentsZinc,
  ancZinc,
  rolesZinc,
  zincCategories,
  zincImage,
} from "@/data/zinc";

/** Rendu A4 de la fiche zinc : aperçu écran, impression et export PDF. */
export const FicheZincSheet = forwardRef<HTMLDivElement, Record<string, never>>(
  function FicheZincSheet(_props, ref) {
    const bleu = "var(--tone-blue)";

    return (
      <div
        ref={ref}
        className="print-sheet mx-auto w-full max-w-[794px] bg-card p-8 text-foreground"
        style={{ borderTop: `6px solid ${bleu}` }}
      >
        <header className="avoid-break">
          <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: bleu }}>
            Fiche nutriment · NutriSanté — Dr ZALEGH
          </p>
          <h1 className="mt-1 text-2xl font-semibold">
            🦪 Le zinc : rôle et aliments les plus riches
          </h1>
          <img
            src={zincImage}
            alt="Assortiment d'aliments riches en zinc : huîtres, graines de courge, viande rouge, fromage"
            width={1280}
            height={720}
            loading="lazy"
            className="mt-4 h-40 w-full rounded-xl object-cover"
          />
          <p className="mt-1 text-[10px] text-muted-foreground">
            Image d'illustration, à titre indicatif.
          </p>
        </header>

        <section className="avoid-break mt-5">
          <h2 className="text-base font-semibold" style={{ color: bleu }}>
            Rôle du zinc et apports conseillés
          </h2>
          <p className="mt-1 text-[13px] leading-relaxed">
            Le zinc est un oligo-élément essentiel : il soutient le système immunitaire, la
            cicatrisation et la santé de la peau, la synthèse des protéines et de l'ADN, la
            perception du goût et de l'odorat ainsi que la fonction reproductive. Les apports
            conseillés sont d'environ 8 à 10 mg/jour chez la femme adulte et 11 à 14 mg/jour chez
            l'homme adulte, avec des besoins majorés pendant la grossesse, l'allaitement et en cas
            d'alimentation végétarienne ou végane.
          </p>
          <ul className="mt-2 grid gap-1 text-[12px] sm:grid-cols-2">
            {rolesZinc.map((r) => (
              <li key={r} className="flex gap-1.5">
                <span aria-hidden style={{ color: bleu }}>
                  ✓
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <table className="mt-3 w-full border-collapse text-[11px]">
            <tbody>
              {ancZinc.map((a) => (
                <tr key={a.profil} className="avoid-break">
                  <td className="border p-1.5 font-medium">{a.profil}</td>
                  <td className="border p-1.5">{a.apport}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="print-break mt-6">
          <h2 className="text-base font-semibold" style={{ color: bleu }}>
            Aliments les plus riches en zinc (pour 100 g)
          </h2>
          {zincCategories.map((cat) => {
            const items = alimentsZinc
              .filter((a) => a.categorie === cat.key)
              .sort((a, b) => b.zinc - a.zinc);
            return (
              <div key={cat.key} className="avoid-break mt-3">
                <h3 className="text-[12px] font-semibold" style={{ color: cat.couleur }}>
                  {cat.label}
                </h3>
                <table className="mt-1 w-full border-collapse text-[11px]">
                  <tbody>
                    {items.map((a) => (
                      <tr key={a.nom} style={{ background: cat.fond }}>
                        <td className="border p-1.5">{a.nom}</td>
                        <td className="border p-1.5 text-right tabular-nums">{a.plage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </section>

        <section
          className="avoid-break mt-5 rounded-xl border p-4"
          style={{ borderColor: bleu, background: "var(--tone-blue-soft)" }}
        >
          <h2 className="text-sm font-semibold" style={{ color: bleu }}>
            Conseil pratique : mieux absorber le zinc
          </h2>
          <ul className="mt-2 space-y-1 text-[12px]">
            {absorptionZinc.map((x) => (
              <li key={x} className="flex gap-1.5">
                <span aria-hidden>•</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="avoid-break mt-5 rounded-xl border border-border bg-muted p-3 text-[11px] text-muted-foreground">
          <strong className="font-semibold">Avertissement.</strong> Teneurs indicatives pour 100 g,
          à confronter à une table officielle (ANSES-CIQUAL, USDA). Cette fiche est un support
          d'information générale et ne remplace pas un avis médical ni un suivi diététique
          individualisé. NutriSanté — {new Date().getFullYear()}.
        </footer>
      </div>
    );
  },
);
