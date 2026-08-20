"use client";

import { PageTransition } from "@/components/shared/page-transition";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Shop from the{" "}
            <span className="text-brand-1">best vendors</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Discover thousands of products from verified vendors.
            Fast shipping, secure payments, and outstanding support.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
            <Link href="/vendor/dashboard">
              <Button variant="outline" size="lg">
                Become a Vendor
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { title: "Fast Shipping", desc: "Free delivery on orders over $50" },
            { title: "Secure Payments", desc: "256-bit SSL encryption" },
            { title: "24/7 Support", desc: "Round-the-clock customer service" },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
