"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetOrdersQuery } from "@/services/orderApi";

export default function OrdersPage() {
  const { data, isLoading, isError } = useGetOrdersQuery();
  const orders = data?.data ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Account</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950 sm:text-4xl">Orders</h1>
        </div>
        <Button variant="outline" asChild><Link href="/shop">Shop again</Link></Button>
      </div>

      {isLoading ? <p>Loading your orders...</p> : null}
      {isError ? <p role="alert">Could not load your orders. Please sign in and try again.</p> : null}
      {!isLoading && !isError && orders.length === 0 ? <p>You have not placed any orders yet.</p> : null}
      <div className="space-y-5">
        {orders.map((order) => (
          <Card key={order.id} className="border-zinc-200 bg-white">
            <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">Order {order.orderNumber}</p>
                <p className="mt-2 text-lg font-medium text-zinc-950">{order.createdAt}</p>
              </div>
              <div className="flex items-center gap-8 text-sm text-zinc-600">
                <div><p className="text-zinc-400">Status</p><p className="font-medium text-zinc-800">{order.status}</p></div>
                <div><p className="text-zinc-400">Total</p><p className="font-medium text-zinc-800">${order.total.toFixed(2)}</p></div>
              </div>
              <Button asChild variant="outline"><Link href={`/orders/${order.id}`}>View details</Link></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
