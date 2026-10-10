import { Router } from "express";
import { z } from "zod";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { addBrand, getBrand, listBrands, patchBrand, removeBrand } from "./brands.controller.js";
import { brandParamSchema, brandSchema } from "./brands.validation.js";

const router = Router();

const updateBrandSchema = z.object({
  params: brandParamSchema.shape.params,
  body: brandSchema.shape.body.partial(),
});

router.get("/", listBrands);
router.get("/:id", validate(brandParamSchema), getBrand);
router.post("/", authenticate, authorize("ADMIN", "MANAGER"), validate(brandSchema), addBrand);
router.patch("/:id", authenticate, authorize("ADMIN", "MANAGER"), validate(updateBrandSchema), patchBrand);
router.delete("/:id", authenticate, authorize("ADMIN", "MANAGER"), validate(brandParamSchema), removeBrand);

export default router;
