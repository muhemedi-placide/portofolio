import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { articles } from "@/content/site";
import { useLang, useT } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export const Route = createFileRoute("/actualites/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article — Muhemedi Placide" }] };
    return {
      meta: [
        { title: `${a.title} — Muhemedi Placide` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:image", content: a.image },
      ],
    };
  },
  notFoundComponent: () => (
    <Layout>
      <section className="section-pad">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <h1 className="font-display text-3xl font-bold text-brand-navy">Article introuvable</h1>
          <p className="mt-3 text-muted-foreground">Cet article n'existe pas ou a été déplacé.</p>
          <Link to="/actualites" className="btn-gold mt-6 inline-flex">
            <ArrowLeft size={16} /> Retour aux actualités
          </Link>
        </div>
      </section>
    </Layout>
  ),
  errorComponent: ({ reset }) => (
    <Layout>
      <section className="section-pad">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <h1 className="font-display text-2xl font-bold text-brand-navy">Une erreur est survenue</h1>
          <button type="button" onClick={reset} className="btn-gold mt-6">
            Réessayer
          </button>
        </div>
      </section>
    </Layout>
  ),
  component: ArticleDetail,
});

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === "en" ? "en-US" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ArticleDetail() {
  const t = useT();
  const { lang } = useLang();
  const { article } = Route.useLoaderData();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <Layout>
      <article className="bg-gradient-to-b from-brand-paper/60 to-background">
        <div className="mx-auto max-w-3xl px-4 pt-10 pb-6 md:px-8">
          <Link
            to="/actualites"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-navy hover:text-brand-gold"
          >
            <ArrowLeft size={14} /> {t("Retour aux actualités", "Back to news")}
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-brand-paper px-3 py-1 font-semibold text-brand-green">
              {translate(article.category, lang)}
            </span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Calendar size={12} /> {formatDate(article.date, lang)}
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
            {article.title}
          </h1>
        </div>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <img
            src={article.image}
            alt={article.title}
            width={1280}
            height={720}
            className="aspect-[16/9] w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-16">
          {lang === "en" && (
            <p className="mb-6 rounded-xl border border-dashed border-border bg-brand-paper/40 p-3 text-xs text-muted-foreground">
              Note: the full article below is written in French.
            </p>
          )}
          <div className="prose-content space-y-5 text-base leading-relaxed text-foreground/85">
            {(article.content as string[] | undefined)?.map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 border-t border-border pt-8">
            <Link to="/actualites" className="btn-outline-navy">
              <ArrowLeft size={16} /> {t("Retour aux actualités", "Back to news")}
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-pad bg-brand-paper/40">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2 className="font-display text-2xl font-bold text-brand-navy">
              {t("Articles similaires", "Related articles")}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to="/actualites/$slug"
                  params={{ slug: a.slug }}
                  className="card-soft card-soft-hover block overflow-hidden"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-brand-paper">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      width={640}
                      height={360}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-brand-green">{translate(a.category, lang)}</span>
                    <h3 className="mt-2 font-display text-base font-semibold text-brand-navy">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
