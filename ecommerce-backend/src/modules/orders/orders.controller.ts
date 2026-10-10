import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response.js";
import { createOrder, getOrderById, getOrders, updateOrderStatus } from "./orders.service.js";

export const listOrders = async (req: Request, res: Response) => {
  const orders = await getOrders(req.user!.id, req.user!.role);
  res.json(sendSuccess("Orders fetched successfully", orders));
};

export const getOrder = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const order = await getOrderById(id, req.user!.id, req.user!.role);
  res.json(sendSuccess("Order fetched successfully", order));
};

export const createNewOrder = async (req: Request, res: Response) => {
  const order = await createOrder(req.user!.id, req.body);
  res.status(201).json(sendSuccess("Order created successfully", order, 201));
};

export const updateStatus = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const order = await updateOrderStatus(id, req.body.status);
  res.json(sendSuccess("Order status updated", order));
};
