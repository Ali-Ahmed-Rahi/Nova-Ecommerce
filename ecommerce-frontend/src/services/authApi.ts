import { api } from "@/services/api";
import type { ApiResponse } from "@/types";

type AuthCredentials = {
  email: string;
  password: string;
};

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "MANAGER" | "ADMIN";
  phone?: string | null;
};

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ApiResponse<{ user: AuthUser }>, AuthCredentials>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: build.mutation<ApiResponse<AuthUser>, { name: string; email: string; password: string }>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: build.mutation<ApiResponse<{ message: string }>, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    getCurrentUser: build.query<ApiResponse<AuthUser>, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useForgotPasswordMutation, useGetCurrentUserQuery } = authApi;
