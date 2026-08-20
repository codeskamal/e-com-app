import type { Metadata } from "next";
import { Navbar } from "@/components/layout";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Admin Portal - E-Com App",
};

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/products", label: "Products", icon: "📦" },
  { href: "/admin/vendors", label: "Vendors", icon: "🏪" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar links={adminLinks} portalLabel="Admin" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
