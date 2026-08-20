import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/index.js";
import { redis } from "../../config/redis.js";
import { UnauthorizedError } from "../utils/errors.js";

export async function auth(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      next(new UnauthorizedError("Missing or invalid Authorization header"));
      return;
    }

    const token = header.split(" ")[1];
    if (!token) {
      next(new UnauthorizedError("Missing token"));
      return;
    }

    const isBlacklisted = await redis.get(`blacklist:${token}`);
    if (isBlacklisted) {
      next(new UnauthorizedError("Token has been revoked"));
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as unknown as {
      sub: number;
      email: string;
    };

    req.user = { sub: decoded.sub, email: decoded.email };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new UnauthorizedError("Token expired"));
      return;
    }
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError("Invalid token"));
      return;
    }
    next(error);
  }
}
