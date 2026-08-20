"use client";

import { PageTransition } from "@/components/shared/page-transition";

export default function AdminVendors() {
  return (
    <PageTransition>
      <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
      <p className="mt-2 text-gray-600">Manage vendor accounts and approvals.</p>
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">Vendor management coming soon.</p>
      </div>
    </PageTransition>
  );
}
