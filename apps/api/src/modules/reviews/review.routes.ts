import { Router } from "express";
import { ReviewController } from "./review.controller.js";
import { validate } from "../../common/middleware/validate.js";
import {
  createReviewSchema,
  updateReviewSchema,
  getReviewSchema,
  listReviewsSchema,
} from "./review.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();
const controller = new ReviewController();

router.get("/", validate(listReviewsSchema), asyncHandler(controller.list));
router.get("/:id", validate(getReviewSchema), asyncHandler(controller.getById));
router.post("/", validate(createReviewSchema), asyncHandler(controller.create));
router.put("/:id", validate(updateReviewSchema), asyncHandler(controller.update));
router.delete("/:id", validate(getReviewSchema), asyncHandler(controller.remove));

export default router as Router;
