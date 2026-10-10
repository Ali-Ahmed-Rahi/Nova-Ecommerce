import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@/lib/mock-data";

export default function AdminUsersPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          People
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Users</h1>
      </div>

      <Card className="border-zinc-200 bg-white">
        <CardHeader>
          <CardTitle>Customer roster</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-zinc-200 p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full bg-zinc-100">
                <Image
                  src={
                    currentUser.avatar ??
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
                  }
                  alt={currentUser.firstName}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-zinc-950">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="text-sm text-zinc-500">{currentUser.email}</p>
              </div>
            </div>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
              Admin
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
