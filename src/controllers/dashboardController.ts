import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getDashboardStatsService } from "../services/dashboardService";

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await getDashboardStatsService();
  res.status(200).json({ success: true, data: stats });
});