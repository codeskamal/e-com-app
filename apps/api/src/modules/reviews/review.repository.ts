import { prisma } from "../../config/prisma.js";
import { NotFoundError } from "../../common/utils/errors.js";
import type { ListReviewsQuery } from "./review.schema.js";

export async function findById(id: number) {
  return prisma.review.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      product: { select: { id: true, title: true } },
    },
  });
}

export async function findAll(query: ListReviewsQuery) {
  const { page, limit, productId } = query;
  const skip = (page - 1) * limit;

  const where = {
    ...(productId && { productId }),
  };

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: { select: { id: true, name: true } },
        product: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.review.count({ where }),
  ]);

  return { reviews, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function create(userId: number, data: { productId: number; rating: number; comment?: string }) {
  return prisma.review.create({
    data: { userId, ...data },
    include: {
      user: { select: { id: true, name: true } },
      product: { select: { id: true, title: true } },
    },
  });
}

export async function update(id: number, data: { rating?: number; comment?: string }) {
  await findOrFail(id);
  return prisma.review.update({
    where: { id },
    data,
    include: {
      user: { select: { id: true, name: true } },
      product: { select: { id: true, title: true } },
    },
  });
}

export async function findOrFail(id: number) {
  const review = await findById(id);
  if (!review) throw new NotFoundError("Review", id);
  return review;
}

export async function remove(id: number) {
  await findOrFail(id);
  return prisma.review.delete({ where: { id } });
}
