import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/content/site";
import { useLang, useT } from "@/i18n/context";

const links = [
  { to: "/", fr: "Accueil", en: "Home" },
  { to: "/galerie", fr: "Projets", en: "Projects" },
  { to: "/tarificataire", fr: "Tarifs", en: "Pricing" },
  { to: "/actualites", fr: "Actualités", en: "Journal" },
  { to: "/contact", fr: "Contact", en: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLang();
  const t = useT();
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="site-container flex h-20 items-center justify-between gap-3">
        <Link
          to="/"
          aria-label={t("Muhemedi Placide, accueil", "Muhemedi Placide, home")}
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-2 md:gap-3"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-navy text-sm font-semibold tracking-tight text-white md:h-10 md:w-10">
            mp.
          </span>
          <span>
            <span className="block text-[13px] font-semibold tracking-tight text-brand-navy md:text-sm">
              {profile.name}
            </span>
            <span className="mt-0.5 hidden text-[11px] text-muted-foreground min-[360px]:block">
              {t("Concepteur & développeur", "Designer & developer")}
            </span>
          </span>
        </Link>
        <nav
          aria-label={t("Navigation principale", "Main navigation")}
          className="hidden items-center gap-6 lg:flex"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-brand-green after:scale-x-100" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="relative py-2 text-[13px] font-medium transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-brand-green after:transition-transform hover:text-brand-green"
            >
              {lang === "fr" ? link.fr : link.en}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={t("Changer de langue", "Change language")}
            className="flex h-10 items-center gap-1.5 px-1 text-xs font-medium text-muted-foreground hover:text-brand-green"
          >
            <span className={lang === "fr" ? "font-semibold text-brand-navy" : ""}>FR</span>
            <span aria-hidden="true" className="text-border">
              /
            </span>
            <span className={lang === "en" ? "font-semibold text-brand-navy" : ""}>EN</span>
          </button>
          <Link to="/contact" className="btn-gold hidden min-h-10 px-4 py-2 lg:inline-flex">
            {t("Parlons de votre projet", "Let's talk")} <ArrowUpRight size={15} />
          </Link>
          <button
            type="button"
            aria-label={open ? t("Fermer le menu", "Close menu") : t("Ouvrir le menu", "Open menu")}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-border text-brand-navy lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label={t("Navigation mobile", "Mobile navigation")}
          className="site-container border-t border-border py-5 lg:hidden"
        >
          <div className="grid gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "bg-brand-paper text-brand-green" }}
                className="rounded-lg px-4 py-3 text-sm font-medium"
              >
                {lang === "fr" ? link.fr : link.en}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-3">
              {t("Parlons de votre projet", "Let's talk about your project")}{" "}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
