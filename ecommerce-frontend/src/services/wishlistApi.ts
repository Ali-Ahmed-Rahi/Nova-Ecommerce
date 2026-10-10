import { api } from "@/services/api";
import type { ApiResponse, WishlistItem } from "@/types";

type BackendWishlist = {
  items?: Array<{
    id: string;
    productId: string;
    product: {
      name: string;
      price: number | string;
      images?: Array<{ url: string }>;
    };
  }>;
} | null;

export const wishlistApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWishlist: build.query<ApiResponse<WishlistItem[]>, void>({
      query: () => ({ url: "/wishlist", method: "GET" }),
      transformResponse: (response: ApiResponse<BackendWishlist>): ApiResponse<WishlistItem[]> => ({
        ...response,
        data: (response.data?.items ?? []).map((item) => ({
          id: item.id,
          productId: item.productId,
          productName: item.product.name,
          image: item.product.images?.[0]?.url ?? "",
          price: Number(item.product.price),
        })),
      }),
      providesTags: ["Wishlist"],
    }),
    addToWishlist: build.mutation<ApiResponse<WishlistItem[]>, string>({
      query: (productId) => ({ url: `/wishlist/${productId}`, method: "POST" }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: build.mutation<ApiResponse<WishlistItem[]>, string>({
      query: (productId) => ({ url: `/wishlist/${productId}`, method: "DELETE" }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } = wishlistApi;
