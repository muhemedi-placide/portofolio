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
          t("Veuillez vérifier le formulaire", "Please check the form"),
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
          "Thanks for your message. Your request has been sent.",
        ),
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
      <section className="section-pad">
        <div className="site-container">
          <SectionTitle
            as="h1"
            eyebrow={t("Prenons contact", "Get in touch")}
            title={t("Discutons de votre projet.", "Let's discuss your project.")}
            subtitle={t(
              "Une idée à concrétiser ou une activité à simplifier ? Dites-moi ce dont vous avez besoin, et regardons ensemble la suite.",
              "An idea to bring to life or a business to simplify? Tell me what you need and let's work out the next step together.",
            )}
          />
          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.4fr_0.85fr] lg:gap-20">
            {sent ? (
              <div className="rounded-xl border border-border bg-brand-paper/50 px-6 py-14 text-center">
                <Send size={28} className="mx-auto text-brand-green" />
                <h2 className="mt-5 text-2xl font-semibold">
                  {t("Merci pour votre message", "Thanks for your message")}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {t(
                    "Votre demande a bien été envoyée. Je vous répondrai rapidement.",
                    "Your request has been sent. I'll get back to you shortly.",
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
              <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold">
                  {t("Parlez-moi de votre besoin", "Tell me what you need")}
                </h2>
                <p className="mt-2 mb-7 text-xs leading-6 text-muted-foreground">
                  {t(
                    "Les champs marqués d’un * sont obligatoires.",
                    "Fields marked with * are required.",
                  )}
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label={t("Nom complet *", "Full name *")}
                    name="fullName"
                    autoComplete="name"
                    maxLength={100}
                    placeholder={t("Votre nom", "Your name")}
                    required
                  />
                  <Field
                    label="Email *"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={255}
                    placeholder={t("vous@entreprise.com", "you@company.com")}
                    required
                  />
                  <Field
                    label={t("Téléphone", "Phone")}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={40}
                    placeholder="+257 …"
                  />
                  <div>
                    <label htmlFor="contact-projectType" className="mb-2 block text-xs font-medium">
                      {t("Type de projet *", "Project type *")}
                    </label>
                    <select
                      id="contact-projectType"
                      name="projectType"
                      required
                      defaultValue=""
                      className="form-control"
                    >
                      <option value="" disabled>
                        {t("Sélectionner un projet", "Select a project")}
                      </option>
                      {projectTypesFR.map((type) => (
                        <option key={type} value={type}>
                          {lang === "en" ? (projectTypesEN[type] ?? type) : type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label={t("Budget estimatif", "Estimated budget")}
                      name="estimatedBudget"
                      maxLength={80}
                      placeholder={t(
                        "Une estimation, si vous en avez une",
                        "An estimate, if you have one",
                      )}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="mb-2 block text-xs font-medium">
                      {t("Votre message *", "Your message *")}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={6}
                      className="form-control resize-y"
                      placeholder={t(
                        "Votre activité, vos objectifs, ce que vous souhaitez améliorer…",
                        "Your business, your goals, what you'd like to improve…",
                      )}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold mt-6 w-full sm:w-auto"
                >
                  {submitting
                    ? t("Envoi en cours…", "Sending…")
                    : t("Envoyer le message", "Send message")}{" "}
                  <Send size={15} />
                </button>
              </form>
            )}
            <aside className="rounded-xl border border-border bg-brand-paper/60 p-7 lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <img
                  src="/images/placide_muhemedi_salumu.webp"
                  alt="Muhemedi Placide"
                  width={52}
                  height={52}
                  className="h-13 w-13 shrink-0 rounded-lg object-cover object-[78%_20%]"
                />
                <div>
                  <p className="text-sm font-semibold">{profile.name}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {translate(profile.title, lang)}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                {t(
                  "Vous préférez un échange direct ? Retrouvez-moi aussi par email ou sur WhatsApp.",
                  "Prefer a direct conversation? You can also reach me by email or on WhatsApp.",
                )}
              </p>
              <div className="mt-6 divide-y divide-border border-y border-border">
                <a
                  href={"mailto:" + profile.email}
                  className="flex items-center gap-3 py-4 text-brand-navy hover:text-brand-green"
                >
                  <Mail size={17} className="shrink-0" />
                  <span>
                    <span className="block text-[11px] text-muted-foreground">Email</span>
                    <span className="mt-1 block break-all text-xs font-medium">
                      {profile.email}
                    </span>
                  </span>
                </a>
                <a
                  href={"https://wa.me/" + profile.whatsapp.replace(/\D/g, "")}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 py-4 hover:text-brand-green"
                >
                  <MessageCircle size={17} />
                  <span>
                    <span className="block text-[11px] text-muted-foreground">WhatsApp</span>
                    <span className="mt-1 block text-xs font-medium">{profile.whatsapp}</span>
                  </span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 py-4 text-xs font-medium hover:text-brand-green"
                >
                  <Linkedin size={17} />
                  {t("Retrouvons-nous sur LinkedIn", "Connect with me on LinkedIn")}
                </a>
              </div>
              <div className="mt-6 space-y-3 text-xs leading-6 text-muted-foreground">
                <p className="flex items-start gap-2">
                  <Briefcase size={14} className="mt-1 shrink-0" />
                  {translate(profile.position, lang)}
                </p>
                <p className="flex items-start gap-2">
                  <MapPin size={14} className="mt-1 shrink-0" />
                  {translate(profile.status, lang)}
                </p>
                <p className="flex items-center gap-2 text-brand-green">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                  {t("Disponible pour vos projets à distance", "Available for remote projects")}
                </p>
              </div>
            </aside>
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
  autoComplete,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={"contact-" + name} className="mb-2 block text-xs font-medium">
        {label}
      </label>
      <input
        id={"contact-" + name}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        className="form-control"
      />
    </div>
  );
}
