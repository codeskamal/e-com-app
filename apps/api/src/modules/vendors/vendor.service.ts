import * as vendorRepository from "./vendor.repository.js";
import type { CreateVendorInput, UpdateVendorInput, ListVendorsQuery } from "./vendor.schema.js";

export async function getById(id: number) {
  return vendorRepository.findOrFail(id);
}

export async function list(query: ListVendorsQuery) {
  return vendorRepository.findAll(query);
}

export async function create(userId: number, data: CreateVendorInput) {
  return vendorRepository.create(userId, data);
}

export async function update(id: number, data: UpdateVendorInput) {
  return vendorRepository.update(id, data);
}
