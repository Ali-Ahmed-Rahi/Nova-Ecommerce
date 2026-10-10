import { prisma } from "../../config/database.js";
import { AppError } from "../../errors/AppError.js";

export const validateCoupon = async (code: string, orderTotal = 0) => {
  const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });

  if (!coupon) throw new AppError("Coupon not found", 404);
  if (!coupon.isActive) throw new AppError("Coupon is inactive", 400);
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) throw new AppError("Coupon expired", 400);
  if (coupon.minimumOrderAmount && orderTotal < Number(coupon.minimumOrderAmount)) throw new AppError("Coupon minimum not met", 400);

  return coupon;
};

export const getCoupons = async () => prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });

export const createCoupon = async (payload: {
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minimumOrderAmount?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  perUserLimit?: number;
  expiresAt?: string;
  isActive?: boolean;
}) => {
  const exists = await prisma.coupon.findUnique({ where: { code: payload.code.toUpperCase() } });
  if (exists) throw new AppError("Coupon code already exists", 409);

  return prisma.coupon.create({
    data: {
      ...payload,
      code: payload.code.toUpperCase(),
      expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : null,
      isActive: payload.isActive ?? true,
    },
  });
};

export const updateCoupon = async (id: string, payload: Partial<{
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minimumOrderAmount: number;
  maximumDiscount: number;
  usageLimit: number;
  perUserLimit: number;
  expiresAt: string;
  isActive: boolean;
}>) => {
  const coupon = await prisma.coupon.findUnique({ where: { id } });
  if (!coupon) throw new AppError("Coupon not found", 404);

  return prisma.coupon.update({
    where: { id },
    data: {
      ...payload,
      code: payload.code ? payload.code.toUpperCase() : undefined,
      expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : undefined,
    },
  });
};

export const deleteCoupon = async (id: string) => {
  const coupon = await prisma.coupon.findUnique({ where: { id } });
  if (!coupon) throw new AppError("Coupon not found", 404);

  await prisma.coupon.delete({ where: { id } });
  return { id };
};
