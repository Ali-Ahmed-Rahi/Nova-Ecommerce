import { NextFunction, Request, Response } from "express";
import { z, ZodTypeAny } from "zod";
import { AppError } from "../errors/AppError.js";

const assignValidatedValue = <K extends "body" | "query" | "params">(
  req: Request,
  key: K,
  value: Request[K],
) => {
  const descriptor = Object.getOwnPropertyDescriptor(req, key);

  if (descriptor?.writable || descriptor?.set) {
    req[key] = value;
    return;
  }

  Object.defineProperty(req, key, {
    value,
    writable: true,
    configurable: true,
    enumerable: true,
  });
};

export const validate = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return next(new AppError("Validation failed", 422, result.error.issues));
    }

    assignValidatedValue(req, "body", result.data.body);
    assignValidatedValue(req, "query", result.data.query);
    assignValidatedValue(req, "params", result.data.params);
    next();
  };
};
