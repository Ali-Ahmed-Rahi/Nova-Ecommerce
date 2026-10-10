"use client";

import { ProductCard } from "@/components/product/product-card";
import { useGetProductsQuery } from "@/services/productApi";

export function ProductHighlights({ featured }: { featured: boolean }) {
  const { data, isLoading, isError } = useGetProductsQuery({ limit: 20, status: "ACTIVE" });
  const products = data?.data ?? [];
  const featuredProducts = products.filter((product) => product.isFeatured);
  const results = featured
    ? featuredProducts.slice(0, 4)
    : products.filter((product) => !product.isFeatured).slice(0, 4);

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p role="alert">Could not load products from the store.</p>;
  if (results.length === 0) return <p>No products are available right now.</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {results.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
