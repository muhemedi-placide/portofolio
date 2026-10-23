import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Briefcase, Linkedin, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Layout } from "@/components/site/Layout";
import { SectionTitle } from "@/components/site/SectionTitle";
import { profile } from "@/content/site";
import { submitContact } from "@/lib/contact.functions";
import { useLang, useT } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Muhemedi Placide" },
      {
        name: "description",
        content:
          "Discutons de votre projet : site web, logiciel de gestion ou système personnalisé.",
      },
      { property: "og:title", content: "Contact — Muhemedi Placide" },
      {
        property: "og:description",
        content: "Envoyez-moi un message pour une première analyse de votre projet.",
      },
    ],
  }),
  component: ContactPage,
});

const projectTypesFR = [
  "Site web vitrine / blog",
  "Système de gestion",
  "E-commerce",
  "Système scolaire",
  "Système hospitalier",
  "Autre projet",
];
const projectTypesEN: Record<string, string> = {
  "Site web vitrine / blog": "Showcase website / blog",
  "Système de gestion": "Management system",
  "E-commerce": "E-commerce",
  "Système scolaire": "School system",
  "Système hospitalier": "Hospital system",
  "Autre projet": "Other project",
};

const schema = z.object({
  fullName: z.string().trim().min(2, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.string().min(1, "Sélectionnez un type"),
  estimatedBudget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message trop court").max(2000),
});

function ContactPage() {
  const t = useT();
  const { lang } = useLang();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const send = useServerFn(submitContact);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      projectType: String(fd.get("projectType") ?? ""),
      estimatedBudget: String(fd.get("estimatedBudget") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ??
          t("Veuillez vérifier le formulaire", "Please check the form")
      );
      return;
    }
    const form = e.currentTarget;
    setSubmitting(true);
    try {
      await send({
        data: {
          fullName: parsed.data.fullName,
          email: parsed.data.email,
          phone: parsed.data.phone || "",
          projectType: parsed.data.projectType,
          estimatedBudget: parsed.data.estimatedBudget || "",
          message: parsed.data.message,
        },
      });
      toast.success(
        t(
          "Merci pour votre message. Votre demande a bien été envoyée.",
          "Thanks for your message. Your request has been sent."
        )
      );
      form.reset();
      setSent(true);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : t("Une erreur est survenue.", "Something went wrong.");
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <section className="section-pad bg-gradient-to-b from-brand-paper/60 to-background">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionTitle
            eyebrow={t("Contact", "Contact")}
            title={t("Discutons de votre projet", "Let's discuss your project")}
            subtitle={t(
              "Vous avez besoin d'un site web, d'un logiciel de gestion ou d'un système personnalisé ? Envoyez-moi un message pour une première analyse.",
              "Need a website, a management software or a custom system? Send me a message for a first analysis."
            )}
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            {sent ? (
              <div className="card-soft p-8 md:p-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-green/10 text-brand-green">
                  <Send size={22} />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-brand-navy">
                  {t("Merci pour votre message", "Thanks for your message")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(
                    "Votre demande a bien été envoyée. Je vous répondrai rapidement.",
                    "Your request has been sent. I'll get back to you shortly."
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="btn-outline-navy mt-6"
                >
                  {t("Envoyer un autre message", "Send another message")}
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="card-soft p-6 md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label={t("Nom complet *", "Full name *")} name="fullName" required />
                <Field label={t("Email *", "Email *")} name="email" type="email" required />
                <Field label={t("Téléphone", "Phone")} name="phone" type="tel" />
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-brand-navy">
                    {t("Type de projet *", "Project type *")}
                  </label>
                  <select
                    name="projectType"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
                  >
                    <option value="" disabled>{t("Choisir…", "Choose…")}</option>
                    {projectTypesFR.map((pt) => (
                      <option key={pt} value={pt}>
                        {lang === "en" ? projectTypesEN[pt] ?? pt : pt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Field
                    label={t("Budget estimatif", "Estimated budget")}
                    name="estimatedBudget"
                    placeholder={t("ex. 2 500 000 FBu", "e.g. 2,500,000 FBu")}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-brand-navy">
                    {t("Message *", "Message *")}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full resize-y rounded-xl border border-input bg-white px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
                    placeholder={t(
                      "Parlez-moi de votre projet, vos objectifs et vos contraintes…",
                      "Tell me about your project, your goals and your constraints…"
                    )}
                  />
                </div>
              </div>
              <button type="submit" disabled={submitting} className="btn-gold mt-6">
                <Send size={16} />{" "}
                {submitting ? t("Envoi…", "Sending…") : t("Envoyer le message", "Send message")}
              </button>
            </form>
            )}

            <div className="space-y-5">
              <div className="card-soft relative overflow-hidden p-6">
                <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-brand-gold/15 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-navy font-display text-lg font-bold text-white">
                      MP
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-display text-base font-semibold text-brand-navy">
                        {profile.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{translate(profile.title, lang)}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                    <li className="flex items-start gap-3">
                      <Briefcase size={16} className="mt-0.5 shrink-0 text-brand-green" />
                      <span>{translate(profile.position, lang)}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-brand-green" />
                      <span>{translate(profile.status, lang)}</span>
                    </li>
                    <li className="flex items-start gap-3 text-brand-green">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                      <span className="font-medium">
                        {t("Disponible pour projets à distance", "Available for remote projects")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid gap-3">
                <a
                  href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-green w-full justify-center"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a href={`mailto:${profile.email}`} className="btn-outline-navy w-full justify-center">
                  <Mail size={16} /> Email
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-navy w-full justify-center"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-brand-navy">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
      />
    </div>
  );
}
