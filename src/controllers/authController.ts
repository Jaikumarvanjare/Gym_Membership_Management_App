import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { signupService, loginService } from "../services/authService";
import { SignupInput, LoginInput } from "../validators/authValidator";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role } = req.body as SignupInput;

  const user = await signupService(email, password, role);

  res.status(201).json({ success: true, message: "Signup successful", data: user });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginInput;

  const token = await loginService(email, password);

  res.status(200).json({ success: true, message: "Login successful", data: { token } });
});