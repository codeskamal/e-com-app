"use client";

import { PageTransition } from "@/components/shared/page-transition";

export default function CartPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="mt-2 text-gray-600">
          Your cart is empty. Start shopping to add items.
        </p>
      </div>
    </PageTransition>
  );
}
