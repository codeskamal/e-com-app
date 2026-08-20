import type { Request, Response, NextFunction } from "express";
import * as reviewService from "./review.service.js";

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const review = await reviewService.getById(id);
    res.json({ data: review });
  } catch (error) {
    next(error);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await reviewService.list(req.query as never);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as { userId?: number }).userId ?? 1;
    const review = await reviewService.create(userId, req.body);
    res.status(201).json({ data: review });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const review = await reviewService.update(id, req.body);
    res.json({ data: review });
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await reviewService.remove(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
