import { z } from "zod";

/**
 * Add new environment variables here as features need them (DB, auth, storage, etc.)
 * rather than reading `process.env` directly elsewhere — this keeps validation and
 * typing centralized and fails fast on missing config.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
