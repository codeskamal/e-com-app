import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../config/index.js";
import { redis } from "../../config/redis.js";
import {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} from "../../common/utils/errors.js";
import type { RegisterInput, LoginInput } from "./auth.schema.js";

export async function register(data: RegisterInput) {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    throw new ConflictError(
      `User with email '${data.email}' already exists`,
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      userRoles: {
        create: {
          role: {
            connect: { name: "CUSTOMER" },
          },
        },
      },
    },
    include: {
      userRoles: {
        include: { role: true },
      },
    },
  });

  const options: jwt.SignOptions = {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  };
  const token = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    options,
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.userRoles.map(
        (ur: { role: { name: string } }) => ur.role.name,
      ),
    },
    token,
  };
}

export async function login(data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    include: {
      userRoles: {
        include: { role: true },
      },
    },
  });

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  if (!user.isActive) {
    throw new UnauthorizedError("Account is deactivated");
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const options: jwt.SignOptions = {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  };
  const token = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    options,
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.userRoles.map(
        (ur: { role: { name: string } }) => ur.role.name,
      ),
    },
    token,
  };
}

export async function logout(token: string) {
  const decoded = jwt.decode(token) as {
    exp?: number;
  } | null;

  if (decoded?.exp) {
    const now = Math.floor(Date.now() / 1000);
    const ttl = decoded.exp - now;
    if (ttl > 0) {
      await redis.setex(`blacklist:${token}`, ttl, "1");
    }
  }
}

export async function getMe(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      userRoles: {
        include: {
          role: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!user) {
    throw new NotFoundError("User", userId);
  }

  return {
    ...user,
    roles: user.userRoles.map(
      (ur: { role: { id: number; name: string } }) => ur.role,
    ),
  };
}
