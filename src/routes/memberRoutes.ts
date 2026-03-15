import express from "express";

import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember
} from "../controllers/memberController";

import { authenticate } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";
import { validate } from "../middleware/validate";

import {
  createMemberSchema,
  updateMemberSchema
} from "../validators/memberValidator";

const router = express.Router();

/**
 * @swagger
 * /gmma/api/v1/members:
 *   post:
 *     summary: Create a new gym member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - membership_type
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               membership_type:
 *                 type: string
 *                 example: premium
 *     responses:
 *       201:
 *         description: Member created successfully
 */
router.post(
  "/members",
  authenticate,
  authorizeRole("admin"),
  validate(createMemberSchema),
  createMember
);

/**
 * @swagger
 * /gmma/api/v1/members:
 *   get:
 *     summary: Get all gym members
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: membership_type
 *         schema:
 *           type: string
 *         example: premium
 *     responses:
 *       200:
 *         description: List of members
 */
router.get(
  "/members",
  authenticate,
  authorizeRole("admin"),
  getMembers
);

/**
 * @swagger
 * /gmma/api/v1/members/{id}:
 *   get:
 *     summary: Get member by ID
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member details
 */
router.get(
  "/members/:id",
  authenticate,
  getMemberById
);

/**
 * @swagger
 * /gmma/api/v1/members/{id}:
 *   put:
 *     summary: Update member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member updated successfully
 */
router.put(
  "/members/:id",
  authenticate,
  authorizeRole("admin"),
  validate(updateMemberSchema),
  updateMember
);

/**
 * @swagger
 * /gmma/api/v1/members/{id}:
 *   delete:
 *     summary: Delete member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member deleted successfully
 */
router.delete(
  "/members/:id",
  authenticate,
  authorizeRole("admin"),
  deleteMember
);

export default router;