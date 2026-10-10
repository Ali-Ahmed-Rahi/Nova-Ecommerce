"use client";

import { useParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { useGetOrderQuery } from "@/services/orderApi";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetOrderQuery(id);
  const order = data?.data;

  if (isLoading) return <div className="mx-auto max-w-5xl px-4 py-12">Loading order...</div>;
  if (isError || !order) return <div role="alert" className="mx-auto max-w-5xl px-4 py-12">Could not load this order.</div>;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Order details</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Order {order.orderNumber}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-zinc-200 bg-white">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between gap-4 text-sm text-zinc-600"><span>Placed</span><span>{order.createdAt}</span></div>
            <div className="flex items-center justify-between gap-4 text-sm text-zinc-600"><span>Status</span><span className="font-medium text-zinc-900">{order.status}</span></div>
            <div className="flex items-center justify-between gap-4 text-sm text-zinc-600"><span>Payment</span><span className="font-medium text-zinc-900">{order.paymentStatus}</span></div>
            <div className="space-y-3 pt-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-zinc-200 p-4">
                  <div><p className="font-medium text-zinc-950">{item.productName}</p><p className="text-sm text-zinc-500">Qty {item.quantity}</p></div>
                  <p className="font-medium text-zinc-950">${(item.unitPrice * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 bg-white">
          <CardContent className="space-y-5 p-6">
            <h2 className="text-xl font-semibold text-zinc-950">Total</h2>
            <div className="space-y-3 text-sm text-zinc-600">
              <div className="flex justify-between"><span>Subtotal</span><span>${(order.subtotal ?? 0).toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${(order.shipping ?? 0).toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${(order.tax ?? 0).toFixed(2)}</span></div>
            </div>
            <div className="border-t border-zinc-200 pt-4 text-lg font-semibold text-zinc-950">
              <div className="flex justify-between"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
