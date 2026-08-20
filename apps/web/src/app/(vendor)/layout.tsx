import type { Metadata } from "next";
import { Navbar } from "@/components/layout";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Vendor Portal - E-Com App",
};

const vendorLinks = [
  { href: "/vendor/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/vendor/products", label: "My Products", icon: "📦" },
  { href: "/vendor/orders", label: "Orders", icon: "🧾" },
];

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar links={vendorLinks} portalLabel="Vendor" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
