import { z } from "zod";

export const brandSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().optional(),
    logo: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const brandParamSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});
