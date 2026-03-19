import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

// Validates req.body against the given Zod schema.
// On failure the ZodError is forwarded to errorHandler which returns 422.
export const validate =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body); // throws ZodError on invalid input
    next();
  };