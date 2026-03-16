import express from "express";

import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
  getExpiredMembers
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
 */
router.get(
  "/members/:id",
  authenticate,
  getMemberById
);

/**
 * @swagger
 * /gmma/api/v1/members/expired:
 *   get:
 *     summary: Get expired members
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/members/expired",
  authenticate,
  authorizeRole("admin"),
  getExpiredMembers
);

/**
 * @swagger
 * /gmma/api/v1/members/{id}:
 *   put:
 *     summary: Update member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
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
 */
router.delete(
  "/members/:id",
  authenticate,
  authorizeRole("admin"),
  deleteMember
);

export default router;