import type { Request, Response, NextFunction } from "express";
import { ReviewService } from "./review.service.js";

const reviewService = new ReviewService();

export class ReviewController {
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const review = await reviewService.getById(id);
      res.json({ data: review });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await reviewService.list(req.query as never);
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as { userId?: number }).userId ?? 1;
      const review = await reviewService.create(userId, req.body);
      res.status(201).json({ data: review });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const review = await reviewService.update(id, req.body);
      res.json({ data: review });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await reviewService.remove(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
