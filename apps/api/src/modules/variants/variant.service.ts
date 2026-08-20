import * as variantRepository from "./variant.repository.js";
import type { CreateVariantInput, UpdateVariantInput } from "./variant.schema.js";

export async function getById(id: number) {
  return variantRepository.findOrFail(id);
}

export async function listByProduct(productId: number) {
  return variantRepository.findByProduct(productId);
}

export async function create(productId: number, data: CreateVariantInput) {
  return variantRepository.create(productId, data);
}

export async function update(id: number, data: UpdateVariantInput) {
  return variantRepository.update(id, data);
}

export async function remove(id: number) {
  return variantRepository.remove(id);
}
