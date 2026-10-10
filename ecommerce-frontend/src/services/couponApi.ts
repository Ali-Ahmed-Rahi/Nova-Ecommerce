import { api } from "@/services/api";
import type { ApiResponse, Coupon } from "@/types";

export const couponApi = api.injectEndpoints({
  endpoints: (build) => ({
    validateCoupon: build.mutation<ApiResponse<Coupon>, { code: string }>({
      query: (body) => ({ url: "/coupons/validate", method: "POST", body }),
    }),
  }),
});

export const { useValidateCouponMutation } = couponApi;
