import type { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service.js";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.login(req.body);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.body?.token || authHeader?.split(" ")[1] || "";

    await authService.logout(token);
    res.json({ data: { message: "Logged out successfully" } });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.sub;
    if (!userId) {
      res.status(401).json({
        error: { code: "UNAUTHORIZED", message: "Not authenticated" },
      });
      return;
    }
    const user = await authService.getMe(userId);
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
}
