import { prisma } from "../../config/prisma.js";
import { NotFoundError } from "../../common/utils/errors.js";
import type { ListOrdersQuery } from "./order.schema.js";

export class OrderRepository {
  async findById(id: number) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: {
          include: {
            product: { select: { id: true, title: true, price: true } },
          },
        },
      },
    });
  }

  async findAll(query: ListOrdersQuery) {
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status }),
    };

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: { select: { id: true, name: true } },
          items: { select: { id: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.order.count({ where }),
    ]);

    return { orders, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async create(userId: number, items: { productId: number; quantity: number }[]) {
    const products = await prisma.product.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
    });

    const total = items.reduce((sum: number, item) => {
      const product = products.find((p: { id: number }) => p.id === item.productId);
      return sum + (product ? Number(product.price) * item.quantity : 0);
    }, 0);

    return prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: items.map((item) => {
            const product = products.find((p: { id: number }) => p.id === item.productId);
            return {
              productId: item.productId,
              quantity: item.quantity,
              price: product?.price ?? 0,
            };
          }),
        },
      },
      include: {
        items: {
          include: {
            product: { select: { id: true, title: true } },
          },
        },
      },
    });
  }

  async findOrFail(id: number) {
    const order = await this.findById(id);
    if (!order) throw new NotFoundError("Order", id);
    return order;
  }
}
