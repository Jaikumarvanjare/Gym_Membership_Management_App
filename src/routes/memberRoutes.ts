import express from "express";
import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember
} from "../controllers/memberController";

const router = express.Router();

/**
 * @swagger
 * /gmma/api/v1/members:
 *   post:
 *     summary: Create a new gym member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               membership_type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member created successfully
 */
router.post("/members", createMember);

/**
 * @swagger
 * /gmma/api/v1/members:
 *   get:
 *     summary: Get all gym members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: List of gym members
 */
router.get("/members", getMembers);

/**
 * @swagger
 * /gmma/api/v1/members/{id}:
 *   get:
 *     summary: Get a gym member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member details
 *       404:
 *         description: Member not found
 */
router.get("/members/:id", getMemberById);

/**
 * @swagger
 * /gmma/api/v1/members/{id}:
 *   put:
 *     summary: Update a gym member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               membership_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member updated successfully
 */
router.put("/members/:id", updateMember);

/**
 * @swagger
 * /gmma/api/v1/members/{id}:
 *   delete:
 *     summary: Delete a gym member
 *     tags: [Members]
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
router.delete("/members/:id", deleteMember);

export default router;