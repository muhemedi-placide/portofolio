import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { gallery, type GalleryItem } from "@/content/site";
import { useLang, useT } from "@/i18n/context";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ContactCta } from "@/components/site/ContactCta";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Muhemedi Placide" },
      {
        name: "description",
        content:
          "Aperçu des projets, interfaces et systèmes numériques conçus par Muhemedi Placide.",
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
  const [active, setActive] = useState<(typeof filtersFR)[number]["id"]>("all");
  const items = active === "all" ? gallery : gallery.filter((item) => item.filter === active);
  return (
    <Layout>
      <section className="section-pad pb-0">
        <div className="site-container">
          <SectionTitle
            as="h1"
            eyebrow={t("Portfolio", "Portfolio")}
            title={t("Des projets qui parlent d’eux-mêmes.", "Projects that speak for themselves.")}
            subtitle={t(
              "Sites web, boutiques en ligne et logiciels de gestion : découvrez les solutions que j’ai conçues pour des besoins concrets.",
              "Websites, online stores and management software: explore the solutions I have built for real-world needs.",
            )}
          />
          <div
            role="group"
            aria-label={t("Filtrer les projets", "Filter projects")}
            className="mt-10 flex flex-wrap gap-2 border-b border-border pb-6"
          >
            {filtersFR.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={filter.id === active}
                onClick={() => setActive(filter.id)}
                className={[
                  "rounded-lg border px-4 py-2.5 text-xs font-medium transition-colors",
                  filter.id === active
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-transparent bg-brand-paper/60 text-muted-foreground hover:border-border hover:text-brand-green",
                ].join(" ")}
              >
                {lang === "en" ? filter.labelEn : filter.label}
              </button>
            ))}
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {items.length} {t("projets affichés", "projects displayed")}
          </p>
          <div className="mt-9 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {items.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </Layout>
  );
}
