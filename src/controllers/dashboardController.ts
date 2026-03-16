import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getDashboardStatsService } from "../services/dashboardService";

export const getDashboardStats = asyncHandler(
  async (req: Request, res: Response) => {

    const stats = await getDashboardStatsService();

    res.json(stats);

  }
);