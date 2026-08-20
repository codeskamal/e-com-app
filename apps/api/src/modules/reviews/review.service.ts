import { ReviewRepository } from "./review.repository.js";
import type { CreateReviewInput, UpdateReviewInput, ListReviewsQuery } from "./review.schema.js";

const reviewRepository = new ReviewRepository();

export class ReviewService {
  async getById(id: number) {
    return reviewRepository.findOrFail(id);
  }

  async list(query: ListReviewsQuery) {
    return reviewRepository.findAll(query);
  }

  async create(userId: number, data: CreateReviewInput) {
    return reviewRepository.create(userId, data);
  }

  async update(id: number, data: UpdateReviewInput) {
    return reviewRepository.update(id, data);
  }

  async remove(id: number) {
    return reviewRepository.delete(id);
  }
}
