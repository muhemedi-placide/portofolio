import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { gallery, type GalleryItem } from "@/content/site";
import { ArrowRight } from "lucide-react";
import { useLang, useT } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Muhemedi Placide" },
      {
        name: "description",
        content: "Aperçu des projets, interfaces et systèmes numériques conçus par Muhemedi Placide.",
      },
      { property: "og:title", content: "Galerie — Muhemedi Placide" },
      {
        property: "og:description",
        content: "Projets et réalisations : gestion, e-commerce, institutions, sites web.",
      },
    ],
  }),
  component: GaleriePage,
});

const filtersFR: { id: "all" | GalleryItem["filter"]; label: string; labelEn: string }[] = [
  { id: "all", label: "Tous", labelEn: "All" },
  { id: "sites", label: "Sites web", labelEn: "Websites" },
  { id: "gestion", label: "Gestion", labelEn: "Management" },
  { id: "ecommerce", label: "E-commerce", labelEn: "E-commerce" },
  { id: "institution", label: "Institution", labelEn: "Institution" },
];

function GaleriePage() {
  const t = useT();
  const { lang } = useLang();
  const [active, setActive] = useState<typeof filtersFR[number]["id"]>("all");
  const items = active === "all" ? gallery : gallery.filter((i) => i.filter === active);

  return (
    <Layout>
      <section className="section-pad bg-gradient-to-b from-brand-paper/60 to-background">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionTitle
            eyebrow={t("Réalisations", "Work")}
            title={t("Galerie de mes réalisations", "Gallery of my projects")}
            subtitle={t(
              "Un aperçu des projets, interfaces, systèmes et solutions numériques que je conçois pour différents secteurs d'activité.",
              "An overview of the projects, interfaces, systems and digital solutions I build for a range of industries."
            )}
          />

          <div className="mt-8 flex flex-wrap gap-2">
            {filtersFR.map((f) => {
              const isActive = f.id === active;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand-navy text-white shadow-md"
                      : "border border-border bg-white text-foreground/70 hover:border-brand-gold hover:text-brand-navy"
                  }`}
                >
                  {lang === "en" ? f.labelEn : f.label}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, idx) => (
              <Link
                key={item.slug}
                to="/galerie/$slug"
                params={{ slug: item.slug }}
                style={{ animationDelay: `${idx * 70}ms` }}
                className="group card-soft card-soft-hover relative flex flex-col overflow-hidden animate-fade-in transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-1 hover:ring-brand-gold/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-navy">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-navy shadow-sm backdrop-blur">
                    {translate(item.category, lang)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-gold">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-brand-gold">
                    {t("Voir le projet", "View project")}
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
