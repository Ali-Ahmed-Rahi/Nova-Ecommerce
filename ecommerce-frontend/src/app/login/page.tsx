"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/services/authApi";
import { getApiErrorMessage } from "@/services/apiError";

export default function LoginPage() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    try {
      await login({
        email: String(formData.get("email")),
        password: String(formData.get("password")),
      }).unwrap();
      router.push("/dashboard");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to sign in. Please try again."));
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-zinc-200 bg-white shadow-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <p className="text-sm text-zinc-600">
            Sign in to continue shopping and manage your account.
          </p>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="email"
            >
              Email
            </label>
            <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="password"
            >
              Password
            </label>
            <Input id="password" name="password" type="password" autoComplete="current-password" minLength={8} required placeholder="••••••••" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <Link
              href="/forgot-password"
              className="text-zinc-600 hover:text-zinc-950"
            >
              Forgot password?
            </Link>
            <Link
              href="/register"
              className="text-zinc-600 hover:text-zinc-950"
            >
              Create an account
            </Link>
          </div>
          {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
