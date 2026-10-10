import { Prisma } from "@prisma/client";
import { prisma } from "../../config/database.js";
import { AppError } from "../../errors/AppError.js";
import { buildPagination } from "../../utils/pagination.js";

export const getProducts = async (query: {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: "DRAFT" | "ACTIVE" | "ARCHIVED";
  sort?: "newest" | "price_asc" | "price_desc" | "rating";
  page?: number;
  limit?: number;
}) => {
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 20);

  const where: Prisma.ProductWhereInput = {
    ...(query.search && {
      OR: [
        { name: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
      ],
    }),
    ...(query.category && {
      category: { slug: query.category },
    }),
    ...(query.brand && {
      brand: { slug: query.brand },
    }),
    ...(query.minPrice !== undefined && { price: { gte: query.minPrice } }),
    ...(query.maxPrice !== undefined && { price: { lte: query.maxPrice } }),
    ...(query.status && { status: query.status }),
  };

  const sort: Prisma.ProductOrderByWithRelationInput =
    query.sort === "price_asc"
      ? { price: "asc" }
      : query.sort === "price_desc"
        ? { price: "desc" }
        : query.sort === "rating"
          ? { createdAt: "desc" }
          : { createdAt: "desc" };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: sort,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        brand: true,
        images: true,
        variants: true,
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    items,
    meta: buildPagination(page, limit, total),
  };
};

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      brand: true,
      images: true,
      variants: true,
      reviews: {
        include: { user: { select: { id: true, name: true } } },
      },
    },
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

export const createProduct = async (payload: {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  status?: "DRAFT" | "ACTIVE" | "ARCHIVED";
  categoryId: string;
  brandId?: string;
  tags?: string[];
  isFeatured?: boolean;
}) => {
  const category = await prisma.category.findUnique({ where: { id: payload.categoryId } });
  if (!category) throw new AppError("Category not found", 404);

  if (payload.brandId) {
    const brand = await prisma.brand.findUnique({ where: { id: payload.brandId } });
    if (!brand) throw new AppError("Brand not found", 404);
  }

  const product = await prisma.product.create({
    data: {
      name: payload.name,
      slug: payload.slug,
      description: payload.description ?? null,
      shortDescription: payload.shortDescription ?? null,
      price: payload.price,
      compareAtPrice: payload.compareAtPrice ?? null,
      sku: payload.sku,
      status: payload.status ?? "ACTIVE",
      categoryId: payload.categoryId,
      brandId: payload.brandId ?? null,
      tags: payload.tags ?? [],
      isFeatured: payload.isFeatured ?? false,
    },
    include: { category: true, brand: true, images: true, variants: true },
  });

  return product;
};

export const updateProduct = async (id: string, payload: Partial<{
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice: number;
  sku: string;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  categoryId: string;
  brandId: string;
  tags: string[];
  isFeatured: boolean;
}>) => {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new AppError("Product not found", 404);

  if (payload.categoryId) {
    const category = await prisma.category.findUnique({ where: { id: payload.categoryId } });
    if (!category) throw new AppError("Category not found", 404);
  }

  if (payload.brandId) {
    const brand = await prisma.brand.findUnique({ where: { id: payload.brandId } });
    if (!brand) throw new AppError("Brand not found", 404);
  }

  const updated = await prisma.product.update({
    where: { id },
    data: payload,
    include: { category: true, brand: true, images: true, variants: true },
  });

  return updated;
};

export const deleteProduct = async (id: string) => {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new AppError("Product not found", 404);

  await prisma.product.delete({ where: { id } });
  return { id };
};
