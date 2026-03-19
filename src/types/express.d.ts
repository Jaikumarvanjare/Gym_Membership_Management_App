// src/types/express.d.ts
import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      role: "admin" | "customer"; // or just string if you prefer
    };
  }
}