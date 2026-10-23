import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { articles } from "@/content/site";
import { useLang, useT } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export const Route = createFileRoute("/actualites")({
  head: () => ({
    meta: [
      { title: "Actualités & mises à jour — Muhemedi Placide" },
      {
        name: "description",
        content:
          "Nouveautés, évolutions de projets, conseils techniques et mises à jour de mes travaux.",
      },
      { property: "og:title", content: "Actualités & mises à jour — Muhemedi Placide" },
      {
        property: "og:description",
        content: "Articles courts sur l'évolution de mes projets et mes conseils.",
      },
    ],
  }),
  component: ActualitesPage,
});

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === "en" ? "en-US" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ActualitesPage() {
  const t = useT();
  const { lang } = useLang();
  return (
    <Layout>
      <section className="section-pad bg-gradient-to-b from-brand-paper/60 to-background">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionTitle
            eyebrow={t("Le blog", "The blog")}
            title={t("Actualités & mises à jour", "News & updates")}
            subtitle={t(
              "Je partage ici les nouveautés, les évolutions de mes projets, les conseils techniques et les mises à jour importantes de mes travaux.",
              "I share here the latest news, project updates, technical advice and important announcements about my work."
            )}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {articles.map((a) => (
              <article key={a.slug} className="card-soft card-soft-hover flex flex-col overflow-hidden">
                <Link
                  to="/actualites/$slug"
                  params={{ slug: a.slug }}
                  className="block aspect-[16/9] overflow-hidden bg-brand-paper"
                >
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full bg-brand-paper px-3 py-1 font-semibold text-brand-green">
                      {translate(a.category, lang)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Calendar size={12} /> {formatDate(a.date, lang)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-brand-navy">
                    {a.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {a.excerpt}
                  </p>
                  <Link
                    to="/actualites/$slug"
                    params={{ slug: a.slug }}
                    className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-brand-gold hover:underline"
                  >
                    {t("Lire plus", "Read more")} <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {lang === "en" && (
            <p className="mt-10 rounded-2xl border border-dashed border-border bg-brand-paper/40 p-4 text-center text-xs text-muted-foreground">
              Note: full article bodies are currently written in French.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
