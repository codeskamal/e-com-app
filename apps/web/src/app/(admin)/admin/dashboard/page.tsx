"use client";

import { PageTransition } from "@/components/shared/page-transition";

export default function AdminDashboard() {
  return (
    <PageTransition>
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">Platform overview and management.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-4">
        {[
          { label: "Total Users", value: "0" },
          { label: "Total Products", value: "0" },
          { label: "Total Orders", value: "0" },
          { label: "Revenue", value: "$0" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold text-brand-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
