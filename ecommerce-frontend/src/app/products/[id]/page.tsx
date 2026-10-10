"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockReviews } from "@/lib/mock-data";
import { useAddToCartMutation } from "@/services/cartApi";
import { getApiErrorMessage } from "@/services/apiError";
import { useGetProductQuery, useGetProductsQuery } from "@/services/productApi";
import { useAddToWishlistMutation } from "@/services/wishlistApi";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetProductQuery(id);
  const product = data?.data;
  const { data: relatedData } = useGetProductsQuery({
    limit: 10,
    status: "ACTIVE",
    category: product?.categorySlug,
  });
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [addToWishlist, { isLoading: isAddingToWishlist }] = useAddToWishlistMutation();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const relatedProducts = relatedData?.data
    .filter((entry) => entry.id !== product?.id)
    .slice(0, 3) ?? [];

  if (isLoading) return <div className="mx-auto max-w-7xl px-4 py-12">Loading product...</div>;
  if (isError || !product) return <div role="alert" className="mx-auto max-w-7xl px-4 py-12">Could not load this product.</div>;

  const selectedVariant = product.variants.find((variant) => variant.id === selectedVariantId) ?? product.variants[0];

  const handleAddToCart = async () => {
    setFeedback(null);
    setError(null);
    try {
      await addToCart({
        productId: product.id,
        quantity,
        variant: selectedVariant?.id,
      }).unwrap();
      setFeedback("Added to cart.");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not add this item to your cart."));
    }
  };

  const handleAddToWishlist = async () => {
    setFeedback(null);
    setError(null);
    try {
      await addToWishlist(product.id).unwrap();
      setFeedback("Added to wishlist.");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not add this item to your wishlist."));
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[80px_1fr]">
            <div className="space-y-3">
              {product.images.map((image) => (
                <div
                  key={image}
                  className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
                >
                  <Image
                    src={image}
                    alt={product.name}
                    width={120}
                    height={140}
                    className="h-20 w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-2">
              <Image
                src={product.images[0] || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80"}
                alt={product.name}
                width={900}
                height={1000}
                className="h-[580px] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="space-y-7">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              {product.brand}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 text-sm text-zinc-600">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-medium text-zinc-700">
                  {product.rating}
                </span>
              </div>
              <span>({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-end gap-3">
            <p className="text-4xl font-semibold text-zinc-950">
              ${product.price}
            </p>
            {product.comparePrice ? (
              <p className="text-xl text-zinc-400 line-through">
                ${product.comparePrice}
              </p>
            ) : null}
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm text-zinc-600">{product.shortDescription}</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-zinc-800">
                Select variant
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    aria-pressed={selectedVariant?.id === variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`rounded-full border px-4 py-2 text-sm hover:border-zinc-400 ${selectedVariant?.id === variant.id ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-300 bg-white text-zinc-700"}`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center overflow-hidden rounded-full border border-zinc-300 bg-white">
                <button
                  aria-label="Decrease quantity"
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="flex h-11 w-11 items-center justify-center text-zinc-700 hover:bg-zinc-100 disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium text-zinc-800">
                  {quantity}
                </span>
                <button
                  aria-label="Increase quantity"
                  type="button"
                  disabled={quantity >= Math.min(20, selectedVariant?.stock ?? product.stock)}
                  onClick={() => setQuantity((current) => Math.min(20, selectedVariant?.stock ?? product.stock, current + 1))}
                  className="flex h-11 w-11 items-center justify-center text-zinc-700 hover:bg-zinc-100 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-zinc-600">{product.stock} in stock</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2 flex-1" type="button" disabled={isAddingToCart} onClick={() => void handleAddToCart()}>
                <ShoppingBag className="h-4 w-4" /> Add to cart
              </Button>
              <Button variant="outline" size="lg" className="gap-2" type="button" disabled={isAddingToWishlist} onClick={() => void handleAddToWishlist()}>
                <Heart className="h-4 w-4" /> Wishlist
              </Button>
            </div>
            {feedback ? <p role="status" className="text-sm text-green-700">{feedback}</p> : null}
            {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
          </div>

          <div className="grid gap-3 border-t border-zinc-200 pt-6 sm:grid-cols-3">
            <div className="flex items-center gap-3 text-sm text-zinc-600">
              <Truck className="h-5 w-5 text-zinc-700" />
              Free shipping
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-600">
              <ShieldCheck className="h-5 w-5 text-zinc-700" />
              Secure checkout
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-600">
              <Star className="h-5 w-5 text-zinc-700" />
              30-day returns
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-zinc-200 bg-white">
          <CardContent className="space-y-5 p-6">
            <h2 className="text-2xl font-semibold text-zinc-950">
              Description
            </h2>
            <p className="leading-7 text-zinc-600">{product.description}</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 bg-white">
          <CardContent className="space-y-5 p-6">
            <h2 className="text-2xl font-semibold text-zinc-950">
              Specifications
            </h2>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li>
                <span className="font-medium text-zinc-800">SKU:</span>{" "}
                {product.sku}
              </li>
              <li>
                <span className="font-medium text-zinc-800">Category:</span>{" "}
                {product.category}
              </li>
              <li>
                <span className="font-medium text-zinc-800">Brand:</span>{" "}
                {product.brand}
              </li>
              <li>
                <span className="font-medium text-zinc-800">Tags:</span>{" "}
                {product.tags.join(", ")}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold text-zinc-950">
            Customer reviews
          </h2>
          <Link
            href="/shop"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-950"
          >
            View more
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {mockReviews.map((review) => (
            <Card key={review.id} className="border-zinc-200 bg-white">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-zinc-900">{review.user}</p>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-medium text-zinc-900">
                  {review.title}
                </h3>
                <p className="text-sm leading-6 text-zinc-600">
                  {review.comment}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                  {review.createdAt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5 pb-6">
        <h2 className="text-3xl font-semibold text-zinc-950">
          Related products
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((entry) => (
            <ProductCard key={entry.id} product={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
