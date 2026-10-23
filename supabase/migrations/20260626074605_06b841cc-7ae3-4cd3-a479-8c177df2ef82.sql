
-- Explicit "no public access" policies for pricing_leads
CREATE POLICY "Deny public access to pricing_leads"
  ON public.pricing_leads FOR ALL
  TO anon, authenticated
  USING (false) WITH CHECK (false);

-- Explicit "no public access" policy for pricing_items
CREATE POLICY "Deny public access to pricing_items"
  ON public.pricing_items FOR ALL
  TO anon, authenticated
  USING (false) WITH CHECK (false);

