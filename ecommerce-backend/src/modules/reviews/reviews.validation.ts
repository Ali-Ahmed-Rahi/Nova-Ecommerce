import { z } from "zod";

export const reviewBodySchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(5).max(1000).optional(),
  }),
});

export const reviewParamSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});
