import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Home, Salad, Stethoscope, Apple, Leaf, Calculator, FileDown, Flame } from "lucide-react";

const nav = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/regimes", label: "Régimes", icon: Salad },
  { to: "/fiches-regimes", label: "Fiches", icon: FileDown },
  { to: "/compteur", label: "Compteur", icon: Flame },
  { to: "/maladies", label: "Pathologies", icon: Stethoscope },
  { to: "/calculateurs", label: "Calculs", icon: Calculator },
  { to: "/aliments", label: "Aliments", icon: Apple },
] as const;

const navMobile = nav.filter((n) =>
  ["/", "/fiches-regimes", "/compteur", "/maladies", "/aliments"].includes(n.to),
);

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <header className="no-print sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold">NutriSanté</span>
              <span className="font-display text-lg font-bold text-tone-blue">Dr ZALEGH</span>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                activeProps={{ className: "bg-accent text-accent-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>

      <footer className="no-print mx-auto max-w-5xl px-4 pb-8 pt-4 text-xs text-muted-foreground">
        <p>
          NutriSanté a une vocation informative et éducative. L'application ne remplace pas une
          consultation médicale ni un suivi diététique individualisé.
        </p>
      </footer>

      <nav className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md">
          {navMobile.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground"
                activeProps={{ className: "text-primary" }}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function MedicalDisclaimer({ strong = false }: { strong?: boolean }) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm ${
        strong
          ? "border-level-high/40 bg-level-high-soft text-foreground"
          : "border-border bg-muted text-muted-foreground"
      }`}
    >
      <strong className="font-semibold">Avertissement médical.</strong> Ces informations sont
      indicatives et éducatives. Elles ne remplacent en aucun cas une consultation médicale ou un
      avis diététique individualisé, en particulier en cas de pathologie chronique (insuffisance
      rénale, cancer, maladies inflammatoires, SOPK).
    </div>
  );
}