import { Router } from "express";
import * as vendorController from "./vendor.controller.js";
import { validate } from "../../common/middleware/validate.js";
import {
  createVendorSchema,
  updateVendorSchema,
  getVendorSchema,
  listVendorsSchema,
} from "./vendor.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();

router.get("/", validate(listVendorsSchema), asyncHandler(vendorController.list));
router.get("/:id", validate(getVendorSchema), asyncHandler(vendorController.getById));
router.post("/", validate(createVendorSchema), asyncHandler(vendorController.create));
router.put("/:id", validate(updateVendorSchema), asyncHandler(vendorController.update));

export default router as Router;
