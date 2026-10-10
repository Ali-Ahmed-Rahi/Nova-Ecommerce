import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

export const requireRole = (...roles: Array<"CUSTOMER" | "MANAGER" | "ADMIN">) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Authentication required", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Forbidden: you do not have access to this resource", 403));
    }

    next();
  };
};
