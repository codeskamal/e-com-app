import { prisma } from "../../config/prisma.js";
import { NotFoundError } from "../../common/utils/errors.js";
import type { AddToCartInput, UpdateCartItemInput } from "./cart.schema.js";

export async function findUserCart(userId: number) {
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
      variant: {
        select: {
          id: true,
          sku: true,
          price: true,
          inventory: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });
}

export async function addItem(userId: number, data: AddToCartInput) {
  const existing = await prisma.cartItem.findFirst({
    where: { userId, productId: data.productId, variantId: data.variantId ?? null },
  });

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + data.quantity },
      include: {
        product: { select: { id: true, title: true, price: true } },
        variant: { select: { id: true, sku: true, price: true } },
      },
    });
  }

  return prisma.cartItem.create({
    data: {
      userId,
      productId: data.productId,
      variantId: data.variantId,
      quantity: data.quantity,
    },
    include: {
      product: { select: { id: true, title: true, price: true } },
      variant: { select: { id: true, sku: true, price: true } },
    },
  });
}

export async function updateItem(id: number, userId: number, data: UpdateCartItemInput) {
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

export async function removeItem(id: number, userId: number) {
  const item = await prisma.cartItem.findFirst({
    where: { id, userId },
  });
  if (!item) throw new NotFoundError("Cart item", id);

  return prisma.cartItem.delete({ where: { id } });
}

export async function clearCart(userId: number) {
  return prisma.cartItem.deleteMany({ where: { userId } });
}
