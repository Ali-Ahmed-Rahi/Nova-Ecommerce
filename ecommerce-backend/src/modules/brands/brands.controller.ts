import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { createBrand, deleteBrand, getBrandById, getBrands, updateBrand } from "./brands.service.js";

export const listBrands = async (req: Request, res: Response) => {
  const brands = await getBrands();
  res.json(sendSuccess("Brands fetched successfully", brands));
};

export const getBrand = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const brand = await getBrandById(id);
  res.json(sendSuccess("Brand fetched successfully", brand));
};

export const addBrand = async (req: Request, res: Response) => {
  const brand = await createBrand(req.body);
  res.status(201).json(sendSuccess("Brand created successfully", brand, 201));
};

export const patchBrand = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const brand = await updateBrand(id, req.body);
  res.json(sendSuccess("Brand updated successfully", brand));
};

export const removeBrand = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await deleteBrand(id);
  res.json(sendSuccess("Brand deleted successfully", result));
};
