import { z } from "zod";

export const couponValidateSchema = z.object({
  body: z.object({
    code: z.string().min(2),
    orderTotal: z.number().nonnegative().optional(),
  }),
});

export const couponSchema = z.object({
  body: z.object({
    code: z.string().min(2),
    type: z.enum(["PERCENTAGE", "FIXED"]),
    value: z.number().nonnegative(),
    minimumOrderAmount: z.number().nonnegative().optional(),
    maximumDiscount: z.number().nonnegative().optional(),
    usageLimit: z.number().int().positive().optional(),
    perUserLimit: z.number().int().positive().optional(),
    expiresAt: z.string().datetime().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const couponParamSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});
