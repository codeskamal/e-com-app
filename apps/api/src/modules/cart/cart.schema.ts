import { z } from "zod";

export const addToCartSchema = z.object({
  body: z.object({
    productId: z.number().int().positive(),
    variantId: z.number().int().positive().optional(),
    quantity: z.number().int().positive().default(1),
  }),
});

export const updateCartItemSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({
    quantity: z.number().int().positive(),
  }),
});

export const removeCartItemSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
});

export const listCartSchema = z.object({
  query: z.object({}),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>["body"];
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>["body"];
