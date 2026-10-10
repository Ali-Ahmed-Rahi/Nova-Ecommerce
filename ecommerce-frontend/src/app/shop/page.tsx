"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowDownUp, SlidersHorizontal } from "lucide-react";

import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import { useGetProductsQuery } from "@/services/productApi";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { data: categoryResponse } = useGetCategoriesQuery();
  const categories = categoryResponse?.data ?? [];
  const sort = searchParams.get("sort") === "new" ? "newest" : searchParams.get("sort");
  const { data, isLoading, isError } = useGetProductsQuery({
    limit: 50,
    status: "ACTIVE",
    category: searchParams.get("category") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort: sort === "price_asc" || sort === "price_desc" || sort === "rating" ? sort : "newest",
  });
  const products = data?.data ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-6 rounded-4xl border border-zinc-200 bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Curated collection
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-950 sm:text-4xl">
              Shop every essential
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            aria-expanded={showFilters}
            onClick={() => setShowFilters((visible) => !visible)}
          >
            <SlidersHorizontal className="h-4 w-4" /> {showFilters ? "Hide filters" : "Filters"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="rounded-full border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:border-zinc-300 hover:text-zinc-950"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div className={`grid gap-8 ${showFilters ? "lg:grid-cols-[260px_1fr]" : ""}`}>
        {showFilters ? (
          <aside className="rounded-3xl border border-zinc-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-zinc-950">Filters</h2>
            <div className="mt-6 space-y-6 text-sm text-zinc-600">
              <div>
                <label className="mb-2 block font-medium text-zinc-800" htmlFor="min-price">Minimum price</label>
                <input id="min-price" type="number" min="0" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} className="h-10 w-full rounded-full border border-zinc-200 px-3" placeholder="Min" />
              </div>
              <div>
                <label className="mb-2 block font-medium text-zinc-800" htmlFor="max-price">Maximum price</label>
                <input id="max-price" type="number" min="0" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} className="h-10 w-full rounded-full border border-zinc-200 px-3" placeholder="Max" />
              </div>
            </div>
          </aside>
        ) : null}

        <div>
          <div className="mb-5 flex flex-col justify-between gap-3 rounded-3xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center">
            <p className="text-sm text-zinc-600">
              {isLoading ? "Loading products..." : `Showing ${products.length} products`}
            </p>
            <label className="flex items-center gap-2 text-sm text-zinc-600">
              <ArrowDownUp className="h-4 w-4" />
              <span>Sort</span>
              <select
                value={sort === "price_asc" || sort === "price_desc" ? sort : "newest"}
                onChange={(event) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("sort", event.target.value);
                  router.push(`/shop?${params.toString()}`);
                }}
                className="rounded-full border border-zinc-200 bg-white px-3 py-2"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: low to high</option>
                <option value="price_desc">Price: high to low</option>
              </select>
            </label>
          </div>

          {isError ? <p role="alert" className="mb-4 text-sm text-red-600">Could not load products. Check that the backend is running and try again.</p> : null}
          {!isLoading && !isError && products.length === 0 ? <p>No products found for these filters.</p> : null}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
