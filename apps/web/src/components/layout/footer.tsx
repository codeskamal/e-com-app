import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-brand-1">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=new" className="text-sm text-gray-600 hover:text-brand-1">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products?category=sale" className="text-sm text-gray-600 hover:text-brand-1">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/customer/dashboard" className="text-sm text-gray-600 hover:text-brand-1">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/customer/orders" className="text-sm text-gray-600 hover:text-brand-1">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/customer/profile" className="text-sm text-gray-600 hover:text-brand-1">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Vendors
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/vendor/dashboard" className="text-sm text-gray-600 hover:text-brand-1">
                  Vendor Portal
                </Link>
              </li>
              <li>
                <Link href="/vendor/products" className="text-sm text-gray-600 hover:text-brand-1">
                  My Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-gray-600">About Us</span>
              </li>
              <li>
                <span className="text-sm text-gray-600">Contact</span>
              </li>
              <li>
                <span className="text-sm text-gray-600">Privacy Policy</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} E-Com App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
