import { CartRepository } from "./cart.repository.js";
import type { AddToCartInput, UpdateCartItemInput } from "./cart.schema.js";

const cartRepository = new CartRepository();

export class CartService {
  async getCart(userId: number) {
    const items = await cartRepository.findUserCart(userId);
    const total = items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0,
    );
    return { items, total };
  }

  async addItem(userId: number, data: AddToCartInput) {
    return cartRepository.addItem(userId, data);
  }

  async updateItem(id: number, userId: number, data: UpdateCartItemInput) {
    return cartRepository.updateItem(id, userId, data);
  }

  async removeItem(id: number, userId: number) {
    return cartRepository.removeItem(id, userId);
  }

  async clearCart(userId: number) {
    return cartRepository.clearCart(userId);
  }
}
