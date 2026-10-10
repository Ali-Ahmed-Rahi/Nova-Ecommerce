import { api } from "@/services/api";
import type { ApiResponse, Category } from "@/types";

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<ApiResponse<Category[]>, void>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    createCategory: build.mutation<ApiResponse<Category>, { name: string; slug: string; description?: string }>({
      query: (body) => ({ url: "/categories", method: "POST", body }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: build.mutation<ApiResponse<Category>, {
      id: string;
      changes: Partial<{ name: string; slug: string; description: string }>;
    }>({
      query: ({ id, changes }) => ({ url: `/categories/${id}`, method: "PATCH", body: changes }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation } = categoryApi;
