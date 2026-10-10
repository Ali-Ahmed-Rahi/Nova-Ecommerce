import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { createReview, deleteReview, getProductReviews, updateReview } from "./reviews.service.js";

export const listReviews = async (req: Request, res: Response) => {
  const productId = Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId;
  const reviews = await getProductReviews(productId);
  res.json(sendSuccess("Reviews fetched successfully", reviews));
};

export const addReview = async (req: Request, res: Response) => {
  const productId = Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId;
  const review = await createReview(req.user!.id, productId, req.body);
  res.status(201).json(sendSuccess("Review created successfully", review, 201));
};

export const patchReview = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const review = await updateReview(req.user!.id, id, req.body);
  res.json(sendSuccess("Review updated successfully", review));
};

export const removeReview = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await deleteReview(req.user!.id, id, req.user!.role);
  res.json(sendSuccess("Review deleted successfully", result));
};
