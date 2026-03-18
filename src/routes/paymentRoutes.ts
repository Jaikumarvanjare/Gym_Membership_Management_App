import express from "express";

import {
  createPayment,
  getPayments,
  getPaymentsByMember
} from "../controllers/paymentController";

import { authenticate } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";

const router = express.Router();

/**
 * @swagger
 * /gmma/api/v1/payments:
 *   post:
 *     summary: Create a payment for a member
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - member_id
 *               - amount
 *               - payment_method
 *             properties:
 *               member_id:
 *                 type: integer
 *                 example: 1
 *               amount:
 *                 type: number
 *                 example: 1500
 *               payment_method:
 *                 type: string
 *                 example: cash
 *     responses:
 *       201:
 *         description: Payment created successfully
 */
router.post(
  "/payments",
  authenticate,
  authorizeRole("admin"),
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
router.get(
  "/payments",
  authenticate,
  authorizeRole("admin"),
  getPayments
);

/**
 * @swagger
 * /gmma/api/v1/payments/{memberId}:
 *   get:
 *     summary: Get payment history for a member
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/payments/:memberId",
  authenticate,
  getPaymentsByMember
);

export default router;