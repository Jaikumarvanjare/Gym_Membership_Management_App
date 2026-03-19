import { Router } from "express";
import { signup, login } from "../controllers/authController";
import { validate } from "../middleware/validate";
import { signupSchema, loginSchema } from "../validators/authValidator";

const router = Router();

/**
 * @swagger
 * /gmma/api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [customer, admin]
 *                 default: customer
 *     responses:
 *       201:
 *         description: Signup successful
 *       422:
 *         description: Validation error
 */
router.post("/auth/signup", validate(signupSchema), signup);

/**
 * @swagger
 * /gmma/api/v1/auth/login:
 *   post:
 *     summary: Login and receive a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/auth/login", validate(loginSchema), login);

export default router;