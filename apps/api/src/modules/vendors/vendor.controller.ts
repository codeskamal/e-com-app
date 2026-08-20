import type { Request, Response, NextFunction } from "express";
import { VendorService } from "./vendor.service.js";

const vendorService = new VendorService();

export class VendorController {
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const vendor = await vendorService.getById(id);
      res.json({ data: vendor });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await vendorService.list(req.query as never);
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as { userId?: number }).userId ?? 1;
      const vendor = await vendorService.create(userId, req.body);
      res.status(201).json({ data: vendor });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const vendor = await vendorService.update(id, req.body);
      res.json({ data: vendor });
    } catch (error) {
      next(error);
    }
  };
}
