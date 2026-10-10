import { prisma } from "../../config/database.js";

export const getOverview = async () => {
  const [users, products, orders, revenue] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
  ]);

  return {
    users,
    products,
    orders,
    revenue: Number(revenue._sum.total ?? 0),
  };
};

export const getRevenueData = async () => prisma.order.groupBy({ by: ["createdAt"], _sum: { total: true } });

export const getTopProducts = async () =>
  prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { category: true },
  });
