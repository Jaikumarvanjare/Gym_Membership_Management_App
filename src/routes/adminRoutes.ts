import { Router } from "express";
import { approveAdmin } from "../controllers/adminController";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";

const router = Router();

/**
 * @swagger
 * /gmma/api/v1/admin/approve/{id}:
 *   patch:
 *     summary: Approve an admin user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Admin approved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Admin not found
 */
router.patch(
  "/admin/approve/:id",
  authenticate,
  authorizeRole("admin"),
  approveAdmin
);

export default router;