import { Link } from "@tanstack/react-router";
import { navLinks, profile } from "@/content/site";
import { useLang, useT } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export function Footer() {
  const t = useT();
  const { lang } = useLang();
  return (
    <footer className="mt-16 bg-brand-navy text-white/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="font-display text-xl font-semibold text-white">{profile.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {t(
              "Conception de logiciels, systèmes de gestion, sites web et solutions numériques.",
              "Software design, management systems, websites and digital solutions."
            )}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            {t("Navigation", "Navigation")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/80 transition-colors hover:text-brand-gold">
                  {translate(l.label, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            {t("Contact", "Contact")}
          </h4>
          <p className="mt-4 text-sm text-white/80">{translate(profile.position, lang)}</p>
          <p className="text-sm text-white/80">{translate(profile.status, lang)}</p>
          <ul className="mt-4 space-y-1.5 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="text-white/80 hover:text-brand-gold">
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-brand-gold"
              >
                WhatsApp : {profile.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-brand-gold"
              >
                LinkedIn
              </a>
            </li>
          </ul>
          <Link to="/contact" className="mt-4 inline-block text-sm font-semibold text-brand-gold hover:underline">
            {t("Discutons de votre projet →", "Let's discuss your project →")}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-white/60 md:px-8">
          © 2026 {profile.name}. {t("Tous droits réservés.", "All rights reserved.")}
        </p>
      </div>
    </footer>
  );
}
