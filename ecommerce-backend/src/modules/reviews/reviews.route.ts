import { Router } from "express";
import { z } from "zod";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { addReview, listReviews, patchReview, removeReview } from "./reviews.controller.js";
import { reviewBodySchema, reviewParamSchema } from "./reviews.validation.js";

const router = Router();

const updateReviewSchema = z.object({
  params: reviewParamSchema.shape.params,
  body: reviewBodySchema.shape.body.partial(),
});

router.get("/products/:productId/reviews", listReviews);
router.post("/products/:productId/reviews", authenticate, validate(reviewBodySchema), addReview);
router.patch("/:id", authenticate, validate(updateReviewSchema), patchReview);
router.delete("/:id", authenticate, validate(reviewParamSchema), removeReview);

export default router;
