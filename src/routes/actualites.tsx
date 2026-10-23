import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
    timeZone: "UTC",
  });
}

function ActualitesPage() {
  const t = useT();
  const { lang } = useLang();
  return (
    <Layout>
      <section className="section-pad">
        <div className="site-container">
          <SectionTitle
            as="h1"
            eyebrow={t("Le journal", "The journal")}
            title={t("Idées, conseils et coulisses.", "Ideas, insights and behind the scenes.")}
            subtitle={t(
              "Un regard sur mes projets, les outils que je développe et ce qui peut aider votre activité à progresser.",
              "A look at my projects, the tools I build and the ideas that can help your business grow.",
            )}
          />
          <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {articles.map((article, index) => (
              <article
                key={article.slug}
                className={
                  index === 0
                    ? "group overflow-hidden rounded-xl border border-border bg-brand-paper/45 md:col-span-3 md:grid md:grid-cols-[1.15fr_1fr]"
                    : "group flex flex-col"
                }
              >
                <Link
                  to="/actualites/$slug"
                  params={{ slug: article.slug }}
                  className="block aspect-[16/10] overflow-hidden rounded-lg bg-brand-paper"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </Link>
                <div
                  className={
                    index === 0
                      ? "flex flex-col justify-center p-6 md:p-9"
                      : "flex flex-1 flex-col pt-5"
                  }
                >
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="font-medium text-brand-green">
                      {translate(article.category, lang)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={article.date}>{formatDate(article.date, lang)}</time>
                  </div>
                  <h2
                    className={
                      index === 0
                        ? "mt-4 text-2xl font-semibold leading-snug md:text-3xl"
                        : "mt-3 text-lg font-semibold leading-snug"
                    }
                  >
                    <Link
                      to="/actualites/$slug"
                      params={{ slug: article.slug }}
                      className="hover:text-brand-green"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{article.excerpt}</p>
                  <Link
                    to="/actualites/$slug"
                    params={{ slug: article.slug }}
                    className="text-link mt-5"
                  >
                    {t("Lire l’article", "Read the article")} <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {lang === "en" && (
            <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
              Articles are currently written in French.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
