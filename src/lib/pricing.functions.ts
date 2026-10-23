import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type PricingItem = {
  tier: string;
  title: string;
  type: string;
  price: string;
  hosting: string;
  maintenance: string;
  accent: "green" | "gold" | "navy";
  featured: boolean;
};

const RequestSchema = z.object({
  email: z.string().trim().email("Email invalide").max(255),
  consent: z.boolean().optional().default(false),
});

const VerifySchema = z.object({
  token: z.string().trim().min(20).max(200),
});

function randomToken(): string {
  // 256 bits of entropy via crypto.getRandomValues
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export const requestPricingUnlock = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => RequestSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Basic anti-spam: max 1 request per email per 5 minutes
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recent } = await supabaseAdmin
      .from("pricing_leads")
      .select("id")
      .eq("email", data.email)
      .gte("created_at", fiveMinAgo)
      .limit(1);
    if (recent && recent.length > 0) {
      throw new Error("Un lien vient d'être envoyé à cette adresse. Vérifiez vos emails.");
    }

    const token = randomToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const { error } = await supabaseAdmin.from("pricing_leads").insert({
      email: data.email,
      token,
      token_expires_at: expiresAt,
      source_page: "/tarificataire",
      consent_newsletter: !!data.consent,
    });

    if (error) {
      console.error("[pricing] lead insert failed", error);
      throw new Error("Une erreur est survenue. Veuillez réessayer.");
    }

    // Best-effort email send (activates once email domain is set up).
    try {
      const origin = process.env.LOVABLE_PUBLIC_URL || process.env.VITE_PUBLIC_URL || "";
      if (origin) {
        await fetch(`${origin}/lovable/email/transactional/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            templateName: "pricing-unlock",
            recipientEmail: data.email,
            templateData: { unlockUrl: `${origin}/tarificataire?unlock_token=${token}` },
          }),
        }).catch(() => {});
      }
    } catch {
      // ignore
    }

    return { ok: true };
  });

export const verifyPricingToken = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => VerifySchema.parse(input))
  .handler(async ({ data }): Promise<{
    status: "valid" | "expired" | "invalid";
    items?: PricingItem[];
  }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: lead } = await supabaseAdmin
      .from("pricing_leads")
      .select("id, token_expires_at")
      .eq("token", data.token)
      .maybeSingle();

    if (!lead) return { status: "invalid" };

    if (new Date(lead.token_expires_at).getTime() < Date.now()) {
      return { status: "expired" };
    }

    // Mark as unlocked (idempotent – update first unlock timestamp only)
    await supabaseAdmin
      .from("pricing_leads")
      .update({ unlocked_at: new Date().toISOString() })
      .eq("id", lead.id)
      .is("unlocked_at", null);

    const { data: items, error } = await supabaseAdmin
      .from("pricing_items")
      .select("tier, title, type, price, hosting, maintenance, accent, featured")
      .order("display_order", { ascending: true });

    if (error || !items) {
      console.error("[pricing] items read failed", error);
      throw new Error("Impossible de charger la grille tarifaire.");
    }

    return {
      status: "valid",
      items: items as PricingItem[],
    };
  });
