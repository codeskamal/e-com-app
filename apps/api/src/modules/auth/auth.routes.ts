import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { validate } from "../../common/middleware/validate.js";
import { auth } from "../../common/middleware/auth.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();
const controller = new AuthController();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(controller.register),
);
router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(controller.login),
);
router.post("/logout", auth, asyncHandler(controller.logout));
router.get("/me", auth, asyncHandler(controller.getMe));

export default router as Router;
