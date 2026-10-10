import { api } from "@/services/api";
import type { ApiResponse, Product } from "@/types";

type BackendProduct = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  shortDescription?: string | null;
  price: number | string;
  compareAtPrice?: number | string | null;
  sku: string;
  tags?: string[];
  isFeatured?: boolean;
  category?: { name: string; slug?: string };
  brand?: { name: string } | null;
  images?: Array<{ url: string }>;
  variants?: Array<{
    id: string;
    price: number | string;
    compareAtPrice?: number | string | null;
    stock: number;
    sku: string;
    attributes?: Record<string, unknown> | null;
  }>;
};

type BackendProductList = {
  items: BackendProduct[];
};

const mapProduct = (product: BackendProduct): Product => ({
  id: product.id,
  name: product.name,
  slug: product.slug,
  description: product.description ?? "",
  shortDescription: product.shortDescription ?? "",
  price: Number(product.price),
  comparePrice: product.compareAtPrice == null ? undefined : Number(product.compareAtPrice),
  rating: 0,
  reviewCount: 0,
  stock: (product.variants ?? []).reduce((total, variant) => total + variant.stock, 0),
  sku: product.sku,
  category: product.category?.name ?? "",
  categorySlug: product.category?.slug,
  brand: product.brand?.name ?? "",
  images: (product.images ?? []).map((image) => image.url),
  tags: product.tags ?? [],
  isFeatured: product.isFeatured ?? false,
  isNew: false,
  isBestSeller: false,
  variants: (product.variants ?? []).map((variant) => ({
    id: variant.id,
    name: Object.values(variant.attributes ?? {}).map(String).join(" / ") || variant.sku,
    price: Number(variant.price),
    comparePrice: variant.compareAtPrice == null ? undefined : Number(variant.compareAtPrice),
    stock: variant.stock,
    sku: variant.sku,
  })),
});

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ApiResponse<Product[]>, { page?: number; limit?: number; search?: string; category?: string; brand?: string; minPrice?: number; maxPrice?: number; status?: "DRAFT" | "ACTIVE" | "ARCHIVED"; sort?: "newest" | "price_asc" | "price_desc" | "rating" }>({
      query: (params = {}) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      transformResponse: (response: ApiResponse<BackendProductList>): ApiResponse<Product[]> => ({
        ...response,
        data: response.data.items.map(mapProduct),
      }),
      providesTags: ["Products"],
    }),
    getProduct: build.query<ApiResponse<Product>, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<BackendProduct>): ApiResponse<Product> => ({
        ...response,
        data: mapProduct(response.data),
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<ApiResponse<Product>, {
      name: string;
      slug: string;
      price: number;
      sku: string;
      categoryId: string;
      description?: string;
      shortDescription?: string;
    }>({
      query: (body) => ({ url: "/products", method: "POST", body }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation<ApiResponse<Product>, {
      id: string;
      changes: Partial<{
        name: string;
        slug: string;
        price: number;
        sku: string;
        categoryId: string;
        description: string;
        shortDescription: string;
      }>;
    }>({
      query: ({ id, changes }) => ({ url: `/products/${id}`, method: "PATCH", body: changes }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation<ApiResponse<{ id: string }>, string>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
