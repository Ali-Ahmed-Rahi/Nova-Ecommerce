import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { addCartItem, clearCart, getCart, removeCartItem, updateCartItem } from "./cart.service.js";

export const getUserCart = async (req: Request, res: Response) => {
  const items = await getCart(req.user!.id);
  res.json(sendSuccess("Cart fetched successfully", items));
};

export const addItem = async (req: Request, res: Response) => {
  const item = await addCartItem(req.user!.id, req.body);
  res.status(201).json(sendSuccess("Item added to cart", item, 201));
};

export const updateItem = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const item = await updateCartItem(req.user!.id, id, req.body.quantity);
  res.json(sendSuccess("Cart item updated", item));
};

export const deleteItem = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await removeCartItem(req.user!.id, id);
  res.json(sendSuccess("Cart item removed", result));
};

export const emptyCart = async (req: Request, res: Response) => {
  const result = await clearCart(req.user!.id);
  res.json(sendSuccess("Cart cleared", result));
};
