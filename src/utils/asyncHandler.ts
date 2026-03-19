import { Request, Response, NextFunction, RequestHandler } from "express";

// Wraps an async route handler so any rejected promise is forwarded to
// Express's error handler instead of causing an unhandled rejection.
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };