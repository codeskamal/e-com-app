import { UserRepository } from "./user.repository.js";
import type {
  ListUsersQuery,
  UpdateProfileInput,
  ChangePasswordInput,
} from "./user.schema.js";

const userRepository = new UserRepository();

export class UserService {
  async getById(id: number) {
    return userRepository.findOrFail(id);
  }

  async list(query: ListUsersQuery) {
    return userRepository.findAll(query);
  }

  async updateProfile(id: number, data: UpdateProfileInput) {
    return userRepository.updateProfile(id, data);
  }

  async changePassword(id: number, data: ChangePasswordInput) {
    return userRepository.changePassword(id, data);
  }

  async remove(id: number) {
    return userRepository.delete(id);
  }
}
