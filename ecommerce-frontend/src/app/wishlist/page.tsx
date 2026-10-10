"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAddToCartMutation } from "@/services/cartApi";
import { getApiErrorMessage } from "@/services/apiError";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/services/wishlistApi";

export default function WishlistPage() {
  const { data, isLoading, isError } = useGetWishlistQuery();
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [error, setError] = useState<string | null>(null);
  const items = data?.data ?? [];

  const removeItem = async (productId: string) => {
    setError(null);
    try {
      await removeFromWishlist(productId).unwrap();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not remove this item from your wishlist."));
    }
  };

  const moveToCart = async (productId: string) => {
    setError(null);
    try {
      await addToCart({ productId, quantity: 1 }).unwrap();
      await removeFromWishlist(productId).unwrap();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not move this item to your cart."));
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Saved picks
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950 sm:text-4xl">
            Your wishlist
          </h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>

      {isLoading ? <p>Loading your wishlist...</p> : null}
      {isError ? <p role="alert">Could not load your wishlist. Please sign in and try again.</p> : null}
      {error ? <p role="alert" className="mb-4 text-sm text-red-600">{error}</p> : null}
      {!isLoading && !isError && items.length === 0 ? <p>Your wishlist is empty.</p> : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden border-zinc-200 bg-white">
            <div className="relative h-64 overflow-hidden bg-zinc-100">
              <Image
                src={item.image || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80"}
                alt={item.productName}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-medium text-zinc-950">{item.productName}</h2>
                <button
                  type="button"
                  aria-label={`Remove ${item.productName}`}
                  disabled={isRemoving}
                  onClick={() => void removeItem(item.productId)}
                  className="text-zinc-500 hover:text-zinc-900 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xl font-semibold text-zinc-900">${item.price}</p>
              <Button
                type="button"
                className="w-full gap-2"
                disabled={isAdding || isRemoving}
                onClick={() => void moveToCart(item.productId)}
              >
                <ShoppingBag className="h-4 w-4" />
                {isAdding ? "Moving..." : "Move to cart"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
