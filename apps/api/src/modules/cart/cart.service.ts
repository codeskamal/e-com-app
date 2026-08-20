import * as cartRepository from "./cart.repository.js";
import type { AddToCartInput, UpdateCartItemInput } from "./cart.schema.js";

export async function getCart(userId: number) {
  const items = await cartRepository.findUserCart(userId);
  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );
  return { items, total };
}

export async function addItem(userId: number, data: AddToCartInput) {
  return cartRepository.addItem(userId, data);
}

export async function updateItem(id: number, userId: number, data: UpdateCartItemInput) {
  return cartRepository.updateItem(id, userId, data);
}

export async function removeItem(id: number, userId: number) {
  return cartRepository.removeItem(id, userId);
}

export async function clearCart(userId: number) {
  return cartRepository.clearCart(userId);
}
