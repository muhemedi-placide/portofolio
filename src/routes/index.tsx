import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Globe,
  Heart,
  LayoutDashboard,
  LifeBuoy,
  ShieldCheck,
  Sparkles,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { ProfileCard } from "@/components/site/ProfileCard";
import { SectionTitle } from "@/components/site/SectionTitle";
import { approche, services, whyChoose } from "@/content/site";
import { useLang, useT } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhemedi Placide — Concepteur & développeur de logiciels" },
      {
        name: "description",
        content:
          "Des logiciels simples, professionnels et adaptés à vos besoins : sites web, gestion, e-commerce et systèmes institutionnels.",
      },
      { property: "og:title", content: "Muhemedi Placide — Concepteur & développeur de logiciels" },
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
const approchIcons = [Sparkles, ShieldCheck, Wrench];
const whyIcons = { Zap, Heart, LifeBuoy, Target } as const;

function Index() {
  const t = useT();
  const { lang } = useLang();
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-paper/70 to-background">
        <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-brand-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-16 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16 md:px-8 md:pt-20 md:pb-24">
          <div className="fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              {t("Disponible pour vos projets", "Available for your projects")}
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-brand-navy md:text-5xl lg:text-6xl">
              {t(
                "Des logiciels simples, professionnels et adaptés à vos besoins",
                "Simple, professional software tailored to your needs"
              )}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t(
                "Je conçois et développe des solutions numériques pour les entreprises, institutions et particuliers : sites web, systèmes de gestion, plateformes e-commerce et logiciels personnalisés.",
                "I design and develop digital solutions for businesses, institutions and individuals: websites, management systems, e-commerce platforms and custom software."
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#services" className="btn-gold">
                {t("Voir mes services", "See my services")} <ArrowRight size={18} />
              </a>
              <Link to="/contact" className="btn-outline-navy">
                {t("Demander un devis", "Request a quote")}
              </Link>
            </div>
          </div>
          <div className="fade-in-up md:justify-self-end md:max-w-sm">
            <ProfileCard />
          </div>
        </div>
      </section>

      {/* APPROCHE */}
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionTitle
            eyebrow={t("Mon approche", "My approach")}
            title={t(
              "Une méthode claire, humaine et professionnelle",
              "A clear, human and professional method"
            )}
            subtitle={t(
              "Je privilégie des solutions simples, sécurisées, évolutives et faciles à utiliser. Chaque projet est pensé selon les besoins réels du client, avec un accompagnement technique après la livraison.",
              "I favour simple, secure, scalable and easy-to-use solutions. Each project is built around the client's real needs, with technical support after delivery."
            )}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {approche.map((a, i) => {
              const Icon = approchIcons[i];
              return (
                <div key={a.title} className="card-soft card-soft-hover p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-paper text-brand-green">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-brand-navy">
                    {translate(a.title, lang)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {translate(a.description, lang)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-pad bg-brand-paper/50">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionTitle
            eyebrow={t("Services", "Services")}
            title={t("Ce que je conçois pour vous", "What I build for you")}
            subtitle={t(
              "Des solutions adaptées à votre activité — du site vitrine au système institutionnel complexe.",
              "Solutions tailored to your business — from a showcase site to a complex institutional system."
            )}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((s) => {
              const Icon = serviceIcons[s.icon as keyof typeof serviceIcons];
              return (
                <div key={s.title} className="card-soft card-soft-hover flex flex-col p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-navy text-brand-gold">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-brand-navy">
                    {translate(s.title, lang)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {translate(s.description, lang)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <Link to="/tarificataire" className="btn-green">
              {t("Voir la grille tarifaire", "See the pricing grid")} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* POURQUOI ME CHOISIR */}
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionTitle
            eyebrow={t("Pourquoi me choisir ?", "Why choose me?")}
            title={t(
              "Plus qu'un développeur, un partenaire de votre réussite",
              "More than a developer, a partner in your success"
            )}
            subtitle={t(
              "Je ne conçois pas seulement un site web ou un système de gestion. J'accompagne aussi le client dans la réussite, l'utilisation et l'impact réel de sa solution dans son activité quotidienne.",
              "I don't just build a website or a management system. I also support the client's success, adoption and the real impact of their solution in daily operations."
            )}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((w) => {
              const Icon = whyIcons[w.icon as keyof typeof whyIcons];
              return (
                <div key={w.title} className="card-soft card-soft-hover flex flex-col p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gold/15 text-brand-gold">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-brand-navy">
                    {translate(w.title, lang)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {translate(w.description, lang)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <Link to="/contact" className="btn-gold">
              {t("Discuter de mon projet", "Discuss my project")} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="card-soft relative overflow-hidden bg-brand-navy p-8 text-white md:p-12">
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-brand-gold/25 blur-3xl" />
            <div className="relative grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-center">
              <div>
                <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                  {t("Vous avez un projet en tête ?", "Have a project in mind?")}
                </h3>
                <p className="mt-3 max-w-xl text-white/80">
                  {t(
                    "Parlons-en. Une première analyse claire et sans engagement pour comprendre vos besoins.",
                    "Let's talk. A clear, no-commitment first analysis to understand your needs."
                  )}
                </p>
              </div>
              <div className="flex md:justify-end">
                <Link to="/contact" className="btn-gold">
                  {t("Me contacter", "Contact me")} <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

