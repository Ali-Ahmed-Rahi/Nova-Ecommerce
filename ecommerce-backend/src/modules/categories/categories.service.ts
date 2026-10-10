import { prisma } from "../../config/database.js";
import { AppError } from "../../errors/AppError.js";

export const getCategories = async () => prisma.category.findMany({ include: { children: true, parent: true } });

export const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: { children: true, parent: true },
  });

  if (!category) throw new AppError("Category not found", 404);
  return category;
};

export const createCategory = async (payload: { name: string; slug: string; description?: string; parentId?: string }) => {
  if (payload.parentId) {
    const parent = await prisma.category.findUnique({ where: { id: payload.parentId } });
    if (!parent) throw new AppError("Parent category not found", 404);
  }

  return prisma.category.create({ data: payload });
};

export const updateCategory = async (id: string, payload: Partial<{ name: string; slug: string; description: string; parentId: string }>) => {
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) throw new AppError("Category not found", 404);

  if (payload.parentId) {
    const parent = await prisma.category.findUnique({ where: { id: payload.parentId } });
    if (!parent) throw new AppError("Parent category not found", 404);
  }

  return prisma.category.update({ where: { id }, data: payload });
};

export const deleteCategory = async (id: string) => {
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) throw new AppError("Category not found", 404);

  await prisma.category.delete({ where: { id } });
  return { id };
};
