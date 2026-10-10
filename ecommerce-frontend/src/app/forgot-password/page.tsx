"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForgotPasswordMutation } from "@/services/authApi";
import { getApiErrorMessage } from "@/services/apiError";

export default function ForgotPasswordPage() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);
    const formData = new FormData(event.currentTarget);

    try {
      const result = await forgotPassword({ email: String(formData.get("email")) }).unwrap();
      setMessage(result.message);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to send the reset request. Please try again."));
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full border-zinc-200 bg-white shadow-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <p className="text-sm text-zinc-600">
            Enter the email linked to your account and we’ll send a recovery
            link.
          </p>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-700"
            >
              Email
            </label>
            <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          </div>
          {message ? <p role="status" className="text-sm text-green-700">{message}</p> : null}
          {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send reset link"}
          </Button>
          </form>
          <div className="text-center text-sm text-zinc-600">
            Back to{" "}
            <Link href="/login" className="font-medium text-zinc-950">
              login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
