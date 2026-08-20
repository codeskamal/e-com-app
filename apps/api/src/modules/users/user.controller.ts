import type { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service.js";

const userService = new UserService();

export class UserController {
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const user = await userService.getById(id);
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.list(req.query as never);
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.user?.sub;
      if (!userId) {
        res.status(401).json({
          error: { code: "UNAUTHORIZED", message: "Not authenticated" },
        });
        return;
      }
      const user = await userService.updateProfile(userId, req.body);
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.user?.sub;
      if (!userId) {
        res.status(401).json({
          error: { code: "UNAUTHORIZED", message: "Not authenticated" },
        });
        return;
      }
      await userService.changePassword(userId, req.body);
      res.json({ data: { message: "Password changed successfully" } });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await userService.remove(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
