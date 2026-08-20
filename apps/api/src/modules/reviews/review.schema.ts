import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    productId: z.number().int().positive(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().optional(),
  }),
});

export const updateReviewSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().optional(),
  }),
});

export const getReviewSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
});

export const listReviewsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    productId: z.coerce.number().int().positive().optional(),
  }),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>["body"];
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>["body"];
export type ListReviewsQuery = z.infer<typeof listReviewsSchema>["query"];
