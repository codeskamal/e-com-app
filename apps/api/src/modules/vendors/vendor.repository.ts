import { prisma } from "../../config/prisma.js";
import { NotFoundError } from "../../common/utils/errors.js";
import type { ListVendorsQuery } from "./vendor.schema.js";

export async function findById(id: number) {
  return prisma.vendorProfile.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      _count: { select: { products: true } },
    },
  });
}

export async function findAll(query: ListVendorsQuery) {
  const { page, limit } = query;
  const skip = (page - 1) * limit;

  const [vendors, total] = await Promise.all([
    prisma.vendorProfile.findMany({
      skip,
      take: limit,
      include: {
        user: { select: { id: true, name: true } },
        _count: { select: { products: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.vendorProfile.count(),
  ]);

  return { vendors, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function create(userId: number, data: { shopName: string; description?: string; logo?: string }) {
  return prisma.vendorProfile.create({
    data: { userId, ...data },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });
}

export async function update(id: number, data: { shopName?: string; description?: string; logo?: string }) {
  await findOrFail(id);
  return prisma.vendorProfile.update({
    where: { id },
    data,
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });
}

export async function findOrFail(id: number) {
  const vendor = await findById(id);
  if (!vendor) throw new NotFoundError("Vendor", id);
  return vendor;
}
