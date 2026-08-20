import { Router } from "express";
import * as cartController from "./cart.controller.js";
import { validate } from "../../common/middleware/validate.js";
import {
  addToCartSchema,
  updateCartItemSchema,
  removeCartItemSchema,
} from "./cart.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();

router.get("/", asyncHandler(cartController.getCart));
router.post("/", validate(addToCartSchema), asyncHandler(cartController.addItem));
router.put("/:id", validate(updateCartItemSchema), asyncHandler(cartController.updateItem));
router.delete("/:id", validate(removeCartItemSchema), asyncHandler(cartController.removeItem));
router.delete("/", asyncHandler(cartController.clearCart));

export default router as Router;
