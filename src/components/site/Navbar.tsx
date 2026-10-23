import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Languages, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/content/site";
import { useLang, useT } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLang();
  const t = useT();
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-navy font-display text-base font-bold text-white">
            MP
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-semibold text-brand-navy">
              {profile.name}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {t("Concepteur & développeur", "Designer & developer")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-brand-navy bg-brand-paper" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-brand-navy" }}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-brand-paper/60"
            >
              {translate(l.label, lang)}
            </Link>
          ))}
          <Link to="/contact" className="btn-gold ml-2 text-sm">
            {t("Demander un devis", "Request a quote")}
          </Link>
          <button
            type="button"
            onClick={toggle}
            aria-label={t("Changer de langue", "Change language")}
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold uppercase tracking-wider text-brand-navy transition-colors hover:border-brand-gold hover:text-brand-gold"
          >
            <Languages size={14} />
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggle}
            aria-label={t("Changer de langue", "Change language")}
            className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1.5 text-xs font-semibold uppercase text-brand-navy"
          >
            <Languages size={12} />
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <button
            type="button"
            aria-label={open ? t("Fermer le menu", "Close menu") : t("Ouvrir le menu", "Open menu")}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-brand-navy"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-brand-navy bg-brand-paper" }}
                inactiveProps={{ className: "text-foreground/80" }}
                className="rounded-xl px-4 py-3 text-base font-medium"
              >
                {translate(l.label, lang)}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-gold mt-2 w-full justify-center"
            >
              {t("Demander un devis", "Request a quote")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
