"use client";

import { PageTransition } from "@/components/shared/page-transition";

export default function ProductsPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="mt-2 text-gray-600">
          Browse our collection of products from verified vendors.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="h-48 rounded-lg bg-gray-200" />
              <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
