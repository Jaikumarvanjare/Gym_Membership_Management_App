import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboardController";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";

const router = Router();

/**
 * @swagger
 * /gmma/api/v1/dashboard/stats:
 *   get:
 *     summary: Get gym dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stats returned successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/dashboard/stats",
  authenticate,
  authorizeRole("admin"),
  getDashboardStats
);

export default router;