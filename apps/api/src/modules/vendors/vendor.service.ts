import { VendorRepository } from "./vendor.repository.js";
import type { CreateVendorInput, UpdateVendorInput, ListVendorsQuery } from "./vendor.schema.js";

const vendorRepository = new VendorRepository();

export class VendorService {
  async getById(id: number) {
    return vendorRepository.findOrFail(id);
  }

  async list(query: ListVendorsQuery) {
    return vendorRepository.findAll(query);
  }

  async create(userId: number, data: CreateVendorInput) {
    return vendorRepository.create(userId, data);
  }

  async update(id: number, data: UpdateVendorInput) {
    return vendorRepository.update(id, data);
  }
}
