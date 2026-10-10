import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.review.deleteMany({});
  await prisma.couponUsage.deleteMany({});
  await prisma.coupon.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.wishlistItem.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.inventoryTransaction.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.brand.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.user.deleteMany({});

  const adminPassword = await bcrypt.hash("Admin@123", 10);
  const managerPassword = await bcrypt.hash("Manager@123", 10);
  const customerPassword = await bcrypt.hash("Customer@123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Alicia Admin",
      email: "admin@techmart.com",
      password: adminPassword,
      role: "ADMIN",
      isVerified: true,
      phone: "+15550101",
    },
  });

  const manager = await prisma.user.create({
    data: {
      name: "Marcus Manager",
      email: "manager@techmart.com",
      password: managerPassword,
      role: "MANAGER",
      isVerified: true,
      phone: "+15550102",
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "Nia Customer",
      email: "customer@techmart.com",
      password: customerPassword,
      role: "CUSTOMER",
      isVerified: true,
      phone: "+15550103",
    },
  });

  const electronics = await prisma.category.create({
    data: { name: "Electronics", slug: "electronics" },
  });

  const audio = await prisma.category.create({
    data: { name: "Audio", slug: "audio", parentId: electronics.id },
  });

  const furniture = await prisma.category.create({
    data: { name: "Furniture", slug: "furniture" },
  });

  const sony = await prisma.brand.create({
    data: { name: "Sony", slug: "sony", description: "Premium audio and electronics", isActive: true },
  });

  const logitech = await prisma.brand.create({
    data: { name: "Logitech", slug: "logitech", description: "Peripherals and accessories", isActive: true },
  });

  const ikea = await prisma.brand.create({
    data: { name: "IKEA", slug: "ikea", description: "Home and furniture essentials", isActive: true },
  });

  const headphones = await prisma.product.create({
    data: {
      name: "WH-1000XM5 Wireless Headphones",
      slug: "wh-1000xm5-wireless-headphones",
      description: "Premium noise-cancelling wireless headphones with immersive sound.",
      shortDescription: "Noise-canceling premium headphones",
      price: 349.99,
      compareAtPrice: 399.99,
      sku: "SONY-WH1000XM5",
      status: "ACTIVE",
      categoryId: audio.id,
      brandId: sony.id,
      tags: ["audio", "wireless", "noise-cancelling"],
      isFeatured: true,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b", altText: "Headphones front view", isPrimary: true },
          { url: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a", altText: "Headphones side view" },
        ],
      },
    },
  });

  const headphoneVariantBlack = await prisma.productVariant.create({
    data: { productId: headphones.id, sku: "SONY-WH1000XM5-BLK", price: 349.99, stock: 25, attributes: { color: "Black" } },
  });

  const headphoneVariantSilver = await prisma.productVariant.create({
    data: { productId: headphones.id, sku: "SONY-WH1000XM5-SIL", price: 369.99, stock: 12, attributes: { color: "Silver" } },
  });

  const deskLamp = await prisma.product.create({
    data: {
      name: "Minimal Desk Lamp",
      slug: "minimal-desk-lamp",
      description: "A clean minimal desk lamp for modern workspaces.",
      shortDescription: "Modern workspace lighting",
      price: 79.0,
      compareAtPrice: 95.0,
      sku: "LOGI-LAMP-01",
      status: "ACTIVE",
      categoryId: electronics.id,
      brandId: logitech.id,
      tags: ["lighting", "desk", "workspace"],
      isFeatured: true,
      images: {
        create: [{ url: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28", altText: "Lamp product", isPrimary: true }],
      },
    },
  });

  const deskLampVariant = await prisma.productVariant.create({
    data: { productId: deskLamp.id, sku: "LOGI-LAMP-01-WHT", price: 79.0, stock: 40, attributes: { color: "White" } },
  });

  const bedFrame = await prisma.product.create({
    data: {
      name: "Tufted Platform Bed",
      slug: "tufted-platform-bed",
      description: "A soft upholstered bed frame for elevated bedroom interiors.",
      shortDescription: "Modern upholstered bed",
      price: 520.0,
      compareAtPrice: 650.0,
      sku: "IKEA-BED-01",
      status: "ACTIVE",
      categoryId: furniture.id,
      brandId: ikea.id,
      tags: ["bedroom", "furniture", "modern"],
      isFeatured: true,
      images: {
        create: [{ url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", altText: "Bed product", isPrimary: true }],
      },
    },
  });

  const bedFrameVariant = await prisma.productVariant.create({
    data: { productId: bedFrame.id, sku: "IKEA-BED-01-KING", price: 520.0, stock: 18, attributes: { size: "King" } },
  });

  const coupon = await prisma.coupon.create({
    data: {
      code: "SAVE10",
      type: "PERCENTAGE",
      value: 10,
      minimumOrderAmount: 100,
      maximumDiscount: 50,
      usageLimit: 100,
      perUserLimit: 2,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
      isActive: true,
    },
  });

  await prisma.review.create({
    data: {
      userId: customer.id,
      productId: headphones.id,
      rating: 5,
      comment: "Excellent noise cancellation and battery life.",
      status: "APPROVED",
    },
  });

  await prisma.address.create({
    data: {
      userId: customer.id,
      name: "Nia Customer",
      phone: "+15550103",
      address: "12 Market Street",
      city: "Seattle",
      state: "WA",
      postalCode: "98101",
      country: "USA",
      isDefault: true,
    },
  });

  await prisma.inventory.create({
    data: {
      productId: headphones.id,
      productVariantId: headphoneVariantBlack.id,
      availableQuantity: 25,
      reservedQuantity: 0,
    },
  });

  await prisma.inventory.create({
    data: {
      productId: deskLamp.id,
      productVariantId: deskLampVariant.id,
      availableQuantity: 40,
      reservedQuantity: 0,
    },
  });

  await prisma.inventory.create({
    data: {
      productId: bedFrame.id,
      productVariantId: bedFrameVariant.id,
      availableQuantity: 18,
      reservedQuantity: 0,
    },
  });

  await prisma.inventoryTransaction.createMany({
    data: [
      { inventoryId: (await prisma.inventory.findFirst({ where: { productId: headphones.id } }))!.id, type: "INCREASE", quantity: 25, reference: "seed" },
      { inventoryId: (await prisma.inventory.findFirst({ where: { productId: deskLamp.id } }))!.id, type: "INCREASE", quantity: 40, reference: "seed" },
      { inventoryId: (await prisma.inventory.findFirst({ where: { productId: bedFrame.id } }))!.id, type: "INCREASE", quantity: 18, reference: "seed" },
    ],
  });

  console.log("Seed complete:", { admin: admin.email, manager: manager.email, customer: customer.email, coupon: coupon.code });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
