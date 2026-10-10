import { api } from "@/services/api";
import type { ApiResponse, Order } from "@/types";

type BackendOrder = {
  id: string;
  status: string;
  subtotal: number | string;
  shipping: number | string;
  tax: number | string;
  total: number | string;
  createdAt: string;
  items?: Array<{
    id: string;
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number | string;
    sku: string;
  }>;
  payment?: { status: string } | null;
};

const titleCase = (value: string) =>
  value.toLowerCase().replace(/(^|_)([a-z])/g, (_, prefix: string, letter: string) => `${prefix ? " " : ""}${letter.toUpperCase()}`);

const mapOrder = (order: BackendOrder): Order => ({
  id: order.id,
  orderNumber: order.id,
  createdAt: new Date(order.createdAt).toLocaleDateString(),
  status: titleCase(order.status) as Order["status"],
  paymentStatus: titleCase(order.payment?.status ?? "PENDING") as Order["paymentStatus"],
  subtotal: Number(order.subtotal),
  shipping: Number(order.shipping),
  tax: Number(order.tax),
  total: Number(order.total),
  items: (order.items ?? []).map((item) => ({
    id: item.id,
    productId: item.productId,
    productName: item.name,
    image: "",
    quantity: item.quantity,
    unitPrice: Number(item.unitPrice),
    variant: item.sku,
  })),
});

export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<ApiResponse<Order[]>, void>({
      query: () => ({ url: "/orders", method: "GET" }),
      transformResponse: (response: ApiResponse<BackendOrder[]>): ApiResponse<Order[]> => ({
        ...response,
        data: response.data.map(mapOrder),
      }),
      providesTags: ["Orders"],
    }),
    getOrder: build.query<ApiResponse<Order>, string>({
      query: (id) => ({ url: `/orders/${id}`, method: "GET" }),
      transformResponse: (response: ApiResponse<BackendOrder>): ApiResponse<Order> => ({
        ...response,
        data: mapOrder(response.data),
      }),
      providesTags: ["Orders"],
    }),
    createOrder: build.mutation<ApiResponse<Order>, { shippingAddress: string; couponCode?: string }>({
      query: (body) => ({ url: "/orders", method: "POST", body }),
      transformResponse: (response: ApiResponse<BackendOrder>): ApiResponse<Order> => ({
        ...response,
        data: mapOrder(response.data),
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderQuery, useCreateOrderMutation } = orderApi;
