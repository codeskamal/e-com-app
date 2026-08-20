import { prisma } from "../../config/prisma.js";
import { NotFoundError } from "../../common/utils/errors.js";
import type { AddToCartInput, UpdateCartItemInput } from "./cart.schema.js";

export class CartRepository {
  async findUserCart(userId: number) {
    return prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            price: true,
            images: true,
            inventory: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });
  }

  async addItem(userId: number, data: AddToCartInput) {
    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId: data.productId } },
    });

    if (existing) {
      return prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + data.quantity },
        include: {
          product: { select: { id: true, title: true, price: true } },
        },
      });
    }

    return prisma.cartItem.create({
      data: { userId, productId: data.productId, quantity: data.quantity },
      include: {
        product: { select: { id: true, title: true, price: true } },
      },
    });
  }

  async updateItem(id: number, userId: number, data: UpdateCartItemInput) {
    const item = await prisma.cartItem.findFirst({
      where: { id, userId },
    });
    if (!item) throw new NotFoundError("Cart item", id);

    return prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity },
      include: {
        product: { select: { id: true, title: true, price: true } },
      },
    });
  }

  async removeItem(id: number, userId: number) {
    const item = await prisma.cartItem.findFirst({
      where: { id, userId },
    });
    if (!item) throw new NotFoundError("Cart item", id);

    return prisma.cartItem.delete({ where: { id } });
  }

  async clearCart(userId: number) {
    return prisma.cartItem.deleteMany({ where: { userId } });
  }
}
