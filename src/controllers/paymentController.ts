import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import {
  createPaymentService,
  getPaymentsService,
  getPaymentsByMemberService
} from "../services/paymentService";

export const createPayment = asyncHandler(
  async (req: Request, res: Response) => {

    const { member_id, amount, payment_method } = req.body;

    const payment = await createPaymentService(
      member_id,
      amount,
      payment_method
    );

    res.status(201).json(payment);
  }
);

export const getPayments = asyncHandler(
  async (req: Request, res: Response) => {

    const payments = await getPaymentsService();

    res.json(payments);
  }
);

export const getPaymentsByMember = asyncHandler(
  async (req: Request, res: Response) => {

    const member_id = Number(req.params.memberId);

    const payments = await getPaymentsByMemberService(member_id);

    res.json(payments);
  }
);