import { Router } from "express";
import * as userController from "./user.controller.js";
import { validate } from "../../common/middleware/validate.js";
import { auth } from "../../common/middleware/auth.js";
import { authorize } from "../../common/middleware/rbac.js";
import {
  getUserSchema,
  listUsersSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "./user.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();

router.get(
  "/",
  auth,
  authorize("ADMIN"),
  validate(listUsersSchema),
  asyncHandler(userController.list),
);
router.get(
  "/:id",
  auth,
  authorize("ADMIN"),
  validate(getUserSchema),
  asyncHandler(userController.getById),
);
router.put(
  "/profile",
  auth,
  validate(updateProfileSchema),
  asyncHandler(userController.updateProfile),
);
router.put(
  "/password",
  auth,
  validate(changePasswordSchema),
  asyncHandler(userController.changePassword),
);
router.delete(
  "/:id",
  auth,
  authorize("ADMIN"),
  validate(getUserSchema),
  asyncHandler(userController.remove),
);

export default router as Router;
