import { Router } from "express";
import { ProductController } from "./product.controller.js";
import { validate } from "../../common/middleware/validate.js";
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  listProductsSchema,
} from "./product.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();
const controller = new ProductController();

router.get("/", validate(listProductsSchema), asyncHandler(controller.list));
router.get("/:id", validate(getProductSchema), asyncHandler(controller.getById));
router.post("/", validate(createProductSchema), asyncHandler(controller.create));
router.put("/:id", validate(updateProductSchema), asyncHandler(controller.update));
router.delete("/:id", validate(getProductSchema), asyncHandler(controller.remove));

export default router as Router;
