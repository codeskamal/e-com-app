import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prisma.js";
import { ForbiddenError } from "../utils/errors.js";

export function authorize(...allowedRoles: string[]) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        next(new ForbiddenError("Authentication required"));
        return;
      }

      const userRoles = await prisma.userRole.findMany({
        where: { userId: req.user.sub },
        include: { role: { select: { name: true } } },
      });

      const userRoleNames = userRoles.map(
        (ur: { role: { name: string } }) => ur.role.name,
      );

      const hasRole = allowedRoles.some((role) =>
        userRoleNames.includes(role),
      );

      if (!hasRole) {
        next(
          new ForbiddenError(
            `Required roles: ${allowedRoles.join(", ")}`,
          ),
        );
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
