import type { Request, Response, NextFunction } from "express";
import * as vendorService from "./vendor.service.js";

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const vendor = await vendorService.getById(id);
    res.json({ data: vendor });
  } catch (error) {
    next(error);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await vendorService.list(req.query as never);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as { userId?: number }).userId ?? 1;
    const vendor = await vendorService.create(userId, req.body);
    res.status(201).json({ data: vendor });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const vendor = await vendorService.update(id, req.body);
    res.json({ data: vendor });
  } catch (error) {
    next(error);
  }
}
