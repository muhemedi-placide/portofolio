import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Calendar, User, Layers } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { gallery } from "@/content/site";
import { useLang, useT } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export const Route = createFileRoute("/galerie/$slug")({
  loader: ({ params }) => {
    const project = gallery.find((g) => g.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Projet — Muhemedi Placide" }] };
    return {
      meta: [
        { title: `${p.title} — Muhemedi Placide` },
        { name: "description", content: p.description },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.image },
      ],
    };
  },
  notFoundComponent: () => (
    <Layout>
      <section className="section-pad">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <h1 className="font-display text-3xl font-bold text-brand-navy">Projet introuvable</h1>
          <p className="mt-3 text-muted-foreground">Ce projet n'existe pas ou a été déplacé.</p>
          <Link to="/galerie" className="btn-gold mt-6 inline-flex">
            <ArrowLeft size={16} /> Retour à la galerie
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
  component: ProjectDetail,
});

function ProjectDetail() {
  const t = useT();
  const { lang } = useLang();
  const { project } = Route.useLoaderData();
  const related = gallery.filter((g) => g.slug !== project.slug).slice(0, 3);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-paper/60 to-background">
        <div className="mx-auto max-w-6xl px-4 pt-10 md:px-8">
          <Link
            to="/galerie"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-navy hover:text-brand-gold"
          >
            <ArrowLeft size={14} /> {t("Retour à la galerie", "Back to gallery")}
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="animate-fade-in">
              <span className="inline-block rounded-full bg-brand-paper px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-green">
                {translate(project.category, lang)}
              </span>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-brand-navy md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {project.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {project.client && (
                  <MetaCard icon={<User size={16} />} label={t("Client", "Client")} value={project.client} />
                )}
                {project.year && (
                  <MetaCard icon={<Calendar size={16} />} label={t("Année", "Year")} value={project.year} />
                )}
                {project.stack && (
                  <MetaCard
                    icon={<Layers size={16} />}
                    label={t("Stack", "Stack")}
                    value={project.stack.slice(0, 2).join(" · ")}
                  />
                )}
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-gold/20 via-transparent to-brand-green/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-2xl ring-1 ring-brand-navy/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-base leading-relaxed text-foreground/85">
            <h2 className="font-display text-2xl font-bold text-brand-navy">
              {t("À propos du projet", "About the project")}
            </h2>
            {lang === "en" && (
              <p className="rounded-xl border border-dashed border-border bg-brand-paper/40 p-3 text-xs text-muted-foreground">
                Note: the detailed project narrative below is written in French.
              </p>
            )}
            {project.content?.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <aside className="space-y-6">
            {project.highlights && (
              <div className="card-soft p-6">
                <h3 className="font-display text-lg font-semibold text-brand-navy">
                  {t("Points clés", "Key points")}
                </h3>
                <ul className="mt-4 space-y-3">
                  {project.highlights.map((h: string) => (
                    <li key={h} className="flex gap-3 text-sm text-foreground/80">
                      <CheckCircle2 size={18} className="mt-0.5 flex-none text-brand-green" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.stack && (
              <div className="card-soft p-6">
                <h3 className="font-display text-lg font-semibold text-brand-navy">
                  {t("Technologies", "Technologies")}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((s: string) => (
                    <span
                      key={s}
                      className="rounded-full border border-brand-gold/30 bg-brand-paper px-3 py-1 text-xs font-semibold text-brand-navy"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <Link to="/contact" className="btn-gold w-full justify-center">
              {t("Discuter d'un projet similaire", "Discuss a similar project")} <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-pad bg-brand-paper/40">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2 className="font-display text-2xl font-bold text-brand-navy">
              {t("Autres réalisations", "Other projects")}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/galerie/$slug"
                  params={{ slug: r.slug }}
                  className="group card-soft card-soft-hover block overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-brand-navy">
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-brand-green">{translate(r.category, lang)}</span>
                    <h3 className="mt-2 font-display text-base font-semibold text-brand-navy group-hover:text-brand-gold">
                      {r.title}
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

function MetaCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-white/80 p-3 backdrop-blur">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-green">
        {icon} {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-brand-navy">{value}</div>
    </div>
  );
}
