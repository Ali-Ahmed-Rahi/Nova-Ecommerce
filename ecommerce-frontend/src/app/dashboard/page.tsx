import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser, mockOrders, mockWishlist } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Your account
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">
            Hello, {currentUser.firstName}
          </h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/wishlist">Open wishlist</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Orders", value: "08" },
          { label: "Saved items", value: String(mockWishlist.length) },
          { label: "Addresses", value: "02" },
          { label: "Rewards", value: "1,240 pts" },
        ].map((item) => (
          <Card key={item.label} className="border-zinc-200 bg-white">
            <CardContent className="p-5">
              <p className="text-sm text-zinc-500">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold text-zinc-950">
                {item.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-zinc-200 bg-white">
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-2xl border border-zinc-200 p-4"
              >
                <div>
                  <p className="font-medium text-zinc-950">
                    {order.orderNumber}
                  </p>
                  <p className="text-sm text-zinc-500">{order.createdAt}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-zinc-950">${order.total}</p>
                  <p className="text-sm text-zinc-500">{order.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-200 bg-white">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-zinc-100">
                <Image
                  src={
                    currentUser.avatar ??
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
                  }
                  alt={currentUser.firstName}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-zinc-950">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="text-sm text-zinc-500">{currentUser.email}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-4 text-sm text-zinc-600">
              Membership level: Premium • Free shipping available
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
