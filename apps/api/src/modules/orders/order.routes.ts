import { Router } from "express";
import { OrderController } from "./order.controller.js";
import { validate } from "../../common/middleware/validate.js";
import { createOrderSchema, getOrderSchema, listOrdersSchema } from "./order.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();
const controller = new OrderController();

router.get("/", validate(listOrdersSchema), asyncHandler(controller.list));
router.get("/:id", validate(getOrderSchema), asyncHandler(controller.getById));
router.post("/", validate(createOrderSchema), asyncHandler(controller.create));

export default router as Router;
