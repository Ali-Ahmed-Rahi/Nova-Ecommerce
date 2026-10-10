import { Router } from "express";
import { z } from "zod";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { addCoupon, listCoupons, patchCoupon, removeCoupon, validateCouponCode } from "./coupons.controller.js";
import { couponParamSchema, couponSchema, couponValidateSchema } from "./coupons.validation.js";

const router = Router();

const updateCouponSchema = z.object({
  params: couponParamSchema.shape.params,
  body: couponSchema.shape.body.partial(),
});

router.post("/validate", validate(couponValidateSchema), validateCouponCode);
router.get("/", authenticate, authorize("ADMIN", "MANAGER"), listCoupons);
router.post("/", authenticate, authorize("ADMIN", "MANAGER"), validate(couponSchema), addCoupon);
router.patch("/:id", authenticate, authorize("ADMIN", "MANAGER"), validate(updateCouponSchema), patchCoupon);
router.delete("/:id", authenticate, authorize("ADMIN", "MANAGER"), validate(couponParamSchema), removeCoupon);

export default router;
