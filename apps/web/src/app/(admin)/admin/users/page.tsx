"use client";

import { PageTransition } from "@/components/shared/page-transition";

export default function AdminUsers() {
  return (
    <PageTransition>
      <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      <p className="mt-2 text-gray-600">View and manage platform users.</p>
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">User management coming soon.</p>
      </div>
    </PageTransition>
  );
}
