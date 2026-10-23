import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Compass,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { checkPricingCode } from "@/lib/pricing-code.functions";
import { Layout } from "@/components/site/Layout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { pricing, accompagnement, faq } from "@/content/site";
import { useLang, useT } from "@/i18n/context";
import type { Lang } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export const Route = createFileRoute("/tarificataire")({
  head: () => ({
    meta: [
      { title: "Grille tarifaire — Muhemedi Placide" },
      {
        name: "description",
        content:
          "Tarifs pour la conception de logiciels : sites web, systèmes de gestion et systèmes institutionnels. Montants en FBu, hébergement inclus.",
      },
      { property: "og:title", content: "Grille tarifaire — Muhemedi Placide" },
      {
        property: "og:description",
        content: "Tarifs clairs pour vos projets numériques : visibilité, gestion et institution.",
      },
    ],
  }),
  component: TarifsPage,
});

const accompIcons = [Compass, TrendingUp, ShieldCheck];

/** 1 FBu = 0,0432 KES — taux indicatif relevé le 18 octobre 2026. */
const KES_RATE_DATE = { fr: "18 octobre 2026", en: "18 October 2026" };
const KES_RATE_TEXT = { fr: "0,0432", en: "0.0432" };

function formatKes(value: number, lang: Lang) {
  return value.toLocaleString(lang === "en" ? "en-GB" : "fr-FR", {
    maximumFractionDigits: 0,
  });
}

const accentClasses: Record<string, { ring: string; chip: string; btn: string }> = {
  green: {
    ring: "",
    chip: "bg-brand-green/10 text-brand-green",
    btn: "btn-green",
  },
  gold: {
    ring: "border-brand-green ring-1 ring-brand-green",
    chip: "bg-brand-green/10 text-brand-green",
    btn: "btn-gold",
  },
  navy: {
    ring: "",
    chip: "bg-brand-navy/10 text-brand-navy",
    btn: "btn-outline-navy",
  },
};

