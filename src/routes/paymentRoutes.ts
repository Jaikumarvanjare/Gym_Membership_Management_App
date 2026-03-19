import { Router } from "express";
import { createPayment, getPayments, getPaymentsByMember } from "../controllers/paymentController";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";
import { validate } from "../middleware/validate";
import { createPaymentSchema } from "../validators/paymentValidator";

const router = Router();

/**
 * @swagger
 * /gmma/api/v1/payments:
 *   post:
 *     summary: Record a payment for a member
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/payments",
  authenticate,
  authorizeRole("admin"),
  validate(createPaymentSchema),
  createPayment
);

/**
 * @swagger
 * /gmma/api/v1/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 */
router.get("/payments", authenticate, authorizeRole("admin"), getPayments);

/**
 * @swagger
 * /gmma/api/v1/payments/{memberId}:
 *   get:
 *     summary: Get payment history for a specific member
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 */
router.get("/payments/:memberId", authenticate, getPaymentsByMember);

export default router;