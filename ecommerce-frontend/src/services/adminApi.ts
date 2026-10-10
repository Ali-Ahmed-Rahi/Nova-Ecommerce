import { api } from "@/services/api";
import type { ApiResponse } from "@/types";

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdminSummary: build.query<ApiResponse<{ summary: { revenue: number; orders: number; customers: number; conversion: number } }>, void>({
      query: () => ({ url: "/admin", method: "GET" }),
      providesTags: ["Admin"],
    }),
  }),
});

export const { useGetAdminSummaryQuery } = adminApi;
