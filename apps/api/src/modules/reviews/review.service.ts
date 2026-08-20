import * as reviewRepository from "./review.repository.js";
import type { CreateReviewInput, UpdateReviewInput, ListReviewsQuery } from "./review.schema.js";

export async function getById(id: number) {
  return reviewRepository.findOrFail(id);
}

export async function list(query: ListReviewsQuery) {
  return reviewRepository.findAll(query);
}

export async function create(userId: number, data: CreateReviewInput) {
  return reviewRepository.create(userId, data);
}

export async function update(id: number, data: UpdateReviewInput) {
  return reviewRepository.update(id, data);
}

export async function remove(id: number) {
  return reviewRepository.remove(id);
}
