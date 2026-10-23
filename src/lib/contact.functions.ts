import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ContactSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  projectType: z.string().trim().max(80).optional().default(""),
  estimatedBudget: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(10).max(2000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || null,
      project_type: data.projectType || null,
      estimated_budget: data.estimatedBudget || null,
      message: data.message,
    });

    if (error) {
      console.error("[contact] insert failed", error);
      throw new Error("Une erreur est survenue. Veuillez réessayer.");
    }

    // Best-effort email notification via Lovable Emails (activates once email domain is set up).
    try {
      const origin =
        process.env.LOVABLE_PUBLIC_URL ||
        process.env.VITE_PUBLIC_URL ||
        "";
      if (origin) {
        await fetch(`${origin}/lovable/email/transactional/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            templateName: "contact-notification",
            recipientEmail: "muhemediplacide2011@gmail.com",
            templateData: data,
          }),
        }).catch(() => {});
      }
    } catch {
      // Silently ignore – message is already persisted in the DB.
    }

    return { ok: true };
  });
