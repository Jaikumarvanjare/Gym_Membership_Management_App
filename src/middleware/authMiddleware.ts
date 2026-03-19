import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "../types/express"; // ensures the global augmentation is loaded

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Authorization token missing" });
    return;
  }

  const token = authHeader.split(" ")[1];

  // jwt.verify throws JsonWebTokenError / TokenExpiredError on failure —
  // both are caught by errorHandler so we just let them propagate.
  const decoded = jwt.verify(token, JWT_SECRET) as {
    id: number;
    role: "admin" | "customer";
  };

  req.user = decoded;
  next();
};