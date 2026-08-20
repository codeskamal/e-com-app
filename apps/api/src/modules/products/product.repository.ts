import { prisma } from "../../config/prisma.js";
import { NotFoundError } from "../../common/utils/errors.js";
import type { CreateProductInput, UpdateProductInput, ListProductsQuery } from "./product.schema.js";

export async function findById(id: number) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      vendor: { select: { id: true, shopName: true } },
      category: { select: { id: true, name: true, slug: true } },
      _count: { select: { reviews: true } },
    },
  });
}

export async function findAll(query: ListProductsQuery) {
  const { page, limit, categoryId, vendorId, search } = query;
  const skip = (page - 1) * limit;

  const where = {
    isActive: true,
    ...(categoryId && { categoryId }),
    ...(vendorId && { vendorId }),
    ...(search && {
      title: { contains: search },
    }),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      include: {
        vendor: { select: { id: true, shopName: true } },
        category: { select: { id: true, name: true, slug: true } },
        _count: { select: { reviews: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function create(data: CreateProductInput) {
  return prisma.product.create({
    data,
    include: {
      vendor: { select: { id: true, shopName: true } },
      category: { select: { id: true, name: true, slug: true } },
    },
  });
}

export async function update(id: number, data: UpdateProductInput) {
  await findOrFail(id);
  return prisma.product.update({
    where: { id },
    data,
    include: {
      vendor: { select: { id: true, shopName: true } },
      category: { select: { id: true, name: true, slug: true } },
    },
  });
}

export async function findOrFail(id: number) {
  const product = await findById(id);
  if (!product) throw new NotFoundError("Product", id);
  return product;
}

export async function remove(id: number) {
  await findOrFail(id);
  return prisma.product.delete({ where: { id } });
}
