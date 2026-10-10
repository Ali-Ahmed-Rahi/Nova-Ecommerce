import { api } from "@/services/api";
import type { ApiResponse, Cart } from "@/types";

type BackendCart = {
  items?: Array<{
    id: string;
    productId: string;
    quantity: number;
    price: number | string;
    product: {
      name: string;
      images?: Array<{ url: string }>;
    };
    productVariant?: {
      sku?: string;
      attributes?: Record<string, string>;
    } | null;
  }>;
} | null;

const mapCartResponse = (response: ApiResponse<BackendCart>): ApiResponse<Cart> => {
  const items = (response.data?.items ?? []).map((item) => ({
    id: item.id,
    productId: item.productId,
    productName: item.product.name,
    image: item.product.images?.[0]?.url ?? "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
    quantity: item.quantity,
    unitPrice: Number(item.price),
    variant: item.productVariant?.attributes
      ? Object.values(item.productVariant.attributes).join(" / ")
      : item.productVariant?.sku,
  }));
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shipping = subtotal > 0 ? 9.99 : 0;
  const tax = subtotal * 0.08;

  return {
    ...response,
    data: { items, subtotal, shipping, tax, total: subtotal + shipping + tax },
  };
};

export const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<ApiResponse<Cart>, void>({
      query: () => ({ url: "/cart", method: "GET" }),
      transformResponse: (response: ApiResponse<BackendCart>) => mapCartResponse(response),
      providesTags: ["Cart"],
    }),
    addToCart: build.mutation<ApiResponse<Cart>, { productId: string; quantity?: number; variant?: string }>({
      query: ({ productId, quantity = 1, variant }) => ({
        url: "/cart/items",
        method: "POST",
        body: { productId, quantity, ...(variant ? { productVariantId: variant } : {}) },
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: build.mutation<ApiResponse<Cart>, { id: string; quantity: number }>({
      query: ({ id, quantity }) => ({ url: `/cart/items/${id}`, method: "PATCH", body: { quantity } }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: build.mutation<ApiResponse<Cart>, string>({
      query: (id) => ({ url: `/cart/items/${id}`, method: "DELETE" }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useUpdateCartItemMutation, useRemoveCartItemMutation } = cartApi;
