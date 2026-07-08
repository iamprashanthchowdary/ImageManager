import { z } from "zod";

export const customAspectRatioSchema = z.object({
  label: z.string().trim().min(1, "Give it a name").max(30, "Keep it under 30 characters"),
  width: z.coerce.number().int().positive().max(10_000),
  height: z.coerce.number().int().positive().max(10_000),
});

export type CustomAspectRatioInput = z.infer<typeof customAspectRatioSchema>;
