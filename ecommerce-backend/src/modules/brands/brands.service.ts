import { prisma } from "../../config/database.js";
import { AppError } from "../../errors/AppError.js";

export const getBrands = async () => prisma.brand.findMany({ orderBy: { createdAt: "desc" } });

export const getBrandById = async (id: string) => {
  const brand = await prisma.brand.findUnique({ where: { id } });
  if (!brand) throw new AppError("Brand not found", 404);
  return brand;
};

export const createBrand = async (payload: { name: string; slug: string; description?: string; logo?: string; isActive?: boolean }) => {
  const existing = await prisma.brand.findUnique({ where: { slug: payload.slug } });
  if (existing) throw new AppError("Brand slug already exists", 409);

  return prisma.brand.create({ data: payload });
};

export const updateBrand = async (id: string, payload: Partial<{ name: string; slug: string; description: string; logo: string; isActive: boolean }>) => {
  const existing = await prisma.brand.findUnique({ where: { id } });
  if (!existing) throw new AppError("Brand not found", 404);

  return prisma.brand.update({ where: { id }, data: payload });
};

export const deleteBrand = async (id: string) => {
  const existing = await prisma.brand.findUnique({ where: { id } });
  if (!existing) throw new AppError("Brand not found", 404);

  await prisma.brand.delete({ where: { id } });
  return { id };
};
