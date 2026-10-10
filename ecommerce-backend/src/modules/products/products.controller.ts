import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./products.service.js";

export const listProducts = async (req: Request, res: Response) => {
  const products = await getProducts(req.query as any);
  res.json(sendSuccess("Products fetched successfully", products));
};

export const getProduct = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const product = await getProductById(id);
  res.json(sendSuccess("Product fetched successfully", product));
};

export const addProduct = async (req: Request, res: Response) => {
  const product = await createProduct(req.body);
  res.status(201).json(sendSuccess("Product created successfully", product, 201));
};

export const patchProduct = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const product = await updateProduct(id, req.body);
  res.json(sendSuccess("Product updated successfully", product));
};

export const removeProduct = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await deleteProduct(id);
  res.json(sendSuccess("Product deleted successfully", result));
};
