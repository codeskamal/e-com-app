import type { IUser } from "@repo/types";

export default function Home() {
  const user: IUser = {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    role: "customer",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">E-Commerce Platform</h1>
      <p className="mt-4 text-gray-600">
        Welcome, {user.name} ({user.role})
      </p>
    </main>
  );
}
