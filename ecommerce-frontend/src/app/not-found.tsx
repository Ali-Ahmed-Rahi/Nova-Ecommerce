import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-sm font-medium tracking-[0.2em] text-zinc-500 uppercase">
        Page not found
      </p>
      <h1 className="text-4xl font-semibold text-zinc-950">
        The item you are looking for is gone.
      </h1>
      <p className="text-lg text-zinc-600">
        It may have moved, been removed, or never existed in the first place.
      </p>
      <Button asChild>
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
