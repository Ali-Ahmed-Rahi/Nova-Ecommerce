import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "./categories.service.js";

export const listCategories = async (req: Request, res: Response) => {
  const categories = await getCategories();
  res.json(sendSuccess("Categories fetched successfully", categories));
};

export const getCategory = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const category = await getCategoryById(id);
  res.json(sendSuccess("Category fetched successfully", category));
};

export const addCategory = async (req: Request, res: Response) => {
  const category = await createCategory(req.body);
  res.status(201).json(sendSuccess("Category created successfully", category, 201));
};

export const patchCategory = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const category = await updateCategory(id, req.body);
  res.json(sendSuccess("Category updated successfully", category));
};

export const removeCategory = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await deleteCategory(id);
  res.json(sendSuccess("Category deleted successfully", result));
};
