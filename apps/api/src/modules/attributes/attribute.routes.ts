import { Router } from "express";
import * as attributeController from "./attribute.controller.js";
import { validate } from "../../common/middleware/validate.js";
import { auth } from "../../common/middleware/auth.js";
import { authorize } from "../../common/middleware/rbac.js";
import {
  createAttributeSchema,
  updateAttributeSchema,
  getAttributeSchema,
} from "./attribute.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();

router.get("/", asyncHandler(attributeController.list));
router.get("/:id", validate(getAttributeSchema), asyncHandler(attributeController.getById));
router.post(
  "/",
  auth,
  authorize("ADMIN"),
  validate(createAttributeSchema),
  asyncHandler(attributeController.create),
);
router.put(
  "/:id",
  auth,
  authorize("ADMIN"),
  validate(updateAttributeSchema),
  asyncHandler(attributeController.update),
);
router.delete(
  "/:id",
  auth,
  authorize("ADMIN"),
  validate(getAttributeSchema),
  asyncHandler(attributeController.remove),
);

export default router as Router;
