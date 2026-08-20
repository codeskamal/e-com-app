import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(1),
    price: z.number().positive(),
    inventory: z.number().int().min(0).default(0),
    images: z.string().optional(),
    vendorId: z.number().int().positive(),
    categoryId: z.number().int().positive(),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    inventory: z.number().int().min(0).optional(),
    images: z.string().optional(),
    categoryId: z.number().int().positive().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const getProductSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
});

export const listProductsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    categoryId: z.coerce.number().int().positive().optional(),
    vendorId: z.coerce.number().int().positive().optional(),
    search: z.string().optional(),
  }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>["body"];
export type UpdateProductInput = z.infer<typeof updateProductSchema>["body"];
export type ListProductsQuery = z.infer<typeof listProductsSchema>["query"];
