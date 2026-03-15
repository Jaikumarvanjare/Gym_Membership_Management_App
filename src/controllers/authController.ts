import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { signupService, loginService } from "../services/authService";

export const signup = asyncHandler(async (req: Request, res: Response) => {

  const { email, password, role } = req.body;

  const user = await signupService(email, password, role);

  res.status(201).json({
    message: "Signup successful",
    user
  });

});

export const login = asyncHandler(async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const token = await loginService(email, password);

  res.json({
    message: "Login successful",
    token
  });

});