import { z } from "zod";

export const createPaymentSchema = z.object({
  member_id: z.coerce.number().int().positive("member_id must be a positive integer"),
  amount: z.coerce.number().positive("amount must be greater than 0"),
  payment_method: z.enum(["cash", "card", "upi", "netbanking"]).refine(
    (val) => ["cash", "card", "upi", "netbanking"].includes(val),
    { message: "payment_method must be cash, card, upi, or netbanking" }
  ),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;