import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const authorizeRole = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
};