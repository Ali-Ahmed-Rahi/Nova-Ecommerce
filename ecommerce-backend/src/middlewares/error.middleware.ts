import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { sendError } from "../utils/response.js";

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json(sendError("Resource not found", [], 404));
};

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(sendError(err.message, err.errors ?? [], err.statusCode));
  }

  console.error(err);
  return res.status(500).json(sendError("Internal server error", [], 500));
};
