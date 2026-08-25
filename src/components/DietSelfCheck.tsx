import { useState } from "react";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import type { EvalQuestion } from "@/data/diets";

export function DietSelfCheck({ dietName, questions }: { dietName: string; questions: EvalQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = questions.filter((q) => q.id in answers).length;
  const complete = answered === questions.length;
  const yes = questions.filter((q) => answers[q.id]);
  const stops = yes.filter((q) => q.drapeau === "stop");
  const vigilances = yes.filter((q) => q.drapeau === "vigilance");

  const verdict = stops.length
    ? {
        tone: "high" as const,
        icon: ShieldAlert,
        titre: "Ce régime ne vous convient pas en l'état",
        texte: `Au moins une contre-indication a été identifiée pour « ${dietName} ». Ne débutez pas ce régime sans avis médical préalable.`,
      }
    : vigilances.length
      ? {
          tone: "mid" as const,
          icon: AlertTriangle,
          titre: "Régime possible, mais sous conditions",
          texte:
            "Aucune contre-indication majeure, mais des points de vigilance nécessitent une adaptation et idéalement un accompagnement diététique.",
        }
      : {
          tone: "low" as const,
          icon: CheckCircle2,
          titre: "Aucun signal d'alerte identifié",
          texte:
            "Sur la base de ces questions, rien ne s'oppose à un essai encadré. Restez attentif aux signaux d'anomalie listés ci-dessus.",
        };

  const tones = {
    low: "border-level-low/40 bg-level-low-soft",
    mid: "border-level-mid/40 bg-level-mid-soft",
    high: "border-level-high/40 bg-level-high-soft",
  } as const;

  const VerdictIcon = verdict.icon;

  return (
    <section className="card-soft mt-4 p-5">
      <h2 className="text-base font-semibold">Ce régime est-il fait pour moi ?</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Répondez à ces {questions.length} questions pour repérer une contre-indication ou une anomalie avant de
        commencer. Cet auto-questionnaire ne remplace pas un avis médical.
      </p>

      <ul className="mt-4 space-y-2">
        {questions.map((q) => (
          <li key={q.id} className="rounded-xl border border-border/70 p-3">
            <p className="text-sm font-medium">{q.question}</p>
            <div className="mt-2 flex gap-2">
              {[
                { label: "Oui", value: true },
                { label: "Non", value: false },
              ].map((opt) => {
                const active = answers[q.id] === opt.value;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt.value }))}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {submitted && answers[q.id] ? (
              <p
                className={`mt-2 text-xs ${q.drapeau === "stop" ? "text-level-high" : "text-level-mid"}`}
              >
                {q.drapeau === "stop" ? "Contre-indication : " : "Vigilance : "}
                {q.explication}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!complete}
          className="rounded-xl bg-gradient-brand px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Voir mon résultat
        </button>
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
          }}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Réinitialiser
        </button>
        <span className="text-xs text-muted-foreground">
          {answered}/{questions.length} réponses
        </span>
      </div>

      {submitted ? (
        <div className={`mt-4 rounded-2xl border p-4 ${tones[verdict.tone]}`} role="status">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <VerdictIcon className="size-4" aria-hidden /> {verdict.titre}
          </p>
          <p className="mt-1 text-sm">{verdict.texte}</p>
          {stops.length + vigilances.length > 0 ? (
            <ul className="mt-3 space-y-1 text-sm">
              {[...stops, ...vigilances].map((q) => (
                <li key={q.id} className="flex gap-2">
                  <span aria-hidden>•</span>
                  <span>
                    <strong>{q.drapeau === "stop" ? "Contre-indication" : "Vigilance"} :</strong> {q.explication}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
