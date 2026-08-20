import type { Request, Response, NextFunction } from "express";
import * as variantService from "./variant.service.js";

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const variant = await variantService.getById(id);
    res.json({ data: variant });
  } catch (error) {
    next(error);
  }
}

export async function listByProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const productId = Number(req.params.productId);
    const variants = await variantService.listByProduct(productId);
    res.json({ data: variants });
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const productId = Number(req.params.productId);
    const variant = await variantService.create(productId, req.body);
    res.status(201).json({ data: variant });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const variant = await variantService.update(id, req.body);
    res.json({ data: variant });
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await variantService.remove(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
