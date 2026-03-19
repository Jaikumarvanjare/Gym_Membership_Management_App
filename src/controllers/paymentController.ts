import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../middleware/errorHandler";
import {
  createPaymentService,
  getPaymentsService,
  getPaymentsByMemberService,
} from "../services/paymentService";
import { CreatePaymentInput } from "../validators/paymentValidator";

export const createPayment = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreatePaymentInput;
  const payment = await createPaymentService(body);
  res.status(201).json({ success: true, data: payment });
});

export const getPayments = asyncHandler(async (_req: Request, res: Response) => {
  const payments = await getPaymentsService();
  res.status(200).json({ success: true, data: payments });
});

export const getPaymentsByMember = asyncHandler(async (req: Request, res: Response) => {
  const memberId = Number(req.params.memberId);
  if (!Number.isInteger(memberId) || memberId <= 0) {
    throw new AppError("Invalid member ID", 400);
  }

  const payments = await getPaymentsByMemberService(memberId);
  res.status(200).json({ success: true, data: payments });
});