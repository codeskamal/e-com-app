"use client";

import { PageTransition } from "@/components/shared/page-transition";

export default function CustomerProfile() {
  return (
    <PageTransition>
      <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
      <p className="mt-2 text-gray-600">Manage your account information.</p>
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-gray-500">Profile form coming soon.</p>
      </div>
    </PageTransition>
  );
}
