import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="text-xl font-semibold tracking-[0.2em] text-zinc-900">
            NOVA
          </div>
          <p className="mt-4 max-w-sm text-sm text-zinc-600">
            Premium essentials for work, home, and everyday living—crafted for
            modern routines.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Shop
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li>
              <Link href="/shop">All products</Link>
            </li>
            <li>
              <Link href="/shop?category=audio">Audio</Link>
            </li>
            <li>
              <Link href="/shop?category=wearables">Wearables</Link>
            </li>
            <li>
              <Link href="/shop?category=home">Home</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Company
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li>
              <Link href="/dashboard">Account</Link>
            </li>
            <li>
              <Link href="/orders">Orders</Link>
            </li>
            <li>
              <Link href="/checkout">Checkout</Link>
            </li>
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Support
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/delivery">Shipping</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 text-sm text-zinc-500 sm:px-6 lg:px-8">
          <p>© 2026 NOVA Studio</p>
          <p>Powered by a separate backend API</p>
        </div>
      </div>
    </footer>
  );
}
