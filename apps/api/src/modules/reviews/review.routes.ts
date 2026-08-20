import { Router } from "express";
import * as reviewController from "./review.controller.js";
import { validate } from "../../common/middleware/validate.js";
import {
  createReviewSchema,
  updateReviewSchema,
  getReviewSchema,
  listReviewsSchema,
} from "./review.schema.js";
import { asyncHandler } from "../../common/middleware/async-handler.js";

const router = Router();

router.get("/", validate(listReviewsSchema), asyncHandler(reviewController.list));
router.get("/:id", validate(getReviewSchema), asyncHandler(reviewController.getById));
router.post("/", validate(createReviewSchema), asyncHandler(reviewController.create));
router.put("/:id", validate(updateReviewSchema), asyncHandler(reviewController.update));
router.delete("/:id", validate(getReviewSchema), asyncHandler(reviewController.remove));

export default router as Router;
