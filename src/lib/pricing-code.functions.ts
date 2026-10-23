import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ACCESS_CODE = "PLACIDE2026";

export const checkPricingCode = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ code: z.string().trim().max(50) }).parse(input))
  .handler(async ({ data }) => ({ ok: data.code.toUpperCase() === ACCESS_CODE }));

