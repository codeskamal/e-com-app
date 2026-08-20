import { Router } from "express";
import * as variantController from "./variant.controller.js";
import { validate } from "../../common/middleware/validate.js";
import { auth } from "../../common/middleware/auth.js";
import { authorize } from "../../common/middleware/rbac.js";
import {
  createVariantSchema,
  updateVariantSchema,
  getVariantSchema,
} from "./variant.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();

router.get(
  "/products/:productId/variants",
  asyncHandler(variantController.listByProduct),
);
router.get(
  "/:id",
  validate(getVariantSchema),
  asyncHandler(variantController.getById),
);
router.post(
  "/products/:productId/variants",
  auth,
  authorize("ADMIN", "VENDOR"),
  validate(createVariantSchema),
  asyncHandler(variantController.create),
);
router.put(
  "/:id",
  auth,
  authorize("ADMIN", "VENDOR"),
  validate(updateVariantSchema),
  asyncHandler(variantController.update),
);
router.delete(
  "/:id",
  auth,
  authorize("ADMIN", "VENDOR"),
  validate(getVariantSchema),
  asyncHandler(variantController.remove),
);

export default router as Router;
