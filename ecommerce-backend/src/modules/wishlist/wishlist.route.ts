import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { addWishlistItem, deleteWishlistItem, listWishlist } from "./wishlist.controller.js";
import { wishlistParamSchema } from "./wishlist.validation.js";

const router = Router();

router.use(authenticate);
router.get("/", listWishlist);
router.post("/:productId", validate(wishlistParamSchema), addWishlistItem);
router.delete("/:productId", validate(wishlistParamSchema), deleteWishlistItem);

export default router;
