import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";
import "../types/express"; // ensures the global augmentation is loaded

export const authorizeRole = (...roles: string[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (
      typeof req.user !== "object" ||
      req.user === null ||
      typeof req.user.role !== "string" ||
      !roles.includes(req.user.role)
    ) {
      throw new AppError("Forbidden: insufficient permissions", 403);
    }
    next();
  };