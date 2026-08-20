import { prisma } from "../../config/prisma.js";
import { NotFoundError } from "../../common/utils/errors.js";
import type { ListReviewsQuery } from "./review.schema.js";

export class ReviewRepository {
  async findById(id: number) {
    return prisma.review.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true } },
        product: { select: { id: true, title: true } },
      },
    });
  }

  async findAll(query: ListReviewsQuery) {
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

  async create(userId: number, data: { productId: number; rating: number; comment?: string }) {
    return prisma.review.create({
      data: { userId, ...data },
      include: {
        user: { select: { id: true, name: true } },
        product: { select: { id: true, title: true } },
      },
    });
  }

  async update(id: number, data: { rating?: number; comment?: string }) {
    await this.findOrFail(id);
    return prisma.review.update({
      where: { id },
      data,
      include: {
        user: { select: { id: true, name: true } },
        product: { select: { id: true, title: true } },
      },
    });
  }

  async findOrFail(id: number) {
    const review = await this.findById(id);
    if (!review) throw new NotFoundError("Review", id);
    return review;
  }

  async delete(id: number) {
    await this.findOrFail(id);
    return prisma.review.delete({ where: { id } });
  }
}
