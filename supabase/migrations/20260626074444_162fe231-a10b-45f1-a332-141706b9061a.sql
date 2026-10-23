
-- Contact messages table (public anonymous insert)
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  estimated_budget TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_messages TO anon;
GRANT INSERT ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit contact messages"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 2 AND 100
    AND email ~* '^[^@]+@[^@]+\.[^@]+$'
    AND length(email) <= 255
    AND length(message) BETWEEN 10 AND 2000
  );

-- Pricing leads table
CREATE TABLE public.pricing_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  token_expires_at TIMESTAMPTZ NOT NULL,
  unlocked_at TIMESTAMPTZ,
  source_page TEXT,
  consent_newsletter BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_pricing_leads_token ON public.pricing_leads(token);
CREATE INDEX idx_pricing_leads_email_created ON public.pricing_leads(email, created_at DESC);

-- Only service_role accesses pricing_leads directly (server functions do all the work)
GRANT ALL ON public.pricing_leads TO service_role;
ALTER TABLE public.pricing_leads ENABLE ROW LEVEL SECURITY;
-- No policies for anon/authenticated => no access. Service role bypasses RLS.

-- Pricing items table (server-only; never exposed to client without valid token)
CREATE TABLE public.pricing_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tier TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  price TEXT NOT NULL,
  hosting TEXT NOT NULL,
  maintenance TEXT NOT NULL,
  accent TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0
);

GRANT ALL ON public.pricing_items TO service_role;
ALTER TABLE public.pricing_items ENABLE ROW LEVEL SECURITY;
-- No anon policy: only service_role can read. Server function gates on valid token.

