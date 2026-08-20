import { prisma } from "../../config/prisma.js";
import { NotFoundError } from "../../common/utils/errors.js";
import type { ListVendorsQuery } from "./vendor.schema.js";

export class VendorRepository {
  async findById(id: number) {
    return prisma.vendorProfile.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        _count: { select: { products: true } },
      },
    });
  }

  async findAll(query: ListVendorsQuery) {
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

  async create(userId: number, data: { shopName: string; description?: string; logo?: string }) {
    return prisma.vendorProfile.create({
      data: { userId, ...data },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async update(id: number, data: { shopName?: string; description?: string; logo?: string }) {
    await this.findOrFail(id);
    return prisma.vendorProfile.update({
      where: { id },
      data,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findOrFail(id: number) {
    const vendor = await this.findById(id);
    if (!vendor) throw new NotFoundError("Vendor", id);
    return vendor;
  }
}
