import { z } from "zod";

export const checkoutSessionSchema = z.object({
  body: z.object({
    orderId: z.string().optional(),
    amount: z.number().nonnegative().optional(),
    currency: z.string().default("USD").optional(),
  }),
});
