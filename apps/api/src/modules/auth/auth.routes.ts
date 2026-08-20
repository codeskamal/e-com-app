import { Router } from "express";
import * as authController from "./auth.controller.js";
import { validate } from "../../common/middleware/validate.js";
import { auth } from "../../common/middleware/auth.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register),
);
router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login),
);
router.post("/logout", auth, asyncHandler(authController.logout));
router.get("/me", auth, asyncHandler(authController.getMe));

export default router as Router;
