import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium tracking-[0.18em] text-zinc-600 uppercase">
            New season arrivals
          </div>

          <div className="space-y-5">
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
              Elevated essentials for the way you live.
            </h1>
            <p className="max-w-lg text-lg text-zinc-600">
              Premium objects for focused work, better rest, and everyday
              rituals—curated to look beautiful and perform beautifully.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/shop">Shop collection</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/dashboard">Explore account</Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-8 pt-6 text-sm text-zinc-600">
            <div>
              <p className="text-2xl font-semibold text-zinc-950">4.9/5</p>
              <p>Customer rating</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-zinc-950">12k+</p>
              <p>Happy shoppers</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-zinc-950">48h</p>
              <p>Dispatch promise</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-zinc-200 blur-3xl" />
          <div className="absolute -right-5 bottom-10 h-36 w-36 rounded-full bg-amber-200/70 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-4 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80"
              alt="Premium lifestyle storefront"
              width={900}
              height={1200}
              className="h-[560px] w-full rounded-[1.5rem] object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
