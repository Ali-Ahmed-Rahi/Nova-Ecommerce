import { prisma } from "../../config/database.js";
import { AppError } from "../../errors/AppError.js";

export const getProductReviews = async (productId: string) =>
  prisma.review.findMany({
    where: { productId },
    include: { user: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });

export const createReview = async (userId: string, productId: string, payload: { rating: number; comment?: string }) => {
  const purchased = await prisma.orderItem.findFirst({
    where: {
      productId,
      order: { userId },
    },
  });

  if (!purchased) throw new AppError("You must purchase the product before reviewing it", 403);

  const existing = await prisma.review.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existing) throw new AppError("You already reviewed this product", 409);

  return prisma.review.create({
    data: {
      userId,
      productId,
      rating: payload.rating,
      comment: payload.comment ?? null,
      status: "APPROVED",
    },
    include: { user: { select: { id: true, name: true } } },
  });
};

export const updateReview = async (userId: string, reviewId: string, payload: { rating?: number; comment?: string }) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review) throw new AppError("Review not found", 404);
  if (review.userId !== userId) throw new AppError("You can only update your own review", 403);

  return prisma.review.update({
    where: { id: reviewId },
    data: payload,
    include: { user: { select: { id: true, name: true } } },
  });
};

export const deleteReview = async (userId: string, reviewId: string, role: "CUSTOMER" | "MANAGER" | "ADMIN") => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review) throw new AppError("Review not found", 404);
  if (role === "CUSTOMER" && review.userId !== userId) throw new AppError("You can only delete your own review", 403);

  await prisma.review.delete({ where: { id: reviewId } });
  return { id: reviewId };
};
