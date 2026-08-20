import { z } from "zod";

const attributeValueSchema = z.object({
  value: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  hexCode: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

export const createAttributeSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(50),
    type: z.string().min(1).max(50),
    values: z.array(attributeValueSchema).min(1),
  }),
});

export const updateAttributeSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({
    name: z.string().min(1).max(50).optional(),
    type: z.string().min(1).max(50).optional(),
  }),
});

export const getAttributeSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
});

export const listAttributesSchema = z.object({
  query: z.object({}),
});

export type CreateAttributeInput = z.infer<typeof createAttributeSchema>["body"];
export type UpdateAttributeInput = z.infer<typeof updateAttributeSchema>["body"];
