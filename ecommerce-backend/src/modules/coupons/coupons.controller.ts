import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { createCoupon, deleteCoupon, getCoupons, updateCoupon, validateCoupon } from "./coupons.service.js";

export const validateCouponCode = async (req: Request, res: Response) => {
  const coupon = await validateCoupon(req.body.code, req.body.orderTotal ?? 0);
  res.json(sendSuccess("Coupon validated", coupon));
};

export const listCoupons = async (req: Request, res: Response) => {
  const coupons = await getCoupons();
  res.json(sendSuccess("Coupons fetched successfully", coupons));
};

export const addCoupon = async (req: Request, res: Response) => {
  const coupon = await createCoupon(req.body);
  res.status(201).json(sendSuccess("Coupon created successfully", coupon, 201));
};

export const patchCoupon = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const coupon = await updateCoupon(id, req.body);
  res.json(sendSuccess("Coupon updated successfully", coupon));
};

export const removeCoupon = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await deleteCoupon(id);
  res.json(sendSuccess("Coupon deleted successfully", result));
};
