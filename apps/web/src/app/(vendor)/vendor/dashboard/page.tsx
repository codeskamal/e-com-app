"use client";

import { PageTransition } from "@/components/shared/page-transition";

export default function VendorDashboard() {
  return (
    <PageTransition>
      <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
      <p className="mt-2 text-gray-600">Manage your store and track performance.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { label: "My Products", value: "0" },
          { label: "Total Sales", value: "$0" },
          { label: "Pending Orders", value: "0" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold text-brand-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
