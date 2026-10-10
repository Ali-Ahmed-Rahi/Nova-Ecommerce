import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { forgotPassword, getMe, login, logout, refresh, register, resetPassword } from "./auth.controller.js";
import { loginSchema, refreshSchema, registerSchema } from "./auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);
router.post("/refresh", validate(refreshSchema), refresh);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
