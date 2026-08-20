import type { Metadata } from "next";
import { Navbar } from "@/components/layout";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Customer Portal - E-Com App",
};

const customerLinks = [
  { href: "/customer/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/customer/orders", label: "My Orders", icon: "📦" },
  { href: "/customer/profile", label: "Profile", icon: "👤" },
  { href: "/cart", label: "Cart", icon: "🛒" },
];

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar links={customerLinks} portalLabel="Customer" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
