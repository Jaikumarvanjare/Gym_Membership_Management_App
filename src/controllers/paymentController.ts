import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import {
  createPaymentService,
  getPaymentsService,
  getPaymentsByMemberService
} from "../services/paymentService";

interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

/**
 * Create Payment (Admin only)
 */
export const createPayment = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can create payments"
      });
    }

    const { member_id, amount, payment_method } = req.body;

    if (!member_id || !amount || !payment_method) {
      return res.status(400).json({
        message: "member_id, amount and payment_method are required"
      });
    }

    const payment = await createPaymentService(
      Number(member_id),
      Number(amount),
      payment_method
    );

    res.status(201).json(payment);
  }
);


/**
 * Get All Payments (Admin only)
 */
export const getPayments = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can view payments"
      });
    }

    const payments = await getPaymentsService();

    res.json(payments);
  }
);


/**
 * Get Payments By Member
 */
export const getPaymentsByMember = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const memberId = Number(req.params.memberId);

    if (!memberId) {
      return res.status(400).json({
        message: "Invalid member id"
      });
    }

    const payments = await getPaymentsByMemberService(memberId);

    res.json(payments);
  }
);