import { prisma } from "../../config/database.js";
import { AppError } from "../../errors/AppError.js";

export const getCart = async (userId: string) =>
  prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: { include: { images: true } },
          productVariant: true,
        },
      },
    },
  }) ?? { userId, items: [] };

export const addCartItem = async (userId: string, payload: { productId: string; productVariantId?: string; quantity: number }) => {
  const product = await prisma.product.findUnique({
    where: { id: payload.productId },
    include: { variants: true },
  });

  if (!product) throw new AppError("Product not found", 404);

  if (product.status !== "ACTIVE") throw new AppError("Product is not available", 400);

  const cart = await prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  const variant = payload.productVariantId
    ? product.variants.find((item) => item.id === payload.productVariantId)
    : product.variants[0];

  if (payload.productVariantId && !variant) throw new AppError("Variant not found", 404);

  const quantity = Math.max(1, payload.quantity);
  const existing = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId: product.id, productVariantId: variant?.id ?? null } });

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity, price: product.price },
    });
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId: product.id,
      productVariantId: variant?.id ?? null,
      quantity,
      price: product.price,
    },
  });
};

export const updateCartItem = async (userId: string, cartItemId: string, quantity: number) => {
  const cartItem = await prisma.cartItem.findFirst({
    where: { id: cartItemId, cart: { userId } },
    include: { cart: true },
  });

  if (!cartItem) throw new AppError("Cart item not found", 404);

  return prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });
};

export const removeCartItem = async (userId: string, cartItemId: string) => {
  const item = await prisma.cartItem.findFirst({ where: { id: cartItemId, cart: { userId } } });
  if (!item) throw new AppError("Cart item not found", 404);

  await prisma.cartItem.delete({ where: { id: cartItemId } });
  return { id: cartItemId };
};

export const clearCart = async (userId: string) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) return { deleted: true };

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  return { deleted: true };
};
