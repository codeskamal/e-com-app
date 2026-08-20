import { Router } from "express";
import { CartController } from "./cart.controller.js";
import { validate } from "../../common/middleware/validate.js";
import {
  addToCartSchema,
  updateCartItemSchema,
  removeCartItemSchema,
} from "./cart.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();
const controller = new CartController();

router.get("/", asyncHandler(controller.getCart));
router.post("/", validate(addToCartSchema), asyncHandler(controller.addItem));
router.put("/:id", validate(updateCartItemSchema), asyncHandler(controller.updateItem));
router.delete("/:id", validate(removeCartItemSchema), asyncHandler(controller.removeItem));
router.delete("/", asyncHandler(controller.clearCart));

export default router as Router;
