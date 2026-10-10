import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Revenue", value: "$128.4K", change: "+12.4%" },
    { label: "Orders", value: "642", change: "+8.1%" },
    { label: "Customers", value: "4,102", change: "+15.9%" },
    { label: "Conversion", value: "5.4%", change: "+1.2%" },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-zinc-200 bg-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{stat.label}</p>
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="mt-4 text-3xl font-semibold text-zinc-950">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-emerald-600">
                {stat.change} vs last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-zinc-200 bg-white">
          <CardHeader>
            <CardTitle>Sales overview</CardTitle>
          </CardHeader>
          <CardContent className="h-64 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 p-5" />
        </Card>

        <Card className="border-zinc-200 bg-white">
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Audio", value: "86%" },
              { name: "Wearables", value: "73%" },
              { name: "Home", value: "92%" },
            ].map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between text-sm text-zinc-600">
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-100">
                  <div
                    className="h-full rounded-full bg-zinc-900"
                    style={{ width: item.value }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
