import * as orderRepository from "./order.repository.js";
import type { CreateOrderInput, ListOrdersQuery } from "./order.schema.js";

export async function getById(id: number) {
  return orderRepository.findOrFail(id);
}

export async function list(query: ListOrdersQuery) {
  return orderRepository.findAll(query);
}

export async function create(userId: number, data: CreateOrderInput) {
  return orderRepository.create(userId, data.items);
}
