import { z } from "zod";

const productBodySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  price: z.number().nonnegative(),
  compareAtPrice: z.number().nonnegative().optional(),
  sku: z.string().min(2),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).optional(),
  categoryId: z.string().min(1),
  brandId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

export const productQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).optional(),
    sort: z.enum(["newest", "price_asc", "price_desc", "rating"]).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(20),
  }),
});

export const productParamSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

export const createProductSchema = z.object({ body: productBodySchema });
export const updateProductSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: productBodySchema.partial(),
});
