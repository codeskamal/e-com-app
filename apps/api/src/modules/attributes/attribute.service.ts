import * as attributeRepository from "./attribute.repository.js";
import type { CreateAttributeInput, UpdateAttributeInput } from "./attribute.schema.js";

export async function getById(id: number) {
  return attributeRepository.findOrFail(id);
}

export async function list() {
  return attributeRepository.findAll();
}

export async function create(data: CreateAttributeInput) {
  return attributeRepository.create(data);
}

export async function update(id: number, data: UpdateAttributeInput) {
  return attributeRepository.update(id, data);
}

export async function remove(id: number) {
  return attributeRepository.remove(id);
}
