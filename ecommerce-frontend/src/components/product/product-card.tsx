"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAddToCartMutation } from "@/services/cartApi";
import { getApiErrorMessage } from "@/services/apiError";
import { useAddToWishlistMutation } from "@/services/wishlistApi";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const [addToWishlist, { isLoading: isSaving }] = useAddToWishlistMutation();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAddToCart = async () => {
    setFeedback(null);

    try {
      await addToCart({ productId: product.id }).unwrap();
      setFeedback("Added to cart");
    } catch (error) {
      setFeedback(getApiErrorMessage(error, "Could not add item. Please try again."));
    }
  };

  const handleAddToWishlist = async () => {
    setFeedback(null);
    try {
      await addToWishlist(product.id).unwrap();
      setFeedback("Added to wishlist");
    } catch (error) {
      setFeedback(getApiErrorMessage(error, "Could not add item to wishlist."));
    }
  };

  return (
    <Card className="group overflow-hidden border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0] || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-3 top-3 flex gap-2">
          {product.isNew ? <Badge variant="secondary">New</Badge> : null}
          {product.isBestSeller ? (
            <Badge variant="default">Best seller</Badge>
          ) : null}
        </div>
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-3 top-3 rounded-full bg-white/90 shadow-sm hover:bg-white"
          aria-label={`Add ${product.name} to wishlist`}
          type="button"
          disabled={isSaving}
          onClick={() => void handleAddToWishlist()}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            {product.brand}
          </p>
          <div className="flex items-center gap-1 text-sm text-zinc-600">
            <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
            {product.rating}
          </div>
        </div>

        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-medium text-zinc-900">{product.name}</h3>
        </Link>

        <p className="line-clamp-2 text-sm text-zinc-600">
          {product.shortDescription}
        </p>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xl font-semibold text-zinc-950">
              ${product.price}
            </p>
            {product.comparePrice ? (
              <p className="text-sm text-zinc-400 line-through">
                ${product.comparePrice}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            <ShoppingBag className="h-4 w-4" />
            {isLoading ? "Adding..." : "Add"}
          </Button>
        </div>
        {feedback ? (
          <p role="status" className="text-sm text-zinc-600">
            {feedback}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
