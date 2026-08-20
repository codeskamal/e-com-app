import { prisma } from "../../config/prisma.js";
import { NotFoundError, ConflictError } from "../../common/utils/errors.js";
import type { CreateAttributeInput, UpdateAttributeInput } from "./attribute.schema.js";

export async function findById(id: number) {
  return prisma.attribute.findUnique({
    where: { id },
    include: {
      values: { orderBy: { id: "asc" } },
    },
  });
}

export async function findAll() {
  return prisma.attribute.findMany({
    include: {
      values: { orderBy: { id: "asc" } },
    },
    orderBy: { id: "asc" },
  });
}

export async function findOrFail(id: number) {
  const attribute = await findById(id);
  if (!attribute) throw new NotFoundError("Attribute", id);
  return attribute;
}

export async function create(data: CreateAttributeInput) {
  const existing = await prisma.attribute.findUnique({
    where: { name: data.name },
  });
  if (existing) {
    throw new ConflictError(`Attribute '${data.name}' already exists`);
  }

  return prisma.attribute.create({
    data: {
      name: data.name,
      type: data.type,
      values: {
        create: data.values,
      },
    },
    include: {
      values: { orderBy: { id: "asc" } },
    },
  });
}

export async function update(id: number, data: UpdateAttributeInput) {
  await findOrFail(id);
  return prisma.attribute.update({
    where: { id },
    data,
    include: {
      values: { orderBy: { id: "asc" } },
    },
  });
}

export async function remove(id: number) {
  await findOrFail(id);
  return prisma.attribute.delete({ where: { id } });
}
