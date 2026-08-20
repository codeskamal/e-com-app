import { Router } from "express";
import { VendorController } from "./vendor.controller.js";
import { validate } from "../../common/middleware/validate.js";
import {
  createVendorSchema,
  updateVendorSchema,
  getVendorSchema,
  listVendorsSchema,
} from "./vendor.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();
const controller = new VendorController();

router.get("/", validate(listVendorsSchema), asyncHandler(controller.list));
router.get("/:id", validate(getVendorSchema), asyncHandler(controller.getById));
router.post("/", validate(createVendorSchema), asyncHandler(controller.create));
router.put("/:id", validate(updateVendorSchema), asyncHandler(controller.update));

export default router as Router;
