import * as userRepository from "./user.repository.js";
import type {
  ListUsersQuery,
  UpdateProfileInput,
  ChangePasswordInput,
} from "./user.schema.js";

export async function getById(id: number) {
  return userRepository.findOrFail(id);
}

export async function list(query: ListUsersQuery) {
  return userRepository.findAll(query);
}

export async function updateProfile(id: number, data: UpdateProfileInput) {
  return userRepository.updateProfile(id, data);
}

export async function changePassword(id: number, data: ChangePasswordInput) {
  return userRepository.changePassword(id, data);
}

export async function remove(id: number) {
  return userRepository.remove(id);
}
