import { Router } from "express";
import * as productController from "./product.controller.js";
import { validate } from "../../common/middleware/validate.js";
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  listProductsSchema,
} from "./product.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();

router.get("/", validate(listProductsSchema), asyncHandler(productController.list));
router.get("/:id", validate(getProductSchema), asyncHandler(productController.getById));
router.post("/", validate(createProductSchema), asyncHandler(productController.create));
router.put("/:id", validate(updateProductSchema), asyncHandler(productController.update));
router.delete("/:id", validate(getProductSchema), asyncHandler(productController.remove));

export default router as Router;
