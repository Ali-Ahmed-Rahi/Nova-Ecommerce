import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { addItem, deleteItem, emptyCart, getUserCart, updateItem } from "./cart.controller.js";
import { cartItemSchema, updateCartItemSchema } from "./cart.validation.js";

const router = Router();

router.use(authenticate);
router.get("/", getUserCart);
router.post("/items", validate(cartItemSchema), addItem);
router.patch("/items/:id", validate(updateCartItemSchema), updateItem);
router.delete("/items/:id", deleteItem);
router.delete("/", emptyCart);

export default router;
