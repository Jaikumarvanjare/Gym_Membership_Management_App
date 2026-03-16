import express from "express";

import { getDashboardStats } from "../controllers/dashboardController";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";

const router = express.Router();

/**
 * @swagger
 * /gmma/api/v1/dashboard/stats:
 *   get:
 *     summary: Get gym dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/dashboard/stats",
  authenticate,
  authorizeRole("admin"),
  getDashboardStats
);

export default router;