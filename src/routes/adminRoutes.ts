import express, { Request, Response, Router } from "express";
import { approveAdmin } from "../controllers/adminController";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";

const router: Router = express.Router();

/**
 * @swagger
 * /admin/approve/{id}:
 *   patch:
 *     summary: Approve an admin user
 *     description: Allows an authenticated admin to approve another admin account.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the admin to approve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin approved successfully
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Only admins can perform this action
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/admin/approve/:id",
  authenticate,
  authorizeRole("admin"),
  approveAdmin
);

export default router;