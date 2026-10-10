import { Router } from "express";
import authRoutes from "../modules/auth/auth.route.js";
import productRoutes from "../modules/products/products.route.js";
import categoryRoutes from "../modules/categories/categories.route.js";
import brandRoutes from "../modules/brands/brands.route.js";
import cartRoutes from "../modules/cart/cart.route.js";
import wishlistRoutes from "../modules/wishlist/wishlist.route.js";
import orderRoutes from "../modules/orders/orders.route.js";
import couponRoutes from "../modules/coupons/coupons.route.js";
import reviewRoutes from "../modules/reviews/reviews.route.js";
import paymentRoutes from "../modules/payments/payments.route.js";
import analyticsRoutes from "../modules/analytics/analytics.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/brands", brandRoutes);
router.use("/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/orders", orderRoutes);
router.use("/coupons", couponRoutes);
router.use("/reviews", reviewRoutes);
router.use("/payments", paymentRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
