import type { Request, Response, NextFunction } from "express";
import { ProductService } from "./product.service.js";

const productService = new ProductService();

export class ProductController {
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const product = await productService.getById(id);
      res.json({ data: product });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.list(req.query as never);
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.create(req.body);
      res.status(201).json({ data: product });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const product = await productService.update(id, req.body);
      res.json({ data: product });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await productService.remove(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
