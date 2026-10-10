import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";

import { Hero } from "@/components/home/hero";
import { CategoryHighlights } from "@/components/home/category-highlights";
import { ProductHighlights } from "@/components/home/product-highlights";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="bg-white">
      <div className="border-b border-zinc-200 bg-zinc-100/60 px-4 py-3 text-center text-sm text-zinc-600 sm:px-6 lg:px-8">
        Free shipping on orders over $150 • New arrivals every Thursday
      </div>

      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Featured categories
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
              Shop by mood
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-zinc-950"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <CategoryHighlights />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Trending
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
              Most loved right now
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-zinc-950"
          >
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ProductHighlights featured />
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Curated drop
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              Design details that make everyday routines feel better.
            </h2>
            <p className="max-w-xl text-lg text-zinc-600">
              Thoughtful objects with premium finishes, smarter functionality,
              and a less cluttered sense of home.
            </p>
            <Button asChild size="lg">
              <Link href="/shop">Discover the collection</Link>
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-3 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
              alt="Editorial lifestyle view"
              width={900}
              height={1000}
              className="h-[420px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              New arrivals
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
              Freshly launched
            </h2>
          </div>
        </div>

        <ProductHighlights featured={false} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Truck,
              title: "Fast shipping",
              copy: "Free delivery on select orders and quick dispatch within 48 hours.",
            },
            {
              icon: ShieldCheck,
              title: "Secure checkout",
              copy: "Protected payments and transparent order information from checkout to delivery.",
            },
            {
              icon: Sparkles,
              title: "Premium quality",
              copy: "Designed for everyday use with thoughtful finishes and modern utility.",
            },
          ].map(({ icon: Icon, title, copy }) => (
            <Card key={title} className="border-zinc-200 bg-zinc-50">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-zinc-900 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-medium text-zinc-950">{title}</h3>
                <p className="text-sm leading-6 text-zinc-600">{copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-900 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
              Reviews
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Customers keep coming back for the details.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                name: "Alicia M.",
                quote:
                  "The design feels incredibly elevated and every product arrives in a premium package.",
                rating: 5,
              },
              {
                name: "Theo R.",
                quote:
                  "Everything from the cart to delivery feels polished. It genuinely feels like a premium brand.",
                rating: 5,
              },
            ].map((review) => (
              <Card
                key={review.name}
                className="border-zinc-700 bg-zinc-800 text-white"
              >
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm leading-6 text-zinc-200">
                    “{review.quote}”
                  </p>
                  <p className="text-sm font-medium text-zinc-100">
                    {review.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-zinc-200 bg-zinc-100 p-8 text-center shadow-sm sm:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Your NOVA account
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            Create an account to save your favorite products and manage orders.
          </h2>
          <Button asChild size="lg" className="mt-6">
            <Link href="/register">Create account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
