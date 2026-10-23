import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Compass, HelpCircle, Lock, Mail, ShieldCheck, Sparkles, TrendingUp, X } from "lucide-react";
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
        content:
          "Tarifs clairs pour vos projets numériques : visibilité, gestion et institution.",
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
    ring: "ring-2 ring-brand-gold md:scale-[1.03]",
    chip: "bg-brand-gold/15 text-brand-gold",
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
    "Demande de code d'accès aux tarifs"
  )}&body=${encodeURIComponent(
    "Bonjour Placide,\n\nJe souhaite recevoir le code d'accès pour consulter vos tarifs.\n\nNom :\nTéléphone :\nProjet :\n\nMerci."
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
      <section className="section-pad bg-gradient-to-b from-brand-paper/60 to-background">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionTitle
            eyebrow={t("Tarifs", "Pricing")}
            title={t(
              "Une tarification simple et transparente",
              "Simple, transparent pricing"
            )}
            subtitle={t(
              "Choisissez le pack adapté à votre étape — et qui évolue avec vous.",
              "Choose the pack that fits your stage — and grows with you."
            )}
          />

          {!unlocked && (
            <div className="card-soft mx-auto mt-10 max-w-2xl p-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-gold/15 text-brand-gold">
                <Lock size={22} />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {t(
                  "Les montants sont masqués. Demandez votre code d'accès par email pour afficher les tarifs.",
                  "Prices are hidden. Request your access code by email to display them."
                )}
              </p>
              {!open ? (
                <a href={mailto} onClick={() => setOpen(true)} className="btn-gold mt-5 inline-flex">
                  <Mail size={16} /> {t("Afficher le tarif", "Show pricing")}
                </a>
              ) : (
                <div className="mt-5 space-y-4">
                  <a href={mailto} className="btn-outline-navy inline-flex text-sm">
                    <Mail size={16} /> {t("Écrire à nouveau par email", "Email me again")}
                  </a>
                  <form onSubmit={submitCode} className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={t("Entrez votre code d'accès", "Enter your access code")}
                      className="h-12 rounded-xl border border-border bg-background px-4 text-sm"
                    />
                    <button type="submit" disabled={busy || !code} className="btn-gold justify-center">
                      {t("Valider", "Submit")}
                    </button>
                  </form>
                  {err && <p className="text-sm text-destructive">{err}</p>}
                </div>
              )}
            </div>
          )}

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {displayRows.map((p) => {
              const a = accentClasses[p.accent];
              return (
                <div
                  key={p.tier}
                  className={`card-soft card-soft-hover relative flex flex-col p-7 ${a.ring}`}
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-white shadow">
                      <Sparkles size={12} /> {p.badge ? translate(p.badge, lang) : t("Plus demandé", "Most requested")}
                    </span>
                  )}
                  <span className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${a.chip}`}>
                    {translate(p.tier, lang)}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-brand-navy">{translate(p.title, lang)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{translate(p.type, lang)}</p>

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
                          <span className="text-muted-foreground">{translate(p.idealFor, lang)}</span>
                        </p>
                      )}
                      {p.includes && (
                        <p>
                          <span className="font-semibold text-brand-navy">
                            {t("Inclus :", "Includes:")}
                          </span>{" "}
                          <span className="text-muted-foreground">{translate(p.includes, lang)}</span>
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
              `Kenyan shilling (KES) amounts are a conversion at the ${KES_RATE_DATE.en} rate: 1 FBu ≈ ${KES_RATE_TEXT.en} KES. Billing stays in FBu.`
            )}
          </p>


          <p className="mt-10 text-center text-sm text-muted-foreground">
            {t("Vous hésitez ?", "Not sure?")}{" "}
            <Link to="/contact" className="font-semibold text-brand-navy underline-offset-4 hover:underline">
              {t("Discutons de votre projet", "Let's talk about your project")}
            </Link>{" "}
            {t("et nous vous orientons vers le bon pack.", "and we'll guide you to the right pack.")}
          </p>
        </div>
      </section>

      {/* Plus qu'un tarif : un accompagnement */}
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionTitle
            eyebrow={t("Accompagnement", "Support")}
            title={t("Plus qu'un tarif : un accompagnement", "More than a price: a partnership")}
            subtitle={t(
              "Mes tarifs ne couvrent pas seulement la création technique d'un site web ou d'un logiciel. Ils incluent une approche orientée vers la réussite du projet : compréhension du besoin, conseil, simplicité d'utilisation, visibilité, fidélisation et accompagnement après livraison.",
              "My prices don't just cover the technical build of a website or software. They include a success-oriented approach: understanding the need, advice, ease of use, visibility, loyalty and post-delivery support."
            )}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {accompagnement.map((a, i) => {
              const Icon = accompIcons[i];
              return (
                <div key={a.title} className="card-soft card-soft-hover p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-paper text-brand-green">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-brand-navy">
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

      {/* FAQ */}
      <section className="section-pad bg-brand-paper/50">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <SectionTitle
            eyebrow={t("FAQ", "FAQ")}
            title={t("Foire aux questions", "Frequently asked questions")}
          />
          <div className="mt-10 space-y-4">
            {faq.map((item, i) => (
              <details
                key={i}
                className="card-soft group p-6 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="flex items-start gap-3 font-display text-base font-semibold text-brand-navy">
                    <HelpCircle size={20} className="mt-0.5 shrink-0 text-brand-gold" />
                    {lang === "en" ? item.q.en : item.q.fr}
                  </span>
                  <span className="mt-1 shrink-0 text-brand-navy transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 pl-8 text-sm leading-relaxed text-muted-foreground">
                  {lang === "en" ? item.a.en : item.a.fr}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

