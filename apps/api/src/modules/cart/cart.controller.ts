import type { Request, Response, NextFunction } from "express";
import { CartService } from "./cart.service.js";

const cartService = new CartService();

export class CartController {
  getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as { userId?: number }).userId ?? 1;
      const cart = await cartService.getCart(userId);
      res.json({ data: cart });
    } catch (error) {
      next(error);
    }
  };

  addItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as { userId?: number }).userId ?? 1;
      const item = await cartService.addItem(userId, req.body);
      res.status(201).json({ data: item });
    } catch (error) {
      next(error);
    }
  };

  updateItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const userId = (req as { userId?: number }).userId ?? 1;
      const item = await cartService.updateItem(id, userId, req.body);
      res.json({ data: item });
    } catch (error) {
      next(error);
    }
  };

  removeItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const userId = (req as { userId?: number }).userId ?? 1;
      await cartService.removeItem(id, userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as { userId?: number }).userId ?? 1;
      await cartService.clearCart(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
