import { ProductRepository } from "./product.repository.js";
import type { CreateProductInput, UpdateProductInput, ListProductsQuery } from "./product.schema.js";

const productRepository = new ProductRepository();

export class ProductService {
  async getById(id: number) {
    return productRepository.findOrFail(id);
  }

  async list(query: ListProductsQuery) {
    return productRepository.findAll(query);
  }

  async create(data: CreateProductInput) {
    return productRepository.create(data);
  }

  async update(id: number, data: UpdateProductInput) {
    return productRepository.update(id, data);
  }

  async remove(id: number) {
    return productRepository.delete(id);
  }
}
