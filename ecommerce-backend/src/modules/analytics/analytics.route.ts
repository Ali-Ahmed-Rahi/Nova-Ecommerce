import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { overview, products, revenue } from "./analytics.controller.js";

const router = Router();

router.use(authenticate, authorize("ADMIN", "MANAGER"));
router.get("/overview", overview);
router.get("/revenue", revenue);
router.get("/products", products);

export default router;
