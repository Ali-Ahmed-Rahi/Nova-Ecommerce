import { Router } from "express";
import { validate } from "../../middlewares/validation.middleware.js";
import { createSession, getPayment, webhook } from "./payments.controller.js";
import { checkoutSessionSchema } from "./payments.validation.js";

const router = Router();

router.post("/create-checkout-session", validate(checkoutSessionSchema), createSession);
router.post("/webhook", webhook);
router.get("/:id", getPayment);

export default router;
