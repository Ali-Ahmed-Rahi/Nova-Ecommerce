import { prisma } from "../../config/database.js";
import { AppError } from "../../errors/AppError.js";

export const getOrders = async (userId: string, role: "CUSTOMER" | "MANAGER" | "ADMIN") => {
  if (role === "CUSTOMER") {
    return prisma.order.findMany({
      where: { userId },
      include: { items: true, payment: true },
      orderBy: { createdAt: "desc" },
    });
  }

  return prisma.order.findMany({
    include: { items: true, payment: true, user: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
};

export const getOrderById = async (id: string, userId: string, role: "CUSTOMER" | "MANAGER" | "ADMIN") => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, payment: true },
  });

  if (!order) throw new AppError("Order not found", 404);
  if (role === "CUSTOMER" && order.userId !== userId) throw new AppError("Forbidden", 403);

  return order;
};

export const createOrder = async (userId: string, payload: { shippingAddress: string; couponCode?: string }) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true, productVariant: true } } },
  });

  if (!cart || cart.items.length === 0) throw new AppError("Cart is empty", 400);

  let subtotal = 0;

  for (const item of cart.items) {
    const product = item.product;
    if (product.status !== "ACTIVE") throw new AppError(`Product ${product.name} is not available`, 400);

    const variant = item.productVariant;
    if (variant && variant.stock < item.quantity) throw new AppError(`Not enough stock for ${product.name}`, 400);

    subtotal += Number(product.price) * item.quantity;
  }

  let discount = 0;
  if (payload.couponCode) {
    const coupon = await prisma.coupon.findUnique({ where: { code: payload.couponCode.toUpperCase() } });
    if (!coupon || !coupon.isActive) throw new AppError("Coupon is invalid or expired", 400);

    const usageCount = await prisma.couponUsage.count({ where: { couponId: coupon.id, userId } });
    if (coupon.usageLimit && usageCount >= coupon.usageLimit) throw new AppError("Coupon usage limit exceeded", 400);

    if (coupon.minimumOrderAmount && subtotal < Number(coupon.minimumOrderAmount)) throw new AppError("Coupon minimum order requirement not met", 400);

    if (coupon.type === "PERCENTAGE") {
      discount = Math.min(Number(coupon.value) / 100 * subtotal, Number(coupon.maximumDiscount ?? subtotal));
    } else {
      discount = Math.min(Number(coupon.value), Number(coupon.maximumDiscount ?? coupon.value));
    }
  }

  const shipping = subtotal > 0 ? 9.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        shippingAddress: payload.shippingAddress,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        couponCode: payload.couponCode?.toUpperCase() ?? null,
      },
    });

    for (const item of cart.items) {
      await tx.orderItem.create({
        data: {
          orderId: createdOrder.id,
          productId: item.productId,
          productVariantId: item.productVariantId ?? null,
          name: item.product.name,
          sku: item.productVariant?.sku ?? item.product.sku,
          quantity: item.quantity,
          unitPrice: item.product.price,
          totalPrice: item.product.price.mul(item.quantity),
        },
      });

      if (item.productVariantId) {
        await tx.productVariant.update({
          where: { id: item.productVariantId },
          data: { stock: { decrement: item.quantity } },
        });
      }
    }

    if (payload.couponCode) {
      await tx.couponUsage.create({
        data: {
          couponId: (await tx.coupon.findUnique({ where: { code: payload.couponCode.toUpperCase() } }))!.id,
          userId,
          orderId: createdOrder.id,
        },
      });
    }

    await tx.payment.create({
      data: {
        orderId: createdOrder.id,
        amount: total,
        currency: "USD",
        status: "PENDING",
        method: "STRIPE",
      },
    });

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
    return createdOrder;
  });

  return order;
};

export const updateOrderStatus = async (id: string, status: "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED") => {
  const existing = await prisma.order.findUnique({ where: { id } });
  if (!existing) throw new AppError("Order not found", 404);

  return prisma.order.update({
    where: { id },
    data: { status },
  });
};
