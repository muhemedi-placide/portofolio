import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/i18n/context";

export function ContactCta() {
  const t = useT();
  return (
    <section className="py-12 md:py-20">
      <div className="site-container">
        <div className="flex flex-col gap-7 rounded-xl bg-brand-navy px-7 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.13em] text-[#adc9b5]">
              {t("La suite commence ici", "Your next step")}
            </p>
            <h2 className="mt-3 text-3xl font-medium text-white md:text-4xl">
              {t("Et si on parlait de votre projet ?", "Let's talk about your project.")}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-white/70">
              {t(
                "Une idée, un besoin ou une question. Prenons le temps d’en discuter, simplement.",
                "An idea, a need or a question. Let's take a moment to talk it through.",
              )}
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-4 rounded-lg bg-[#e6eedc] px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-white"
          >
            {t("Discutons ensemble", "Let's talk")} <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