function TarifsPage() {
  const t = useT();
  const { lang } = useLang();
  const displayRows = pricing;
  const [unlocked, setUnlocked] = useState(false);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("pricing_unlocked") === "1") setUnlocked(true);
  }, []);

  const mailto = `mailto:muhemediplacide2011@gmail.com?subject=${encodeURIComponent(
    "Demande de code d'accès aux tarifs",
  )}&body=${encodeURIComponent(
    "Bonjour Placide,\n\nJe souhaite recevoir le code d'accès pour consulter vos tarifs.\n\nNom :\nTéléphone :\nProjet :\n\nMerci.",
  )}`;

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const r = await checkPricingCode({ data: { code } });
      if (r.ok) {
        localStorage.setItem("pricing_unlocked", "1");
        setUnlocked(true);
      } else setErr(t("Code incorrect.", "Incorrect code."));
    } catch {
      setErr(t("Erreur, réessayez.", "Error, try again."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Layout>
      <section className="section-pad border-b border-border bg-[#fbfcf8]">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionTitle
            as="h1"
            eyebrow={t("Tarifs", "Pricing")}
            title={t("Une tarification simple et transparente", "Simple, transparent pricing")}
            subtitle={t(
              "Choisissez le pack adapté à votre étape — et qui évolue avec vous.",
              "Choose the pack that fits your stage — and grows with you.",
            )}
          />

          {!unlocked && (
            <div className="mt-9 rounded-xl border border-border bg-white p-5 md:p-6">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="flex items-start gap-3">
                  <Lock size={18} className="mt-1 shrink-0 text-brand-green" />
                  <div>
                    <h2 className="text-sm font-semibold">
                      {t("Des tarifs adaptés à votre projet", "Pricing to suit your project")}
                    </h2>
                    <p className="mt-1 max-w-lg text-xs leading-6 text-muted-foreground">
                      {t(
                        "Demandez votre code par email pour consulter les montants, ou utilisez le code que vous avez déjà reçu.",
                        "Request your access code by email to see prices, or use the code you have already received.",
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-4">
                  <a href={mailto} onClick={() => setOpen(true)} className="btn-gold">
                    <Mail size={15} />
                    {t("Afficher le tarif", "Show pricing")}
                  </a>
                  {!open && (
                    <button type="button" onClick={() => setOpen(true)} className="text-link">
                      {t("J’ai déjà un code", "I have a code")}
                    </button>
                  )}
                </div>
              </div>
              {open && (
                <form
                  onSubmit={submitCode}
                  className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row"
                >
                  <label htmlFor="pricing-code" className="sr-only">
                    {t("Code d’accès", "Access code")}
                  </label>
                  <input
                    id="pricing-code"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder={t("Entrez votre code d'accès", "Enter your access code")}
                    maxLength={50}
                    className="form-control sm:max-w-xs"
                    autoComplete="off"
                  />
                  <button type="submit" disabled={busy || !code} className="btn-gold">
                    {busy ? t("Vérification…", "Checking…") : t("Valider", "Submit")}
                  </button>
                  {err && (
                    <p role="alert" className="self-center text-sm text-destructive">
                      {err}
                    </p>
                  )}
                </form>
              )}
            </div>
          )}

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {displayRows.map((p) => {
              const a = accentClasses[p.accent];
              return (
                <div key={p.tier} className={`card-soft relative flex flex-col p-6 ${a.ring}`}>
                  {p.featured && (
                    <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-green px-3 py-1 text-[10px] font-semibold text-white">
                      <Sparkles size={12} />{" "}
                      {p.badge ? translate(p.badge, lang) : t("Plus demandé", "Most requested")}
                    </span>
                  )}
                  <span
                    className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${a.chip}`}
                  >
                    {translate(p.tier, lang)}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-brand-navy">
                    {translate(p.title, lang)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {translate(p.type, lang)}
                  </p>

                  <div className="my-6 h-px bg-border" />

                  {unlocked ? (
                    <div className="space-y-1">
                      {p.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {translate(p.originalPrice, lang)}
                        </p>
                      )}
                      <p className="font-display text-2xl font-bold text-brand-navy">
                        {translate(p.price, lang)}
                      </p>
                      {p.priceKes && (
                        <p className="text-xs font-medium text-brand-green">
                          ≈ {formatKes(p.priceKes, lang)} KES
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="flex items-center gap-2 font-display text-2xl font-bold text-brand-navy/40">
                      <Lock size={18} className="text-brand-gold" /> ••• ••• FBu
                    </p>
                  )}

                  <ul className="mt-6 space-y-2.5 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check size={16} className="mt-0.5 shrink-0 text-brand-green" />
                        <span className="text-muted-foreground">{translate(f, lang)}</span>
                      </li>
                    ))}
                    {p.exclusion && (
                      <li className="flex items-start gap-2 pt-1 italic text-muted-foreground/80">
                        <X size={16} className="mt-0.5 shrink-0 text-muted-foreground/60" />
                        <span>{translate(p.exclusion, lang)}</span>
                      </li>
                    )}
                  </ul>

                  {(p.idealFor || p.includes) && (
                    <div className="mt-6 space-y-2 rounded-xl bg-brand-paper/60 p-4 text-xs leading-relaxed">
                      {p.idealFor && (
                        <p>
                          <span className="font-semibold text-brand-navy">
                            {t("Idéal pour :", "Ideal for:")}
                          </span>{" "}
                          <span className="text-muted-foreground">
                            {translate(p.idealFor, lang)}
                          </span>
                        </p>
                      )}
                      {p.includes && (
                        <p>
                          <span className="font-semibold text-brand-navy">
                            {t("Inclus :", "Includes:")}
                          </span>{" "}
                          <span className="text-muted-foreground">
                            {translate(p.includes, lang)}
                          </span>
                        </p>
                      )}
                    </div>
                  )}

                  <div className="pt-8" style={{ marginTop: "auto" }}>
                    <Link
                      to="/contact"
                      className={`${a.btn} group w-full min-h-12 justify-center text-center text-sm leading-tight`}
                    >
                      <span>{translate(p.cta, lang)}</span>
                      <ArrowRight
                        size={16}
                        className="shrink-0 transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground/80">
            {t(
              `Les montants en shillings kényans (KES) sont indiqués à titre de conversion au taux du ${KES_RATE_DATE.fr} : 1 FBu ≈ ${KES_RATE_TEXT.fr} KES. La facturation reste en FBu.`,
              `Kenyan shilling (KES) amounts are a conversion at the ${KES_RATE_DATE.en} rate: 1 FBu ≈ ${KES_RATE_TEXT.en} KES. Billing stays in FBu.`,
            )}
          </p>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            {t("Vous hésitez ?", "Not sure?")}{" "}
            <Link
              to="/contact"
              className="font-semibold text-brand-navy underline-offset-4 hover:underline"
            >
              {t("Discutons de votre projet", "Let's talk about your project")}
            </Link>{" "}
            {t(
              "et nous vous orientons vers le bon pack.",
              "and we'll guide you to the right pack.",
            )}
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container grid gap-10 lg:grid-cols-[0.85fr_1.3fr] lg:gap-20">
          <SectionTitle
            eyebrow={t("Après la mise en ligne", "Beyond launch")}
            title={t(
              "Plus qu’une livraison, un accompagnement.",
              "Support that goes beyond delivery.",
            )}
            subtitle={t(
              "Conseil, prise en main et suivi technique : je reste à vos côtés pour faire vivre votre solution.",
              "Advice, onboarding and technical support: I stay by your side to keep your solution working for you.",
            )}
          />
          <div className="divide-y divide-border border-y border-border">
            {accompagnement.map((item, index) => {
              const Icon = accompIcons[index];
              return (
                <div key={item.title} className="flex gap-4 py-6">
                  <Icon size={18} className="mt-1 shrink-0 text-brand-green" />
                  <div>
                    <h3 className="text-sm font-semibold">{translate(item.title, lang)}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {translate(item.description, lang)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-pad border-t border-border bg-brand-paper/40">
        <div className="site-container grid gap-8 lg:grid-cols-[0.85fr_1.3fr] lg:gap-20">
          <SectionTitle
            eyebrow="FAQ"
            title={t("Les réponses à vos questions.", "Your questions, answered.")}
          />
          <div>
            {faq.map((item, index) => (
              <details key={index} className="quiet-detail">
                <summary>{lang === "en" ? item.q.en : item.q.fr}</summary>
                <p>{lang === "en" ? item.a.en : item.a.fr}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
