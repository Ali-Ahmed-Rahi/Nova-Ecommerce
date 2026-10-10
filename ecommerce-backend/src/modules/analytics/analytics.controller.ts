import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { getOverview, getRevenueData, getTopProducts } from "./analytics.service.js";

export const overview = async (req: Request, res: Response) => {
  const data = await getOverview();
  res.json(sendSuccess("Dashboard overview fetched", data));
};

export const revenue = async (req: Request, res: Response) => {
  const data = await getRevenueData();
  res.json(sendSuccess("Revenue data fetched", data));
};

export const products = async (req: Request, res: Response) => {
  const data = await getTopProducts();
  res.json(sendSuccess("Products summary fetched", data));
};
