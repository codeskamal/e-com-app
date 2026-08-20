import { Router } from "express";
import * as orderController from "./order.controller.js";
import { validate } from "../../common/middleware/validate.js";
import { createOrderSchema, getOrderSchema, listOrdersSchema } from "./order.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();

router.get("/", validate(listOrdersSchema), asyncHandler(orderController.list));
router.get("/:id", validate(getOrderSchema), asyncHandler(orderController.getById));
router.post("/", validate(createOrderSchema), asyncHandler(orderController.create));

export default router as Router;
