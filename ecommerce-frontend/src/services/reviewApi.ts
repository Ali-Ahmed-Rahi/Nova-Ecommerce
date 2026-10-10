import { api } from "@/services/api";
import type { ApiResponse, Review } from "@/types";

export const reviewApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query<ApiResponse<Review[]>, string>({
      query: (productId) => ({ url: `/products/${productId}/reviews`, method: "GET" }),
      providesTags: ["Reviews"],
    }),
    createReview: build.mutation<ApiResponse<Review>, { productId: string; rating: number; title: string; comment: string }>({
      query: (body) => ({ url: "/reviews", method: "POST", body }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const { useGetReviewsQuery, useCreateReviewMutation } = reviewApi;
