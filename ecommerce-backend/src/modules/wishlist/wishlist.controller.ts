import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { addToWishlist, getWishlist, removeFromWishlist } from "./wishlist.service.js";

export const listWishlist = async (req: Request, res: Response) => {
  const wishlist = await getWishlist(req.user!.id);
  res.json(sendSuccess("Wishlist fetched successfully", wishlist));
};

export const addWishlistItem = async (req: Request, res: Response) => {
  const productId = Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId;
  const item = await addToWishlist(req.user!.id, productId);
  res.status(201).json(sendSuccess("Item added to wishlist", item, 201));
};

export const deleteWishlistItem = async (req: Request, res: Response) => {
  const productId = Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId;
  const result = await removeFromWishlist(req.user!.id, productId);
  res.json(sendSuccess("Item removed from wishlist", result));
};
