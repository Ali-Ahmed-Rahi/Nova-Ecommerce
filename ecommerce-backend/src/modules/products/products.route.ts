import { Router } from "express";
import { validate } from "../../middlewares/validation.middleware.js";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { addProduct, getProduct, listProducts, patchProduct, removeProduct } from "./products.controller.js";
import { createProductSchema, productParamSchema, productQuerySchema, updateProductSchema } from "./products.validation.js";

const router = Router();

router.get("/", validate(productQuerySchema), listProducts);
router.get("/:id", validate(productParamSchema), getProduct);
router.post("/", authenticate, authorize("ADMIN", "MANAGER"), validate(createProductSchema), addProduct);
router.patch("/:id", authenticate, authorize("ADMIN", "MANAGER"), validate(updateProductSchema), patchProduct);
router.delete("/:id", authenticate, authorize("ADMIN", "MANAGER"), validate(productParamSchema), removeProduct);

export default router;
