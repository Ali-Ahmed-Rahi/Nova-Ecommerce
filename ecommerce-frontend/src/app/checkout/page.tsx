"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetCartQuery } from "@/services/cartApi";
import { getApiErrorMessage } from "@/services/apiError";
import { useCreateOrderMutation } from "@/services/orderApi";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cartResponse, isLoading: isCartLoading, isError: isCartError } = useGetCartQuery();
  const [createOrder, { isLoading: isSubmitting }] = useCreateOrderMutation();
  const [error, setError] = useState<string | null>(null);
  const cart = cartResponse?.data;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const shippingAddress = [
      formData.get("address"),
      formData.get("city"),
      formData.get("postalCode"),
    ].map((value) => String(value).trim()).filter(Boolean).join(", ");
    const couponCode = String(formData.get("couponCode")).trim();

    try {
      await createOrder({
        shippingAddress,
        ...(couponCode ? { couponCode } : {}),
      }).unwrap();
      router.push("/orders");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not place your order. Please try again."));
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Secure checkout</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950 sm:text-4xl">Complete your order</h1>
      </div>

      {isCartLoading ? <p>Loading your order...</p> : null}
      {isCartError ? <p role="alert" className="mb-5 text-red-600">Could not load your cart. Please try again.</p> : null}
      {cart && cart.items.length === 0 ? <p className="mb-5">Your cart is empty. Add products before checking out.</p> : null}

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-zinc-200 bg-white">
          <CardContent className="space-y-6 p-6">
            <div>
              <h2 className="text-xl font-semibold text-zinc-950">Shipping details</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Input name="firstName" autoComplete="given-name" required placeholder="First name" />
                <Input name="lastName" autoComplete="family-name" required placeholder="Last name" />
                <Input name="address" autoComplete="street-address" required className="md:col-span-2" placeholder="Address" />
                <Input name="city" autoComplete="address-level2" required placeholder="City" />
                <Input name="postalCode" autoComplete="postal-code" required placeholder="Postal code" />
                <Input name="couponCode" className="md:col-span-2" placeholder="Coupon code (optional)" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit border-zinc-200 bg-white">
          <CardContent className="space-y-5 p-6">
            <h2 className="text-xl font-semibold text-zinc-950">Summary</h2>
            <div className="space-y-3 text-sm text-zinc-600">
              {cart?.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <span>{item.productName} × {item.quantity}</span>
                  <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 border-t border-zinc-200 pt-4 text-sm text-zinc-600">
              <div className="flex items-center justify-between"><span>Subtotal</span><span>${(cart?.subtotal ?? 0).toFixed(2)}</span></div>
              <div className="flex items-center justify-between"><span>Shipping</span><span>${(cart?.shipping ?? 0).toFixed(2)}</span></div>
              <div className="flex items-center justify-between"><span>Tax</span><span>${(cart?.tax ?? 0).toFixed(2)}</span></div>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-200 pt-4 text-lg font-semibold text-zinc-950">
              <span>Total</span><span>${(cart?.total ?? 0).toFixed(2)}</span>
            </div>
            {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
            <Button className="w-full" type="submit" disabled={isSubmitting || isCartLoading || isCartError || !cart?.items.length}>
              {isSubmitting ? "Placing order..." : "Place order"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
