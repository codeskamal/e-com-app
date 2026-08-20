import { prisma } from "../../config/prisma.js";
import { NotFoundError, ConflictError } from "../../common/utils/errors.js";
import type { CreateVariantInput, UpdateVariantInput } from "./variant.schema.js";

export async function findById(id: number) {
  return prisma.productVariant.findUnique({
    where: { id },
    include: {
      product: { select: { id: true, title: true } },
      variantAttributes: {
        include: {
          attributeValue: {
            include: { attribute: true },
          },
        },
      },
    },
  });
}

export async function findByProduct(productId: number) {
  return prisma.productVariant.findMany({
    where: { productId },
    include: {
      variantAttributes: {
        include: {
          attributeValue: {
            include: { attribute: true },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function findOrFail(id: number) {
  const variant = await findById(id);
  if (!variant) throw new NotFoundError("ProductVariant", id);
  return variant;
}

export async function create(productId: number, data: CreateVariantInput) {
  const existing = await prisma.productVariant.findUnique({
    where: { sku: data.sku },
  });
  if (existing) {
    throw new ConflictError(`Variant with SKU '${data.sku}' already exists`);
  }

  return prisma.productVariant.create({
    data: {
      productId,
      sku: data.sku,
      price: data.price,
      compareAtPrice: data.compareAtPrice,
      inventory: data.inventory,
      weight: data.weight,
      variantAttributes: {
        create: data.attributeValues.map((av) => ({
          attributeValueId: av.attributeValueId,
        })),
      },
    },
    include: {
      variantAttributes: {
        include: {
          attributeValue: {
            include: { attribute: true },
          },
        },
      },
    },
  });
}

export async function update(id: number, data: UpdateVariantInput) {
  await findOrFail(id);

  const { attributeValues, ...rest } = data;

  if (attributeValues) {
    await prisma.variantAttribute.deleteMany({
      where: { variantId: id },
    });

    return prisma.productVariant.update({
      where: { id },
      data: {
        ...rest,
        variantAttributes: {
          create: attributeValues.map((av) => ({
            attributeValueId: av.attributeValueId,
          })),
        },
      },
      include: {
        variantAttributes: {
          include: {
            attributeValue: {
              include: { attribute: true },
            },
          },
        },
      },
    });
  }

  return prisma.productVariant.update({
    where: { id },
    data: rest,
    include: {
      variantAttributes: {
        include: {
          attributeValue: {
            include: { attribute: true },
          },
        },
      },
    },
  });
}

export async function remove(id: number) {
  await findOrFail(id);
  return prisma.productVariant.delete({ where: { id } });
}
