import { Router } from "express";
import { UserController } from "./user.controller.js";
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
const controller = new UserController();

router.get(
  "/",
  auth,
  authorize("ADMIN"),
  validate(listUsersSchema),
  asyncHandler(controller.list),
);
router.get(
  "/:id",
  auth,
  authorize("ADMIN"),
  validate(getUserSchema),
  asyncHandler(controller.getById),
);
router.put(
  "/profile",
  auth,
  validate(updateProfileSchema),
  asyncHandler(controller.updateProfile),
);
router.put(
  "/password",
  auth,
  validate(changePasswordSchema),
  asyncHandler(controller.changePassword),
);
router.delete(
  "/:id",
  auth,
  authorize("ADMIN"),
  validate(getUserSchema),
  asyncHandler(controller.remove),
);

export default router as Router;
