"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop?category=audio" },
  { label: "New Arrivals", href: "/shop?sort=new" },
  { label: "Journal", href: "/dashboard" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu className="h-4 w-4" />
          </button>
          <Link
            href="/"
            className="text-xl font-semibold tracking-[0.2em] text-zinc-900"
          >
            NOVA
          </Link>
        </div>

        <nav className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-4 border-b border-zinc-200 bg-white p-4 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form action="/shop" method="get" className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input name="search" placeholder="Search products" className="pl-11 pr-4" />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Wishlist" asChild>
            <Link href="/wishlist">
              <Heart className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account" asChild>
            <Link href="/login">
              <User className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="default" size="icon" aria-label="Cart" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
