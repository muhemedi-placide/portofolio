import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/site";
import { useT } from "@/i18n/context";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-border bg-white">
      <div className="site-container grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1.2fr] md:py-16">
        <div>
          <Link to="/" className="text-lg font-semibold tracking-tight text-brand-navy">
            Muhemedi Placide<span className="text-brand-green">.</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">
            {t(
              "Des sites web et des logiciels pensés pour simplifier votre quotidien et faire avancer votre activité.",
              "Websites and software designed to simplify your day and move your business forward.",
            )}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-xs text-brand-green">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            {t("Disponible pour vos projets", "Available for your projects")}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-navy">{t("Explorer", "Explore")}</p>
          <div className="mt-4 grid justify-items-start gap-3 text-sm text-muted-foreground">
            <Link to="/galerie" className="hover:text-brand-green">
              {t("Mes réalisations", "My projects")}
            </Link>
            <Link to="/tarificataire" className="hover:text-brand-green">
              {t("Offres & tarifs", "Plans & pricing")}
            </Link>
            <Link to="/actualites" className="hover:text-brand-green">
              {t("Actualités", "Journal")}
            </Link>
            <Link to="/contact" className="hover:text-brand-green">
              {t("Contact", "Contact")}
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-navy">
            {t("Restons en contact", "Let's stay in touch")}
          </p>
          <a
            href={"mailto:" + profile.email}
            className="mt-4 inline-block break-all text-sm text-muted-foreground hover:text-brand-green"
          >
            {profile.email}
          </a>
          <div className="mt-4 flex gap-5 text-sm text-muted-foreground">
            <a
              href={"https://wa.me/" + profile.whatsapp.replace(/\D/g, "")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-brand-green"
            >
              WhatsApp <ArrowUpRight size={13} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-brand-green"
            >
              LinkedIn <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
      <div className="site-container flex flex-wrap justify-between gap-3 border-t border-border py-6 text-[11px] text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Muhemedi Placide.{" "}
          {t("Tous droits réservés.", "All rights reserved.")}
        </p>
        <p>
          {t("Conçu avec soin. Développé pour durer.", "Thoughtfully designed. Built to last.")}
        </p>
      </div>
    </footer>
  );
}
