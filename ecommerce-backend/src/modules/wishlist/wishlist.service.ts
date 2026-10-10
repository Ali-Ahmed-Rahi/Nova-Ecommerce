import { prisma } from "../../config/database.js";
import { AppError } from "../../errors/AppError.js";

export const getWishlist = async (userId: string) =>
  prisma.wishlist.findUnique({
    where: { userId },
    include: { items: { include: { product: { include: { images: true } } } } },
  }) ?? { userId, items: [] };

export const addToWishlist = async (userId: string, productId: string) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new AppError("Product not found", 404);

  const wishlist = await prisma.wishlist.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  const existing = await prisma.wishlistItem.findUnique({
    where: { wishlistId_productId: { wishlistId: wishlist.id, productId } },
  });

  if (existing) {
    return existing;
  }

  return prisma.wishlistItem.create({ data: { wishlistId: wishlist.id, productId } });
};

export const removeFromWishlist = async (userId: string, productId: string) => {
  const wishlist = await prisma.wishlist.findUnique({ where: { userId } });
  if (!wishlist) return { deleted: true };

  await prisma.wishlistItem.deleteMany({ where: { wishlistId: wishlist.id, productId } });
  return { deleted: true };
};
