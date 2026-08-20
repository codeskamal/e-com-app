import { OrderRepository } from "./order.repository.js";
import type { CreateOrderInput, ListOrdersQuery } from "./order.schema.js";

const orderRepository = new OrderRepository();

export class OrderService {
  async getById(id: number) {
    return orderRepository.findOrFail(id);
  }

  async list(query: ListOrdersQuery) {
    return orderRepository.findAll(query);
  }

  async create(userId: number, data: CreateOrderInput) {
    return orderRepository.create(userId, data.items);
  }
}
