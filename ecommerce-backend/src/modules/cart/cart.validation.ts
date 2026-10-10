import { z } from "zod";

export const cartItemSchema = z.object({
  body: z.object({
    productId: z.string().min(1),
    productVariantId: z.string().optional(),
    quantity: z.number().int().min(1).max(20),
  }),
});

export const updateCartItemSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({ quantity: z.number().int().min(1).max(20) }),
});
