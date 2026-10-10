"use client";

import Image from "next/image";
import Link from "next/link";

import { useGetCategoriesQuery } from "@/services/categoryApi";

export function CategoryHighlights() {
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const categories = data?.data ?? [];

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p role="alert">Could not load categories from the store.</p>;
  if (categories.length === 0) return <p>No categories are available right now.</p>;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/shop?category=${category.slug}`}
          className="group overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50"
        >
          <div className="relative h-72 overflow-hidden">
            <Image
              src={category.image || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80"}
              alt={category.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className="space-y-2 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Collection</p>
            <h3 className="text-xl font-medium text-zinc-950">{category.name}</h3>
            {category.description ? <p className="text-sm text-zinc-600">{category.description}</p> : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
