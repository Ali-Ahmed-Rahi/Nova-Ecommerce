"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/services/cartApi";
import { getApiErrorMessage } from "@/services/apiError";

export default function CartPage() {
  const { data, isLoading, isError } = useGetCartQuery();
  const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
  const [removeCartItem, { isLoading: isRemoving }] = useRemoveCartItemMutation();
  const [actionError, setActionError] = useState<string | null>(null);
  const cart = data?.data;

  const changeQuantity = async (id: string, quantity: number) => {
    setActionError(null);
    try {
      if (quantity < 1) {
        await removeCartItem(id).unwrap();
      } else {
        await updateCartItem({ id, quantity }).unwrap();
      }
    } catch (error) {
      setActionError(getApiErrorMessage(error, "Could not update your cart. Please try again."));
    }
  };

  const removeItem = async (id: string) => {
    setActionError(null);
    try {
      await removeCartItem(id).unwrap();
    } catch (error) {
      setActionError(getApiErrorMessage(error, "Could not remove this item. Please try again."));
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Your bag
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950 sm:text-4xl">
          Shopping cart
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {isLoading ? <p>Loading your cart...</p> : null}
          {isError ? (
            <p role="alert">Could not load your cart. Please try again.</p>
          ) : null}
          {actionError ? <p role="alert" className="text-sm text-red-600">{actionError}</p> : null}
          {cart && cart.items.length === 0 ? <p>Your cart is empty. Start shopping to add items.</p> : null}
          {cart?.items.map((item) => (
            <Card key={item.id} className="border-zinc-200 bg-white">
              <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-zinc-100">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    width={120}
                    height={120}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-medium text-zinc-900">
                        {item.productName}
                      </h2>
                      <p className="text-sm text-zinc-500">
                        Variant: {item.variant}
                      </p>
                    </div>
                    <button
                      className="text-zinc-500 hover:text-zinc-900"
                      aria-label={`Remove ${item.productName}`}
                      type="button"
                      disabled={isRemoving}
                      onClick={() => void removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center overflow-hidden rounded-full border border-zinc-200 bg-white">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.productName}`}
                        disabled={isUpdating || isRemoving}
                        onClick={() => void changeQuantity(item.id, item.quantity - 1)}
                        className="flex h-10 w-10 items-center justify-center text-zinc-700 disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-zinc-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.productName}`}
                        disabled={isUpdating || isRemoving || item.quantity >= 20}
                        onClick={() => void changeQuantity(item.id, item.quantity + 1)}
                        className="flex h-10 w-10 items-center justify-center text-zinc-700 disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-lg font-semibold text-zinc-900">
                      ${item.unitPrice * item.quantity}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit border-zinc-200 bg-white">
          <CardContent className="space-y-5 p-6">
            <h2 className="text-xl font-semibold text-zinc-950">
              Order summary
            </h2>
            <div className="space-y-3 text-sm text-zinc-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${cart?.subtotal ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>${cart?.shipping ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>${cart?.tax ?? 0}</span>
              </div>
            </div>
            <div className="border-t border-zinc-200 pt-4">
              <div className="flex items-center justify-between text-lg font-semibold text-zinc-950">
                <span>Total</span>
                <span>${cart?.total ?? 0}</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/checkout">Continue to checkout</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
