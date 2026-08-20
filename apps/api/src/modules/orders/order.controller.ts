import type { Request, Response, NextFunction } from "express";
import * as orderService from "./order.service.js";

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const order = await orderService.getById(id);
    res.json({ data: order });
  } catch (error) {
    next(error);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await orderService.list(req.query as never);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as { userId?: number }).userId ?? 1;
    const order = await orderService.create(userId, req.body);
    res.status(201).json({ data: order });
  } catch (error) {
    next(error);
  }
}
