import { z } from "zod";

export const createVendorSchema = z.object({
  body: z.object({
    shopName: z.string().min(1).max(100),
    description: z.string().optional(),
    logo: z.string().url().optional(),
  }),
});

export const updateVendorSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({
    shopName: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    logo: z.string().url().optional(),
  }),
});

export const getVendorSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
});

export const listVendorsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
  }),
});

export type CreateVendorInput = z.infer<typeof createVendorSchema>["body"];
export type UpdateVendorInput = z.infer<typeof updateVendorSchema>["body"];
export type ListVendorsQuery = z.infer<typeof listVendorsSchema>["query"];
