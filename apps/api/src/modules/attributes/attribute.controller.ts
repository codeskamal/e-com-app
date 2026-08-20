import type { Request, Response, NextFunction } from "express";
import * as attributeService from "./attribute.service.js";

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const attribute = await attributeService.getById(id);
    res.json({ data: attribute });
  } catch (error) {
    next(error);
  }
}

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    const attributes = await attributeService.list();
    res.json({ data: attributes });
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const attribute = await attributeService.create(req.body);
    res.status(201).json({ data: attribute });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const attribute = await attributeService.update(id, req.body);
    res.json({ data: attribute });
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await attributeService.remove(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
