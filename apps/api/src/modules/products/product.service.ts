import * as productRepository from "./product.repository.js";
import type { CreateProductInput, UpdateProductInput, ListProductsQuery } from "./product.schema.js";

export async function getById(id: number) {
  return productRepository.findOrFail(id);
}

export async function list(query: ListProductsQuery) {
  return productRepository.findAll(query);
}

export async function create(data: CreateProductInput) {
  return productRepository.create(data);
}

export async function update(id: number, data: UpdateProductInput) {
  return productRepository.update(id, data);
}

export async function remove(id: number) {
  return productRepository.remove(id);
}
