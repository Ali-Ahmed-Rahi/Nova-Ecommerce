import { Router } from "express";
import { z } from "zod";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { addCategory, getCategory, listCategories, patchCategory, removeCategory } from "./categories.controller.js";
import { categoryParamSchema, categorySchema } from "./categories.validation.js";

const router = Router();

const updateCategorySchema = z.object({
  params: categoryParamSchema.shape.params,
  body: categorySchema.shape.body.partial(),
});

router.get("/", listCategories);
router.get("/:id", validate(categoryParamSchema), getCategory);
router.post("/", authenticate, authorize("ADMIN", "MANAGER"), validate(categorySchema), addCategory);
router.patch("/:id", authenticate, authorize("ADMIN", "MANAGER"), validate(updateCategorySchema), patchCategory);
router.delete("/:id", authenticate, authorize("ADMIN", "MANAGER"), validate(categoryParamSchema), removeCategory);

export default router;
