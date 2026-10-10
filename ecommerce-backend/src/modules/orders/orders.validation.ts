import { z } from "zod";

export const orderCreateSchema = z.object({
  body: z.object({
    shippingAddress: z.string().min(3),
    couponCode: z.string().optional(),
  }),
});

export const orderStatusSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({ status: z.enum(["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"]) }),
});
