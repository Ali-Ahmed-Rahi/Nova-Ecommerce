import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { createNewOrder, getOrder, listOrders, updateStatus } from "./orders.controller.js";
import { orderCreateSchema, orderStatusSchema } from "./orders.validation.js";

const router = Router();

router.use(authenticate);
router.get("/", listOrders);
router.get("/:id", getOrder);
router.post("/", validate(orderCreateSchema), createNewOrder);
router.patch("/:id/status", authorize("ADMIN", "MANAGER"), validate(orderStatusSchema), updateStatus);

export default router;
