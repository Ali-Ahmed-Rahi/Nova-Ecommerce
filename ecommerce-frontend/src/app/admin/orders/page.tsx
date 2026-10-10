"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOrdersQuery } from "@/services/orderApi";

export default function AdminOrdersPage() {
  const { data, isLoading, isError } = useGetOrdersQuery();
  const orders = data?.data ?? [];

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Operations</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Orders</h1>
      </div>
      {isLoading ? <p>Loading orders...</p> : null}
      {isError ? <p role="alert">Could not load orders. Please sign in and try again.</p> : null}
      <Card className="border-zinc-200 bg-white">
        <CardHeader><CardTitle>Recent orders</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between rounded-2xl border border-zinc-200 p-4">
              <div><p className="font-medium text-zinc-950">Order {order.orderNumber}</p><p className="text-sm text-zinc-500">{order.createdAt}</p></div>
              <div className="text-right text-sm text-zinc-600"><p>{order.status}</p><p className="font-medium text-zinc-950">${order.total.toFixed(2)}</p></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
