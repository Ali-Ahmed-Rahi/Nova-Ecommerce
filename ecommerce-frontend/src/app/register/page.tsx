"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/services/authApi";
import { getApiErrorMessage } from "@/services/apiError";

export default function RegisterPage() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    try {
      await register({
        name: `${String(formData.get("firstName")).trim()} ${String(formData.get("lastName")).trim()}`.trim(),
        email: String(formData.get("email")),
        password: String(formData.get("password")),
      }).unwrap();
      router.push("/login");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to create your account. Please try again."));
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg border-zinc-200 bg-white shadow-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Create account</CardTitle>
          <p className="text-sm text-zinc-600">
            Start building a premium shopping profile.
          </p>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="firstName"
            >
              First name
            </label>
            <Input id="firstName" name="firstName" autoComplete="given-name" required placeholder="Mila" />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="lastName"
            >
              Last name
            </label>
            <Input id="lastName" name="lastName" autoComplete="family-name" required placeholder="Brooks" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="email"
            >
              Email
            </label>
            <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              placeholder="Create a password"
            />
          </div>
          <div className="md:col-span-2 space-y-3">
            {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </div>
          <div className="md:col-span-2 text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-zinc-950">
              Sign in
            </Link>
          </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
