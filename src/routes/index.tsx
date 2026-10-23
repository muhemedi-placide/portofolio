import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Building2, Check, Globe, LayoutDashboard } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { ProfileCard } from "@/components/site/ProfileCard";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ContactCta } from "@/components/site/ContactCta";
import { approche, gallery, services, whyChoose } from "@/content/site";
import { useLang, useT } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhemedi Placide — Concepteur & développeur de logiciels" },
      {
        name: "description",
        content:
          "Sites web, logiciels de gestion et solutions sur mesure. Muhemedi Placide vous accompagne de l’idée à la mise en ligne.",
      },
      { property: "og:title", content: "Muhemedi Placide — Des idées aux solutions utiles" },
      {
        property: "og:description",
        content:
          "Conception et développement de solutions numériques pour entreprises, institutions et particuliers.",
      },
    ],
  }),
  component: Index,
});

const serviceIcons = { Globe, LayoutDashboard, Building2 } as const;

function Index() {
  const t = useT();
  const { lang } = useLang();
  return (
    <Layout>
      <section className="overflow-hidden border-b border-border bg-[#fbfcf8]">
        <div className="site-container grid items-center gap-12 py-14 md:grid-cols-[1.15fr_1fr] md:gap-12 md:py-22 lg:gap-20">
          <div className="fade-in-up">
            <p className="mb-7 inline-flex items-center gap-2 text-xs text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              {t(
                "Développeur indépendant · disponible pour vos projets",
                "Independent developer · available for your projects",
              )}
            </p>
            <h1 className="hero-title">
              {t("Des idées aux", "From ideas to")}
              <br />
              <span className="text-brand-green">
                {t("solutions utiles.", "useful solutions.")}
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-8 text-muted-foreground">
              {t(
                "Je conçois des sites web et des logiciels sur mesure pour simplifier votre quotidien et faire avancer votre activité.",
                "I design websites and custom software to simplify your day and move your business forward.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">
                {t("Parlons de votre projet", "Let's talk about your project")}{" "}
                <ArrowUpRight size={17} />
              </Link>
              <Link to="/galerie" className="btn-outline-navy">
                {t("Voir mes réalisations", "Explore my work")}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-brand-green" />
                {t("Solutions sur mesure", "Tailored solutions")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-brand-green" />
                {t("Suivi après livraison", "Support after launch")}
              </span>
            </div>
          </div>
          <div className="hero-visual fade-in-up" style={{ animationDelay: "100ms" }}>
            <Link
              to="/galerie/$slug"
              params={{ slug: gallery[0].slug }}
              aria-label={t("Découvrir le projet Marché Peyi", "Explore the Marché Peyi project")}
              className="browser-frame block w-[94%] -rotate-3"
            >
              <div className="browser-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span className="mx-auto text-[8px] text-muted-foreground">
                  Marché Peyi · e-commerce
                </span>
              </div>
              <img
                src={gallery[0].image}
                alt="Aperçu de la boutique Marché Peyi"
                width={1000}
                height={680}
                fetchPriority="high"
                className="aspect-[21/10] w-full object-contain"
              />
            </Link>
            <Link
              to="/galerie/$slug"
              params={{ slug: gallery[1].slug }}
              aria-label={t("Découvrir le projet IGEEK", "Explore the IGEEK project")}
              className="hero-secondary browser-frame block"
            >
              <div className="browser-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span className="mx-auto text-[8px] text-muted-foreground">IGEEK · gestion</span>
              </div>
              <img
                src={gallery[1].image}
                alt="Tableau de bord du logiciel IGEEK"
                width={700}
                height={430}
                className="aspect-[21/10] w-full object-contain"
              />
            </Link>
            <span className="absolute bottom-4 left-6 text-[9px] font-medium uppercase tracking-[0.12em] text-brand-green">
              {t("Du concret, dès le premier regard.", "Real work. At first glance.")}
            </span>
          </div>
        </div>
        <div className="site-container">
          <div className="grid gap-5 border-t border-border py-6 text-xs text-muted-foreground sm:grid-cols-3">
            <p>
              <span className="font-semibold text-brand-navy">
                {t("Depuis 2018", "Since 2018")}
              </span>
              <span className="ml-2">
                {t("au service de vos idées", "bringing your ideas to life")}
              </span>
            </p>
            <p className="sm:text-center">
              {t("Sites web · Gestion · E-commerce", "Websites · Management · E-commerce")}
            </p>
            <p className="sm:text-right">
              {t("Un accompagnement de A à Z", "Support from start to finish")}
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="section-pad">
        <div className="site-container grid gap-10 lg:grid-cols-[0.85fr_1.3fr] lg:gap-24">
          <div>
            <SectionTitle
              eyebrow={t("Ce que je fais", "What I do")}
              title={t(
                "La bonne solution pour votre activité.",
                "The right solution for your business.",
              )}
              subtitle={t(
                "Un site pour vous faire connaître. Un outil pour mieux vous organiser. Une plateforme pour aller plus loin.",
                "A website to get noticed. A tool to stay organised. A platform to go further.",
              )}
            />
            <Link to="/tarificataire" className="text-link mt-7">
              {t("Découvrir les offres", "Explore the plans")} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="border-t border-border">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons];
              return (
                <div
                  key={service.title}
                  className="grid grid-cols-[36px_1fr] gap-4 border-b border-border py-7"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-paper text-brand-green">
                    <Icon size={19} strokeWidth={1.6} />
                  </span>
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base font-semibold tracking-tight">
                        {translate(service.title, lang)}
                      </h3>
                      <span className="pt-1 text-[10px] text-muted-foreground">0{index + 1}</span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {translate(service.description, lang)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-[#f7f8f4]">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionTitle
              eyebrow={t("Une sélection de projets", "Selected work")}
              title={t("Des besoins réels. Des projets concrets.", "Real needs. Real projects.")}
            />
            <Link to="/galerie" className="text-link mb-1 shrink-0">
              {t("Tous les projets", "All projects")} <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {gallery.slice(0, 2).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <ProfileCard />
            <div>
              <SectionTitle
                eyebrow={t("La personne derrière le projet", "The person behind your project")}
                title={t(
                  "Un interlocuteur, du début à la suite.",
                  "One partner, from idea to beyond.",
                )}
                subtitle={t(
                  "Je privilégie les échanges simples, les outils faciles à utiliser et une relation de confiance qui continue après la livraison.",
                  "I believe in clear conversations, easy-to-use tools and a working relationship that continues after launch.",
                )}
              />
              <ol className="mt-8 space-y-6">
                {approche.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-semibold text-brand-green">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight">
                        {translate(step.title, lang)}
                      </h3>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">
                        {translate(step.description, lang)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-5 md:mt-16">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              {t(
                "Ce que vous pouvez attendre de notre collaboration",
                "What you can expect from working together",
              )}
            </p>
            {whyChoose.map((item) => (
              <details key={item.title} className="quiet-detail">
                <summary>{translate(item.title, lang)}</summary>
                <p>{translate(item.description, lang)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </Layout>
  );
}
