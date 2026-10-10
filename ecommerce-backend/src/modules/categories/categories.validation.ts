import { z } from "zod";

export const categorySchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().optional(),
    parentId: z.string().optional(),
  }),
});

export const categoryParamSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

export const categoryQuerySchema = z.object({
  query: z.object({}).catchall(z.any()),
});
