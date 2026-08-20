import { z } from "zod";

const variantAttributeValueSchema = z.object({
  attributeValueId: z.number().int().positive(),
});

export const createVariantSchema = z.object({
  params: z.object({ productId: z.string().regex(/^\d+$/) }),
  body: z.object({
    sku: z.string().min(1).max(100),
    price: z.number().positive(),
    compareAtPrice: z.number().positive().optional(),
    inventory: z.number().int().min(0).default(0),
    weight: z.number().positive().optional(),
    attributeValues: z.array(variantAttributeValueSchema).min(1),
  }),
});

export const updateVariantSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({
    sku: z.string().min(1).max(100).optional(),
    price: z.number().positive().optional(),
    compareAtPrice: z.number().positive().nullable().optional(),
    inventory: z.number().int().min(0).optional(),
    weight: z.number().positive().nullable().optional(),
    isActive: z.boolean().optional(),
    attributeValues: z.array(variantAttributeValueSchema).optional(),
  }),
});

export const getVariantSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
});

export const listVariantsSchema = z.object({
  params: z.object({ productId: z.string().regex(/^\d+$/) }),
});

export type CreateVariantInput = z.infer<typeof createVariantSchema>["body"];
export type UpdateVariantInput = z.infer<typeof updateVariantSchema>["body"];
