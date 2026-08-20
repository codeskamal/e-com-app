import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma.js";
import { NotFoundError, UnauthorizedError } from "../../common/utils/errors.js";
import type { ListUsersQuery, UpdateProfileInput, ChangePasswordInput } from "./user.schema.js";

export async function findById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      userRoles: {
        include: { role: { select: { id: true, name: true } } },
      },
    },
  });
}

export async function findAll(query: ListUsersQuery) {
  const { page, limit } = query;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        userRoles: {
          include: { role: { select: { id: true, name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function findOrFail(id: number) {
  const user = await findById(id);
  if (!user) throw new NotFoundError("User", id);
  return user;
}

export async function updateProfile(id: number, data: UpdateProfileInput) {
  await findOrFail(id);
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function changePassword(
  id: number,
  data: ChangePasswordInput,
) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, password: true },
  });

  if (!user) throw new NotFoundError("User", id);

  const isPasswordValid = await bcrypt.compare(
    data.currentPassword,
    user.password,
  );
  if (!isPasswordValid) {
    throw new UnauthorizedError("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(data.newPassword, 12);

  return prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
    select: { id: true, name: true, email: true },
  });
}

export async function remove(id: number) {
  await findOrFail(id);
  return prisma.user.delete({ where: { id } });
}
